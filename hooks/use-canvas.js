const { EditorContext } = require("@/context/editor-context");
const { useContext } = require("react");

function useEditor() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used inside a editorContext");
  }

  return context;
}

export default useEditor;
