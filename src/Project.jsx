import React, { useEffect, useState, useMemo, useRef } from "react";

export default function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const horizontalScrollRef = useRef(null);

  const itemsPerPage = 12; 
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxJ7JnIknYmRscbPuX8wNVGoClHAB7iJT049Z_m8HLke3Ppv_efEEIoQw43N2Ftb0LLYA/exec";

  // COLOR LOGIC: Map categories to specific aesthetic colors
  const getColorScheme = (text) => {
    if (!text) return { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200" };
    
    const colors = [
      { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
      { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
      { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
      { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
      { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
      { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
      { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
      { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
    ];

    // Simple hash to keep color consistent for same text
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const customStyles = `
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .line-clamp-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .line-clamp-desc { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .hd-img { image-rendering: -webkit-optimize-contrast; }
    .project-card { height: 480px; }
    @media (max-width: 640px) { .project-card { height: auto; min-height: 450px; } }
  `;

  const fixImageUrl = (url) => {
    if (!url) return "https://placehold.co/1200x800?text=Analysis+Preview";
    let link = url.trim();
    if (link.includes("github.com") && !link.includes("raw.githubusercontent.com")) {
      return link.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
    }
    return link;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const fetchData = async (forceSync = false) => {
    const cached = sessionStorage.getItem("formal_project_cache");
    if (cached && !forceSync) {
      const parsed = JSON.parse(cached);
      processData(parsed);
      setLoading(false);
      updateDataSilently();
    } else {
      if (forceSync) setIsSyncing(true);
      else setLoading(true);
      await updateDataSilently();
      setLoading(false);
      setIsSyncing(false);
    }
  };

  const updateDataSilently = async () => {
    try {
      const res = await fetch(WEB_APP_URL);
      const json = await res.json();
      const sorted = json.sort((a, b) => new Date(b.Timestamp || 0) - new Date(a.Timestamp || 0));
      sessionStorage.setItem("formal_project_cache", JSON.stringify(sorted));
      processData(sorted);
    } catch (err) {
      console.error("Fetch Error", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const processData = (json) => {
    setData(json);
    setCategories([...new Set(json.map(item => item.ctg).filter(Boolean))]);
    setSubCategories([...new Set(json.map(item => item.subctg).filter(Boolean))]);
  };

  const resetFilters = () => {
    setActiveCategory("");
    setActiveSubCategory("");
    setCurrentPage(1);
  };

  const slideToImage = (direction) => {
    if (horizontalScrollRef.current) {
      const { scrollLeft, clientWidth } = horizontalScrollRef.current;
      const move = direction === 'next' ? scrollLeft + clientWidth : scrollLeft - clientWidth;
      horizontalScrollRef.current.scrollTo({ left: move, behavior: 'smooth' });
    }
  };

  useEffect(() => { 
    fetchData();
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === "ArrowRight") slideToImage('next');
      if (e.key === "ArrowLeft") slideToImage('prev');
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const filteredData = useMemo(() => {
    return data.filter(item => 
      (!activeCategory || item.ctg === activeCategory) && 
      (!activeSubCategory || item.subctg === activeSubCategory)
    );
  }, [data, activeCategory, activeSubCategory]);

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      <style>{customStyles}</style>

      <main className="max-w-7xl mx-auto px-4 pt-15 pb-20">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              Project <span className="text-blue-600">Analytics</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Insight Dashboard</p>
          </div>

          {/* MOBILE SCROLLABLE FILTER BAR */}
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar scroll-smooth">
              <div className="flex items-center gap-2 shrink-0">
                <select 
                  value={activeCategory} 
                  onChange={(e) => {setActiveCategory(e.target.value); setCurrentPage(1);}} 
                  className="text-[10px] font-bold uppercase bg-slate-50 border border-slate-100 rounded-xl outline-none px-3 py-2.5 cursor-pointer min-w-[130px]"
                >
                  <option value="">Categories</option>
                  {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>

                <select 
                  value={activeSubCategory} 
                  onChange={(e) => {setActiveSubCategory(e.target.value); setCurrentPage(1);}} 
                  className="text-[10px] font-bold uppercase bg-slate-50 border border-slate-100 rounded-xl outline-none px-3 py-2.5 cursor-pointer min-w-[130px]"
                >
                  <option value="">Formats</option>
                  {subCategories.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="w-[1px] h-6 bg-slate-200 mx-1 shrink-0"></div>

              <div className="flex items-center gap-2 shrink-0">
                <button onClick={resetFilters} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <button 
                  onClick={() => fetchData(true)} 
                  disabled={isSyncing}
                  className={`flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-blue-600 transition-all ${isSyncing ? 'opacity-70' : ''}`}
                >
                  <svg className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  <span>{isSyncing ? "Syncing" : "Sync Data"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <div key={i} className="project-card bg-white border border-slate-100 rounded-3xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((item, idx) => {
              const images = item.img ? item.img.split(',').map(u => u.trim()) : [];
              const ctgColor = getColorScheme(item.ctg);
              const subCtgColor = getColorScheme(item.subctg);

              return (
                <article key={idx} className="project-card group flex flex-col bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                  <div className="relative w-full aspect-video bg-slate-50 overflow-hidden cursor-zoom-in border-b border-slate-100" onClick={() => setSelectedProject(item)}>
                    <img src={fixImageUrl(images[0])} className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105" alt="Preview" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur shadow-sm text-slate-900 text-[9px] font-black px-2 py-1 rounded-md z-10 border border-slate-100 flex items-center gap-1">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/></svg>
                        {images.length}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      {/* CATEGORY WITH DYNAMIC COLOR */}
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${ctgColor.bg} ${ctgColor.text} ${ctgColor.border}`}>
                        {item.ctg}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">{formatDate(item.Timestamp)}</span>
                    </div>
                    
                    <h3 className="text-sm font-bold text-slate-900 leading-snug uppercase line-clamp-title mb-2 group-hover:text-blue-600 transition-colors">
                      {item.heading}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-desc mb-4">
                      {item.discription}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Format Style</span>
                        {/* SUB-CATEGORY WITH DYNAMIC COLOR TEXT */}
                        <p className={`text-[10px] font-black uppercase ${subCtgColor.text}`}>
                          {item.subctg || "Insight"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {item.github && (
                          <a href={item.github} target="_blank" rel="noreferrer" className="p-2 bg-slate-50 text-slate-700 hover:bg-slate-900 hover:text-white rounded-xl transition-all border border-slate-100">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                          </a>
                        )}
                        {item.video && (
                          <a href={item.video} target="_blank" rel="noreferrer" className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all border border-blue-100">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <button disabled={currentPage === 1} onClick={() => {setCurrentPage(p => p - 1); window.scrollTo({top: 0, behavior: 'smooth'});}} className="h-10 px-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white disabled:opacity-30 transition-all shadow-sm">Prev</button>
            <div className="h-10 px-4 flex items-center bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase shadow-lg tracking-widest">{currentPage} / {totalPages}</div>
            <button disabled={currentPage === totalPages} onClick={() => {setCurrentPage(p => p + 1); window.scrollTo({top: 0, behavior: 'smooth'});}} className="h-10 px-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white disabled:opacity-30 transition-all shadow-sm">Next</button>
          </div>
        )}
      </main>

      {/* LIGHTBOX (MODAL) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-3xl flex flex-col animate-in fade-in duration-300">
          <div className="h-20 px-6 md:px-12 flex items-center justify-between bg-black/40 border-b border-white/10 shrink-0">
            <div className="max-w-[70%]">
              <h2 className="text-white text-sm md:text-base font-black uppercase tracking-tight truncate">{selectedProject.heading}</h2>
              <p className="text-blue-400 text-[9px] font-bold uppercase tracking-widest mt-1">{selectedProject.ctg} • {selectedProject.subctg}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1">
                <button onClick={() => slideToImage('prev')} className="p-2 text-white hover:bg-white/10 rounded-lg transition-all active:scale-90">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button onClick={() => slideToImage('next')} className="p-2 text-white hover:bg-white/10 rounded-lg transition-all active:scale-90">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
              <button onClick={() => setSelectedProject(null)} className="h-10 w-10 flex items-center justify-center bg-white text-black rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-90 shadow-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          
          <div ref={horizontalScrollRef} className="flex-grow flex overflow-x-auto snap-x snap-mandatory no-scrollbar bg-black/10">
            {selectedProject.img.split(',').map((img, i) => (
              <div key={i} className="min-w-full h-full flex items-center justify-center p-4 md:p-12 snap-center relative">
                <img src={fixImageUrl(img)} className="max-w-full max-h-full object-contain hd-img shadow-2xl rounded-lg select-none" alt={`Gallery ${i}`} />
                <div className="absolute bottom-10 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 text-white text-[9px] font-bold uppercase tracking-[0.3em]">
                    Visual {i + 1} / {selectedProject.img.split(',').length}
                </div>
              </div>
            ))}
          </div>

          <div className="h-10 bg-black/40 flex items-center justify-center gap-4 text-white/20 text-[8px] font-bold uppercase tracking-[0.4em]">
             <span className="hidden sm:inline">Arrows to Slide</span>
             <span className="sm:hidden">Swipe to Slide</span>
             <div className="w-1 h-1 bg-white/10 rounded-full"></div>
             <span>Esc to Close</span>
          </div>
        </div>
      )}
    </div>
  );
}