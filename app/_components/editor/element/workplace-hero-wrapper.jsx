import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { PageHeroElement } from "../../elements/hero/page-hero-element";

const WorkspaceHeroWrapper = ({ pageTheme, element }) => {
  const dispatch = useDispatch();

  // Return the associated page element
  const HeroElement = PageHeroElement.WorkspaceComponent;

  return (
    <div
      className="relative flex h-full w-full flex-col rounded-2xl text-foreground hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: "page/setSelectedElement", payload: element });
        dispatch({
          type: "modal/setMenuOpen",
          payload: { modalId: "workspaceElement", isOpen: true },
        });
      }}
    >
      {/* Content Section */}
      <div
        className={cn(
          "pointer-events-none relative flex w-full items-center justify-center gap-2 rounded-md opacity-100 transition-all duration-200",
        )}
      >
        <HeroElement elementInstance={element} />
      </div>
    </div>
  );
};

export default WorkspaceHeroWrapper;
