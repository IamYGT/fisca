import React from 'react';

const Features = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Resolution Disputes */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Resolution Disputes</h3>
            <p className="text-gray-600">
              IFCSA is a resolution body that comes to a conclusion on disputes between the brokerage house and the investor, especially in the forex market. At this point, in the evaluations made in defense of investor rights, the company has the legal authority to file a lawsuit on behalf of the investor.
            </p>
          </div>

          {/* Membership */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Membership</h3>
            <p className="text-gray-600">
              We bring together more than 30 brokers, technology and stock exchange companies that have earned the highest success and respect in their activities.
            </p>
          </div>

          {/* Guaranteed Funds */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Guaranteed Funds</h3>
            <p className="text-gray-600">
              By managing a solution-oriented process with the institution with which you have a disagreement, we ensure the return of guaranteed funds up to 50.000 € in line with the rights of the investor.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <a href="/tradefora" 
             className="bg-blue-900 text-white text-center py-3 px-6 rounded hover:bg-blue-800 transition-colors">
            Check Market Prices
          </a>
          <a href="/financial-regulators" 
             className="bg-blue-900 text-white text-center py-3 px-6 rounded hover:bg-blue-800 transition-colors">
            Search Financial Regulators
          </a>
          <a href="/tips-for-all" 
             className="bg-blue-900 text-white text-center py-3 px-6 rounded hover:bg-blue-800 transition-colors">
            Get Tips For All
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;