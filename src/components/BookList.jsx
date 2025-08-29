import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books, hasSearched }) => {
  // If the user has searched but found no books
  if (hasSearched && books.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <h2 className="text-2xl font-semibold">No Books Found</h2>
        <p>Try a different search term.</p>
      </div>
    );
  }

  // If there are no books and the user hasn't searched yet
  if (books.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <h2 className="text-2xl font-semibold">Welcome, Alex!</h2>
        <p>
          Use the search bar above to find books for your studies or leisure.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
