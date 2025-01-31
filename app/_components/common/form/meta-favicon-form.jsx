import { useForm } from "react-hook-form";
import FaviconUploader from "../input/favicon-uploader";

const MetaFaviconForm = ({ uri, favicon }) => {
  const form = useForm({
    // resolver:zodResolver(),
    defaultValues: {
      metaFavicon: "",
    },
  });

  let metaFavicon = "";
  if (favicon) metaFavicon = JSON.parse(favicon);

  function applyChanges(values) {}

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-medium">Favicon</h1>
        <h2 className="text-base text-muted-foreground">
          Customise the icon shown in the browser bar
        </h2>
      </div>
      <FaviconUploader favicon={metaFavicon} uri={uri} />
    </div>
  );
};

export default MetaFaviconForm;
