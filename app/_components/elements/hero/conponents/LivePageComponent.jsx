import { HeroController } from "@/app/_components/controller/hero-controller";
import { Loader2 } from "lucide-react";

function HeroLivePageComponent({ elementInstance }) {
  const element = elementInstance;
  const data = element?.extraAttributes;

  if (!data) return <Loader2 className="animate-spin" />;
  const RenderedElement = HeroController[data.style][0];
  return <RenderedElement {...data} />;
}

export default HeroLivePageComponent;
