export type RulerStop = {
  /** Min-width floor for the breakpoint (base = "0"). */
  px: string;
  device: string;
  token: string;
  /** Whether this project uses the breakpoint (drawn as a deeper sunken box vs a raised one). */
  used: boolean;
  boxW: number;
  boxH: number;
};

export function DeviceRuler({ stops }: { stops: RulerStop[] }) {
  return (
    <div className="flex items-end gap-[var(--spacing-md)] overflow-x-auto pb-[var(--spacing-xs)]">
      {stops.map(({ px, device, token, used, boxW, boxH }) => (
        <div
          key={token}
          className={`flex shrink-0 flex-col items-center justify-end gap-[2px] border border-[var(--hairline)] p-[var(--spacing-sm)] ${
            used ? "bg-[var(--surface-deep)]" : "bg-[var(--surface-elevated)]"
          }`}
          style={{ width: `${boxW}px`, height: `${boxH}px` }}
        >
          <span className="mono-code">{px}</span>
          <span className="body-caption text-center">{device}</span>
          <span className="mono-code">{token}</span>
        </div>
      ))}
    </div>
  );
}
