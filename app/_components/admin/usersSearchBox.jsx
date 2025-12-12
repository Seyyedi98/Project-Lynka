"use client";

import React, { useState } from "react";

const SearchBox = ({
  searchTypes = [
    { value: "trackId", label: "Track ID" },
    { value: "id", label: "Transaction ID" }, // Changed from "transactionId" to "id"
    { value: "userId", label: "User ID" },
    { value: "email", label: "email" },
    { value: "phone", label: "phoneNumber" },
  ],
  defaultSearchType = "trackId",
  placeholder = "Search...",
  onSearch,
  onReset,
  isLoading = false,
}) => {
  const [searchType, setSearchType] = useState(defaultSearchType);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch(searchType, searchValue);
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setSearchType(defaultSearchType);
    if (onReset) onReset();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="border-2 border-b-[#000000] border-l-[#dfdfdf] border-r-[#000000] border-t-[#dfdfdf] bg-white p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <select
          className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-2 shadow-[1px_1px_0px_0px_#000000]"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          {searchTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="h-8 flex-1 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white px-2 shadow-[1px_1px_0px_0px_#000000]"
          placeholder={placeholder || `Search by ${searchType}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex gap-2">
          <button
            className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000] disabled:opacity-50"
            onClick={handleSearch}
            disabled={isLoading || !searchValue.trim()}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
          <button
            className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
