import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import socialPlatforms from "@/data/social-platforms";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";

const ElementSocialsFormField = ({
  form,
  fieldName = "socials",
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const handleDeleteClick = (index, e) => {
    e.preventDefault();
    if (confirmDeleteIndex === index) {
      // Second click - confirm deletion
      const currentSocials = form.getValues(fieldName) || [];
      const newSocials = currentSocials.filter((_, i) => i !== index);
      form.setValue(fieldName, newSocials);
      setConfirmDeleteIndex(null);
    } else {
      // First click - show confirmation
      setConfirmDeleteIndex(index);
    }
  };

  const addSocialMedia = (platform) => {
    const currentSocials = form.getValues(fieldName) || [];
    form.setValue(fieldName, [...currentSocials, { platform, userId: "" }]);
    setIsModalOpen(false);
  };

  const handleInputChange = (index, value) => {
    const currentSocials = form.getValues(fieldName) || [];
    const updatedSocials = [...currentSocials];
    updatedSocials[index] = { ...updatedSocials[index], userId: value };
    form.setValue(fieldName, updatedSocials);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div>
            <FormControl>
              <div className="flex flex-col gap-2">
                {(field.value || []).map((item, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-2 rounded border border-border/50 p-2 dark:border-border"
                  >
                    {/* Social Media Icon */}
                    <div
                      style={{
                        backgroundColor:
                          socialPlatforms.find((p) => p.value === item.platform)
                            ?.background || "",
                        backgroundImage:
                          socialPlatforms.find((p) => p.value === item.platform)
                            ?.background || "",
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded px-1 py-1 text-base"
                    >
                      {socialPlatforms.find((p) => p.value === item.platform)
                        ?.icon || "🌐"}
                    </div>

                    {/* Enter Id */}
                    <Input
                      placeholder="User ID or URL"
                      value={item.userId}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="flex-1"
                    />

                    {/* Delete Button */}
                    {confirmDeleteIndex === index ? (
                      <div className="flex gap-1">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={(e) => handleDeleteClick(index, e)}
                        >
                          ✓
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => setConfirmDeleteIndex(null)}
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={(e) => handleDeleteClick(index, e)}
                      >
                        <XIcon className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </FormControl>
          </div>

          <Button
            variant="primary_2"
            className="mt-2 w-full gap-2 text-white"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            <PlusCircleIcon />
            افزودن شبکه اجتماعی
          </Button>

          {/* Social Media Selection Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="rounded-lg border bg-background p-6 shadow-lg sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  انتخاب شبکه اجتماعی
                </DialogTitle>
              </DialogHeader>
              <div className="grid max-h-[50svh] grid-cols-2 gap-3 overflow-y-scroll py-4">
                {socialPlatforms.map((platform) => (
                  <Button
                    key={platform.value}
                    variant="outline"
                    className="h-auto flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-800"
                    onClick={() => addSocialMedia(platform.value)}
                  >
                    <span className="text-3xl">{platform.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {platform.name}
                    </span>
                  </Button>
                ))}
              </div>
              <DialogFooter className="pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  انصراف
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementSocialsFormField;
