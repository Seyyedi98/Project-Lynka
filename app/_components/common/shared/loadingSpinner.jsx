import { LoadingController } from "../../controller/loading-controller";

const LoadingSpinner = ({ elementInstances }) => {
  const data = elementInstances;
  const RenderElement = LoadingController[data];

  return (
    <div className="mt-4 h-fit w-fit text-primary">
      <RenderElement />
    </div>
  );
};

export default LoadingSpinner;
