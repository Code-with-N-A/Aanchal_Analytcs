  import TextareaAutosize from "react-textarea-autosize";
  import React, { useState } from "react";
  import { motion } from "framer-motion";
  import {
    FiUser,
    FiMail,
    FiZap,
    FiSend,
    FiCheckCircle,
    FiAlertTriangle,
    FiLoader,
  } from "react-icons/fi";

  function ProjectIdeaForm() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      idea: "",
    });

    const [status, setStatus] = useState("");
    const [color, setColor] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { name, email, idea } = formData;

      // Validation
      if (!name || !email || !idea) {
        setStatus("Please fill all fields.");
        setColor("red");
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setStatus("Please enter a valid email address.");
        setColor("red");
        return;
      }

      setLoading(true);
      setStatus("Processing...");
      setColor("blue");

      const payload = {
        Name: name,
        Email: email,
        Idea: idea,
        _subject: "New Project Idea Submission",
        _template: "table",
      };

      try {
        const res = await fetch(
          "https://formsubmit.co/ajax/aanchaluke77@gmail.com",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) throw new Error("Failed to send");

        setStatus("Idea sent successfully! I’ll get back to you soon.");
        setColor("green");
        setFormData({ name: "", email: "", idea: "" });

        setTimeout(() => setStatus(""), 4000);
      } catch (err) {
        setStatus("Failed to send idea. Please try again.");
        setColor("red");
        setTimeout(() => setStatus(""), 4000);
      } finally {
        setLoading(false);
      }
    };

    return (
      <section className="flex justify-center items-center bg-#FFF from-slate-50 to-gray-100 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-2xl shadow-2xl p-8 border border-gray-200/50"
        >
          <div className="text-center mb-6 bg-blue-50 p-4 rounded-lg">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold text-black mb-2"
            >
              Share Your Project Idea
            </motion.h2>
            <p className="text-gray-600 text-center text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Got a groundbreaking idea or want to collaborate? Let's turn it into reality together with cutting-edge analytics.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="flex items-center text-gray-800 font-semibold mb-2 text-base">
                <FiUser className="mr-2 text-slate-600" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 focus:border-slate-500 focus:ring-4 focus:ring-slate-100 rounded-lg px-4 py-3 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label className="flex items-center text-gray-800 font-semibold mb-2 text-base">
                <FiMail className="mr-2 text-slate-600" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 focus:border-slate-500 focus:ring-4 focus:ring-slate-100 rounded-lg px-4 py-3 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </motion.div>

            {/* Idea */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label className="flex items-center text-gray-800 font-semibold mb-2 text-base">
                <FiZap className="mr-2 text-slate-600" /> Project Idea
              </label>
              <TextareaAutosize
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                placeholder="Describe your idea in detail, including goals, challenges, and expected outcomes..."
                minRows={4}
                maxRows={8}
                className="w-full border border-gray-300 focus:border-slate-500 focus:ring-4 focus:ring-slate-100 rounded-lg px-4 py-3 outline-none transition-all duration-300 resize-none shadow-sm hover:shadow-md"
              />
            </motion.div>

            {/* Status */}
            {status && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p
                  className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full shadow-md ${
                    color === "green"
                      ? "bg-green-100 text-green-800"
                      : color === "red"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {color === "green" && <FiCheckCircle className="mr-2" />}
                  {color === "red" && <FiAlertTriangle className="mr-2" />}
                  {color === "blue" && <FiLoader className="mr-2 animate-spin" />}
                  {status}
                </p>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" /> Sending...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" /> Submit Idea
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </section>
    );
  }

  export default ProjectIdeaForm;
  