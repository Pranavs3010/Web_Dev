import React from "react";
import { User, Calendar, ExternalLink, Star, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { getCoverUrl } from "../services/openLibraryService";

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
  const coverUrl = getCoverUrl(book.cover_i);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
    >
      <div className="relative">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-56 object-cover"
          />
        ) : (
          <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-gray-400" />
          </div>
        )}
        <button
          onClick={() => onToggleFavorite(book)}
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
        >
          <Star
            className={`h-5 w-5 transition-all ${
              isFavorite ? "text-yellow-400 fill-current" : "text-gray-500"
            }`}
          />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight flex-grow">
          {book.title}
        </h3>
        <div className="space-y-2 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />{" "}
            <span className="line-clamp-1">
              {book.author_name?.join(", ") || "Unknown Author"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />{" "}
            <span>{book.first_publish_year || "N/A"}</span>
          </div>
        </div>
        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-4"
        >
          View Details <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
};

export default BookCard;
