export function SelfBuildingPortfolioArtefact({
  caption,
}: {
  caption: boolean;
}) {
  return (
    <div className="art-sbp">
      <div
        className="art-fig art-lt"
        style={{
          backgroundImage:
            "url(/projects/self-building-portfolio/theme-adaptive-light.webp)",
        }}
      />
      <div
        className="art-fig art-dk"
        style={{
          backgroundImage:
            "url(/projects/self-building-portfolio/theme-adaptive-dark.webp)",
        }}
      />
      <span className="art-lbl artefact-label art-lt">Light theme</span>
      <span className="art-lbl artefact-label art-dk">Dark theme</span>
      {caption && (
        <span className="art-cap artefact-label">
          One figure source, both themes
        </span>
      )}
    </div>
  );
}
