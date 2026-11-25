import { EastIcon } from "@/components/icons/material/east";
import { Button } from "@/components/ui/controls/button";
import { ErrorScreen } from "@/components/ui/display/error-screen";

export default function NotFound() {
  return (
    <ErrorScreen
      eyebrow="404"
      title={<>This page doesn&rsquo;t exist — but my work does.</>}
      lead="You might have followed a broken link or mistyped the URL. Either way, there’s nothing here."
      primary={
        <Button
          variant="filled"
          href="/work"
          iconPosition="trailing"
          icon={<EastIcon size={18} />}
        >
          See Projects
        </Button>
      }
    />
  );
}
