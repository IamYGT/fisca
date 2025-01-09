import React from 'react';
import { Search, Menu, ChevronDown, Bell, Globe, Sun, Moon } from 'lucide-react';

const menuItems = [
  {
    title: 'About Us',
    submenu: [
      { title: 'What We do', href: '/about/what-we-do' },
      { title: 'Commission News', href: '/about/commission-news' },
      { title: 'Commission Operations', href: '/commission-operations' },
      { title: 'Our Team', href: '/about/ifcsa-leadership' },
      { title: 'Our Partners', href: '/our-partners' }
    ]
  },
  { title: 'Our Members', href: '/our-members' },
  {
    title: 'Complaints',
    submenu: [
      { title: 'File a Complaint/Dispute', href: '/resolving-a-dispute/how-to-file-a-complaint-dispute' },
      { title: 'Dispute Resolution Process', href: '/resolving-a-dispute/dispute-resolution-process' },
      { title: 'Compensation Fund', href: '/about/compensation-fund' },
      { title: 'Scam Alert', href: '/financial-commission-warns-of-pseudo-representatives-and-chargeback-schemes' }
    ]
  },
  {
    title: 'Traders',
    submenu: [
      { title: 'Traders Education', href: '/traders-education' },
      { title: 'Check Market Prices', href: '/tradefora' },
      { title: 'Frequently Asked Questions', href: '/resolving-a-dispute/frequently-asked-questions' },
      { title: 'Tips for all', href: '/tips-for-all' }
    ]
  },
  {
    title: 'Brokers',
    submenu: [
      { title: 'Apply For Membership', href: '/apply-for-membership' },
      { title: 'Membership Rules and Guidelines', href: '/membership-rules-and-guidelines' }
    ]
  },
  { title: 'Contact Us', href: '/contact-us' }
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState<number | null>(null);
  const [notifications, setNotifications] = React.useState(false);
  const [language, setLanguage] = React.useState('en');
  const [darkMode, setDarkMode] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const languages = {
    en: 'English',
    tr: 'Türkçe',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch'
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            {/* Logo */}
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center space-x-3 group">
                <img 
                  src="https://ifcsa.co.uk/wp-content/uploads/2021/09/ifcsa-logo-white.png" 
                  alt="IFCSA Logo" 
                  className="h-12 transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-white text-sm lg:text-base">
                  International Financial Commission Supervisory Authority
                </span>
              </a>
              <button 
                className="lg:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Top Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-white p-2 rounded hover:bg-blue-700 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                  className="flex items-center space-x-2 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors group"
                >
                  <Globe size={20} />
                  <span>{languages[language as keyof typeof languages]}</span>
                  <ChevronDown size={16} className="transform group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => setLanguage(code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        language === code ? 'text-blue-600 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotifications(!notifications)}
                  className="text-white p-2 rounded hover:bg-blue-700 transition-colors relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                {notifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm text-gray-600">New security alert for your account</p>
                        <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm text-gray-600">Your complaint has been processed</p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="/resolving-a-dispute/how-to-file-a-complaint-dispute" 
                 className="text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                File a Complaint
              </a>
              <a href="/check-your-broker" 
                 className="text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Check your Broker
              </a>
              <a href="/warning-list" 
                 className="text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Warning List
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`lg:block ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 pb-4">
            {menuItems.map((item, index) => (
              <li key={index} className="relative group">
                {item.href ? (
                  <a 
                    href={item.href}
                    className="text-white block py-2 hover:text-blue-200 transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <button
                    onClick={() => setOpenSubmenu(openSubmenu === index ? null : index)}
                    className="text-white w-full text-left py-2 hover:text-blue-200 transition-colors flex items-center justify-between group"
                  >
                    {item.title}
                    <span className={`transition-transform duration-200 ${openSubmenu === index ? 'rotate-180' : ''}`}>
                      {openSubmenu === index ? '−' : '+'}
                    </span>
                  </button>
                )}
                {item.submenu && (
                  <ul className={`
                    lg:absolute lg:left-0 lg:top-full lg:w-48 lg:bg-blue-800 lg:shadow-lg lg:rounded-lg
                    transform transition-all duration-200 ease-in-out
                    lg:group-hover:block
                    ${openSubmenu === index ? 'block opacity-100 scale-100' : 'hidden opacity-0 scale-95'}
                    lg:hidden
                  `}>
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={subItem.href}
                          className="text-white block px-4 py-2 hover:bg-blue-700 transition-colors"
                        >
                          {subItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white p-2 hover:text-blue-200 transition-colors"
              >
                <Search size={20} />
              </button>
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg p-4 animate-slide-down">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      <Search size={20} />
                    </button>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Quick Links</h4>
                    <div className="space-y-2">
                      <a href="/check-your-broker" className="block text-sm text-gray-700 hover:text-blue-600">
                        Check your Broker
                      </a>
                      <a href="/warning-list" className="block text-sm text-gray-700 hover:text-blue-600">
                        Warning List
                      </a>
                      <a href="/tips-for-all" className="block text-sm text-gray-700 hover:text-blue-600">
                        Trading Tips
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 bg-[url('https://ifcsa.co.uk/wp-content/uploads/2021/09/slider-bg.png')] bg-cover bg-center">
        <div className="max-w-2xl">
          <h2 className="text-white text-2xl mb-8">Become a Member to:</h2>
          <ul className="space-y-4 text-white mb-8">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Protect investor rights.</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>A transparent trading service</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Join the Transparent and Fair broker group.</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Current rights in the public</span>
            </li>
          </ul>
          <a
            href="/apply-for-membership"
            className="inline-block px-8 py-3 text-white border border-white/40 rounded hover:border-white/75 transition-colors bg-white/20"
          >
            Become a Member
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;