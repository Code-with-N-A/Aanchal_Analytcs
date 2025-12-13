import React from "react";

const SeeHowItWorks = () => {
  return (
    <section className="bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I follow a structured and professional data analytics process to
            ensure accuracy, clarity, and business-focused insights.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition">
            <div className="text-blue-600 text-sm font-semibold mb-2">
              STEP 01
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Data Collection
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Data is collected from reliable sources such as databases,
              spreadsheets, APIs, and cloud platforms. Quality and accuracy
              are ensured before moving to the next stage.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition">
            <div className="text-green-600 text-sm font-semibold mb-2">
              STEP 02
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Data Analysis
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              The collected data is cleaned, processed, and analyzed using
              modern analytical techniques to identify trends, patterns,
              and meaningful insights.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition">
            <div className="text-purple-600 text-sm font-semibold mb-2">
              STEP 03
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Business Insights
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Clear and actionable insights are delivered in the form of
              reports, dashboards, and recommendations to support informed
              business decisions.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="my-16 border-t border-gray-200"></div>

        {/* Bottom Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-2xl font-semibold text-gray-900">Accuracy</h4>
            <p className="text-gray-600 text-sm mt-2">
              Data-driven approach with attention to detail.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-semibold text-gray-900">Clarity</h4>
            <p className="text-gray-600 text-sm mt-2">
              Simple, easy-to-understand insights.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-semibold text-gray-900">Impact</h4>
            <p className="text-gray-600 text-sm mt-2">
              Insights focused on real business outcomes.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SeeHowItWorks;
