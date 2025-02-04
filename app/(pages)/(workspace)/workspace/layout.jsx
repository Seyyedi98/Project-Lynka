import ModalContextProvider from "@/context/modal-context";

const EditorLayout = ({ children }) => {
  return (
    <div className="h-full w-full">
      <ModalContextProvider>{children}</ModalContextProvider>
    </div>
  );
};

export default EditorLayout;
