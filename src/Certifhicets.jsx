import React from "react";

export default function AanchalCredentials() {
  const certifications = [
    { name: "GenAI Powered Data Analytics Job Simulation", issuer: "TATA", file: "public/img/tata_da_certificate.pdf" },
    { name: "Al-Enabled Data Analytics Career For Working Professionals Professionals", issuer: "WcCube Tech", file: "public/img/data anlytics(wc).pdf" },
    { name: "Blinkit Inventory & Supply Chain Analytics", issuer: "WcCube Tech", file: "public/img/Blinkit.pdf" },
    { name: "Power BI Data Modelling Basics Tutorial Course", issuer: "Microsoft | SimpliLearn", file: "public/img/POWER BI CER.pdf" },
    { name: "Web Development by React", issuer: "Axis Bank Foundation | Anudip", file: "public/img/anudip.pdf" },
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-16 text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-20 border-b border-gray-100 pb-10">
          <h1 className="text-4xl font-light tracking-tighter uppercase">Documents <span className="text-gray-300">&</span> Verification</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* --- RESUME CARD (Formal & Minimal) --- */}
          <div className="md:col-span-1">
            <div className="border-2 border-gray-900 p-8 rounded-2xl h-full flex flex-col justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center rounded-lg mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <h2 className="text-xl font-bold uppercase tracking-tight mb-2">Professional Resume</h2>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest leading-relaxed">
                  Latest version: 2024-25 <br /> PDF Format
                </p>
              </div>
              
              <div className="mt-12 space-y-3">
                <button 
                  onClick={() => window.open('public/img/MIS RESUME.pdf', '_blank')}
                  className="w-full bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-blue-600 transition-all"
                >
                  View in New Window
                </button>
                <a 
                  href="public/img/MIS RESUME.pdf" 
                  download 
                  className="block text-center w-full border border-gray-200 text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Download Copy
                </a>
              </div>
            </div>
          </div>

          {/* --- CERTIFICATES GRID (Small & Clean) --- */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="group border border-gray-100 p-5 rounded-xl hover:border-gray-900 transition-all flex flex-col justify-between"
                >
                  <div className="mb-6">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] block mb-1">{cert.issuer}</span>
                    <h3 className="text-sm font-bold uppercase leading-tight text-gray-800">{cert.name}</h3>
                  </div>
                  
                  <button 
                    onClick={() => window.open(cert.file, '_blank')}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors"
                  >
                    Open Certificate
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- BOTTOM MARKER --- */}
        <div className="mt-32 flex justify-center">
          <div className="text-[10px] font-bold text-gray-200 uppercase tracking-[1em]">Verified Credentials</div>
        </div>

      </div>
    </div>
  );
}