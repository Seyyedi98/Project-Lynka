import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { FilterIcon, LinkIcon, SearchIcon } from "lucide-react";

const SubmitsHeader = (props) => {
  const {
    pages,
    forms,
    searchQuery,
    setSearchQuery,
    availableTitles,
    isInitialLoading,
    selectedPage,
    setSelectedPage,
    formTitleFilter,
    setFormTitleFilter,
  } = props;

  const getFormTitle = (formName) => {
    // const targetForm = forms.map((form) => form.formName === formName);
    // return targetForm.FormOccupiedTitle12;
  };

  getFormTitle("seyyedi-23182281805");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <Card className="border-0 bg-background/80 backdrop-blur-sm sm:mx-4 sm:mr-20 xl:pr-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="جستجو در فرم‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md pl-4 pr-10"
              />
            </div>

            <div className="flex items-center gap-3">
              {selectedPage && availableTitles.length > 0 && (
                <Select
                  value={formTitleFilter ?? undefined}
                  onValueChange={setFormTitleFilter}
                >
                  <SelectTrigger className="w-48">
                    <div className="flex items-center gap-2">
                      <FilterIcon className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="فیلتر عنوان فرم" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value={null}>همه فرم‌ها</SelectItem> */}
                    {availableTitles.map((title) => (
                      <SelectItem key={title} value={title}>
                        {title.split("-")[1]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-48">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="انتخاب صفحه" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {isInitialLoading ? (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                      ...در حال بارگزاری صفحات
                    </div>
                  ) : (
                    pages.map((page) => (
                      <SelectItem key={page.uri} value={page.uri}>
                        {page.title || page.uri}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubmitsHeader;
