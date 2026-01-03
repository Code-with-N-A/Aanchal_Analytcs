import React from "react";
import Resources from "./Certifhicets";

export default function About() {
  const technicalStack = [
    { tool: "Python", usage: "Pandas, NumPy, Scikit-learn, Automation", power: "Expert", icon: <PythonIcon /> },
    { tool: "SQL", usage: "Complex Queries, Joins, Optimization", power: "Advanced", icon: <SQLIcon /> },
    { tool: "Power BI", usage: "DAX, ETL, Dashboard Design", power: "Expert", icon: <PowerBIIcon /> },
    { tool: "Excel", usage: "Advanced Formulas, Power Query, VBA", power: "Master", icon: <ExcelIcon /> },
    { tool: "Statistics", usage: "A/B Testing, Probability, Regression", power: "Advanced", icon: <StatsIcon /> },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] font-sans antialiased pb-32">

      {/* --- SECTION 1: THE IDENTITY (Aanchal Uke Focus) --- */}
      <section className="pt-24 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="text-blue-600 text-xs font-black uppercase tracking-[0.5em] mb-4">About Aanchal Uke</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">
              Solving <br /> <span className="text-gray-300 italic font-light">Data Riddles.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-light">
              I am a <span className="text-black font-semibold">Data Analyst</span> focused on transforming complex data into meaningful, actionable insights.
              Since beginning my journey in 2024, I have been dedicated to analyzing patterns and improving performance through data-driven strategies.
              My goal is to deliver accurate insights by connecting <span className="text-blue-600 font-medium">raw data</span> with <span className="text-blue-600 font-medium">long-term business value</span>.
            </p>

          </div>
          <div className="lg:col-span-5 bg-gray-50 p-8 rounded-3xl border border-gray-100 self-center">
            <div className="space-y-6">
              {[
                { label: "Role", val: "Data Insight Architect" },
                { label: "Data Volume", val: "100k+ Rows/Daily" },
                { label: "Core Focus", val: "Predictive Analytics" },
                { label: "Certification", val: "Google Data Analytics Professional" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-[10px] font-bold uppercase text-gray-400">{item.label}</span>
                  <span className="text-sm font-bold italic uppercase text-right ml-4">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE ANALYTICAL PIPELINE --- */}
      <section className="py-20 bg-gray-50 border-y border-gray-100 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-16">My Workflow Philosophy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "Collection", desc: "Sourcing high-integrity data from SQL databases and APIs.", icon: <DiscoveryIcon /> },
              { step: "Cleaning", desc: "Using Python & Excel to ensure 100% data accuracy.", icon: <WranglingIcon /> },
              { step: "Analysis", desc: "Applying statistical models to identify key performance drivers.", icon: <ModelingIcon /> },
              { step: "Visualization", desc: "Developing Power BI dashboards for real-time monitoring.", icon: <DeliveryIcon /> },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors group">
                <div className="mb-6 flex justify-start text-gray-400 group-hover:text-blue-600 transition-colors">{item.icon}</div>
                <span className="text-blue-600 font-bold text-[10px] mb-2 block uppercase tracking-widest">Process 0{i + 1}</span>
                <h4 className="font-black text-lg uppercase mb-2 tracking-tight">{item.step}</h4>
                <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-wider font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TECHNICAL ECOSYSTEM --- */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">Technical <br /> Mastery.</h2>
            <p className="text-gray-400 font-medium italic text-lg">"I don't just use tools; I master them to solve real-world problems."</p>
          </div>
          <div className="px-6 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">
            Aanchal's Tech Stack // 2024-25
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalStack.map((skill, i) => (
            <div key={i} className="p-8 border border-gray-100 rounded-3xl bg-white hover:bg-gray-50 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {skill.icon}
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[9px] font-black uppercase rounded-full tracking-tighter">
                  {skill.power}
                </span>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-1">{skill.tool}</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose">
                {skill.usage}
              </p>
            </div>
          ))}
          <div className="p-8 bg-blue-600 rounded-3xl flex flex-col justify-center text-white shadow-xl">
            <h4 className="text-xl font-bold italic mb-2 tracking-tight">Looking Ahead</h4>
            <p className="text-blue-100 text-xs font-medium leading-relaxed uppercase tracking-wide">
              Currently exploring Machine Learning algorithms and Big Data architectures to further refine my analytical capabilities.
            </p>
          </div>
        </div>
      </section>
      <Resources />

      {/* --- SECTION 4: IMPACT STATS --- */}
      <section className="py-24 px-6 md:px-10 bg-gray-900 text-white rounded-[3rem] mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">Systemic <span className="text-blue-500 italic">Impact.</span></h3>
              <p className="text-gray-400 leading-relaxed text-lg font-light mb-10">
                My approach to data analytics is rooted in precision. I focus on creating sustainable data models that provide consistent value long after the initial report.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["ETL Optimization", "Predictive Trends", "Data Warehousing", "Business Intelligence"].map((list, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-300">
                    <div className="h-1 w-4 bg-blue-600"></div>
                    {list}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Data Records Cleaned", val: "5M+" },
                { label: "Business Insights", val: "200+" },
                { label: "Process Accuracy", val: "99.9%" },
                { label: "Analytic Engine", val: "V2.1", highlight: true },
              ].map((stat, idx) => (
                <div key={idx} className={`h-40 rounded-3xl p-6 flex flex-col justify-center border ${stat.highlight ? 'bg-blue-600 border-transparent' : 'bg-white/5 border-white/10'}`}>
                  <span className="text-3xl font-black mb-1 tracking-tighter">{stat.val}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${stat.highlight ? 'text-blue-100' : 'text-gray-500'}`}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

// --- ICON COMPONENTS ---
const PythonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.12 2c-3.07 0-2.88 1.33-2.88 1.33l.03 1.38h2.9v.41H8.11s-2.9-.34-2.9 3.07c0 3.4 2.56 3.28 2.56 3.28h1.53V13.6c0 .12.01.24.03.35-.1.44-.39 1.13-.39 1.13S8.2 15.65 6.2 15.65c-2.4 0-2.86-1.5-2.86-1.5l-.01-3.32H1.28S0 11.23 0 13.91c0 2.68 1.28 3.86 1.28 3.86s1.28 1.28 3.86 1.28c2.58 0 3.86-1.28 3.86-1.28V15.3h1.3V11.2h2.95s3.1.02 3.1-3.1c0-3.13-2.61-2.85-2.61-2.85h-1.56V3.34S12.12 2 12.12 2zm-1.8 1.05a.46.46 0 1 1 0 .92.46.46 0 0 1 0-.92z" /></svg>
);
const SQLIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
);
const PowerBIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10h3v10H7zm5-5h3v15h-3zm5 8h3v7h-3z" /></svg>
);
const ExcelIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 1h-10c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V7.5L14.5 1zm2 18h-8v-2h8v2zm0-4h-8v-2h8v2zm-3-4h-5V9h5v2zm0-5V2.5L19 8h-5.5z" /></svg>
);
const StatsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
);
const DiscoveryIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const WranglingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8l-9-4-9 4v8l9 4 9-4z"></path><path d="M12 22v-10"></path><path d="M12 12l9-4"></path><path d="M12 12l-9-4"></path></svg>
);
const ModelingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const DeliveryIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
);