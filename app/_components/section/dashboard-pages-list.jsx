"use client";

import Link from "next/link";
import { LayoutTemplate, Eye, Pencil, Trash2, QrCode } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../common/modal/diolog";
import PageQrCodeGenerator from "./workspace/page-qrcode-generator";

const PagesList = ({ pages, onDelete, onShowQr }) => {
  return (
    <section className="h-full w-full overflow-auto p-4 sm:overflow-visible md:px-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <LayoutTemplate className="h-8 w-8 text-icon-light" />
        <h2 className="text-lg font-bold text-text">صفحات ایجاد شده</h2>
      </div>

      {pages.length > 0 ? (
        <div className="w-full overflow-x-auto rounded-xl bg-transparent shadow-sm">
          <Table dir="rtl">
            <TableHeader className="text-textLight bg-muted/50 text-sm font-semibold">
              <TableRow>
                <TableHead className="min-w-[120px] text-start">نام</TableHead>
                <TableHead className="min-w-[50px] text-center">
                  بازدید
                </TableHead>
                <TableHead className="min-w-[180px] text-end">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow
                  key={page.uri}
                  className="border-b border-border/40 hover:bg-accent/30"
                >
                  <TableCell className="text-start font-medium">
                    {page.uri}
                  </TableCell>
                  <TableCell className="text-textLight text-center">
                    {page.views}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      {/* View */}
                      <Link
                        href={`/${page.uri}`}
                        target="_blank"
                        title="مشاهده"
                        className="rounded-md p-2 text-icon-light transition hover:bg-muted hover:text-[hsl(var(--primary))]"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/workspace/${page.uri}`}
                        title="ویرایش"
                        className="rounded-md p-2 text-icon-light transition hover:bg-muted hover:text-[hsl(var(--primary))]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      {/* QR Code */}
                      <Dialog>
                        <DialogTrigger>
                          <div
                            onClick={() => onShowQr?.(page.uri)}
                            title="کد QR"
                            className="rounded-md p-2 text-icon-light transition hover:bg-muted hover:text-[hsl(var(--primary))]"
                          >
                            <QrCode className="h-4 w-4" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 overflow-y-scroll p-0">
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                          </DialogHeader>
                          <PageQrCodeGenerator target={page.uri} />
                        </DialogContent>
                      </Dialog>

                      {/* Delete */}
                      {/* <button
                        onClick={() => onDelete?.(page.uri)}
                        title="حذف"
                        className="rounded-md p-2 text-icon-light transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-textLight mt-8 text-center">
          شما هنوز صفحه‌ای ایجاد نکرده‌اید.
        </p>
      )}
    </section>
  );
};

export default PagesList;
