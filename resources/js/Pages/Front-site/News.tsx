import React from 'react';
import { AlertTriangle } from 'lucide-react';

const News = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Company News</h2>
            <div className="space-y-8">
              {/* News Item */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    <a href="/scam-alert-ayox-trade" className="hover:text-blue-600">
                      Scam Alert - Ayox Trade
                    </a>
                  </h3>
                  <div className="text-gray-500 text-sm mb-2">Sep 27, 2021</div>
                  <p className="text-gray-600">
                    Important Notice to Investors: AyoxTrade is an internationally unregistered brokerage house...
                  </p>
                  <a href="/scam-alert-ayox-trade" 
                     className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                    Learn more
                  </a>
                </div>
              </div>

              {/* Additional News Items */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    <a href="/scam-alert-xprime-capital" className="hover:text-blue-600">
                      Scam Alert - xPrime Capital
                    </a>
                  </h3>
                  <div className="text-gray-500 text-sm mb-2">Aug 12, 2021</div>
                  <p className="text-gray-600">
                    Important Notice to Investors: xPrime Capital is an internationally unregistered brokerage house...
                  </p>
                  <a href="/scam-alert-xprime-capital" 
                     className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Quick Links</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Who can make a complaint?</h3>
                <p className="text-gray-600 mb-2">
                  Traders of our broker members can file complaints absolutely free
                </p>
                <a href="/our-members" className="text-blue-600 hover:text-blue-800">
                  See our Members
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Who decides the outcome of the complaints?</h3>
                <p className="text-gray-600 mb-2">
                  The Dispute Resolution Committee accepts, investigates and issues decisions on complaints
                </p>
                <a href="/about/ifcsa-leadership" className="text-blue-600 hover:text-blue-800">
                  MEET OUR TEAM
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">How does the process work?</h3>
                <p className="text-gray-600 mb-2">
                  The dispute resolution process is simple and straightforward for all parties
                </p>
                <a href="/resolving-a-dispute/dispute-resolution-process" className="text-blue-600 hover:text-blue-800">
                  REVIEW THE PHASES
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;