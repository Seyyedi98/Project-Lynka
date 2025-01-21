import { DiologContext } from "@/context/modal-context";

const { useContext } = require("react");

function useModal() {
  const context = useContext(DiologContext);

  if (!context) {
    throw new Error("useModal must be used inside a editorContext");
  }

  return context;
}

export default useModal;
