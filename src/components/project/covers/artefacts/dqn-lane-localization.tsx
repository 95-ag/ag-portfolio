export function DqnLaneLocalizationArtefact({ caption }: { caption: boolean }) {
  return (
    <div className="art-dqn">
      <div
        className="art-crop"
        style={{
          backgroundImage:
            "url(/projects/dqn-lane-localization/full-road-reconstruction.png)",
        }}
      />
      {caption && (
        <span className="art-cap artefact-label">
          Lane reconstruction, TuSimple
        </span>
      )}
    </div>
  );
}
