export type SpanZone = { name: string; width: string; changes: string[] };

// Render inside a `.prose-content` wrapper for the editorial table styling.
export function SpanTable({ zones }: { zones: SpanZone[] }) {
  return (
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
  );
}
