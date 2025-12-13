import React from "react";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMapPin,
  FiCalendar,
  FiAward,
  FiCode,
  FiBriefcase,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProjectIdeaForm from "./ProjctContect";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-gray-900 bg-[#FFF]">

      {/* HERO SECTION */}
      <section className="relative w-full h-[260px] md:h-[320px] flex items-center justify-center">
        <img
          src="https://media.istockphoto.com/id/1954841243/photo/data-analysis-chart-graph-3d-statistics-background.jpg?s=612x612&w=0&k=20&c=ND1TwnxWkA-BBxZoetqEP19opzWTRTt6GcGNtZ8ImKg="
          alt="Data Analytics Cover"
          onClick={() =>
            window.open(
              "https://cdn.dribbble.com/userupload/43530739/file/original-e027c13f342b9a627cf4b87943da48dd.png?resize=400x0",
              "_blank"
            )
          }
          className="absolute w-full h-full object-cover cursor-pointer opacity-100"
        />

        {/* Soft Teal-Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black-100/50 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-gray-900 z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow">
            About <span className="text-blue-700">Aanchal Alytcs</span>
          </h1>
          <p className="text-lg opacity-90">
            Transforming data into insights for smarter business decisions
          </p>
        </motion.div>
      </section>

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto rounded-3xl shadow-xl bg-white/70 backdrop-blur-md border border-white/40 overflow-hidden mt-[-5rem]"
      >
        <div className="relative">
          <img
            src={`${import.meta.env.BASE_URL}img/What is Data Analysis.jpg`}
            alt="Analytics Team Cover"
            onClick={() =>
              window.open(
                `${import.meta.env.BASE_URL}img/What is Data Analysis.jpg`,
                "_blank"
              )
            }
            className="w-full h-48 object-cover cursor-pointer opacity-95"
          />

          <img
            src={`${import.meta.env.BASE_URL}img/Aanchl lingdin.jpg`}
            alt="Aanchal Alytcs Logo"
            onClick={() =>
              window.open(`${import.meta.env.BASE_URL}img/Aanchl lingdin.jpg`, "_blank")
            }
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg absolute left-10 bottom-[-3.5rem] cursor-pointer"
          />
        </div>

        <div className="pt-16 pb-10 px-8">
          <h2 className="text-3xl font-bold text-gray-900">Aanchal Alytcs</h2>

          <p className="text-gray-700 mt-1 flex items-center gap-2">
            <FiBriefcase className="text-blue-700" /> Data Analytics & Business Intelligence Experts
          </p>

          <p className="text-gray-700 flex items-center gap-2 mt-1">
            <FiMapPin className="text-blue-700" /> India
          </p>

          <p className="mt-4 text-gray-800 leading-relaxed text-sm md:text-base max-w-3xl">
            Welcome to <strong>Aanchal Alytcs</strong>, your trusted partner in data analytics. We specialize in turning complex data into actionable insights using cutting-edge tools like{" "}
            <span className="text-blue-700 font-semibold">
              Python, R, SQL, Tableau, and Power BI
            </span>
            . Our mission is to empower businesses with data-driven strategies for sustainable growth.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-5">
            <button
              onClick={() =>
                window.open("https://github.com/codekraft74?tab=following", "_blank")
              }
              className="text-blue-700 hover:text-blue-900 transition"
            >
              <FiGithub size={24} />
            </button>

            <button
              onClick={() =>
                window.open("https://www.linkedin.com/in/aanchal-uke-b4892837b/", "_blank")
              }
              className="text-blue-700 hover:text-blue-900 transition"
            >
              <FiLinkedin size={24} />
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 mt-7">
            <button
              onClick={() =>
                window.open(
                  `${import.meta.env.BASE_URL}img/MIS RESUME.pdf`,
                  "_blank"
                )
              }
              className="cursor-pointer bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center gap-2 shadow"
            >
              <FiExternalLink /> Our Portfolio
            </button>

            <button
              onClick={() =>
                window.open(
                  `${import.meta.env.BASE_URL}public/img/tata_da_certificate.pdf`,
                  "_blank"
                )
              }
              className="cursor-pointer bg-blue-100 text-blue-900 px-4 py-2 rounded-md hover:bg-blue-200 transition flex items-center gap-2 shadow"
            >
              <FiExternalLink /> TATA
            </button>

            <button
              onClick={() =>
                window.open(`${import.meta.env.BASE_URL}public/img/POWER BI CER.pdf`, "_blank")
              }
              className="cursor-pointer bg-blue-100 text-blue-900 px-4 py-2 rounded-md hover:bg-blue-200 transition flex items-center gap-2 shadow"
            >
              <FiExternalLink /> POWER BI
            </button>
          </div>

          {/* STATS */}
          <div className="flex justify-between mt-10 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-700">10+</p>
              <p className="text-gray-700 text-sm">Projects Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">2+</p>
              <p className="text-gray-700 text-sm">Certifications</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">2+</p>
              <p className="text-gray-700 text-sm">Years Experience</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SKILLS SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10 text-blue-800"
        >
          <FiCode className="inline mr-2 text-blue-700" /> Our Expertise & Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Data Analysis", desc: "Python, R, SQL, Excel", level: "Advanced" },
            { name: "Business Intelligence", desc: "Tableau, Power BI, Dashboards", level: "Expert" },
            { name: "Machine Learning", desc: "Predictive Modeling, Algorithms", level: "Intermediate" },
            { name: "Data Visualization", desc: "Interactive Charts, Reports", level: "Advanced" },
            { name: "Statistical Analysis", desc: "Hypothesis Testing, Regression", level: "Proficient" },
            { name: "Cloud Analytics", desc: "AWS, Google Cloud, Azure", level: "Basic" },
          ].map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border border-white/40 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-gray-900">{skill.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{skill.desc}</p>
              <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-900 text-xs rounded-full">
                {skill.level}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="bg-white/70 backdrop-blur-md py-16 px-6 border-t border-white/50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-10 text-blue-800"
          >
            <FiBriefcase className="inline mr-2 text-blue-700" /> Our Experience & Achievements
          </motion.h2>

          <div className="space-y-9">
            <div className="flex items-start gap-4">
              <FiCalendar className="text-blue-700 mt-1" size={22} />
              <div>
                <h3 className="font-semibold text-gray-900">Established Analytics Firm</h3>
                <p className="text-gray-600 text-sm">2019 - Present</p>
                <p className="text-gray-700 mt-2">
                  Delivering end-to-end data analytics solutions to clients across industries.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiAward className="text-blue-700 mt-1" size={22} />
              <div>
                <h3 className="font-semibold text-gray-900">Certified Data Analysts</h3>
                <p className="text-gray-600 text-sm">2020 - Present</p>
                <p className="text-gray-700 mt-2">
                  Team certified in advanced data analytics and machine learning techniques.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiAward className="text-blue-700 mt-1" size={22} />
              <div>
                <h3 className="font-semibold text-gray-900">Industry Recognition</h3>
                <p className="text-gray-600 text-sm">2022</p>
                <p className="text-gray-700 mt-2">
                  Awarded for innovative BI solutions in e-commerce and finance sectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-5 text-blue-800">
          Our Data Analytics Journey
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg mb-4">
          Founded in <strong>2019</strong>, <strong>Aanchal Alytcs</strong> began with a vision to harness the power of data for informed decision-making.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg mb-4">
          Over the years, we've mastered data extraction, cleansing, modeling, visualization, and predictive analytics, serving diverse sectors like retail, healthcare, and finance.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg">
          Today, we deliver <strong>accurate</strong>, <strong>scalable</strong>, and <strong>impactful</strong> analytics solutions that drive business success.
        </p>
      </section>

      {/* TOOLS SECTION */}
      <section className="bg-white/70 backdrop-blur-md py-14 px-6 text-center border-t border-white/50">
        <h2 className="text-3xl font-bold mb-10 text-blue-800">
          Tools & Technologies We Use
        </h2>

        <div className="flex flex-wrap justify-center gap-6 text-blue-900">
          {[
            "Python",
            "R",
            "SQL",
            "Tableau",
            "Power BI",
            "Excel",
            "Jupyter",
            "AWS",
            "Google Analytics",
          ].map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 bg-blue-100 rounded-xl shadow-sm font-medium hover:shadow-md transition-all"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10 text-blue-800"
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Rajesh Kumar",
              role: "CEO, Retail Corp",
              text: "Aanchal Alytcs transformed our sales data into actionable insights. Their dashboards are intuitive and have boosted our revenue by 25%.",
            },
            {
              name: "Anita Sharma",
              role: "Data Manager, HealthTech",
              text: "Professional team with deep expertise. Their predictive models helped us optimize patient care processes efficiently.",
            },
            {
              name: "Vikram Singh",
              role: "Finance Director, FinServe",
              text: "Reliable and timely delivery. Aanchal Alytcs' analytics solutions are top-notch and have improved our risk assessment.",
            },
            {
              name: "Priya Mehta",
              role: "Operations Head, E-Com Ltd",
              text: "Excellent communication and high-quality work. Their BI tools have streamlined our operations significantly.",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border border-white/40"
            >
              <p className="text-gray-700 italic">"{t.text}"</p>
              <p className="mt-4 font-semibold text-gray-900">{t.name}</p>
              <p className="text-gray-600 text-sm">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <ProjectIdeaForm />

    </div>
  );
}

export default About;
