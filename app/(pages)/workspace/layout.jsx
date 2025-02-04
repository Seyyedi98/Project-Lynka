import ModalContextProvider from "@/context/modal-context";

const EditorLayout = ({ children }) => {
  return (
    <div className="h-dvh w-dvw bg-black">
      <ModalContextProvider>{children}</ModalContextProvider>
    </div>
  );
};

export default EditorLayout;
