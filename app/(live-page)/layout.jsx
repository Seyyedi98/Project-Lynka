import { getPageMetadata } from "@/actions/page";

const PreviewLayout = ({ children }) => {
  return <div className="h-dvh w-full bg-neutral-50">{children}</div>;
};

export default PreviewLayout;
