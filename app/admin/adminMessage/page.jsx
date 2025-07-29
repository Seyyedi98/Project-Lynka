"use client";

import { getContactMessages, deleteContactMessage } from "@/actions/contact-us";
import React, { useState, useEffect } from "react";

// Modal component
const MessageModal = ({ message, onClose, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(message.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete message:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="w-80 border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-[#c0c0c0] shadow-[2px_2px_0px_0px_#000000]">
        <div className="flex h-6 items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">User Message</span>
          <button className="font-bold text-white" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="border-2 border-b-[#ffffff] border-l-[#808080] border-r-[#ffffff] border-t-[#808080] bg-white p-4">
          <div className="mb-4">
            <h3 className="font-bold">{message.title}</h3>
            <p className="text-xs text-gray-500">User ID: {message.userId}</p>
            <p className="text-xs text-gray-500">
              {new Date(message.createdAt).toLocaleString("En-ir")}
            </p>
          </div>
          <div dir="rtl" className="mb-4 border-t border-gray-300 pt-2">
            <p className="whitespace-pre-wrap">{message.message}</p>
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
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async (page = 1) => {
    setIsLoading(true);
    try {
      const { messages: fetchedMessages, totalPages: pages } =
        await getContactMessages(page);
      setMessages(fetchedMessages);
      setTotalPages(pages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(currentPage);
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

  const openMessageModal = (message) => {
    setSelectedMessage(message);
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteContactMessage(messageId);
      // Remove the deleted message from the local state
      setMessages(messages.filter((msg) => msg.id !== messageId));
      // If we're on the last page and it's now empty, go to previous page
      if (messages.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
      throw error;
    }
  };

  return (
    <div dir="ltr" className="mr-16 p-2 md:mr-64">
      <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
        {/* Title */}
        <div className="flex h-6 items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">Reports</span>
        </div>
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Messages</h1>
            <p className="text-gray-600">Messages users sent</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <p>Loading...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center p-8">
              <p>No Reports found!</p>
            </div>
          ) : (
            <>
              <div className="border-2 border-b-[#000000] border-l-[#dfdfdf] border-r-[#000000] border-t-[#dfdfdf]">
                {/* Main Table Header */}
                <div className="flex bg-[#000080] text-white">
                  <div className="w-1/4 p-2">Title</div>
                  <div className="w-1/4 p-2">UID</div>
                  <div className="w-1/4 p-2">Date</div>
                  <div className="w-1/4 p-2">Actions</div>
                </div>

                {/* Main Table Rows */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex border-t border-t-[#808080] hover:bg-[#e0e0e0]"
                  >
                    <div className="w-1/4 p-2">{message.title || "-"}</div>
                    <div
                      className="w-1/4 cursor-pointer p-2 text-sm hover:underline"
                      onClick={() => {
                        navigator.clipboard.writeText(message.userId);
                      }}
                      title="Click to copy User ID"
                    >
                      {message.userId || "-"}
                    </div>
                    <div className="w-1/4 p-2 text-sm">
                      {new Date(message.createdAt).toLocaleDateString("Fa-ir")}
                    </div>
                    <div className="w-1/4 p-2">
                      <div className="flex gap-1">
                        <button
                          className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 text-sm shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                          onClick={() => openMessageModal(message)}
                        >
                          View
                        </button>
                      </div>
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
            </>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={closeMessageModal}
          onDelete={handleDeleteMessage}
        />
      )}
    </div>
  );
};

export default AdminMessages;
