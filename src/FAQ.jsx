import { useState } from "react";
import { ChevronDown, ChevronUp, BarChart3, Database, TrendingUp, PieChart, Users } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Data Analytics?",
      answer:
        "Data Analytics involves examining raw data to uncover patterns, trends, and insights that can inform business decisions. It includes processes like data collection, cleaning, analysis, and visualization using tools like Python, R, SQL, and BI platforms such as Tableau or Power BI.",
      icon: <BarChart3 className="text-blue-600" size={20} />,
    },
    {
      question: "Which tools should I learn for Data Analytics?",
      answer:
        "Key tools include Python (with libraries like Pandas and NumPy), R for statistical analysis, SQL for database querying, Excel for basic analysis, and visualization tools like Tableau, Power BI, or Matplotlib. Cloud platforms like AWS or Google Cloud are also useful for advanced analytics.",
      icon: <Database className="text-blue-600" size={20} />,
    },
    {
      question: "How long does it take to become a Data Analyst?",
      answer:
        "It typically takes 3 to 6 months of dedicated learning and practice to become a beginner Data Analyst, depending on your background. Building real projects and gaining certifications can accelerate your progress to an intermediate level.",
      icon: <TrendingUp className="text-blue-600" size={20} />,
    },
    {
      question: "What kind of projects can a Data Analyst build?",
      answer:
        "Data Analysts can create dashboards, predictive models, sales reports, customer segmentation analyses, financial forecasts, and interactive visualizations. Projects often involve real-world data from e-commerce, healthcare, finance, or marketing sectors.",
      icon: <PieChart className="text-blue-600" size={20} />,
    },
    {
      question: "Is Data Analytics a good career in 2025?",
      answer:
        "Absolutely! Data Analytics is one of the fastest-growing fields in 2025, with high demand across industries. Roles like Data Analyst, BI Developer, and Machine Learning Engineer offer excellent salaries, job security, and opportunities for growth.",
      icon: <Users className="text-blue-600" size={20} />,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-#FFF from-blue-50 to-indigo-100 flex justify-center items-center px-4 py-10 ">
      <div className="max-w-4xl w-full bg-white  shadow-2xl p-8 md:p-12 border border-blue-200">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-blue-200  p-6 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-indigo-50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {faq.icon}
                  <span className="font-semibold text-gray-800 text-lg group-hover:text-blue-700 transition-colors">
                    {faq.question}
                  </span>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="text-blue-600 transition-transform transform rotate-180" />
                ) : (
                  <ChevronDown className="text-blue-600 transition-transform" />
                )}
              </button>
              {openIndex === index && (
                <div className="mt-4 pl-10 border-l-4 border-blue-300">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
