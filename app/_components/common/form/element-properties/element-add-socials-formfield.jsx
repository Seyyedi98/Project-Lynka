import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>انتخاب شبکه اجتماعی</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {socialPlatforms.map((platform) => (
                  <Button
                    key={platform.value}
                    variant="outline"
                    className="flex items-center gap-2 p-4"
                    onClick={() => addSocialMedia(platform.value)}
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <span>{platform.name}</span>
                  </Button>
                ))}
              </div>
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
