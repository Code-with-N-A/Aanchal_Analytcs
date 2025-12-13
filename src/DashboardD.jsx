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
import { FaProjectDiagram, FaTags, FaList, FaSearch, FaFilter, FaDownload } from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_URL = "/api";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        Loading Dashboard...
      </div>
    );

  // Total Projects
  const totalProjects = data.length;

  // Category Count
  const categoryCount = {};
  data.forEach((item) => {
    const cat = item.ctg || "Unknown";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  const pieData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  // Subcategory Count
  const subCategoryCount = {};
  data.forEach((item) => {
    const sub = item.subctg || "Unknown";
    subCategoryCount[sub] = (subCategoryCount[sub] || 0) + 1;
  });

  // Sort subcategories descending for gradient coloring
  const sortedSubCategories = Object.keys(subCategoryCount)
    .map((key) => ({ subcategory: key, projects: subCategoryCount[key] }))
    .sort((a, b) => b.projects - a.projects);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE", "#FF6384", "#82CA9D", "#FFC658", "#FF7C7C", "#8DD1E1"];

  // Report Data - Fixed to use 'heading' for project name and 'timestamp' correctly
  const reportData = data.map((item, index) => ({
    id: index + 1,
    Timestamp: item.Timestamp || "N/A",
    heading: item.heading || "N/A", // Changed from 'name' to 'heading'
    category: item.ctg || "Unknown",
    subcategory: item.subctg || "Unknown",
  }));

  // Filtered and searched data - Updated to search by 'heading'
  const filteredData = reportData.filter((item) => {
    const matchesSearch = item.heading.toLowerCase().includes(searchTerm.toLowerCase()); // Changed from 'name' to 'heading'
    const matchesCategory = filterCategory === "" || item.category === filterCategory;
    const matchesSubcategory = filterSubcategory === "" || item.subcategory === filterSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Unique categories and subcategories for filters
  const uniqueCategories = [...new Set(reportData.map((item) => item.category))];
  const uniqueSubcategories = [...new Set(reportData.map((item) => item.subcategory))];

  // Top 5 subcategories
  const topSubcategories = sortedSubCategories.slice(0, 5);

  // Export to CSV - Updated to include 'heading'
  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Timestamp", "Project Name", "Category", "Subcategory"],
      ...filteredData.map((item) => [item.id, item.timestamp, item.heading, item.category, item.subcategory]), // Changed 'name' to 'heading'
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

  // Calculate chart width for scrollbar if many subcategories
  const chartWidth = Math.max(600, sortedSubCategories.length * 50); // Minimum 600px, add 50px per subcategory

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen mt-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
      Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition transform hover:-translate-y-2 border-l-4 border-blue-500">
          <FaProjectDiagram className="text-blue-500 text-3xl mb-2" />
          <h2 className="text-lg font-medium text-gray-500">Total Projects</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mt-2">{totalProjects}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition transform hover:-translate-y-2 border-l-4 border-green-500">
          <FaTags className="text-green-500 text-3xl mb-2" />
          <h2 className="text-lg font-medium text-gray-500">Total Categories</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-green-600 mt-2">{Object.keys(categoryCount).length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition transform hover:-translate-y-2 border-l-4 border-purple-500">
          <FaList className="text-purple-500 text-3xl mb-2" />
          <h2 className="text-lg font-medium text-gray-500">Total Subcategories</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-purple-600 mt-2">{Object.keys(subCategoryCount).length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category PieChart */}
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Projects by Category</h2>
          <ResponsiveContainer width="100%" height={300} md:height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={window.innerWidth < 768 ? 80 : 120}
                label={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} projects`, name]} />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: window.innerWidth < 768 ? '12px' : '14px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subcategory BarChart with Scrollbar */}
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Projects by Subcategory</h2>
          <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <ResponsiveContainer width={chartWidth} height={300} md:height={350}>
              <BarChart data={sortedSubCategories} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subcategory" tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} angle={window.innerWidth < 768 ? -45 : 0} textAnchor={window.innerWidth < 768 ? 'end' : 'middle'} />
                <YAxis tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="projects"
                  barSize={window.innerWidth < 768 ? 20 : 40}
                  isAnimationActive={true}
                >
                  {sortedSubCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Enhanced Report Section */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 md:mb-0">Detailed Project Report</h2>
          <button
            onClick={exportToCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <FaDownload className="mr-2" /> Export CSV
          </button>
        </div>

        {/* Report Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-600">Filtered Projects</h3>
            <p className="text-2xl font-bold text-blue-600">{filteredData.length}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-600">Unique Categories</h3>
            <p className="text-2xl font-bold text-green-600">{uniqueCategories.length}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-600">Unique Subcategories</h3>
            <p className="text-2xl font-bold text-purple-600">{uniqueSubcategories.length}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6">
          <div className="flex items-center bg-gray-100 p-2 rounded-lg flex-1 md:flex-none">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Project Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1"
            />
          </div>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              value={filterSubcategory}
              onChange={(e) => setFilterSubcategory(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="">All Subcategories</option>
              {uniqueSubcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Chart in Report */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Top 5 Subcategories</h3>
          <ResponsiveContainer width="100%" height={200} md:height={250}>
            <BarChart data={topSubcategories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subcategory" tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} angle={window.innerWidth < 768 ? -45 : 0} textAnchor={window.innerWidth < 768 ? 'end' : 'middle'} />
              <YAxis tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
              <Tooltip />
              <Bar dataKey="projects" isAnimationActive={true}>
                {topSubcategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Professional Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-300">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-300">Timestamp</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-300">Project Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-300">Subcategory</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.Timestamp}</td> {/* Fixed to lowercase 'timestamp' */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.heading}</td> {/* Fixed to 'heading' */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.subcategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg hover:bg-gray-400 disabled:opacity-50 transition"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg hover:bg-gray-400 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>

        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No data matches your filters.</p>
        )}
      </div>
    </div>
  );
}
