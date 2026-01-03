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

  const getColorScheme = (text) => {
    if (!text) return { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200" };
    const colors = [
      { bg: "bg-blue-50/50", text: "text-blue-700", border: "border-blue-200/50" },
      { bg: "bg-emerald-50/50", text: "text-emerald-700", border: "border-emerald-200/50" },
      { bg: "bg-indigo-50/50", text: "text-indigo-700", border: "border-indigo-200/50" },
      { bg: "bg-rose-50/50", text: "text-rose-700", border: "border-rose-200/50" },
      { bg: "bg-violet-50/50", text: "text-violet-700", border: "border-violet-200/50" },
      { bg: "bg-amber-50/50", text: "text-amber-700", border: "border-amber-200/50" },
    ];
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = text.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const customStyles = `
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-card { animation: fadeInUp 0.5s ease backwards; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .line-clamp-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .line-clamp-desc { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .premium-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  `;

  const fixImageUrl = (url) => {
    if (!url) return "https://placehold.co/1200x800?text=No+Image";
    let link = url.trim();
    if (link.includes("github.com") && !link.includes("raw.githubusercontent.com")) {
      return link.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
    }
    return link;
  };

  const fetchData = async (forceSync = false) => {
    const cached = sessionStorage.getItem("formal_project_cache");
    if (cached && !forceSync) {
      processData(JSON.parse(cached));
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
    } catch (err) { console.error(err); }
  };

  const processData = (json) => {
    setData(json);
    setCategories([...new Set(json.map(item => item.ctg).filter(Boolean))]);
    setSubCategories([...new Set(json.map(item => item.subctg).filter(Boolean))]);
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
    return data.filter(item => (!activeCategory || item.ctg === activeCategory) && (!activeSubCategory || item.subctg === activeSubCategory));
  }, [data, activeCategory, activeSubCategory]);

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage || 1);

  const formatDate = (ts) => {
    if (!ts) return "Recently";
    const date = new Date(ts);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-200">
      <style>{customStyles}</style>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-15 pb-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              PRO<span className="text-blue-600">JECTS</span>
            </h1>
            <div className="h-1 w-12 bg-blue-600"></div>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em]">Portfolio</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white premium-blur p-1 rounded-lg border border-slate-200 shadow-sm">
              <select 
                value={activeCategory} 
                onChange={(e) => {setActiveCategory(e.target.value); setCurrentPage(1);}} 
                className="bg-transparent text-[10px] font-bold uppercase px-3 py-2 outline-none cursor-pointer border-r border-slate-100"
              >
                <option value="">Category</option>
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
              <select 
                value={activeSubCategory} 
                onChange={(e) => {setActiveSubCategory(e.target.value); setCurrentPage(1);}} 
                className="bg-transparent text-[10px] font-bold uppercase px-3 py-2 outline-none cursor-pointer"
              >
                <option value="">Type</option>
                {subCategories.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

            <button 
              onClick={() => fetchData(true)}
              className={`p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all ${isSyncing ? 'animate-spin' : ''}`}
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-80 bg-white animate-pulse border border-slate-200" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item, idx) => {
              const images = item.img ? item.img.split(',').map(u => u.trim()) : [];
              const theme = getColorScheme(item.ctg);
              
              return (
                <article 
                  key={idx} 
                  className="animate-card group relative bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div 
                    className="relative w-full aspect-video bg-slate-50 overflow-hidden cursor-zoom-in border-b border-slate-100"
                    onClick={() => setSelectedProject(item)}
                  >
                    <img 
                      src={fixImageUrl(images[0])} 
                      className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105" 
                      alt="Project" 
                    />
                    
                    <div className="absolute bottom-3 right-3 bg-white/90 premium-blur px-2 py-1 rounded border border-slate-200 text-[9px] font-bold flex items-center gap-1 shadow-sm">
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/></svg>
                      {images.length}
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight line-clamp-title">
                        {item.heading}
                      </h3>
                      
                      <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-desc font-medium h-9">
                        {item.discription}
                      </p>
                    </div>

                    {/* UPDATED ROW: CATEGORY AND DATE WITH ICONS */}
                    <div className="pt-3 flex items-center justify-between border-t border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className={`flex flex-col p-1.5 rounded-lg ${theme.bg} transition-colors duration-300`}>
                          <div className="flex items-center gap-1 text-slate-400">
                             <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                             <span className="text-[8px] font-bold uppercase tracking-tighter">Category</span>
                          </div>
                          <span className={`text-[10px] font-black uppercase ${theme.text}`}>{item.ctg}</span>
                        </div>

                        <div className="h-6 w-[1px] bg-slate-100"></div>

                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-slate-400">
                             <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                             <span className="text-[8px] font-bold uppercase tracking-tighter">Release</span>
                          </div>
                          <span className="text-[10px] font-black text-slate-700 uppercase">{formatDate(item.Timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {item.github && (
                          <a href={item.github} target="_blank" rel="noreferrer" className="p-2 bg-slate-900 text-white rounded hover:bg-blue-600 transition-colors shadow-sm">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                          </a>
                        )}
                        {item.video && (
                          <a href={item.video} target="_blank" rel="noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors border border-blue-100 shadow-sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
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

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <button 
              disabled={currentPage === 1} 
              onClick={() => {setCurrentPage(p => p - 1); window.scrollTo({top: 0, behavior: 'smooth'});}} 
              className="px-5 py-2.5 bg-white border border-slate-200 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white disabled:opacity-30 transition-all shadow-sm"
            >
              Prev
            </button>
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{currentPage} / {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => {setCurrentPage(p => p + 1); window.scrollTo({top: 0, behavior: 'smooth'});}} 
              className="px-5 py-2.5 bg-white border border-slate-200 rounded text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white disabled:opacity-30 transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-300">
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="max-w-[70%]">
              <h2 className="text-slate-900 text-sm md:text-lg font-black uppercase truncate">{selectedProject.heading}</h2>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{selectedProject.ctg} • {selectedProject.subctg}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center bg-slate-50 rounded p-1 border border-slate-200">
                <button onClick={() => slideToImage('prev')} className="p-2 text-slate-600 hover:bg-white rounded transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg></button>
                <button onClick={() => slideToImage('next')} className="p-2 text-slate-600 hover:bg-white rounded transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg></button>
              </div>
              <button onClick={() => setSelectedProject(null)} className="h-10 w-10 flex items-center justify-center bg-slate-900 text-white rounded hover:bg-red-600 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          
          <div ref={horizontalScrollRef} className="flex-grow flex overflow-x-auto snap-x snap-mandatory no-scrollbar bg-slate-50">
            {selectedProject.img.split(',').map((img, i) => (
              <div key={i} className="min-w-full h-full flex items-center justify-center p-4 md:p-10 snap-center">
                <img src={fixImageUrl(img)} className="max-w-full max-h-[75vh] object-contain shadow-2xl bg-white p-2" alt="View" />
              </div>
            ))}
          </div>

          <div className="h-12 bg-white border-t border-slate-100 flex items-center justify-center gap-6 text-slate-300 text-[8px] font-black uppercase tracking-[0.4em]">
             <span>Keys ← →</span>
             <div className="w-1 h-1 bg-slate-100 rounded-full"></div>
             <span>Esc to close</span>
          </div>
        </div>
      )}
    </div>
  );
}