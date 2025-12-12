"use client";

import { getUserData } from "@/actions/admin/user-management";
import ResultsTable from "@/app/_components/admin/usersListTable";
import SearchBox from "@/app/_components/admin/usersSearchBox";
import React, { useState } from "react";

// Main Component
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search types
  const searchTypes = [
    { value: "uri", label: "Page Name" },
    { value: "phoneNumber", label: "Phone Number" },
    { value: "email", label: "Email" },
    { value: "name", label: "Username" },
    { value: "id", label: "id" },
  ];

  const handleSearch = async (searchType, searchTerm) => {
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

  const handleReset = () => {
    setUsers([]);
  };

  const fetchUsers = async (type, term) => {
    const users = await getUserData(type, term);
    return users;
  };

  return (
    <div dir="ltr" className="mr-16 p-2 md:mr-64">
      <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
        {/* Window Title */}
        <div className="flex h-6 items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">Manage Users</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Welcome</h1>
            <p className="text-gray-600">Admin User Management Page</p>
          </div>

          <SearchBox
            searchTypes={searchTypes}
            defaultSearchType="uri"
            placeholder="Search users..."
            onSearch={handleSearch}
            onReset={handleReset}
            isLoading={isLoading}
          />

          <ResultsTable users={users} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
