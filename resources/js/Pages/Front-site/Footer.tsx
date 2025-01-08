import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Logo Section */}
          <div>
            <div className="flex flex-col items-start">
              <img 
                src="https://ifcsa.co.uk/wp-content/uploads/2021/09/ifcsa-logo-white.png"
                alt="IFCSA Logo"
                className="h-12 mb-4"
              />
              <span className="text-sm">
                International Financial Commission Supervisory Authority
              </span>
            </div>
          </div>

          {/* Message Section */}
          <div className="lg:text-center">
            <p className="font-bold">
              International Financial Commission Supervisor Authority services are absolutely free for traders
            </p>
          </div>

          {/* Contact Section */}
          <div className="lg:text-right">
            <a href="mailto:info@ifcsa.co.uk" className="text-blue-400 hover:text-blue-300">
              info@ifcsa.co.uk
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <div className="space-y-3">
              <button onClick={() => window.location.href='/check-your-broker'} 
                      className="w-full bg-blue-800 hover:bg-blue-700 py-2 px-4 rounded">
                Check your Broker
              </button>
              <button onClick={() => window.location.href='/resolving-a-dispute/how-to-file-a-complaint-dispute'} 
                      className="w-full bg-blue-800 hover:bg-blue-700 py-2 px-4 rounded">
                File a Complaint
              </button>
              <button onClick={() => window.location.href='/apply-for-membership'} 
                      className="w-full bg-blue-800 hover:bg-blue-700 py-2 px-4 rounded">
                Apply for Membership
              </button>
            </div>
          </div>

          {/* Menu Columns */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about/what-we-do" className="hover:text-blue-400">About Us</a></li>
                <li><a href="/our-members" className="hover:text-blue-400">Our Members</a></li>
                <li><a href="/resolving-a-dispute/dispute-resolution-process" className="hover:text-blue-400">Dispute Resolution Process</a></li>
                <li><a href="/warning-list" className="hover:text-blue-400">Warning List</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Info</h3>
              <ul className="space-y-2">
                <li><a href="/tips-for-all" className="hover:text-blue-400">Tips for all</a></li>
                <li><a href="/about" className="hover:text-blue-400">About</a></li>
                <li><a href="/about/commission-news" className="hover:text-blue-400">Commission News</a></li>
                <li><a href="/check-your-broker" className="hover:text-blue-400">Check your Broker</a></li>
              </ul>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">IFCSA MANAGEMENT LTD</h3>
            <address className="not-italic">
              Two Snowhill, 2 Snow Hill Queensway,<br />
              Birmingham B4 6GA, United Kingdom
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 border-t border-gray-800 pt-8">
          <p>International Financial Commission Supervisor Authority logo is a trademark of International Financial Commission Supervisor Authority Ltd.</p>
          <p>International Financial Commission Supervisor Authority © 2013 - {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;