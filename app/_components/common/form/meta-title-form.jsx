import { UpdatePageMetaTitle } from "@/actions/page";
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
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const MetaTitleForm = ({ uri, title }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    // resolver:zodResolver(),
    defaultValues: {
      title: title,
    },
  });

  function applyChanges(values) {
    startTransition(() => UpdatePageMetaTitle(uri, values));
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-medium">Browser Title</h1>
        <h1 className="text-base text-muted-foreground">
          Customise the Title shown in the browser bar
        </h1>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(applyChanges)}
        >
          <FormField
            control={form.control}
            name="title"
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
            disabled={isPending}
            type="submit"
            className="flex cursor-pointer items-center justify-center p-2 duration-200 sm:right-0"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MetaTitleForm;
