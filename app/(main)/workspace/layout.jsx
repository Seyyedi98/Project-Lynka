import EditorNavbar from "@/app/_components/navbar/editor-navbar";
import ModalContextProvider from "@/context/modal-context";

const EditorLayout = ({ children }) => {
  return (
    <div className="h-full w-full">
      <ModalContextProvider>
        <EditorNavbar />
        {children}
      </ModalContextProvider>
    </div>
  );
};

export default EditorLayout;
