import React, { useState, useEffect } from "react";
import Control from "./ControlP";

export default function SubmitForm() {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState(""); // 'success' or 'error'
    const [showPopup, setShowPopup] = useState(false);
    const [progress, setProgress] = useState(100); // Progress bar from 100% to 0%
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        img: "",
        heading: "",
        discription: "",
        ctg: "",
        subctg: "",
        video: "",
        github: "",
    });

    // Predefined categories and subcategories (you can fetch from API if needed)
    const categories = ["EXCEL", "PowerBI", "SQL", "PYTHON", "TABLEAU"];
    const subCategories = {
        EXCEL: ["Sales Dashboard", "Marketing", "AI/ML", "Cybersecurity"],
        PowerBI: ["Fitness", "Nutrition", "Mental Health", "Medical"],
        SQL: ["Online Courses", "Tutorials", "Books", "Sales Dashboard"],
        PYTHON: ["Movies", "Music", "Games", "Sports"],
        TABLEAU: ["Sales Dashboard"],
    };

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxJ7JnIknYmRscbPuX8wNVGoClHAB7iJT049Z_m8HLke3Ppv_efEEIoQw43N2Ftb0LLYA/exec"; // proxy -> Apps Script URL

    // Validation function
    const validate = () => {
        const newErrors = {};
        if (!formData.img.trim()) newErrors.img = "Image URL is required.";
        else if (!/^https?:\/\/.+/.test(formData.img)) newErrors.img = "Enter a valid URL.";
        if (!formData.heading.trim()) newErrors.heading = "Heading is required.";
        if (!formData.discription.trim()) newErrors.discription = "Description is required.";
        if (!formData.ctg.trim()) newErrors.ctg = "Category is required.";
        if (!formData.subctg.trim()) newErrors.subctg = "Sub Category is required."; // Required
        if (formData.video && !/^https?:\/\/.+/.test(formData.video)) newErrors.video = "Enter a valid URL.";
        if (formData.github && !/^https?:\/\/github\.com\/.+/.test(formData.github)) newErrors.github = "Enter a valid GitHub URL.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error on change
        if (errors[name]) setErrors({ ...errors, [name]: "" });
        // Reset subctg if ctg changes
        if (name === "ctg") {
            setFormData({ ...formData, ctg: value, subctg: "" });
        }
    };

    // Effect to handle progress bar countdown
    useEffect(() => {
        if (showPopup) {
            setProgress(100);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        setShowPopup(false);
                        setMsg("");
                        return 0;
                    }
                    return prev - (100 / 30); // Decrease by 100/30 every 100ms for 3 seconds
                });
            }, 100);
            return () => clearInterval(interval);
        }
    }, [showPopup]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setMsg("");
        setShowPopup(false);

        // ✅ IMPORTANT: URLSearchParams (not JSON)
        const formDataParams = new URLSearchParams({
            img: formData.img,
            heading: formData.heading,
            discription: formData.discription,
            ctg: formData.ctg,
            subctg: formData.subctg,
            video: formData.video,
            github: formData.github,
        });

        try {
            const res = await fetch(WEB_APP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formDataParams,
            });

            const json = await res.json();

            if (json.status === "success") {
                setMsg(`✔ Data Saved! ID: ${json.id}`);
                setMsgType("success");
                setFormData({
                    img: "",
                    heading: "",
                    discription: "",
                    ctg: "",
                    subctg: "",
                    video: "",
                    github: "",
                });
            } else {
                setMsg("❌ Error: " + json.message);
                setMsgType("error");
            }
        } catch (err) {
            console.error(err);
            setMsg("❌ Something went wrong!");
            setMsgType("error");
        }

        setLoading(false);
        setShowPopup(true);
        // Auto-hide handled by progress bar
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-10 pt-15">
                <div className="max-w-2xl w-full bg-white shadow-2xl  border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 p-6 text-white">
                        <h1 className="text-3xl font-extrabold text-white text-center tracking-tight">
                            Professional Submit Form
                        </h1>
                        <p className="text-blue-100 text-center mt-2">Submit your data to Google Sheets</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-5 space-y-5">

                        {/* Image + Heading */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                        Image URL *
                                    </span>
                                </label>
                                <input
                                    name="img"
                                    value={formData.img}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image"
                                    disabled={loading}
                                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${errors.img ? "border-red-500" : "border-gray-300"
                                        } ${loading ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
                                />
                                {errors.img && <p className="text-red-500 text-sm mt-1">{errors.img}</p>}
                            </div>

                            {/* Heading */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                        </svg>
                                        Heading *
                                    </span>
                                </label>
                                <input
                                    name="heading"
                                    value={formData.heading}
                                    onChange={handleChange}
                                    placeholder="Enter heading"
                                    disabled={loading}
                                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${errors.heading ? "border-red-500" : "border-gray-300"
                                        } ${loading ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
                                />
                                {errors.heading && <p className="text-red-500 text-sm mt-1">{errors.heading}</p>}
                            </div>
                        </div>

                        {/* Category and Sub Category in one row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                        Category *
                                    </span>
                                </label>
                                <select
                                    name="ctg"
                                    value={formData.ctg}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${errors.ctg ? "border-red-500" : "border-gray-300"
                                        } ${loading ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.ctg && <p className="text-red-500 text-sm mt-1">{errors.ctg}</p>}
                            </div>

                            {/* Sub Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                        Sub Category *
                                    </span>
                                </label>
                                <select
                                    name="subctg"
                                    value={formData.subctg}
                                    onChange={handleChange}
                                    disabled={loading || !formData.ctg}
                                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${errors.subctg ? "border-red-500" : "border-gray-300"
                                        } ${loading || !formData.ctg ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
                                >
                                    <option value="">Select Sub Category</option>
                                    {formData.ctg && subCategories[formData.ctg]?.map((sub, idx) => (
                                        <option key={idx} value={sub}>{sub}</option>
                                    ))}
                                </select>
                                {errors.subctg && <p className="text-red-500 text-sm mt-1">{errors.subctg}</p>}
                            </div>
                        </div>

                        {/* Video + GitHub */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Video Link */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                        </svg>
                                        Video Link
                                    </span>
                                </label>
                                <input
                                    name="video"
                                    value={formData.video}
                                    onChange={handleChange}
                                    placeholder="https://example.com/video"
                                    disabled={loading}
                                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${errors.video ? "border-red-500" : "border-gray-300"
                                        } ${loading ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
                                />
                                {errors.video && <p className="text-red-500 text-sm mt-1">{errors.video}</p>}
                            </div>

                            {/* GitHub Link */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                        </svg>
                                        GitHub Link
                                    </span>
                                </label>
                                <input
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    placeholder="https://github.com/username/repo"
                                    disabled={loading}
                                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${errors.github ? "border-red-500" : "border-gray-300"
                                        } ${loading ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
                                />
                                {errors.github && <p className="text-red-500 text-sm mt-1">{errors.github}</p>}
                            </div>
                        </div>

                        {/* Description (LAST & ALONE) */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Description *
                                </span>
                            </label>
                            <textarea
                                name="discription"
                                value={formData.discription}
                                onChange={handleChange}
                                placeholder="Enter description"
                                rows="4"
                                disabled={loading}
                                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${errors.discription ? "border-red-500" : "border-gray-300"
                                    } ${loading ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
                            />
                            {errors.discription && <p className="text-red-500 text-sm mt-1">{errors.discription}</p>}
                        </div>

                        {/* Submit Button */}
                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center gap-2 px-6 py-4 font-semibold text-white transition-all cursor-pointer ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-slate-700 hover:bg-slate-900"}`}
                            >
                                {loading && (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                )}
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>

                    </form>
                </div>

                {/* Popup Notification */}
                {showPopup && (
                    <div className="fixed top-5 right-5 bg-white border-l-4 p-4 shadow-lg border-blue-600 w-80 rounded-lg z-50">
                        <div className="flex justify-between items-center">
                            <p className={`text-sm font-semibold ${msgType === "success" ? "text-green-700" : "text-red-700"}`}>
                                {msg}
                            </p>
                            <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-700 font-bold">
                                ×
                            </button>
                        </div>
                        <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
                            <div
                                className={`h-1 rounded-full ${msgType === "success" ? "bg-green-500" : "bg-red-500"}`}
                                style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
            <hr />
            <Control />
        </>
    );

}
