import React, { useState } from "react";
import {
  BarChart3,
  Database,
  LineChart,
  FileText,
  Award,
  Download,
  X,
  Maximize2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  CheckCircle2
} from "lucide-react";

export default function About() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    { id: "CERT-01", title: "Data Analytics Professional", issuer: "Google", file: "/pdf/certificates/google.pdf", level: "Professional" },
    { id: "CERT-02", title: "Advanced SQL for Analytics", issuer: "IBM", file: "/pdf/certificates/sql.pdf", level: "Expert" },
    { id: "CERT-03", title: "Power BI Business Intelligence", issuer: "Microsoft", file: "/pdf/certificates/pbi.pdf", level: "Associate" },
    { id: "CERT-04", title: "Python for Data Analysis", file: "/pdf/certificates/python.pdf", issuer: "Meta", level: "Professional" },
    { id: "CERT-05", title: "Applied Business Statistics", file: "/pdf/certificates/stats.pdf", issuer: "Stanford", level: "Specialist" },
    { id: "CERT-06", title: "Tableau Visual Strategy", file: "/pdf/certificates/tableau.pdf", issuer: "Salesforce", level: "Desktop Specialist" },
  ];

  const skillMatrix = [
    { cat: "Engineering", tools: ["Python (Pandas/NumPy)", "SQL (T-SQL/Postgres)", "ETL Architectures"] },
    { cat: "Intelligence", tools: ["Statistical Modeling", "Predictive Analytics", "A/B Testing Frameworks"] },
    { cat: "Visualization", tools: ["Power BI (DAX / M)", "Tableau Desktop", "Executive Reporting"] }
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* 1. ULTRA-MODERN HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 border-b border-slate-100">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-blue-600"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600">Lead Analytics Consultant</span>
            </div>
            <h1 className="text-8xl md:text-[140px] font-bold tracking-tighter leading-[0.8] text-slate-950">
              AANCHAL<span className="text-blue-600">.</span><br />
              <span className="text-slate-200">DATASYNC.</span>
            </h1>
            <p className="text-3xl md:text-5xl text-slate-400 font-extralight max-w-4xl leading-tight tracking-tight">
              I translate <span className="text-slate-950 font-normal italic">complex chaos</span> into high-integrity executive clarity.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
             <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] space-y-8 w-full max-w-sm shadow-2xl shadow-slate-100">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium leading-relaxed text-slate-500 italic">
                   "Focused on engineering data ecosystems that don't just show numbers, but reveal strategic pathways."
                </p>
                <a href="/pdf/Aanchal-Resume.pdf" target="_blank" className="flex items-center justify-center gap-3 w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all">
                  Open Dossier <Download size={14} />
                </a>
             </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-32 space-y-40">
        
        {/* 2. BENTO SUMMARY SECTION */}
        <section className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 bg-slate-950 text-white p-16 rounded-[4rem] relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <ShieldCheck className="w-12 h-12 text-blue-500" />
              <h2 className="text-5xl font-bold tracking-tighter">Strategic Impact</h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                Since <strong>2024</strong>, I've bridged the gap between technical data engineering and business strategy. My methodology is rooted in the **CRISP-DM standard**, ensuring every insight is validated, scalable, and actionable.
              </p>
              <div className="flex gap-8 pt-8">
                <div><h4 className="text-4xl font-bold italic">100%</h4><p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">Accuracy Rate</p></div>
                <div><h4 className="text-4xl font-bold italic">Verified</h4><p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">Credentials</p></div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
              <Database size={300} strokeWidth={1} />
            </div>
          </div>
          
          <div className="md:col-span-4 bg-blue-600 text-white p-12 rounded-[4rem] flex flex-col justify-between items-start">
            <Zap className="w-12 h-12" />
            <div className="space-y-4">
              <h3 className="text-3xl font-bold tracking-tighter leading-none italic">Modern <br />Workflow.</h3>
              <p className="text-sm text-blue-100 font-light">Adhering to global data governance and mining standards.</p>
            </div>
          </div>
        </section>

        {/* 3. PROFESSIONAL METHODOLOGY (CRISP-DM) */}
        <section className="space-y-16 py-10">
          <div className="text-center space-y-4">
             <h2 className="text-5xl font-bold tracking-tighter italic">Data Life-Cycle <span className="text-blue-600">Model.</span></h2>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">The Industry Standard Workflow</p>
          </div>
          
        </section>

        {/* 4. TECHNICAL INFRASTRUCTURE (The Matrix) */}
        <section className="space-y-16">
          <div className="flex justify-between items-end border-b border-slate-100 pb-10">
            <h2 className="text-4xl font-bold tracking-tighter italic uppercase leading-none">The Technical <span className="text-blue-600">Matrix.</span></h2>
            <Layers className="text-slate-200 w-10 h-10" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {skillMatrix.map((matrix, i) => (
              <div key={i} className="group space-y-10 p-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-blue-600"></span> 0{i+1} — {matrix.cat}
                </h3>
                <ul className="space-y-6">
                  {matrix.tools.map((tool, idx) => (
                    <li key={idx} className="text-2xl font-bold tracking-tighter flex items-center justify-between group-hover:translate-x-2 transition-transform cursor-default">
                      {tool} <CheckCircle2 className="w-5 h-5 text-slate-100 group-hover:text-blue-500 transition-colors" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. INTERACTIVE CERTIFICATE VAULT */}
        <section className="space-y-16">
          <div className="flex justify-between items-baseline">
            <h2 className="text-5xl font-bold tracking-tighter italic">Verified <span className="text-blue-600">Vault.</span></h2>
            <div className="flex items-center gap-2 text-slate-300 font-mono text-[10px]">
              <Search size={12}/> ENCRYPTED ARCHIVE ACCESS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl">
            {certifications.map((cert) => (
              <div 
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group relative bg-white p-14 hover:bg-slate-50 transition-all duration-500 cursor-pointer h-[420px] flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">{cert.id}</span>
                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <Maximize2 size={16} />
                    </div>
                  </div>
                  <h4 className="text-3xl font-bold leading-none tracking-tighter group-hover:text-blue-600 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{cert.issuer} Certification</p>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest pt-8 border-t border-slate-50">
                  <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px]">{cert.level}</span>
                  <span className="text-slate-300 group-hover:text-slate-900 transition-colors">Open Record</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- ELITE MODAL (PDF VIEW) --- */}
      {selectedCert && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setSelectedCert(null)}></div>
          <div className="relative w-full max-w-6xl h-[92vh] bg-white rounded-[3rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="px-10 py-8 border-b flex justify-between items-center bg-white relative z-10">
              <div>
                <h3 className="text-2xl font-bold tracking-tighter">{selectedCert.title}</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-1">Authentic Registry Record // {selectedCert.issuer}</p>
              </div>
              <div className="flex gap-4">
                <a href={selectedCert.file} download className="p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><Download size={22}/></a>
                <button onClick={() => setSelectedCert(null)} className="p-4 bg-slate-950 text-white rounded-2xl hover:bg-red-600 transition-all"><X size={22}/></button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 relative">
              <iframe src={`${selectedCert.file}#toolbar=0`} className="w-full h-full border-none shadow-inner"></iframe>
            </div>
          </div>
        </div>
      )}

      {/* 6. SIGNATURE FOOTER */}
      <footer className="py-48 text-center bg-white border-t border-slate-100 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
           <h2 className="text-[30vw] font-black tracking-tighter uppercase italic">Clarity</h2>
        </div>
        <div className="relative z-10">
          <h2 className="text-7xl md:text-[140px] font-bold tracking-tighter italic leading-none mb-12">
            Engineered <br /> <span className="text-blue-600 not-italic border-b-[24px] border-blue-50">Precision.</span>
          </h2>
          <div className="w-12 h-[1px] bg-slate-300 mx-auto my-16"></div>
          <p className="text-[10px] font-black uppercase tracking-[1.5em] text-slate-300">Aanchal Analytics Archive — 2026 Release</p>
        </div>
      </footer>
    </div>
  );
}