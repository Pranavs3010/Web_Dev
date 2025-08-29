import React from "react";
import { BookOpen } from "lucide-react";

const Header = () => (
  <header className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">BookFinder</h1>
          <p className="text-gray-600">Discover your next great read, Alex!</p>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
