import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "../../layout/card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="یه چیزی اشتباهه!"
      backButtonHref="/auth/login"
      backButtonLabel="برگشت به صفحه ی ورود"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
