import React, { useState, useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { searchBooksAPI } from "./services/openLibraryService";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import WelcomeMessage from "./components/WelcomeMessage";
import FavoritesPanel from "./components/FavoritesPanel";
import { AlertCircle, BookOpen as BookIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("bookFavorites", []);
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "bookSearchHistory",
    []
  );

  const addToSearchHistory = useCallback(
    (term, type) => {
      const newItem = { term, type, id: Date.now() };
      setSearchHistory((prev) =>
        [newItem, ...prev.filter((i) => i.term !== term)].slice(0, 5)
      );
    },
    [setSearchHistory]
  );

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");
    setHasSearched(true);
    addToSearchHistory(searchTerm, searchType);

    try {
      const results = await searchBooksAPI(searchTerm, searchType);
      setBooks(results);
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, searchType, addToSearchHistory]);

  const quickSearch = useCallback(
    (term, type) => {
      setSearchTerm(term);
      setSearchType(type);
      // Use a timeout to ensure state is updated before searching
      setTimeout(() => handleSearch(), 0);
    },
    [handleSearch]
  );

  const toggleFavorite = (book) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.key === book.key)
        ? prev.filter((fav) => fav.key !== book.key)
        : [...prev, book]
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
        handleSubmit={handleSearch}
        loading={loading}
        searchHistory={searchHistory}
        quickSearch={quickSearch}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FavoritesPanel favorites={favorites} />

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle /> {error}
          </div>
        )}

        <AnimatePresence>
          {books.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
            >
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  isFavorite={favorites.some((fav) => fav.key === book.key)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {hasSearched && !loading && books.length === 0 && !error && (
          <div className="text-center py-12">
            <BookIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">
              No books found
            </h3>
          </div>
        )}

        {!hasSearched && !loading && <WelcomeMessage />}
      </main>
    </div>
  );
};

export default App;
