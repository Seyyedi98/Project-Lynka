import { useParams } from "next/navigation";

const PageDataSettings = () => {
  const { uri } = useParams();
  return <div>PageDataSettings</div>;
};

export default PageDataSettings;
