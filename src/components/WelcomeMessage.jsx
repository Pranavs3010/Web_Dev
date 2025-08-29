import React from "react";
import { BookOpen, Search, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const WelcomeMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <BookOpen className="h-24 w-24 text-blue-600 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Hey Alex! Ready to find your next great read?
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Search for textbooks, research materials, or a novel for leisure
        reading.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <Search className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Smart Search</h3>
          <p className="text-gray-600 text-sm">
            Search by title, author, or subject for targeted results.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Reading List</h3>
          <p className="text-gray-600 text-sm">
            Star books to build study lists and track required readings.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <ExternalLink className="h-8 w-8 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Full Details</h3>
          <p className="text-gray-600 text-sm">
            Get complete book info instantly for your research.
          </p>
        </div>
      </div>

      {/* Pro Tips Section */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto">
        <h4 className="font-semibold text-blue-900 mb-3">
          💡 Pro Tips for College Students:
        </h4>
        <ul className="text-left text-blue-800 space-y-2 text-sm">
          <li>
            • Use <strong>subject search</strong> (e.g., "psychology") to
            discover supplementary texts.
          </li>
          <li>
            • Find all works by a professor using the{" "}
            <strong>author search</strong>.
          </li>
          <li>
            • Star books during research to build reading lists for your papers.
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default WelcomeMessage;
