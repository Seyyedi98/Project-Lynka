import { UpdatePageMetaDescription } from "@/actions/page";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const MetaDescriptionForm = ({ uri, description }) => {
  const [isPending, startTransition] = useTransition();
  const { isSilver } = useUserSubscription();

  const form = useForm({
    // resolver:zodResolver(),
    defaultValues: {
      metaDescription: description || "",
    },
  });

  function applyChanges(values) {
    if (isSilver) {
      startTransition(() => UpdatePageMetaDescription(uri, values));
    } else {
      throw console.error("You're not allowed to do this XD");
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-medium">Meta description</h1>
        <h2 className="text-base text-muted-foreground">
          Customise the description of your page
        </h2>
        <h5 className="text-center text-base text-muted-foreground">
          The meta description is shown on Google searches and when you share
          your Lnk.Bio page on chats ( Instagram DM, WhatsApp, iMessage, etc).
        </h5>
      </div>
      {isSilver ? (
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              className="flex cursor-pointer items-center justify-center p-2 duration-200 sm:right-0"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </form>
        </Form>
      ) : (
        <p className="mt-4 text-center text-sm text-destructive">
          برای استفاده ای این قابلیت به اشتراک ویژه نیاز دارید
        </p>
      )}
    </div>
  );
};

export default MetaDescriptionForm;
