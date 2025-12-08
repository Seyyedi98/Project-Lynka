"use client";

import { getSubmittedForms } from "@/actions/form/page-formfield";
import { getUserPageData } from "@/actions/page/page";
import CSVDownloadButton from "@/app/_components/section/dashboard/submits/csv-download-button";
import SubmitsHeader from "@/app/_components/section/dashboard/submits/submits-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { formItemAnimation, stagger } from "@/utils/animation/animation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Crown,
  FilterIcon,
  LinkIcon,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export default function SubmitsPanel() {
  const [forms, setForms] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formTitleFilter, setFormTitleFilter] = useState(null);
  const [availableTitles, setAvailableTitles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isPremium, isLoading: isPremiumLoading } = useUserSubscription();

  useEffect(() => {
    if (!isPremiumLoading && !isPremium) return;

    const fetchPages = async () => {
      try {
        setIsInitialLoading(true);
        const allPages = await getUserPageData();
        setPages(allPages);
      } catch (err) {
        setError("Failed to load pages");
        console.error(err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchPages();
  }, [isPremium, isPremiumLoading]);

  useEffect(() => {
    if (!isPremiumLoading && !isPremium) return;
    if (selectedPage) {
      setForms([]);
      setCursor(null);
      setHasMore(true);
      setFormTitleFilter(null);
      fetchAvailableTitles();
    }
  }, [selectedPage, isPremium, isPremiumLoading]);

  useEffect(() => {
    if (!isPremiumLoading && !isPremium) return;
    if (selectedPage && (formTitleFilter || searchQuery)) {
      setForms([]);
      setCursor(null);
      setHasMore(true);
      loadSubmissions();
    }
  }, [formTitleFilter, searchQuery, isPremium, isPremiumLoading]);

  const fetchAvailableTitles = async () => {
    try {
      const result = await getSubmittedForms({
        uri: selectedPage,
        limit: 100,
        cursor: null,
      });
      if (result.success) {
        const titles = [
          ...new Set(result.data.map((form) => form.formName)),
        ].filter(Boolean);
        setAvailableTitles(titles);
      }
    } catch (err) {
      console.error("Failed to fetch form titles", err);
    }
  };

  const loadSubmissions = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await getSubmittedForms({
        uri: selectedPage,
        limit: 10,
        cursor,
        formTitleFilter,
        searchQuery,
      });

      if (result.success) {
        setForms((prev) => {
          const existingIds = new Set(prev.map((form) => form.id));
          const newForms = result.data.filter(
            (form) => !existingIds.has(form.id),
          );
          return [...prev, ...newForms];
        });
        setCursor(result.nextCursor);
        setHasMore(result.nextCursor !== null);
      } else {
        setError(result.error || "Failed to load submissions");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormFields = () => {
    const fields = new Set();
    forms.forEach((form) => {
      Object.keys(form).forEach((key) => {
        if (!["id", "createdAt", "FormOccupiedTitle12"].includes(key)) {
          fields.add(key);
        }
      });
    });
    return Array.from(fields);
  };

  const filteredForms = forms.filter((form) => {
    if (!searchQuery) return true;
    return Object.values(form).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase()),
    );
  });

  // Loading state while checking premium status
  if (isPremiumLoading) {
    return (
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // If not premium, show upgrade message
  if (!isPremium) {
    return (
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mx-4 sm:mr-20">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
          >
            فرم های اطلاعاتی
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-gray-600 dark:text-white/80"
          >
            مدیریت و مشاهده تمام فرم‌های ارسال شده
          </motion.p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 text-center dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl">
          <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-white/10">
            <Crown className="h-8 w-8 text-gray-500 dark:text-amber-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            نیاز به اشتراک پریمیوم
          </h3>
          <p className="text-gray-600 dark:text-white/60">
            برای دسترسی به فرم‌های ارسال شده، لطفاً اشتراک پریمیوم تهیه کنید
          </p>
        </div>
      </div>
    );
  }

  // Premium user content
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 sm:mx-4 sm:mr-20">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          فرم های اطلاعاتی
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-gray-600 dark:text-white/80"
        >
          مدیریت و مشاهده تمام فرم‌های ارسال شده
        </motion.p>
      </div>

      {/* heading section */}
      <SubmitsHeader
        pages={pages}
        forms={forms}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        availableTitles={availableTitles}
        isInitialLoading={isInitialLoading}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        formTitleFilter={formTitleFilter}
        setFormTitleFilter={setFormTitleFilter}
      />
      {/* Content */}
      {isInitialLoading ? (
        <div className="space-y-4 sm:mx-4 sm:mr-20">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-20 w-full rounded-xl dark:bg-white/10"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Table View */}
          {filteredForms.length > 0 && (
            <motion.div
              {...fade}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/20 dark:bg-white/10 sm:mx-4 sm:mr-20"
            >
              <div className="p-2">
                <CSVDownloadButton data={forms} />
              </div>
              <div className="overflow-x-auto">
                <Table className="w-full text-sm">
                  <TableHeader className="bg-gray-50 dark:bg-white/10">
                    <TableRow className="dark:border-white/20">
                      <TableHead className="min-w-[180px] text-right text-gray-900 dark:text-white">
                        عنوان فرم
                      </TableHead>
                      {getFormFields()
                        .slice(0, 3)
                        .map((field) => {
                          if (field !== "formName")
                            return (
                              <TableHead
                                className="text-right text-gray-900 dark:text-white"
                                key={field}
                              >
                                {field}
                              </TableHead>
                            );
                        })}
                      <TableHead className="min-w-[150px] text-right text-gray-900 dark:text-white">
                        تاریخ ثبت
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                  >
                    {filteredForms.map((form) => (
                      <motion.tr
                        key={form.id}
                        variants={formItemAnimation}
                        className="group cursor-pointer border-t border-gray-200 transition-colors hover:bg-gray-50 dark:border-white/20 dark:hover:bg-white/10"
                        onClick={() => setSelectedForm(form)}
                      >
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            {form.FormOccupiedTitle12 || "بدون عنوان"}
                            {form.FormOccupiedTitle12 && (
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 dark:border-white/20 dark:text-white/80"
                              >
                                مشاهده
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        {getFormFields()
                          .slice(0, 3)
                          .map((field) => {
                            if (field !== "formName")
                              return (
                                <TableCell
                                  key={field}
                                  className="max-w-[200px] truncate text-gray-700 dark:text-white/80"
                                >
                                  {form[field] || `-`}
                                </TableCell>
                              );
                          })}
                        <TableCell>
                          <div className="text-gray-600 dark:text-white/60">
                            {new Date(form.createdAt).toLocaleString("fa-IR")}
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          )}

          {/* States */}
          {!selectedPage && (
            <motion.div
              {...fade}
              className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 text-center dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl sm:mx-4 sm:mr-20"
            >
              <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-white/10">
                <LinkIcon className="h-8 w-8 text-gray-500 dark:text-amber-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                صفحه‌ای انتخاب نشده است
              </h3>
              <p className="text-gray-600 dark:text-white/60">
                لطفاً یک صفحه را از لیست انتخاب کنید تا فرم‌های آن نمایش داده
                شوند
              </p>
            </motion.div>
          )}

          {selectedPage && filteredForms.length === 0 && !isLoading && (
            <motion.div
              {...fade}
              className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 text-center dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-xl sm:mx-4 sm:mr-20"
            >
              <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-white/10">
                <FilterIcon className="h-8 w-8 text-gray-500 dark:text-amber-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                {searchQuery || formTitleFilter
                  ? "نتیجه‌ای یافت نشد"
                  : "هیچ فرمی برای این صفحه ثبت نشده است"}
              </h3>
              <p className="text-gray-600 dark:text-white/60">
                {searchQuery
                  ? "عبارت جستجو شده با هیچ فرمی مطابقت ندارد"
                  : formTitleFilter
                    ? "فرمی با این عنوان یافت نشد"
                    : "هنوز فرمی برای این صفحه ارسال نشده است"}
              </p>
            </motion.div>
          )}

          {isLoading && (
            <motion.div {...fade} className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </motion.div>
          )}

          {hasMore && filteredForms.length > 0 && !isLoading && (
            <motion.div {...fade} className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={loadSubmissions}
                disabled={isLoading}
                className="gap-2 border-gray-300 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    در حال بارگیری...
                  </>
                ) : (
                  "بارگیری بیشتر"
                )}
              </Button>
            </motion.div>
          )}

          {!hasMore && filteredForms.length > 0 && (
            <motion.p
              {...fade}
              className="mt-6 text-center text-sm text-gray-600 dark:text-white/60"
            >
              تمام فرم‌ها بارگذاری شدند • {filteredForms.length} فرم
            </motion.p>
          )}

          {error && (
            <motion.div
              {...fade}
              className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10 sm:mx-4 sm:mr-20"
            >
              <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">{error}</p>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={loadSubmissions}
                    className="h-auto p-0 text-red-700 dark:text-red-400"
                  >
                    تلاش مجدد
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
      {/* Form Detail Dialog */}
      <Dialog open={!!selectedForm} onOpenChange={() => setSelectedForm(null)}>
        <DialogContent className="max-w-2xl border-gray-200 bg-white dark:border-white/20 dark:bg-slate-900/90 dark:backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <span>جزئیات فرم</span>
              {selectedForm?.FormOccupiedTitle12 && (
                <Badge
                  variant="secondary"
                  className="dark:bg-white/10 dark:text-white"
                >
                  {selectedForm.FormOccupiedTitle12}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription className="dark:text-white/60">
              {new Date(selectedForm?.createdAt).toLocaleString("fa-IR")}
            </DialogDescription>
          </DialogHeader>

          {selectedForm && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(selectedForm).map(([key, value]) => {
                  if (["id", "createdAt", "FormOccupiedTitle12"].includes(key))
                    return null;
                  return (
                    <div key={key} className="space-y-1">
                      <p className="text-sm font-medium text-gray-600 dark:text-white/60">
                        {key}:
                      </p>
                      <p className="max-h-28 overflow-y-auto rounded-md bg-gray-100 p-3 text-sm text-gray-900 dark:bg-white/10 dark:text-white/80">
                        {value || `بدون مقدار`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
