"use client";

import { getUserData } from "@/actions/admin/user-management";
import ResultsTable from "@/app/_components/admin/usersListTable";
import SearchBox from "@/app/_components/admin/usersSearchBox";
import React, { useState } from "react";

// Main Component
const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("uri");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search types
  const searchTypes = [
    { value: "uri", label: "نام صفحه" },
    { value: "phoneNumber", label: "شماره تلفن" },
    { value: "email", label: "ایمیل" },
    { value: "name", label: "نام کاربری" },
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetchUsers(searchType, searchTerm);
      setUsers(response);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async (type, term) => {
    const users = await getUserData(type, term);
    return users;
  };

  return (
    <div className="mr-64 p-2">
      <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
        {/* Window Title */}
        <div className="flex h-6 items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">مدیریت کاربران</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">سلام، 👋</h1>
            <p className="text-gray-600">جستجو و مدیریت کاربران سیستم</p>
          </div>

          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchType={searchType}
            setSearchType={setSearchType}
            handleSearch={handleSearch}
            isLoading={isLoading}
            searchTypes={searchTypes}
          />

          <ResultsTable users={users} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
