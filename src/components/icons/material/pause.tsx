import { IconBase, type IconProps } from "@/components/icons/icon-base";

// Material's `pause` draws two 240×560 bars that carry about 2.2× the ink of the `play_arrow` triangle; the bars are
// drawn at 0.8 of their size about the box centre so the two icons weigh alike (DESIGN.md → Iconography).
export function PauseIcon(props: IconProps) {
  return (
    <IconBase
      {...props}
      path="M512-256v-448h192v448H512Zm-256 0v-448h192v448H256Z"
    />
  );
}
