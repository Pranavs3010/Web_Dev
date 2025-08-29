import React from "react";
import { Search, Loader2, Clock, TrendingUp } from "lucide-react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  handleSubmit,
  loading,
  searchHistory,
  quickSearch,
}) => {
  const popularSearches = [
    { term: "psychology", type: "subject" },
    { term: "shakespeare", type: "author" },
    { term: "calculus", type: "subject" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Search for books..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject</option>
          </select>
          <button
            onClick={handleSubmit}
            disabled={loading || !searchTerm.trim()}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              "Search"
            )}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {searchHistory.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Recent:</span>
              {searchHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => quickSearch(item.term, item.type)}
                  className="px-3 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  {item.term}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Popular:</span>
            {popularSearches.map((item, i) => (
              <button
                key={i}
                onClick={() => quickSearch(item.term, item.type)}
                className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
              >
                {item.term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
