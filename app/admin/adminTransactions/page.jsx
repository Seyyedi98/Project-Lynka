"use client";

import {
  getAdminTransactions,
  getUserTransactions,
  searchTransactions,
} from "@/actions/transactions/transactionsList";
import SearchBox from "@/app/_components/admin/usersSearchBox";
import React, { useState, useEffect } from "react";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const searchTypes = [
    { value: "trackId", label: "Track ID" },
    { value: "id", label: "Transaction ID" },
    { value: "userId", label: "User ID" },
  ];

  const fetchTransactions = async (page = 1) => {
    setIsLoading(true);
    try {
      const { transactions: fetchedTransactions, totalPages: pages } =
        await getAdminTransactions(page);
      setTransactions(fetchedTransactions);
      setTotalPages(pages);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchType, searchValue) => {
    if (!searchValue.trim()) {
      fetchTransactions();
      return;
    }

    console.log("Searching with:", { searchType, searchValue }); // Debug log

    setIsSearching(true);
    try {
      const results = await searchTransactions(searchType, searchValue);
      console.log("Search results:", results); // Debug log
      setTransactions(results);
      setCurrentPage(1);
      setTotalPages(1);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("fa-IR");
  };

  const formatToShamsi = (dateString) => {
    if (!dateString) return "-";

    // Simple conversion to Shamsi (Jalali) - you might want to use a proper library like moment-jalaali
    const date = new Date(dateString);
    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth() + 1;
    const gregorianDay = date.getDate();

    // Simple conversion algorithm (for exact conversion, use a proper library)
    const shamsiDate = convertToShamsi(
      gregorianYear,
      gregorianMonth,
      gregorianDay,
    );

    return `${shamsiDate.year}/${shamsiDate.month}/${shamsiDate.day} - ${date.toLocaleTimeString("fa-IR")}`;
  };

  // Simple Gregorian to Shamsi conversion function
  const convertToShamsi = (gy, gm, gd) => {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gy2 = gm > 2 ? gy + 1 : gy;
    let days =
      355666 +
      365 * gy +
      ~~((gy2 + 3) / 4) -
      ~~((gy2 + 99) / 100) +
      ~~((gy2 + 399) / 400) +
      gd +
      g_d_m[gm - 1];
    let jy = -1595 + 33 * ~~(days / 12053);
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    let jm = days < 186 ? 1 + ~~(days / 31) : 7 + ~~((days - 186) / 30);
    let jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

    return {
      year: jy,
      month: jm < 10 ? "0" + jm : jm,
      day: jd < 10 ? "0" + jd : jd,
    };
  };

  const statusColors = {
    pending: "text-yellow-600",
    completed: "text-green-600",
    failed: "text-red-600",
    refunded: "text-blue-600",
  };

  const openDetailsModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "-";
    return `****${cardNumber.slice(-4)}`;
  };

  return (
    <div dir="ltr" className="mr-16 p-2 md:mr-64">
      <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
        {/* Title */}
        <div className="flex h-6 items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">Transactions</span>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Transaction History</h1>
            <p className="text-gray-600">View and search transactions</p>
          </div>

          {/* Reusable SearchBox */}
          <SearchBox
            searchTypes={searchTypes}
            defaultSearchType="id"
            placeholder="Search transactions..."
            onSearch={handleSearch}
            onReset={handleReset}
            isLoading={isSearching}
            className="mb-6"
          />

          {isLoading ? (
            <div className="flex justify-center p-8">
              <p>Loading transactions...</p>
            </div>
          ) : !transactions || transactions.length === 0 ? (
            <div className="flex justify-center p-8">
              <p>No transactions found!</p>
            </div>
          ) : (
            <>
              <div className="border-2 border-b-[#000000] border-l-[#dfdfdf] border-r-[#000000] border-t-[#dfdfdf]">
                {/* Table Header */}
                <div className="flex bg-[#000080] text-white">
                  <div className="w-1/6 p-2">Track ID</div>
                  <div className="w-1/6 p-2">User ID</div>
                  <div className="w-1/6 p-2">Amount</div>
                  <div className="w-1/6 p-2">Status</div>
                  <div className="w-1/6 p-2">Date</div>
                  <div className="w-1/6 p-2">Actions</div>
                </div>

                {/* Table Rows */}
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex border-t border-t-[#808080] hover:bg-[#e0e0e0]"
                  >
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(transaction.trackId);
                      }}
                      className="w-1/6 p-2 text-sm hover:underline"
                    >
                      {transaction.trackId}
                    </div>
                    <div
                      className="w-1/6 cursor-pointer p-2 text-sm hover:underline"
                      onClick={() => {
                        navigator.clipboard.writeText(transaction.userId);
                      }}
                      title="Click to copy User ID"
                    >
                      {transaction.userId.substring(0, 6)}...
                    </div>
                    <div className="w-1/6 p-2 text-sm">
                      {transaction.amount.toFixed(2)}
                    </div>
                    <div
                      className={`w-1/6 p-2 text-sm ${statusColors[transaction.status] || ""}`}
                    >
                      {transaction.status}
                    </div>
                    <div className="w-1/6 p-2 text-sm">
                      {formatDate(transaction.requestDate)}
                    </div>
                    <div className="w-1/6 p-2 text-sm">
                      <button
                        onClick={() => openDetailsModal(transaction)}
                        className="h-6 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 text-xs shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {!isSearching && totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000] disabled:opacity-50"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Back
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
              )}
            </>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
            {/* Modal Header */}
            <div className="flex h-6 items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
              <span className="text-sm">Transaction Details</span>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Amount:</span>
                  <span>{selectedTransaction.amount?.toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Card Number:</span>
                  <span>{maskCardNumber(selectedTransaction.cardNumber)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Duration:</span>
                  <span>{selectedTransaction.duration || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Email:</span>
                  <span>{selectedTransaction.email || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Phone Number:</span>
                  <span>{selectedTransaction.phoneNumber || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Paid At:</span>
                  <span>{formatToShamsi(selectedTransaction.paidAt)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Status:</span>
                  <span
                    className={`${statusColors[selectedTransaction.status] || ""}`}
                  >
                    {selectedTransaction.status}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Subscription Plan:</span>
                  <span>{selectedTransaction.subscriptionPlan || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Track ID:</span>
                  <span>{selectedTransaction.trackId || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">User ID:</span>
                  <span>{selectedTransaction.userId}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Verify Date:</span>
                  <span>{formatToShamsi(selectedTransaction.verifyDate)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Reference Number:</span>
                  <span>{selectedTransaction.refNumber || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Order ID:</span>
                  <span>{selectedTransaction.orderId || "-"}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
