import React, { useState, useEffect } from "react";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzphF9PnedjLOOan_6Ig-gMpG1YrLEe5o16sgwjoXcAz-XzUEn_NjytHgBRlsKNa3gKYA/exec";

// Company Info
const COMPANY_NAME = "AmuleStack";
const OWNER_NAME = "Nitesh Amule";
const COMPANY_EMAIL = "amulestack93@gmail.com";
const COMPANY_PHONE = "9303546247";
const COMPANY_ADDRESS = "MP Bhopal, Ashoka Garden";
const COMPANY_WEBSITE = "https://amulestack.vercel.app/";
const COMPANY_LOGO = "https://amulestack.vercel.app/logo.png"; // Update with your logo URL

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailedUsers, setEmailedUsers] = useState([]);

  const formatName = (name) =>
    name
      ? name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  const getMailtoLink = (userEmail, userName) => {
    const subject = encodeURIComponent(`Welcome to ${COMPANY_NAME}!`);
    const body = encodeURIComponent(
      `Hi ${formatName(userName)},\n\n` +
        `Welcome to ${COMPANY_NAME}! My name is ${OWNER_NAME}, the owner of ${COMPANY_NAME}.\n\n` +
        `Explore our website: ${COMPANY_WEBSITE}\n\n` +
        `Company Details:\nEmail: ${COMPANY_EMAIL}\nPhone: ${COMPANY_PHONE}\nAddress: ${COMPANY_ADDRESS}\n\n` +
        `Looking forward to collaborating with you!\n\n` +
        `Best Regards,\n${OWNER_NAME}\n${COMPANY_NAME}`
    );

    if (!emailedUsers.includes(userEmail)) {
      setEmailedUsers((prev) => [...prev, userEmail]);
    }
    return `mailto:${userEmail}?subject=${subject}&body=${body}`;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(WEB_APP_URL);
      const json = await res.json();
      setData(
        json.map((item) => ({
          ...item,
          status: (item.status || "disabled").toLowerCase(),
        }))
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const url = `${WEB_APP_URL}?action=update&id=${id}&status=${newStatus}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      } else {
        console.error("Update failed:", json.message);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = `${WEB_APP_URL}?action=delete&id=${id}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setData((prev) => prev.filter((item) => item.id !== id));
        setEmailedUsers((prev) =>
          prev.filter((email) => email !== data.find((d) => d.id === id)?.email)
        );
      } else {
        console.error("Delete failed:", json.message);
      }
    } catch (err) {
      console.error("Error deleting row:", err);
    }
  };

  const enabledData = data.filter((item) => item.status === "enabled");
  const disabledData = data.filter((item) => item.status === "disabled");

  const emailedData = data.filter((item) => emailedUsers.includes(item.email));
  const notEmailedData = data.filter((item) => !emailedUsers.includes(item.email));

  const renderTable = (rows) => (
    <div className="overflow-x-auto scrollbar-hide rounded shadow-lg border border-gray-200">
      <table className="min-w-full text-sm md:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Message</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-all">
              <td className="border p-2 font-medium text-gray-800">
                {formatName(item.name)}
              </td>
              <td className="border p-2 text-blue-600 underline text-xs md:text-sm">
                <a
                  href={getMailtoLink(item.email, item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.email}
                </a>
              </td>
              <td className="border p-2 text-gray-700 break-words max-w-xs md:max-w-md">
                {item.message}
              </td>
              <td className="border p-2">
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(item.id, e.target.value)
                  }
                  className={`border p-1 rounded font-semibold w-full ${
                    item.status === "enabled"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-4">
        Dashboard
      </h1>

      {loading && <p className="text-center text-gray-500">Loading data...</p>}

      {!loading && data.length === 0 && (
        <p className="text-center text-gray-500 font-medium">
          No records available
        </p>
      )}

      {!loading && notEmailedData.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-700">
            Users to Welcome
          </h2>
          {renderTable(notEmailedData)}
        </section>
      )}

      {!loading && emailedData.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-purple-700">
            Users Already Contacted
          </h2>
          {renderTable(emailedData)}
        </section>
      )}

      {!loading && enabledData.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-green-700">
            Enabled / Active
          </h2>
          {renderTable(enabledData)}
        </section>
      )}

      {!loading && disabledData.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-red-700">
            Disabled / Inactive
          </h2>
          {renderTable(disabledData)}
        </section>
      )}
    </div>
  );
}
