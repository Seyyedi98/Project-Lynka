import { Button } from "@/components/ui/button";
import { LoginButton } from "../_components/auth/login-button";

const page = async () => {
  return (
    <div>
      <h1>Title</h1>
      {/* <LoginButton mode="modal" asChild> */}
      <LoginButton asChild>
        <Button>شروع</Button>
        <img src="/album.jpg" alt="image" className="w-32" />
        <img src="/singapore-mobile.svgz" alt="image" className="w-32" />
        <img src="/pageBg/mobile-april.svgz" alt="image" className="w-32" />
        <img src="/mobile-april.svgz" alt="image" className="w-32" />
      </LoginButton>
    </div>
  );
};

export default page;
