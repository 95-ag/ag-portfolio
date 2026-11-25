export function ComponentsRadarArtefact({ caption }: { caption: boolean }) {
  return (
    <>
      <div className="art-cr">
        <span className="art-cr-l art-l1">BC547</span>
        <span className="art-cr-l art-l2">BC547 Transistor (Pack of 5)</span>
        <span className="art-cr-l art-l3">
          BC547 Transistor – NPN – TO-92 – CDIL
        </span>
        <div className="art-cr-out">
          <span className="art-cr-arrow">↓</span>
          <span className="art-cr-rec art-main">BC547</span>
          <span className="art-cr-note insight-label">3 listings, 1 part</span>
          <span className="art-cr-rec art-sib">BC547A</span>
          <span className="art-cr-rec art-sib">BC547B</span>
        </div>
      </div>
      {caption && (
        <span className="art-cap insight-label">
          184,801 listings, one catalog
        </span>
      )}
    </>
  );
}
