import React from 'react';

const Stats = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <h5 className="text-4xl font-bold text-blue-900 mb-2">2,457,726+</h5>
            <div className="text-gray-600">
              complaint<br />searches
            </div>
          </div>
          <div>
            <h5 className="text-4xl font-bold text-blue-900 mb-2">3 days</h5>
            <div className="text-gray-600">
              average<br />resolution time
            </div>
          </div>
          <div>
            <h5 className="text-4xl font-bold text-blue-900 mb-2">1,270+</h5>
            <div className="text-gray-600">
              complaint<br />resolved
            </div>
          </div>
          <div>
            <h5 className="text-4xl font-bold text-blue-900 mb-2">30+</h5>
            <div className="text-gray-600">
              memberships
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;