import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutTemplate } from "lucide-react";
import Link from "next/link";

const PagesList = ({ pages }) => {
  return (
    <section className="h-full w-full overflow-scroll bg-card p-4 [scrollbar-width:none] sm:overflow-visible md:px-6">
      <div className="mb-6 flex items-center gap-2">
        <LayoutTemplate className="h-8 w-8 text-icon-light" />
        <span className="text-text/80">صفحات ایجاد شده</span>
      </div>

      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">نام</TableHead>
            <TableHead className="text-center">مشاهده</TableHead>
            <TableHead className="text-center">وضعیت</TableHead>
            <TableHead className="pl-12 text-end">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="w-full">
            {pages.map((page) => {
              return (
                <>
                  <TableCell className="text-start">{page.uri}</TableCell>
                  <TableCell className="text-center">{page.views}</TableCell>
                  <TableCell className="text-center">فعال</TableCell>
                  <TableCell className="flex w-full justify-end gap-2 text-end">
                    <Button className="text-sm" variant="primary_2">
                      <Link
                        className="hover:text-white"
                        href={`/${page.uri}`}
                        target="_blank"
                      >
                        مشاهده
                      </Link>
                    </Button>
                    <Button className="text-sm" variant="primary_2">
                      <Link
                        className="hover:text-white"
                        href={`/workspace/${page.uri}`}
                      >
                        ویرایش
                      </Link>
                    </Button>
                  </TableCell>
                </>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>

      {/* {pages.map((page) => {
        return <ExpandableRowCard page={page} key={page.uri} />;
      })} */}
    </section>
  );
};

export default PagesList;
