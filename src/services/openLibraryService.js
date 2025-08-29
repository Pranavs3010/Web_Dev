const API_URL = "https://openlibrary.org/search.json";
const COVERS_URL = "https://covers.openlibrary.org/b/id";

export const searchBooksAPI = async (term, type) => {
  if (!term.trim()) return [];

  let apiUrl = `${API_URL}?q=${encodeURIComponent(term)}&limit=24`;
  if (type === "title") {
    apiUrl = `${API_URL}?title=${encodeURIComponent(term)}&limit=24`;
  } else if (type === "author") {
    apiUrl = `${API_URL}?author=${encodeURIComponent(term)}&limit=24`;
  } else if (type === "subject") {
    apiUrl = `${API_URL}?subject=${encodeURIComponent(term)}&limit=24`;
  }

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.docs || [];
};

export const getCoverUrl = (coverId, size = "M") => {
  return coverId ? `${COVERS_URL}/${coverId}-${size}.jpg` : null;
};
