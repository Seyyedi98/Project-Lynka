import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { PageElements } from "../../controller/page-elements-controller";

const WorkspaceElementWrapper = ({ element }) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector((store) => store.page.selectedElement);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Return the associated page element
  const PageElement = PageElements[element.type].WorkspaceComponent;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex w-full max-w-[380px] flex-col rounded-2xl text-foreground hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        if (selectedElement && selectedElement?.id !== element?.id) {
          dispatch({ type: "page/setSelectedElement", payload: null });
          setTimeout(() => {
            dispatch({ type: "page/setSelectedElement", payload: element });
          }, 420);
        } else {
          dispatch({ type: "page/setSelectedElement", payload: element });
        }

        dispatch({
          type: "modal/setMenuOpen",
          payload: { modalId: "workspaceElement", isOpen: true },
        });
      }}
    >
      <div
        className={cn(
          "pointer-events-none relative flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 opacity-100 transition-all duration-200",
        )}
      >
        <PageElement elementInstance={element} />
      </div>
    </div>
  );
};

export default WorkspaceElementWrapper;
