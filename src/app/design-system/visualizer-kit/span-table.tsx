export type SpanZone = { name: string; width: string; changes: string[] };

// Render inside a `.prose-content` wrapper for the editorial table styling. The scroll box
// mirrors the MDX table wrapper, so the no-wrap name and width columns cannot widen the page at 375.
export function SpanTable({ zones }: { zones: SpanZone[] }) {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Width</th>
            <th>Key Changes</th>
          </tr>
        </thead>
        <tbody>
          {zones.flatMap((z) =>
            z.changes.map((change, i) => (
              <tr key={`${z.name}-${change}`}>
                {i === 0 && (
                  <>
                    <td
                      rowSpan={z.changes.length}
                      className="mono-anchor whitespace-nowrap align-top"
                    >
                      {z.name}
                    </td>
                    <td
                      rowSpan={z.changes.length}
                      className="mono-anchor whitespace-nowrap align-top"
                    >
                      {z.width}
                    </td>
                  </>
                )}
                <td>{change}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}
