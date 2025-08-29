import React from "react";
import { Star, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCoverUrl } from "../services/openLibraryService";

const FavoritesPanel = ({ favorites }) => {
  if (favorites.length === 0) {
    return null; // Don't render anything if there are no favorites
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500 fill-current" />
            Your Reading List ({favorites.length})
          </h2>
          <p className="text-sm text-gray-600 hidden sm:block">
            Perfect for your studies, Alex! 📚
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.slice(0, 6).map((book) => {
            const coverUrl = getCoverUrl(book.cover_i, "S"); // Use small covers
            return (
              <a
                key={`fav-${book.key}`}
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={book.title}
                    className="w-full h-28 object-cover rounded mb-2 shadow-inner"
                  />
                ) : (
                  <div className="w-full h-28 bg-blue-100 rounded flex items-center justify-center mb-2">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                  </div>
                )}
                <p className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600">
                  {book.title}
                </p>
              </a>
            );
          })}
        </div>
        {favorites.length > 6 && (
          <p className="text-sm text-center text-gray-600 mt-4">
            + {favorites.length - 6} more in your reading list...
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FavoritesPanel;
