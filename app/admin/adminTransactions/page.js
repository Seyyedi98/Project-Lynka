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

  const searchTypes = [
    { value: "transactionId", label: "Transaction ID" },
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

    setIsSearching(true);
    try {
      const results = await searchTransactions(searchType, searchValue);
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

  const statusColors = {
    pending: "text-yellow-600",
    completed: "text-green-600",
    failed: "text-red-600",
    refunded: "text-blue-600",
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
            defaultSearchType="transactionId"
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
                  <div className="w-1/6 p-2">ID</div>
                  <div className="w-1/6 p-2">User ID</div>
                  <div className="w-1/6 p-2">Amount</div>
                  <div className="w-1/6 p-2">Status</div>
                  <div className="w-1/6 p-2">Type</div>
                  <div className="w-1/6 p-2">Date</div>
                </div>

                {/* Table Rows */}
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex border-t border-t-[#808080] hover:bg-[#e0e0e0]"
                  >
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(transaction.id);
                      }}
                      className="w-1/6 p-2 text-sm hover:underline"
                    >
                      {transaction.id.substring(0, 6)}...
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
                    <div className="w-1/6 p-2 text-sm">{transaction.type}</div>
                    <div className="w-1/6 p-2 text-sm">
                      {formatDate(transaction.requestDate)}
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
                    قبلی
                  </button>
                  <span>
                    صفحه {currentPage} از {totalPages}
                  </span>
                  <button
                    className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000] disabled:opacity-50"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    بعدی
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
