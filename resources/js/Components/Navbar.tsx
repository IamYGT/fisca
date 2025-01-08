import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '@/Contexts/TranslationContext';
import ApplicationLogo from '@/Components/ApplicationLogo';

const Navbar = () => {
    const { t } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        {
            name: 'About Us',
            href: '/about',
            submenu: [
                { name: 'What We do', href: '/about/what-we-do' },
                { name: 'Commission News', href: '/about/commission-news' },
                { name: 'Commission Operations', href: '/commission-operations' },
                { name: 'Our Team', href: '/about/ifcsa-leadership' },
                { name: 'Our Partners', href: '/our-partners' },
            ],
        },
        {
            name: 'Our Members',
            href: '/our-members',
        },
        {
            name: 'Complaints',
            href: '/resolving-a-dispute/dispute-resolution-process',
            submenu: [
                { name: 'File a Complaint/Dispute', href: '/resolving-a-dispute/how-to-file-a-complaint-dispute' },
                { name: 'Dispute Resolution Process', href: '/resolving-a-dispute/dispute-resolution-process' },
                { name: 'Compensation Fund', href: '/about/compensation-fund' },
                { name: 'Scam Alert', href: '/financial-commission-warns-of-pseudo-representatives' },
            ],
        },
        // ... diğer menü öğeleri
    ];

    return (
        <header className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <ApplicationLogo className="h-12 w-auto" />
                            <span className="text-lg font-semibold">
                                International Financial Commission Supervisory Authority
                            </span>
                        </Link>
                        
                        {/* Mobile Menu Button */}
                        <button 
                            className="ml-4 md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <div className="space-y-2">
                                <span className="block h-0.5 w-6 bg-white"></span>
                                <span className="block h-0.5 w-6 bg-white"></span>
                                <span className="block h-0.5 w-6 bg-white"></span>
                            </div>
                        </button>
                    </div>

                    {/* Header Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            href="/resolving-a-dispute/dispute-resolution-form"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            File a Complaint
                        </Link>
                        <Link 
                            href="/check-your-broker"
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            Check your Broker
                        </Link>
                        <Link 
                            href="/warning-list"
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Warning List
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="relative hidden md:block">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 hover:bg-gray-800 rounded-full"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {isSearchOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                                <form action="/" method="get" className="p-2">
                                    <input
                                        type="text"
                                        name="s"
                                        placeholder="Search..."
                                        className="w-full px-4 py-2 text-gray-900 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <nav className="py-4">
                        {menuItems.map((item, index) => (
                            <div key={index} className="py-2">
                                <Link 
                                    href={item.href}
                                    className="block px-4 py-2 hover:bg-gray-800 rounded-lg"
                                >
                                    {item.name}
                                </Link>
                                {item.submenu && (
                                    <div className="pl-8 mt-2 space-y-2">
                                        {item.submenu.map((subItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                href={subItem.href}
                                                className="block px-4 py-2 hover:bg-gray-800 rounded-lg text-gray-300"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar; 