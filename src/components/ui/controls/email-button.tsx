import { NorthEastIcon } from "@/components/icons/material/north-east";
import { Button } from "@/components/ui/controls/button";

interface EmailButtonProps {
  address: string;
}

// The email action on Home and About: the address itself as the label, a trailing link icon, and the attention cue
// (DESIGN.md → Button). One component so the two can never drift apart.
export function EmailButton({ address }: EmailButtonProps) {
  return (
    <Button
      href={`mailto:${address}`}
      cue="full"
      iconPosition="trailing"
      icon={<NorthEastIcon size={18} />}
    >
      {address}
    </Button>
  );
}
