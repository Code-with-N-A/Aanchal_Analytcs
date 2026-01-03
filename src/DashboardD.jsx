import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaProjectDiagram, FaTags, FaList, FaSearch, FaFilter, FaDownload, FaSyncAlt } from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_URL = "https://script.google.com/macros/s/AKfycbxJ7JnIknYmRscbPuX8wNVGoClHAB7iJT049Z_m8HLke3Ppv_efEEIoQw43N2Ftb0LLYA/exec";

  // Function to fetch data (with sessionStorage logic)
  const fetchData = (forceRefresh = false) => {
    setLoading(true);
    
    const cachedData = sessionStorage.getItem("dashboardData");

    // Agar data session mein hai aur force refresh nahi hai, to session se uthao
    if (cachedData && !forceRefresh) {
      setData(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    // Naya data fetch karo
    axios
      .get(API_URL)
      .then((res) => {
        setData(res.data);
        sessionStorage.setItem("dashboardData", JSON.stringify(res.data)); // Store in session
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Initial load
  }, []);

  // Professional Loader Component
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="relative flex items-center justify-center">
          <div className="absolute animate-ping h-16 w-16 rounded-full bg-blue-400 opacity-75"></div>
          <div className="relative rounded-full h-12 w-12 bg-blue-600 shadow-xl"></div>
        </div>
        <p className="mt-6 text-gray-600 font-semibold animate-pulse uppercase tracking-widest text-sm">
          Fetching Live Data...
        </p>
      </div>
    );
  }

  // LOGIC CALCULATIONS
  const totalProjects = data.length;
  const categoryCount = {};
  data.forEach((item) => {
    const cat = item.ctg || "Unknown";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  const pieData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  const subCategoryCount = {};
  data.forEach((item) => {
    const sub = item.subctg || "Unknown";
    subCategoryCount[sub] = (subCategoryCount[sub] || 0) + 1;
  });

  const sortedSubCategories = Object.keys(subCategoryCount)
    .map((key) => ({ subcategory: key, projects: subCategoryCount[key] }))
    .sort((a, b) => b.projects - a.projects);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE", "#FF6384", "#82CA9D", "#FFC658", "#FF7C7C", "#8DD1E1"];

  const reportData = data.map((item, index) => ({
    id: index + 1,
    Timestamp: item.Timestamp || "N/A",
    heading: item.heading || "N/A",
    category: item.ctg || "Unknown",
    subcategory: item.subctg || "Unknown",
  }));

  const filteredData = reportData.filter((item) => {
    const matchesSearch = item.heading.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "" || item.category === filterCategory;
    const matchesSubcategory = filterSubcategory === "" || item.subcategory === filterSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const uniqueCategories = [...new Set(reportData.map((item) => item.category))];
  const uniqueSubcategories = [...new Set(reportData.map((item) => item.subcategory))];
  const topSubcategories = sortedSubCategories.slice(0, 5);

  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Timestamp", "Project Name", "Category", "Subcategory"],
      ...filteredData.map((item) => [item.id, item.Timestamp, item.heading, item.category, item.subcategory]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartWidth = Math.max(600, sortedSubCategories.length * 50);

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Refresh Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Dashboard <span className="text-blue-600">Analytics</span>
          </h1>
          <button 
            onClick={() => fetchData(true)} 
            className="flex items-center gap-2 bg-white text-gray-700 px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition active:scale-95 border border-gray-200 group font-semibold"
          >
            <FaSyncAlt className={`group-hover:rotate-180 transition-transform duration-500 text-blue-500`} />
            Refresh Data
          </button>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition border-b-4 border-blue-500 group">
            <div className="p-4 bg-blue-50 rounded-full mb-3 group-hover:scale-110 transition">
              <FaProjectDiagram className="text-blue-500 text-2xl" />
            </div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Projects</h2>
            <p className="text-4xl font-black text-gray-800 mt-2">{totalProjects}</p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition border-b-4 border-green-500 group">
            <div className="p-4 bg-green-50 rounded-full mb-3 group-hover:scale-110 transition">
              <FaTags className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Categories</h2>
            <p className="text-4xl font-black text-gray-800 mt-2">{Object.keys(categoryCount).length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition border-b-4 border-purple-500 group">
            <div className="p-4 bg-purple-50 rounded-full mb-3 group-hover:scale-110 transition">
              <FaList className="text-purple-500 text-2xl" />
            </div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Subcategories</h2>
            <p className="text-4xl font-black text-gray-800 mt-2">{Object.keys(subCategoryCount).length}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-xl rounded-3xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-500 rounded-full"></div> Projects by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-xl rounded-3xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-purple-500 rounded-full"></div> Subcategory Breakdown
            </h2>
            <div className="overflow-x-auto scrollbar-hide">
              <ResponsiveContainer width={chartWidth} height={300}>
                <BarChart data={sortedSubCategories}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="subcategory" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '10px' }} />
                  <Bar dataKey="projects" radius={[10, 10, 0, 0]}>
                    {sortedSubCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Report Section */}
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Project Master Report</h2>
            <button
              onClick={exportToCSV}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95 flex items-center gap-2 font-semibold"
            >
              <FaDownload /> Export CSV
            </button>
          </div>

          <div className="p-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search project name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition border-none"
                />
              </div>
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none border-none"
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={filterSubcategory}
                  onChange={(e) => setFilterSubcategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none border-none"
                >
                  <option value="">All Subcategories</option>
                  {uniqueSubcategories.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Timestamp</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Project Name</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Subcategory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition">
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">#{item.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.Timestamp}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">{item.heading}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full uppercase">
                          {item.subcategory}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8 px-2">
              <p className="text-sm text-gray-500 font-medium">
                Showing <span className="text-gray-900 font-bold">{paginatedData.length}</span> of {filteredData.length} entries
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 disabled:opacity-30 transition"
                >
                  Prev
                </button>
                <div className="flex items-center px-4 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-100">
                  {currentPage}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 disabled:opacity-30 transition"
                >
                  Next
                </button>
              </div>
            </div>
            
            {filteredData.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-300 text-6xl mb-4 italic font-black">!</div>
                <p className="text-gray-400 font-semibold">No results found for your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}