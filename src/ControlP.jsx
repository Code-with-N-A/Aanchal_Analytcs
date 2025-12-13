import React, { useEffect, useState } from "react";

export default function Control() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [deletingIds, setDeletingIds] = useState([]); // For individual delete loading
  const [bulkDeleting, setBulkDeleting] = useState(false); // For bulk delete loading
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'heading' or 'description'
  const [modalText, setModalText] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxJ7JnIknYmRscbPuX8wNVGoClHAB7iJT049Z_m8HLke3Ppv_efEEIoQw43N2Ftb0LLYA/exec";

  // Fetch data from server
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(WEB_APP_URL);
      const json = await res.json();
      setData(json);
      setFilteredData(json);
      // Extract unique categories for filter dropdown
      const uniqueCtg = [...new Set(json.map(item => item.ctg).filter(Boolean))];
      setCategories(uniqueCtg);
      // Extract unique subcategories for filter dropdown (all subcategories from data)
      const uniqueSubCtg = [...new Set(json.map(item => item.subctg).filter(Boolean))];
      setSubCategories(uniqueSubCtg);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // Filter by category and subcategory
  useEffect(() => {
    let filtered = data;
    if (activeCategory) {
      filtered = filtered.filter(item => item.ctg === activeCategory);
    }
    if (activeSubCategory) {
      filtered = filtered.filter(item => item.subctg === activeSubCategory);
    }
    setFilteredData(filtered);
  }, [data, activeCategory, activeSubCategory]);

  // Delete single row
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    setDeletingIds(prev => [...prev, id]); // Start loading for this ID
    try {
      const formData = new URLSearchParams();
      formData.append("action", "delete");
      formData.append("id", id);

      const res = await fetch(WEB_APP_URL, { method: "POST", body: formData });
      const json = await res.json();
      if (json.status === "success") {
        // Remove deleted row from local state instantly
        setData(prev => prev.filter(item => item.id !== id));
        setFilteredData(prev => prev.filter(item => item.id !== id));
      } else alert(json.message);
    } catch (err) {
      console.error(err);
      alert("Error deleting record");
    }
    setDeletingIds(prev => prev.filter(x => x !== id)); // Stop loading
  };

  // Delete multiple selected rows
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return alert("No rows selected!");
    if (!window.confirm("Delete selected records?")) return;

    setBulkDeleting(true); // Start bulk delete loading
    try {
      for (const id of selectedIds) {
        const formData = new URLSearchParams();
        formData.append("action", "delete");
        formData.append("id", id);
        await fetch(WEB_APP_URL, { method: "POST", body: formData });
      }
      setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setFilteredData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      alert("Error deleting records");
    }
    setBulkDeleting(false); // Stop bulk delete loading
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(x => x !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const openModal = (type, text) => {
    setModalType(type);
    setModalText(text);
    setModalOpen(true);
  };

  const openImageModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setImageModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-10 text-center text-gray-900 tracking-tight">Professional Dashboard</h1>

      {/* Filter Section */}
      <div className="mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start sm:items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <label htmlFor="category-filter" className="text-base sm:text-lg font-semibold text-gray-800">Filter by Category:</label>
            <select
              id="category-filter"
              value={activeCategory}
              onChange={(e) => {
                setActiveCategory(e.target.value);
                setActiveSubCategory(""); // Reset subcategory when category changes
              }}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 bg-gray-50 text-gray-700 font-medium w-full sm:w-auto"
            >
              <option value="">All Categories</option>
              {categories.map((ctg, idx) => (
                <option key={idx} value={ctg}>{ctg}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <label htmlFor="subcategory-filter" className="text-base sm:text-lg font-semibold text-gray-800">Filter by Subcategory:</label>
            <select
              id="subcategory-filter"
              value={activeSubCategory}
              onChange={(e) => setActiveSubCategory(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 bg-gray-50 text-gray-700 font-medium w-full sm:w-auto"
            >
              <option value="">All Subcategories</option>
              {subCategories.map((subCtg, idx) => (
                <option key={idx} value={subCtg}>{subCtg}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Delete Selected */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 sm:p-4 rounded-xl shadow-md gap-4">
        <button
          onClick={handleDeleteSelected}
          disabled={bulkDeleting || selectedIds.length === 0}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 transform ${
            bulkDeleting || selectedIds.length === 0
              ? "bg-gray-400 text-gray-200 cursor-not-allowed scale-95"
              : "bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg"
          }`}
        >
          {bulkDeleting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
              Deleting...
            </div>
          ) : (
            "Delete Selected"
          )}
        </button>
        {selectedIds.length > 0 && (
          <span className="text-base sm:text-lg font-medium text-gray-700 bg-blue-100 px-3 sm:px-4 py-2 rounded-full">
            {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 sm:h-96">
          <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-b-4 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-2xl rounded-xl bg-white">
          <table className="w-full table-auto border-collapse min-w-max">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Select</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">ID</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Image</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Heading</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Description</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Category</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Sub Category</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Timestamp</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Video</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">GitHub</th>
                <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-xs sm:text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors duration-200 even:bg-gray-25">
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleSelect(row.id)}
                      className="w-3 sm:w-4 h-3 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm">{row.id}</td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-center">
                    {row.img && (
                      <img
                        src={row.img}
                        alt="Image"
                        className="w-12 sm:w-16 h-12 sm:h-16 mx-auto object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openImageModal(row.img)}
                      />
                    )}
                  </td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-center">
                    <button
                      onClick={() => openModal("heading", row.heading)}
                      className="px-1 sm:px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-sm font-medium text-xs"
                    >
                      View
                    </button>
                  </td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-center">
                    <button
                      onClick={() => openModal("description", row.discription)}
                      className="px-1 sm:px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-sm font-medium text-xs"
                    >
                      View
                    </button>
                  </td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm">{row.ctg}</td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm">{row.subctg}</td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm">{row.Timestamp || "N/A"}</td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-center">
                    {row.video ? (
                      <a
                        href={row.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-1 sm:px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-sm font-medium text-xs"
                      >
                        <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12l-6-4h12l-6 4z" />
                          <path d="M10 2L2 6v8l8 4 8-4V6l-8-4z" />
                        </svg>
                        Video
                      </a>
                    ) : (
                      <span className="text-gray-500 font-medium text-xs">N/A</span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-center">
                    {row.github ? (
                      <a
                        href={row.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-1 sm:px-2 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-sm font-medium text-xs"
                      >
                        <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
                        </svg>
                        GitHub
                      </a>
                    ) : (
                      <span className="text-gray-500 font-medium text-xs">N/A</span>
                                       )}
                  </td>
                  <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-center">
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={deletingIds.includes(row.id)}
                      className={`px-2 sm:px-3 py-1 rounded-md text-white font-medium text-xs transition-all duration-300 ${
                        deletingIds.includes(row.id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 hover:scale-105 shadow-sm"
                      }`}
                    >
                      {deletingIds.includes(row.id) ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Heading / Description Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800 capitalize">
              {modalType}
            </h2>
            <div className="max-h-80 overflow-y-auto text-gray-700 whitespace-pre-wrap">
              {modalText || "No data available"}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-xl p-4 shadow-2xl max-w-2xl w-full">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
