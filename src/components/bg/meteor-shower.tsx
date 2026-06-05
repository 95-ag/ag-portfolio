"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const FRAG = /* glsl */ `
  precision highp float;
  uniform float iTime;
  uniform vec2  iResolution;
  uniform vec3  uAccent;
  uniform vec3  uAltColor;
  uniform float uDark;

  float rand(vec2 n){ return fract(sin(dot(n, vec2(12.9898,4.1414))) * 43758.5453); }
  float noise(vec2 p){
    vec2 ip = floor(p); vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    return mix(mix(rand(ip), rand(ip+vec2(1,0)), u.x),
               mix(rand(ip+vec2(0,1)), rand(ip+vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 x){
    float v=0., a=0.3; vec2 sh=vec2(100.);
    mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
    for(int i=0;i<3;i++){ v+=a*noise(x); x=rot*x*2.+sh; a*=0.4; }
    return v;
  }
  void main(){
    vec2 shake = vec2(sin(iTime*1.2)*0.005, cos(iTime*2.1)*0.005);
    vec2 p = ((gl_FragCoord.xy + shake*iResolution) - iResolution*0.5)
             / iResolution.y * mat2(6.,-4.,4.,6.);
    vec4 o = vec4(0.);
    float f = 2. + fbm(p + vec2(iTime*5., 0.)) * 0.5;
    for(float i=0.; i<35.; i++){
      vec2 v = p
        + cos(i*i + (iTime + p.x*0.08)*0.025 + i*vec2(13.,11.))*3.5
        + vec2(sin(iTime*3.+i)*0.003, cos(iTime*3.5-i)*0.003);
      float tail = fbm(v + vec2(iTime*0.5, i)) * 0.3 * (1. - i/35.);
      vec3 col = mix(uAccent, uAltColor, 0.25 + 0.35*sin(i*0.3 + iTime*0.5));
      vec4 contribution = vec4(col, 1.) * exp(sin(i*i + iTime*0.8))
        / length(max(v, vec2(v.x*f*0.015, v.y*1.5)));
      // Raised floor so early particles contribute instead of vanishing.
      // Without the +0.16 offset the first ~10 of 35 were effectively invisible.
      float thin = (smoothstep(0., 1., i/35.) * 0.52 + 0.16);
      o += contribution * (1. + tail*0.8) * thin;
    }
    o = tanh(pow(o/100., vec4(1.6)));
    if (uDark > 0.5) {
      // DARK — additive neon glow: hot core = brightest.
      float a = clamp(max(max(o.r, o.g), o.b) * 1.4, 0., 1.);
      gl_FragColor = vec4(o.rgb * 1.2, a);
    } else {
      // LIGHT — inverted: accumulated luminance is ink DENSITY. Hot core => darkest, most
      // saturated ink; falloff => white (multiply identity). Same streak geometry/motion.
      float density = clamp(pow(max(max(o.r, o.g), o.b) * 3.0, 0.7), 0., 1.);
      vec3 hue = normalize(o.rgb + 1e-4);
      vec3 ink = mix(uAccent, uAltColor, clamp(hue.b, 0., 1.));
      gl_FragColor = vec4(mix(vec3(1.0), ink, density), density);
    }
  }
`;

function readAccent(): THREE.Vector3 {
  if (typeof window === "undefined") return new THREE.Vector3(0, 0.43, 0.22);
  // True accent in both themes (light #006e37 / dark #2aa566) via the live --accent-rgb.
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-rgb")
    .trim();
  const nums = raw.split(/[\s,]+/).map(Number);
  if (nums.length === 3 && nums.every((n) => !Number.isNaN(n))) {
    return new THREE.Vector3(nums[0] / 255, nums[1] / 255, nums[2] / 255);
  }
  return new THREE.Vector3(0, 0.43, 0.22);
}

// Secondary particle color — theme-aware so both themes feel palette-native.
// Light: blue #3059b3 — paired with the true green accent for the inverted dark-ink streaks.
// Dark:  steel blue (89, 140, 217) — cool glow contrast reads well on dark bg.
function readAltColor(): THREE.Vector3 {
  if (typeof window === "undefined") return new THREE.Vector3(0.35, 0.55, 0.85);
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  return isDark
    ? new THREE.Vector3(0.35, 0.55, 0.85)
    : new THREE.Vector3(0.188, 0.349, 0.702);
}

export function MeteorShower({ opacity = 0.32 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;

    // The shader is additive — it "glows" on the dark bg, but on a light bg adding color can't
    // brighten past white, so trails just muddily tint. Switch the canvas to `multiply` in light
    // so trails darken the bg into visible colored streaks; keep normal (glow) in dark.
    const applyBlend = () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      canvas.style.mixBlendMode = isDark ? "normal" : "multiply";
      // Light streaks (multiply, dark-on-white) wash out at the dark-mode opacity, so light
      // needs more presence to match the glow's contrast in dark.
      canvas.style.opacity = isDark ? String(opacity) : "0.52";
    };
    applyBlend();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2() },
        uAccent: { value: readAccent() },
        uAltColor: { value: readAltColor() },
        uDark: {
          value:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? 1
              : 0,
        },
      },
      vertexShader: "void main(){ gl_Position = vec4(position, 1.0); }",
      fragmentShader: FRAG,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      material.uniforms.iResolution.value.set(
        w * renderer.getPixelRatio(),
        h * renderer.getPixelRatio(),
      );
    };
    resize();

    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      material.uniforms.iTime.value += dt;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const themeObs = new MutationObserver(() => {
      material.uniforms.uAccent.value = readAccent();
      material.uniforms.uAltColor.value = readAltColor();
      material.uniforms.uDark.value =
        document.documentElement.getAttribute("data-theme") === "dark" ? 1 : 0;
      applyBlend();
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      themeObs.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [opacity]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 block w-full h-full pointer-events-none"
      style={{
        opacity,
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, transparent 10%, #000 82%)",
        maskImage:
          "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, transparent 10%, #000 82%)",
      }}
    />
  );
}
