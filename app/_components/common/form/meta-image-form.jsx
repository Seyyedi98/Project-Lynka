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
import { useForm } from "react-hook-form";

const MetaImageForm = () => {
  const form = useForm({
    // resolver:zodResolver(),
    defaultValues: {
      metaImage: "",
    },
  });

  function applyChanges(values) {}

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-medium">Meta Image</h1>
        <h2 className="text-base text-muted-foreground">
          Customise Meta Image
        </h2>
        <h5 className="text-center text-base text-muted-foreground">
          The meta image is the preview image shown when you share your Lnk.Bio
          page on chats ( Instagram DM, WhatsApp, iMessage, etc).
        </h5>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(applyChanges)}
        >
          <FormField
            control={form.control}
            name="metaImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="flex cursor-pointer items-center justify-center p-2 duration-200 sm:right-0"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MetaImageForm;
