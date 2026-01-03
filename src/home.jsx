import React from "react";
import { useNavigate } from "react-router-dom";
import FAQ from "./FAQ";

export default function Home() {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/Project");
    setTimeout(() => {
      document.getElementById("Project")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };
  const SeeHowItWorks = () => {
    navigate("/SeeHowItWorks");
    setTimeout(() => {
      document.getElementById("SeeHowItWorks")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };

  return (
    <div className="text-gray-800 overflow-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div className="order-2 lg:order-1">
            <span className="inline-block mb-4 px-4 py-1 text-sm tracking-widest rounded-full bg-white/10 text-indigo-200">
              DATA • ANALYTICS • STRATEGY
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
              Turning Data Into
              <span className="block text-yellow-400">Business Growth</span>
            </h1>

            <p className="mt-6 text-lg text-indigo-100 max-w-xl">
              Aanchal Analytics helps businesses unlock the true value of their
              data through intelligent dashboards, insights, and analytics
              solutions.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <button
                onClick={goToContact}
                className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition shadow-lg"
              >
                Get Started
              </button>

              <button
              onClick={SeeHowItWorks}
               className="border border-white/60 px-8 py-3 rounded-xl hover:bg-white hover:text-indigo-900 transition">
                See How It Works
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              alt="Analytics Dashboard"
              className="w-full rounded-3xl shadow-2xl object-cover"
            />
          </div>

        </div>
      </section>

      {/* ================= TRUST STATS ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["150+", "Projects Delivered"],
              ["90+", "Active Clients"],
              ["6000+", "Reports Generated"],
              ["99.8%", "Accuracy Rate"],
            ].map(([value, label], i) => (
              <div
                key={i}
                className="text-center rounded-2xl p-8 border bg-white hover:shadow-xl transition"
              >
                <h3 className="text-4xl font-bold text-indigo-700">{value}</h3>
                <p className="mt-2 text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-center">
            Our Core Services
          </h2>

          <p className="text-center text-gray-500 max-w-2xl mx-auto mt-4 mb-16">
            Powerful analytics services designed to help you grow faster, smarter,
            and more confidently.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              "Business Intelligence",
              "Advanced Data Visualization",
              "Predictive Analytics",
              "Market & Trend Research",
              "Performance Monitoring",
              "Custom Analytics Dashboards",
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white border rounded-3xl p-8 hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                  {item}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  High-quality, scalable analytics solutions tailored for
                  enterprise and growing businesses.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why Businesses Choose Us
            </h2>

            <p className="text-gray-500 mb-10 max-w-xl">
              We don’t just provide reports — we deliver insights that influence
              real business decisions.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li>✔ Clean, executive-grade dashboards</li>
              <li>✔ Real-time & reliable insights</li>
              <li>✔ Secure & scalable architecture</li>
              <li>✔ Industry-focused analytics models</li>
              <li>✔ Long-term analytics partnership</li>
            </ul>

            <button
              onClick={goToContact}
              className="mt-12 bg-indigo-700 text-white px-8 py-3 rounded-xl hover:bg-indigo-800 transition shadow-lg"
            >
              Schedule a Consultation
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
            alt="Analytics Team"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-white">
        <FAQ />
      </section>
    </div>
  );
}
