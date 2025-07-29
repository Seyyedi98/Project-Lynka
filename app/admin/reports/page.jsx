"use client";

import { DeletePageReport, getPageReports } from "@/actions/page-report";
import { useEffect, useState, useTransition } from "react";

const ReportModal = ({ report, onClose, onDelete }) => {
  const [isPending, startTransition] = useTransition();

  const DeleteReport = async (id) => {
    try {
      await DeletePageReport(id);
      return true;
    } catch (error) {
      console.error("Failed to delete report:", error);
      return false;
    }
  };

  const handleDelete = (id) => {
    startTransition(async () => {
      const success = await DeleteReport(id);
      if (success) {
        onDelete(id);
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-[#c0c0c0] shadow-[2px_2px_0px_0px_#000000]">
        <div className="flex h-6 items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">Report Details</span>
          <button className="font-bold text-white" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="border-2 border-b-[#ffffff] border-l-[#808080] border-r-[#ffffff] border-t-[#808080] bg-white p-4">
          <div className="mb-4 space-y-2">
            <p>
              <strong>Date:</strong>
              {new Date(report.createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>

          <div className="mb-4 border-t border-gray-300 pt-2">
            <p className="font-bold">Message:</p>
            <p className="whitespace-pre-wrap">{report.reportText}</p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-red-500 px-4 font-medium text-white shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
              onClick={() => {
                handleDelete(report.id);
              }}
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function UserReports() {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [copiedId, setCopiedId] = useState("");

  console.log(reports);

  const fetchReports = async (page = 1) => {
    setIsLoading(true);
    try {
      const { reports: fetchedReports, totalPages: pages } =
        await getPageReports(page);
      setReports(fetchedReports);
      setTotalPages(pages);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage]);

  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId(type);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const handleReportDelete = (deletedId) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.id !== deletedId),
    );
  };

  return (
    <div dir="ltr" className="mr-16 p-2 md:mr-64">
      <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
        <div className="flex h-6 items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">User Reports Management</span>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">User Reports</h1>
            <p className="text-gray-600">List of user-submitted reports</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <p>Loading...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="flex justify-center p-8">
              <p>No reports found</p>
            </div>
          ) : (
            <>
              <div className="border-2 border-b-[#000000] border-l-[#dfdfdf] border-r-[#000000] border-t-[#dfdfdf]">
                <div className="flex bg-[#000080] text-white">
                  <div className="w-1/6 p-2">uri</div>
                  <div className="w-1/6 p-2">Date</div>
                  <div className="ml-auto w-1/6 p-2">Actions</div>
                </div>

                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex border-t border-t-[#808080] hover:bg-[#e0e0e0]"
                  >
                    <div
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_WEBSITE_URL}${report.uri}`,
                          "_blank",
                        )
                      }
                      className="w-1/6 cursor-pointer p-2 text-sm hover:underline"
                    >
                      {report.uri}
                    </div>
                    <div className="w-1/6 cursor-pointer p-2 text-sm hover:underline">
                      {new Date(report.createdAt).toLocaleDateString("fa-IR")}
                    </div>
                    <div className="ml-auto w-1/6 p-2">
                      <button
                        className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 text-sm shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                        onClick={() => setSelectedReport(report)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000] disabled:opacity-50"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000] disabled:opacity-50"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onDelete={handleReportDelete}
        />
      )}
    </div>
  );
}
