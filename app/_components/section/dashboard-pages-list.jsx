"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, LayoutTemplate, Pencil, QrCode, Trash2 } from "lucide-react";
import Link from "next/link";
import DeletePage from "../common/form/delete-page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../common/modal/diolog";
import { WorkspaceDynamicModal } from "../common/modal/workspace-dynamic-modal";
import PageQrCodeGenerator from "./workspace/page-qrcode-generator";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const PagesList = ({ pages, onShowQr }) => {
  const [openQrModal, setOpenQrModal] = useState(false);
  const [currentPageUri, setCurrentPageUri] = useState("");
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  const handleShowQr = (uri) => {
    setCurrentPageUri(uri);
    setOpenQrModal(true);
    onShowQr?.(uri);
  };

  return (
    <section className="h-full w-full overflow-auto p-4 sm:overflow-visible md:px-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <LayoutTemplate
          className={`h-8 w-8 ${isDark ? "text-white/80" : "text-icon-light"}`}
        />
        <h2
          className={`text-lg font-bold ${isDark ? "text-white" : "text-text"}`}
        >
          صفحات ایجاد شده
        </h2>
      </div>

      {pages.length > 0 ? (
        <div
          className={`w-full overflow-x-auto rounded-xl ${
            isDark
              ? "border border-white/20 bg-white/10 backdrop-blur-xl"
              : "bg-transparent shadow-sm"
          }`}
        >
          <Table dir="rtl">
            <TableHeader
              className={`text-sm font-semibold ${
                isDark ? "bg-white/10 text-white" : "text-textLight bg-muted/50"
              }`}
            >
              <TableRow className={isDark ? "border-white/20" : ""}>
                <TableHead
                  className={`min-w-[120px] text-start ${
                    isDark ? "text-white" : "text-textLight"
                  }`}
                >
                  نام
                </TableHead>
                {/* <TableHead className={`min-w-[50px] text-center ${
                  isDark ? "text-white" : "text-textLight"
                }`}>
                  بازدید
                </TableHead> */}
                <TableHead
                  className={`min-w-[180px] text-end ${
                    isDark ? "text-white" : "text-textLight"
                  }`}
                >
                  عملیات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow
                  key={page.uri}
                  className={`group transition-colors ${
                    isDark
                      ? "border-white/20 hover:bg-white/10"
                      : "border-b border-border/40 hover:bg-accent/30"
                  }`}
                >
                  <TableCell
                    className={`text-start font-medium ${
                      isDark ? "text-white" : "text-text"
                    }`}
                  >
                    <Link
                      href={`/workspace/${page.uri}`}
                      title="ویرایش"
                      className={`hover:underline ${
                        isDark
                          ? "text-white hover:text-white/80"
                          : "text-text hover:text-primary"
                      }`}
                    >
                      {page.uri}
                    </Link>
                  </TableCell>
                  {/* <TableCell className={`text-center ${
                    isDark ? "text-white/80" : "text-textLight"
                  }`}>
                    {page.views}
                  </TableCell> */}
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      {/* View */}
                      <Link
                        href={`/${page.uri}`}
                        target="_blank"
                        title="مشاهده"
                        className={`rounded-md p-2 transition ${
                          isDark
                            ? "text-white/80 hover:bg-white/10 hover:text-white"
                            : "text-icon-light hover:bg-muted hover:text-[hsl(var(--primary))]"
                        }`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/workspace/${page.uri}`}
                        title="ویرایش"
                        className={`rounded-md p-2 transition ${
                          isDark
                            ? "text-white/80 hover:bg-white/10 hover:text-white"
                            : "text-icon-light hover:bg-muted hover:text-[hsl(var(--primary))]"
                        }`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      {/* QR Code */}
                      <Dialog
                        open={openQrModal && currentPageUri === page.uri}
                        onOpenChange={setOpenQrModal}
                      >
                        <DialogTrigger asChild>
                          <button
                            onClick={() => handleShowQr(page.uri)}
                            title="کد QR"
                            className={`rounded-md p-2 transition ${
                              isDark
                                ? "text-white/80 hover:bg-white/10 hover:text-white"
                                : "text-icon-light hover:bg-muted hover:text-[hsl(var(--primary))]"
                            }`}
                          >
                            <QrCode className="h-4 w-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent
                          className={`flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 overflow-y-scroll p-0 ${
                            isDark
                              ? "border-white/20 bg-slate-900/90 backdrop-blur-xl"
                              : "bg-white"
                          }`}
                        >
                          <DialogHeader>
                            <DialogTitle
                              className={isDark ? "text-white" : ""}
                            ></DialogTitle>
                          </DialogHeader>
                          <PageQrCodeGenerator target={page.uri} />
                        </DialogContent>
                      </Dialog>

                      {/* Delete */}
                      <WorkspaceDynamicModal
                        mode="mobileDrawer"
                        delay={400}
                        modalId={`deletePage-${page.uri}`}
                        trigger={
                          <button
                            title="حذف"
                            className={`cursor-pointer rounded-md p-2 transition ${
                              isDark
                                ? "text-white/80 hover:bg-red-500/20 hover:text-red-400"
                                : "text-icon-light hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        }
                      >
                        <AnimatePresence>
                          <DeletePage
                            page={page.uri}
                            onClose={() =>
                              document
                                .getElementById(`deletePage-${page.uri}`)
                                ?.close()
                            }
                          />
                        </AnimatePresence>
                      </WorkspaceDynamicModal>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p
          className={`mt-8 text-center ${
            isDark ? "text-white/60" : "text-textLight"
          }`}
        >
          شما هنوز صفحه‌ای ایجاد نکرده‌اید.
        </p>
      )}
    </section>
  );
};

export default PagesList;
