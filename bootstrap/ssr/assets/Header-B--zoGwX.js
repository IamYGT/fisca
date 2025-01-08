import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
import { Menu, Sun, Moon, Globe, ChevronDown, Bell, Search } from "lucide-react";
const menuItems = [
  {
    title: "About Us",
    submenu: [
      { title: "What We do", href: "/about/what-we-do" },
      { title: "Commission News", href: "/about/commission-news" },
      { title: "Commission Operations", href: "/commission-operations" },
      { title: "Our Team", href: "/about/ifcsa-leadership" },
      { title: "Our Partners", href: "/our-partners" }
    ]
  },
  { title: "Our Members", href: "/our-members" },
  {
    title: "Complaints",
    submenu: [
      { title: "File a Complaint/Dispute", href: "/resolving-a-dispute/how-to-file-a-complaint-dispute" },
      { title: "Dispute Resolution Process", href: "/resolving-a-dispute/dispute-resolution-process" },
      { title: "Compensation Fund", href: "/about/compensation-fund" },
      { title: "Scam Alert", href: "/financial-commission-warns-of-pseudo-representatives-and-chargeback-schemes" }
    ]
  },
  {
    title: "Traders",
    submenu: [
      { title: "Traders Education", href: "/traders-education" },
      { title: "Check Market Prices", href: "/tradefora" },
      { title: "Frequently Asked Questions", href: "/resolving-a-dispute/frequently-asked-questions" },
      { title: "Tips for all", href: "/tips-for-all" }
    ]
  },
  {
    title: "Brokers",
    submenu: [
      { title: "Apply For Membership", href: "/apply-for-membership" },
      { title: "Membership Rules and Guidelines", href: "/membership-rules-and-guidelines" }
    ]
  },
  { title: "Contact Us", href: "/contact-us" }
];
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState(null);
  const [notifications, setNotifications] = React.useState(false);
  const [language, setLanguage] = React.useState("en");
  const [darkMode, setDarkMode] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const languages = {
    en: "English",
    tr: "Türkçe",
    es: "Español",
    fr: "Français",
    de: "Deutsch"
  };
  return /* @__PURE__ */ jsxs("header", { className: "bg-gradient-to-r from-blue-900 to-blue-800", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center space-x-3 group", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://ifcsa.co.uk/wp-content/uploads/2021/09/ifcsa-logo-white.png",
                alt: "IFCSA Logo",
                className: "h-12 transition-transform duration-300 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-white text-sm lg:text-base", children: "International Financial Commission Supervisory Authority" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "lg:hidden text-white",
              onClick: () => setMobileMenuOpen(!mobileMenuOpen),
              children: /* @__PURE__ */ jsx(Menu, { size: 24 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setDarkMode(!darkMode),
              className: "text-white p-2 rounded hover:bg-blue-700 transition-colors",
              "aria-label": "Toggle theme",
              children: darkMode ? /* @__PURE__ */ jsx(Sun, { size: 20 }) : /* @__PURE__ */ jsx(Moon, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setLanguage(language === "en" ? "tr" : "en"),
                className: "flex items-center space-x-2 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx(Globe, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { children: languages[language] }),
                  /* @__PURE__ */ jsx(ChevronDown, { size: 16, className: "transform group-hover:rotate-180 transition-transform duration-200" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block", children: Object.entries(languages).map(([code, name]) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setLanguage(code),
                className: `w-full text-left px-4 py-2 hover:bg-gray-100 ${language === code ? "text-blue-600 font-semibold" : "text-gray-700"}`,
                children: name
              },
              code
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setNotifications(!notifications),
                className: "text-white p-2 rounded hover:bg-blue-700 transition-colors relative",
                children: [
                  /* @__PURE__ */ jsx(Bell, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" })
                ]
              }
            ),
            notifications && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50", children: [
              /* @__PURE__ */ jsx("div", { className: "px-4 py-2 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Notifications" }) }),
              /* @__PURE__ */ jsxs("div", { className: "max-h-96 overflow-y-auto", children: [
                /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 hover:bg-gray-50", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "New security alert for your account" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "2 minutes ago" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 hover:bg-gray-50", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Your complaint has been processed" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "1 hour ago" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/resolving-a-dispute/how-to-file-a-complaint-dispute",
              className: "text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors",
              children: "File a Complaint"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/check-your-broker",
              className: "text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors",
              children: "Check your Broker"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/warning-list",
              className: "text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors",
              children: "Warning List"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("nav", { className: `lg:block ${mobileMenuOpen ? "block" : "hidden"}`, children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col lg:flex-row lg:items-center lg:space-x-6 pb-4", children: [
        menuItems.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "relative group", children: [
          item.href ? /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              className: "text-white block py-2 hover:text-blue-200 transition-colors",
              children: item.title
            }
          ) : /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenSubmenu(openSubmenu === index ? null : index),
              className: "text-white w-full text-left py-2 hover:text-blue-200 transition-colors flex items-center justify-between group",
              children: [
                item.title,
                /* @__PURE__ */ jsx("span", { className: `transition-transform duration-200 ${openSubmenu === index ? "rotate-180" : ""}`, children: openSubmenu === index ? "−" : "+" })
              ]
            }
          ),
          item.submenu && /* @__PURE__ */ jsx("ul", { className: `
                    lg:absolute lg:left-0 lg:top-full lg:w-48 lg:bg-blue-800 lg:shadow-lg lg:rounded-lg
                    transform transition-all duration-200 ease-in-out
                    lg:group-hover:block
                    ${openSubmenu === index ? "block opacity-100 scale-100" : "hidden opacity-0 scale-95"}
                    lg:hidden
                  `, children: item.submenu.map((subItem, subIndex) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: subItem.href,
              className: "text-white block px-4 py-2 hover:bg-blue-700 transition-colors",
              children: subItem.title
            }
          ) }, subIndex)) })
        ] }, index)),
        /* @__PURE__ */ jsxs("li", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSearchOpen(!searchOpen),
              className: "text-white p-2 hover:text-blue-200 transition-colors",
              children: /* @__PURE__ */ jsx(Search, { size: 20 })
            }
          ),
          searchOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg p-4 animate-slide-down", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "search",
                  placeholder: "Search...",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: true
                }
              ),
              /* @__PURE__ */ jsx("button", { className: "absolute right-3 top-2.5 text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsx(Search, { size: 20 }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-gray-500 mb-2", children: "Quick Links" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("a", { href: "/check-your-broker", className: "block text-sm text-gray-700 hover:text-blue-600", children: "Check your Broker" }),
                /* @__PURE__ */ jsx("a", { href: "/warning-list", className: "block text-sm text-gray-700 hover:text-blue-600", children: "Warning List" }),
                /* @__PURE__ */ jsx("a", { href: "/tips-for-all", className: "block text-sm text-gray-700 hover:text-blue-600", children: "Trading Tips" })
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-20 bg-[url('https://ifcsa.co.uk/wp-content/uploads/2021/09/slider-bg.png')] bg-cover bg-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-white text-2xl mb-8", children: "Become a Member to:" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-white mb-8", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ jsx("span", { children: "Protect investor rights." })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ jsx("span", { children: "A transparent trading service" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ jsx("span", { children: "Join the Transparent and Fair broker group." })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ jsx("span", { children: "Current rights in the public" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/apply-for-membership",
          className: "inline-block px-8 py-3 text-white border border-white/40 rounded hover:border-white/75 transition-colors bg-white/20",
          children: "Become a Member"
        }
      )
    ] }) })
  ] });
};
export {
  Header as default
};
