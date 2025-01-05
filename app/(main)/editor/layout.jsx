import EditorNavbar from "@/app/_components/navbar/editor-navbar";

const EditorLayout = ({ children }) => {
  return (
    <div className="h-full w-full">
      <EditorNavbar />
      {children}
    </div>
  );
};

export default EditorLayout;
