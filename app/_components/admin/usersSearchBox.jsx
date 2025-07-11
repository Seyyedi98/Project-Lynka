"use client";

const SearchBox = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  handleSearch,
  isLoading,
  searchTypes,
}) => {
  return (
    <div className="mb-6 flex items-center gap-2">
      <input
        type="text"
        className="h-8 flex-1 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] px-2 outline-none"
        placeholder="Start typing..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <select
        className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-white px-2 outline-none"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        {searchTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      <button
        className="h-8 border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] px-4 font-medium shadow-[1px_1px_0px_0px_#000000] active:shadow-[inset_1px_1px_0px_0px_#000000]"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "Searching" : "Search"}
      </button>
    </div>
  );
};

export default SearchBox;
