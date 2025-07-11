"use client";

import { createNotification } from "@/actions/notifications";
import React, { useState } from "react";

const AdminSendMessageModal = ({ user, onClose }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [actionText, setActionText] = useState("");
  const [actionUrl, setActionUrl] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await createNotification(user.id, {
        type: "system",
        title,
        body,
        actionUrl,
        actionText,
      });
      setShowSuccess(true);
      // Clear form
      setTitle("");
      setBody("");
      setActionText("");
      setActionUrl("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
      {/* Main Modal */}
      <div className="w-full max-w-2xl border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
        {/* Window Title */}
        <div className="flex h-6 items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">Send System Message</span>
          <button className="font-bold text-white" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Send System Message</h1>
            <p className="text-gray-600">To: {user.name || user.email}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-1 block">Title:</label>
              <input
                type="text"
                className="w-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white p-2 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block">Content:</label>
              <textarea
                className="w-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white p-2 outline-none"
                rows="5"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block">CTA Text (Optional):</label>
              <input
                type="text"
                className="w-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white p-2 outline-none"
                value={actionText}
                onChange={(e) => setActionText(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="mb-1 block">CTA Link (Optional):</label>
              <input
                type="text"
                className="w-full border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white p-2 outline-none"
                value={actionUrl}
                onChange={(e) => setActionUrl(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                onClick={onClose}
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-[#c0c0c0] shadow-[2px_2px_0px_0px_#000000]">
            {/* Dialog Title Bar */}
            <div className="flex h-6 items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
              <span className="text-sm">Message Sent</span>
              <button
                className="font-bold text-white"
                onClick={() => {
                  setShowSuccess(false);
                  onClose();
                }}
              >
                ×
              </button>
            </div>

            {/* Dialog Content */}
            <div className="border-2 border-b-[#ffffff] border-l-[#808080] border-r-[#ffffff] border-t-[#808080] bg-white p-4">
              <p className="mb-4">Your message has been sent successfully.</p>
              <div className="flex justify-end">
                <button
                  className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
                  onClick={() => {
                    setShowSuccess(false);
                    onClose();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSendMessageModal;
