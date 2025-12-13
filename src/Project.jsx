import React, { useEffect, useState, useMemo } from "react";

export default function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxJ7JnIknYmRscbPuX8wNVGoClHAB7iJT049Z_m8HLke3Ppv_efEEIoQw43N2Ftb0LLYA/exec";

  // Fetch data from server with error handling
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(WEB_APP_URL);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData(json);
      const uniqueCtg = [...new Set(json.map(item => item.ctg).filter(Boolean))];
      setCategories(uniqueCtg);
      const uniqueSubCtg = [...new Set(json.map(item => item.subctg).filter(Boolean))];
      setSubCategories(uniqueSubCtg);
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // Memoized filtered data for performance
  const filteredData = useMemo(() => {
    let filtered = data;
    if (activeCategory) filtered = filtered.filter(item => item.ctg === activeCategory);
    if (activeSubCategory) filtered = filtered.filter(item => item.subctg === activeSubCategory);
    return filtered;
  }, [data, activeCategory, activeSubCategory]);

  // Reset filters
  const resetFilters = () => {
    setActiveCategory("");
    setActiveSubCategory("");
  };

  // Truncate text
  const truncateText = (text, maxLength) => text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  // Image Slider Component with improved accessibility
  const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showArrows, setShowArrows] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    const handleTouchStart = (e) => { setTouchEnd(0); setTouchStart(e.targetTouches[0].clientX); };
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      if (distance > 50) nextImage();
      if (distance < -50) prevImage();
    };

    return (
      <div
        className="relative w-full h-56 sm:h-40 md:h-48 lg:h-56 xl:h-64 overflow-hidden rounded-t-xl"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="img"
        aria-label={`Image slider with ${images.length} images`}
      >
        <img
          src={images[currentIndex]}
          alt={`Item image ${currentIndex + 1} of ${images.length}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
        {images.length > 1 && (
          <>
            {showArrows && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Previous Image"
                >‹</button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Next Image"
                >›</button>
              </>
            )}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2" role="tablist">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${idx === currentIndex ? "bg-white scale-110" : "bg-gray-400 hover:bg-gray-300"}`}
                  aria-label={`Go to image ${idx + 1}`}
                  role="tab"
                  aria-selected={idx === currentIndex}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Scroll hide/show Filters: Hide on scroll down, show on any scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowFilters(false);
      } else if (currentScrollY < lastScrollY) {
        setShowFilters(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans pt-2">
      {/* Filters - Full width */}
      <div className={`w-full p-2 sm:p-6 bg-white shadow-md mt-6 sticky top-0 z-10 transform transition-transform duration-300 ${showFilters ? "translate-y-0" : "-translate-y-full"}`}>
        {/* Category, Subcategory, Reset in one row */}
        <div className="flex flex-row gap-2 sm:gap-4 items-end justify-center flex-wrap">
          {/* Category */}
          <div className="flex-1 min-w-[120px] sm:min-w-[150px]">
            <label htmlFor="category" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={activeCategory}
              onChange={(e) => { setActiveCategory(e.target.value); setActiveSubCategory(""); }}
              className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50 cursor-pointer text-xs sm:text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((ctg, idx) => (<option key={idx} value={ctg}>{ctg}</option>))}
            </select>
          </div>

          {/* Subcategory */}
          <div className="flex-1 min-w-[120px] sm:min-w-[150px]">
            <label htmlFor="subcategory" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Subcategory</label>
            <select
              id="subcategory"
              value={activeSubCategory}
              onChange={(e) => setActiveSubCategory(e.target.value)}
              className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50 cursor-pointer text-xs sm:text-sm"
            >
              <option value="">All Subcategories</option>
              {subCategories.map((subCtg, idx) => (<option key={idx} value={subCtg}>{subCtg}</option>))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex-1 min-w-[120px] sm:min-w-[150px]">
            <button
              onClick={resetFilters}
              className="w-full bg-red-500 text-white px-2 sm:px-4 py-2 font-semibold rounded-lg hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-300 text-xs sm:text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7.8xl mx-auto p-4 sm:p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No data found matching your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"> {/* Mobile: 1, Tablet: 2, PC: 3 */}
            {filteredData.map((item, idx) => {
              const images = item.img ? item.img.split(',').map(url => url.trim()) : [];
              return (
                <article key={idx} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                  {images.length > 0 && <ImageSlider images={images} />}
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{item.ctg}</span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{item.subctg}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{truncateText(item.heading, 50)}</h3>
                    <p className="text-sm text-gray-600 mb-4">{truncateText(item.discription, 100)}</p>
                    <div className="flex justify-between items-center">
                      <time className="text-xs text-gray-400" dateTime={item.Timestamp}>{item.Timestamp || "N/A"}</time>
                      <div className="flex gap-2">
                        {item.video && <a href={item.video} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                          </svg>
                          Video
                        </a>}
                        {item.github && <a href={item.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-3 py-1 rounded-lg text-xs hover:bg-gray-900 transition focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                          </svg>
                          GitHub
                        </a>}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
