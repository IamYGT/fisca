import { jsx, jsxs } from "react/jsx-runtime";
import { usePage, Link, router } from "@inertiajs/react";
import { u as useOnClickOutside, L as LanguageSelector, T as ThemeToggle, A as ApplicationLogo, g as getTheme, s as setTheme } from "./ApplicationLogo-B9pIlq8y.js";
import { memo, useRef, useState, useCallback, useEffect } from "react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { AnimatePresence, motion } from "framer-motion";
import { MdChevronRight, MdChevronLeft, MdClose, MdMenu, MdAccountCircle, MdExpandMore, MdPerson, MdExitToApp, MdLogout, MdDashboard, MdPayment, MdMoneyOff, MdConfirmationNumber, MdAccountBalance, MdGroup } from "react-icons/md";
import Tippy from "@tippyjs/react";
function useRole() {
  const { auth } = usePage().props;
  const hasRole = (role) => {
    var _a;
    return ((_a = auth.user) == null ? void 0 : _a.roles.some((r) => r.name === role)) ?? false;
  };
  const isAdmin = () => {
    return hasRole("admin");
  };
  const isUser = () => {
    return hasRole("user");
  };
  return {
    hasRole,
    isAdmin,
    isUser
  };
}
const Dropdown = memo(({ isOpen, onClose, children, className = "", triggerRef }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setDropdownOpen());
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.2 },
      className: `absolute right-0 z-30 mt-2 w-60 rounded-xl p-3 shadow-xl backdrop-blur-xl ${className}`,
      children
    }
  ) });
});
const Header = ({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  toggleDarkMode,
  auth,
  languages,
  secili_dil,
  header,
  collapsed,
  toggleCollapse,
  isMobile,
  setShowLogoutModal,
  onLanguageChange
  // Prop eklendi
}) => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen2] = useState(false);
  const buttonRef = useRef(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  useCallback((name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  }, []);
  const dropdownItemClasses = useCallback(
    (isSelected = false) => `
      flex items-center w-full text-left px-3 py-2 text-sm transition-colors duration-200 ease-in-out
      ${darkMode ? `${isSelected ? "bg-gray-700 text-gray-200" : "text-gray-400"} hover:bg-gray-600` : `${isSelected ? "bg-gray-300 text-gray-900" : "text-gray-600"} hover:bg-gray-200`}
      rounded-lg
    `,
    [darkMode]
  );
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile) {
        setLanguageDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);
  useEffect(() => {
    if (!dropdownOpen) {
      setLanguageDropdownOpen(false);
    }
  }, [dropdownOpen]);
  const user = auth == null ? void 0 : auth.user;
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: `sticky top-0 z-10 w-full transition-all duration-500 ease-in-out ${darkMode ? "bg-gray-800/80" : "bg-gray-100/80"} border-b backdrop-blur-md ${darkMode ? "border-gray-700/20" : "border-gray-300/20"} shadow-lg`,
      children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-full px-3 py-2 sm:px-4 sm:py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 sm:space-x-4", children: [
          !isMobile && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleCollapse,
              className: `flex items-center justify-center rounded-full p-2 shadow-md backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:p-2.5 ${darkMode ? "bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-600" : "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300"} `,
              "aria-label": collapsed ? t("header.expandSidebar") : t("header.collapseSidebar"),
              children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: collapsed ? /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: {
                    opacity: 0,
                    rotate: -180
                  },
                  animate: { opacity: 1, rotate: 0 },
                  exit: { opacity: 0, rotate: 180 },
                  transition: { duration: 0.3 },
                  children: /* @__PURE__ */ jsx(MdChevronRight, { className: "h-5 w-5 sm:h-6 sm:w-6" })
                },
                "expand"
              ) : /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: {
                    opacity: 0,
                    rotate: 180
                  },
                  animate: { opacity: 1, rotate: 0 },
                  exit: { opacity: 0, rotate: -180 },
                  transition: { duration: 0.3 },
                  children: /* @__PURE__ */ jsx(MdChevronLeft, { className: "h-5 w-5 sm:h-6 sm:w-6" })
                },
                "collapse"
              ) })
            }
          ),
          isMobile && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSidebarOpen(!sidebarOpen),
              className: `flex items-center justify-center rounded-full p-2 shadow-md backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:p-2.5 ${darkMode ? "bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-600" : "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300"} `,
              "aria-label": t("header.toggleSidebar"),
              children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: sidebarOpen ? /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: {
                    opacity: 0,
                    rotate: -180
                  },
                  animate: { opacity: 1, rotate: 0 },
                  exit: { opacity: 0, rotate: 180 },
                  transition: { duration: 0.3 },
                  children: /* @__PURE__ */ jsx(MdClose, { className: "h-5 w-5 sm:h-6 sm:w-6" })
                },
                "close"
              ) : /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: {
                    opacity: 0,
                    rotate: 180
                  },
                  animate: { opacity: 1, rotate: 0 },
                  exit: { opacity: 0, rotate: -180 },
                  transition: { duration: 0.3 },
                  children: /* @__PURE__ */ jsx(MdMenu, { className: "h-5 w-5 sm:h-6 sm:w-6" })
                },
                "open"
              ) })
            }
          ),
          header
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 sm:space-x-4", children: [
          !isMobile && /* @__PURE__ */ jsx(
            LanguageSelector,
            {
              darkMode,
              languages,
              secili_dil,
              isMobile,
              onLanguageChange
            }
          ),
          /* @__PURE__ */ jsx(
            ThemeToggle,
            {
              darkMode,
              toggleDarkMode
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                ref: buttonRef,
                onClick: () => setDropdownOpen2(!dropdownOpen),
                className: "group relative flex items-center focus:outline-none",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "h-8 w-8 flex-shrink-0 overflow-hidden rounded-full sm:h-10 sm:w-10", children: auth.user.avatar ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: auth.user.avatar,
                      alt: auth.user.name,
                      className: "h-full w-full object-cover transition-all duration-300",
                      onError: (e) => {
                        var _a;
                        const target = e.target;
                        target.style.display = "none";
                        (_a = target.nextElementSibling) == null ? void 0 : _a.classList.remove(
                          "hidden"
                        );
                      }
                    }
                  ) : /* @__PURE__ */ jsx(
                    MdAccountCircle,
                    {
                      className: `h-full w-full ${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`
                    }
                  ) }),
                  /* @__PURE__ */ jsx(
                    MdExpandMore,
                    {
                      className: `ml-1 h-4 w-4 transition-transform duration-300 sm:h-5 sm:w-5 ${dropdownOpen ? "rotate-180" : "rotate-0"} ${darkMode ? "text-gray-300" : "text-gray-600"} `
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Dropdown,
              {
                isOpen: dropdownOpen,
                onClose: () => setDropdownOpen2(false),
                triggerRef: buttonRef,
                className: `${darkMode ? "border-gray-700 bg-gray-800 text-gray-200" : "border-gray-100 bg-white text-gray-900"} w-72 overflow-hidden rounded-2xl border-2 shadow-2xl transition-all duration-300 ease-in-out sm:w-80`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200 px-4 py-3 dark:border-gray-700 sm:px-5 sm:py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: auth.user.avatar ? /* @__PURE__ */ jsx("div", { className: "h-12 w-12 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700 sm:h-14 sm:w-14", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: auth.user.avatar,
                        alt: auth.user.name,
                        className: "h-full w-full object-cover",
                        onError: (e) => {
                          var _a, _b, _c;
                          const target = e.target;
                          target.style.display = "none";
                          (_a = target.parentElement) == null ? void 0 : _a.classList.add(
                            "hidden"
                          );
                          (_c = (_b = target.parentElement) == null ? void 0 : _b.nextElementSibling) == null ? void 0 : _c.classList.remove(
                            "hidden"
                          );
                        }
                      }
                    ) }) : /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"} `,
                        children: /* @__PURE__ */ jsx(MdAccountCircle, { className: "h-full w-full" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-base font-bold sm:text-lg", children: auth.user.name }),
                      /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-gray-500 dark:text-gray-400 sm:text-sm", children: auth.user.email })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1 p-2", children: [
                    isMobile && /* @__PURE__ */ jsxs("div", { className: "mb-2 px-1", children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => setLanguageDropdownOpen(
                            (prev) => !prev
                          ),
                          className: `flex w-full items-center justify-between px-3 py-2 text-sm transition-colors duration-200 ease-in-out ${darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`,
                          children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                              /* @__PURE__ */ jsx(
                                "img",
                                {
                                  src: `https://flagcdn.com/w40/${secili_dil.dil_kod === "en" ? "gb" : secili_dil.dil_kod}.png`,
                                  alt: `${secili_dil.dil_baslik} bayrağı`,
                                  className: "mr-2 h-6 w-6 rounded-full object-contain shadow-sm"
                                }
                              ),
                              /* @__PURE__ */ jsx("span", { className: "font-medium", children: secili_dil.dil_baslik })
                            ] }),
                            /* @__PURE__ */ jsx(
                              MdExpandMore,
                              {
                                className: `h-5 w-5 transition-transform duration-300 ${languageDropdownOpen ? "rotate-180" : "rotate-0"}`
                              }
                            )
                          ]
                        }
                      ),
                      languageDropdownOpen && /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(
                        LanguageSelector,
                        {
                          darkMode,
                          languages,
                          secili_dil,
                          isMobile,
                          embedded: true,
                          onLanguageChange
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs(
                      Link,
                      {
                        href: route("management.profile.edit"),
                        className: dropdownItemClasses(),
                        children: [
                          /* @__PURE__ */ jsx(MdPerson, { className: "mr-2 h-5 w-5" }),
                          /* @__PURE__ */ jsx("span", { className: "font-medium", children: t("header.profile") })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => {
                          setDropdownOpen2(false);
                          setShowLogoutModal(true);
                        },
                        className: `${dropdownItemClasses()} w-full text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300`,
                        children: [
                          /* @__PURE__ */ jsx(MdExitToApp, { className: "mr-2 h-5 w-5 text-red-500 dark:text-red-400" }),
                          /* @__PURE__ */ jsx("span", { className: "font-medium", children: t("header.logout") })
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
};
const Header$1 = memo(Header);
function setDropdownOpen(arg0) {
  throw new Error("Function not implemented.");
}
function LogoutModal({ showLogoutModal, setShowLogoutModal, darkMode }) {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowLogoutModal(false);
      }
    };
    if (showLogoutModal) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLogoutModal, setShowLogoutModal]);
  if (!showLogoutModal) return null;
  const confirmLogout = () => {
    router.post(route("logout"));
    setShowLogoutModal(false);
  };
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };
  const modalBgClass = darkMode ? "bg-dark-surface bg-opacity-80" : "bg-light-surface bg-opacity-80";
  const modalContentBgClass = darkMode ? "bg-dark-surface bg-opacity-70" : "bg-light-surface bg-opacity-70";
  const iconBgClass = darkMode ? "bg-red-900 bg-opacity-50" : "bg-red-100";
  const iconTextClass = darkMode ? "text-red-300" : "text-red-600";
  const titleTextClass = darkMode ? "text-gray-200" : "text-gray-900";
  const descriptionTextClass = darkMode ? "text-gray-400" : "text-gray-500";
  const footerBgClass = darkMode ? "bg-gray-800 bg-opacity-50" : "bg-gray-50 bg-opacity-50";
  const confirmButtonClass = "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white";
  const cancelButtonClass = darkMode ? "border-gray-500 bg-gray-700 text-gray-300 hover:bg-gray-600" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
  return /* @__PURE__ */ jsx(AnimatePresence, { children: showLogoutModal && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed z-50 inset-0 overflow-y-auto",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-filter backdrop-blur-sm",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "​" }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.95, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.95, opacity: 0 },
            className: `inline-block align-bottom ${modalBgClass} rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700`,
            ref: modalRef,
            children: [
              /* @__PURE__ */ jsx("div", { className: `${modalContentBgClass} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`, children: /* @__PURE__ */ jsxs("div", { className: "sm:flex sm:items-start", children: [
                /* @__PURE__ */ jsx("div", { className: `mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${iconBgClass} sm:mx-0 sm:h-10 sm:w-10`, children: /* @__PURE__ */ jsx(MdLogout, { className: `h-6 w-6 ${iconTextClass}`, "aria-hidden": "true" }) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left", children: [
                  /* @__PURE__ */ jsx("h3", { className: `text-lg leading-6 font-semibold ${titleTextClass}`, id: "modal-title", children: t("logoutModal.title") }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("p", { className: `text-sm ${descriptionTextClass}`, children: t("logoutModal.description") }) })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: `${footerBgClass} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`, children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: `w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${confirmButtonClass} text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm transition duration-150 ease-in-out`,
                    onClick: confirmLogout,
                    children: t("logoutModal.confirmButton")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: `mt-3 w-full inline-flex justify-center rounded-md border ${cancelButtonClass} shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-150 ease-in-out`,
                    onClick: cancelLogout,
                    children: t("logoutModal.cancelButton")
                  }
                )
              ] })
            ]
          }
        )
      ] })
    }
  ) });
}
const NavLink = ({
  href,
  active,
  darkMode,
  collapsed,
  icon,
  children,
  isMobile
}) => {
  const baseClasses = `
        flex items-center py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl transition-all duration-200 ease-in-out
        ${darkMode ? "hover:bg-gray-700 hover:bg-opacity-50" : "hover:bg-light-primary hover:bg-opacity-10"}
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        backdrop-filter backdrop-blur-sm
    `;
  const activeClasses = darkMode ? "bg-blue-600 bg-opacity-70 text-white" : "bg-light-primary bg-opacity-20 text-light-primary";
  const inactiveClasses = darkMode ? "text-gray-300" : "text-light-text";
  const classes = `${baseClasses} ${active ? activeClasses : inactiveClasses} ${isMobile || !collapsed ? "justify-start" : "justify-center"}`;
  const iconVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.1 } },
    tap: { scale: 0.9, rotate: -5, transition: { duration: 0.1 } }
  };
  const textVariants = {
    hidden: { opacity: 0, x: -5, transition: { duration: 0.1 } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.1 } }
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 500, damping: 20 },
      children: /* @__PURE__ */ jsxs(Link, { href, className: classes, children: [
        /* @__PURE__ */ jsx(
          motion.span,
          {
            className: `text-xl sm:text-2xl ${isMobile || !collapsed ? "mr-3 sm:mr-4" : ""}`,
            variants: iconVariants,
            whileHover: "hover",
            whileTap: "tap",
            children: icon
          }
        ),
        (isMobile || !collapsed) && /* @__PURE__ */ jsx(
          motion.span,
          {
            variants: textVariants,
            initial: "hidden",
            animate: "visible",
            exit: "hidden",
            className: "font-medium text-sm sm:text-base whitespace-nowrap",
            children
          }
        )
      ] })
    }
  );
};
const userMenuItems = [
  {
    name: "sidebar.dashboard",
    route: "management.user.dashboard",
    icon: /* @__PURE__ */ jsx(MdDashboard, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  },
  {
    name: "sidebar.transactions",
    route: "management.user.transactions.history",
    icon: /* @__PURE__ */ jsx(MdPayment, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  },
  {
    name: "sidebar.withdrawals",
    route: "management.user.withdrawals.create",
    icon: /* @__PURE__ */ jsx(MdMoneyOff, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  },
  {
    name: "sidebar.tickets",
    route: "management.user.tickets.index",
    icon: /* @__PURE__ */ jsx(MdConfirmationNumber, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  },
  {
    name: "sidebar.ibans",
    route: "management.user.profile.ibans.index",
    icon: /* @__PURE__ */ jsx(MdAccountBalance, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  }
];
const adminMenuItems = [
  {
    name: "sidebar.dashboard",
    route: "management.admin.dashboard",
    icon: /* @__PURE__ */ jsx(MdDashboard, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  },
  {
    name: "sidebar.userManagement",
    route: "management.admin.users.index",
    icon: /* @__PURE__ */ jsx(MdGroup, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  },
  {
    name: "sidebar.transactions",
    route: "management.admin.transactions.index",
    icon: /* @__PURE__ */ jsx(MdPayment, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  },
  {
    name: "sidebar.tickets",
    route: "management.admin.tickets.index",
    icon: /* @__PURE__ */ jsx(MdConfirmationNumber, { className: "h-5 w-5 sm:h-6 sm:w-6" })
  }
];
const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  setShowLogoutModal,
  collapsed,
  isAdmin
}) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);
  const sidebarVariants = {
    expanded: {
      width: "16rem",
      transition: { duration: 0.1, ease: "easeInOut" }
    },
    // Hızlandırıldı
    collapsed: {
      width: "4.5rem",
      transition: { duration: 0.1, ease: "easeInOut" }
    }
    // Hızlandırıldı
  };
  const contentVariants = {
    expanded: { opacity: 1, x: 0, transition: { duration: 0.05 } },
    // Hızlandırıldı
    collapsed: {
      opacity: collapsed ? 1 : 0,
      x: collapsed ? 0 : -10,
      transition: { duration: 0.05 }
    }
    // Hızlandırıldı
  };
  const logoVariants = {
    expanded: { rotate: 0, scale: 1, transition: { duration: 0.1 } },
    // Hızlandırıldı
    collapsed: { rotate: 360, scale: 0.9, transition: { duration: 0.1 } }
    // Hızlandırıldı
  };
  const buttonVariants = {
    expanded: {
      width: "100%",
      justifyContent: "flex-start",
      padding: "0.75rem 1rem"
    },
    collapsed: {
      width: "3rem",
      justifyContent: "center",
      padding: "0.75rem"
    }
  };
  const darkModeClasses = darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900";
  const headerClasses = darkMode ? "bg-gray-900 bg-opacity-70" : "bg-gray-200 bg-opacity-70";
  const closeButtonClasses = darkMode ? "text-gray-200 hover:bg-gray-700 focus:ring-gray-500" : "text-gray-900 hover:bg-gray-300 focus:ring-gray-400";
  const logoutButtonClasses = darkMode ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800" : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700";
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: (sidebarOpen || !isMobile) && /* @__PURE__ */ jsxs(
    motion.aside,
    {
      initial: collapsed ? "collapsed" : "expanded",
      animate: collapsed ? "collapsed" : "expanded",
      variants: sidebarVariants,
      className: ` ${darkModeClasses} fixed z-50 flex min-h-screen flex-col shadow-lg backdrop-blur-lg backdrop-filter transition-all duration-100 ease-in-out lg:relative`,
      "aria-label": t("sidebar.ariaLabel"),
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: `flex h-14 items-center justify-between px-3 sm:h-[4.5rem] sm:px-4 ${headerClasses} backdrop-blur-md backdrop-filter`,
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.1 },
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  variants: contentVariants,
                  transition: { duration: 0.05 },
                  className: `flex w-full items-center justify-center overflow-hidden`,
                  children: /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      variants: logoVariants,
                      whileHover: { scale: 1.05 },
                      whileTap: { scale: 0.95 },
                      className: "flex w-full justify-center",
                      children: /* @__PURE__ */ jsx(
                        ApplicationLogo,
                        {
                          mode: darkMode ? "dark" : "light",
                          size: "large",
                          collapsed: collapsed && !isMobile,
                          className: `${collapsed ? "h-10 sm:h-12" : "h-12 sm:h-16"} w-auto transition-all duration-200`
                        }
                      )
                    }
                  )
                }
              ),
              isMobile && /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileHover: { scale: 1.1 },
                  whileTap: { scale: 0.9 },
                  onClick: () => setSidebarOpen(false),
                  className: ` ${closeButtonClasses} rounded-full p-2.5 transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-opacity-50`,
                  "aria-label": t("sidebar.closeLabel"),
                  children: /* @__PURE__ */ jsx(MdClose, { className: "h-6 w-6" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.nav,
          {
            className: "custom-scrollbar mt-6 flex-grow space-y-1 overflow-y-auto px-3 sm:px-4",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.1, delay: 0.05 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: menuItems.map((item, index) => /* @__PURE__ */ jsx(
                Tippy,
                {
                  content: collapsed && !isMobile ? t(item.name) : "",
                  disabled: !collapsed || isMobile,
                  placement: "right",
                  children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                    NavLink,
                    {
                      href: route(item.route),
                      active: route().current(item.route),
                      darkMode,
                      collapsed: isMobile ? false : collapsed,
                      icon: item.icon,
                      isMobile,
                      children: t(item.name)
                    }
                  ) })
                },
                index
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `${collapsed && !isMobile ? "my-2 border-b border-gray-600 dark:border-gray-400" : "px-3 py-2 text-xs font-semibold uppercase tracking-wider " + (darkMode ? "text-gray-400" : "text-gray-500")}`,
                    children: !collapsed && t("sidebar.settings")
                  }
                ),
                /* @__PURE__ */ jsx(
                  Tippy,
                  {
                    content: collapsed && !isMobile ? t("sidebar.profile") : "",
                    disabled: !collapsed || isMobile,
                    placement: "right",
                    children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                      NavLink,
                      {
                        href: route("management.profile.edit"),
                        active: route().current("management.profile.edit"),
                        darkMode,
                        collapsed: isMobile ? false : collapsed,
                        icon: /* @__PURE__ */ jsx(MdPerson, { className: "h-5 w-5 sm:h-6 sm:w-6" }),
                        isMobile,
                        children: t("sidebar.profile")
                      }
                    ) })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "mt-auto p-3 sm:p-4",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.1, delay: 0.05 },
            children: /* @__PURE__ */ jsx(
              Tippy,
              {
                content: collapsed && !isMobile ? t("sidebar.logout") : "",
                disabled: !collapsed || isMobile,
                placement: "right",
                children: /* @__PURE__ */ jsxs(
                  motion.button,
                  {
                    whileHover: { scale: 1.03 },
                    whileTap: { scale: 0.97 },
                    onClick: () => setShowLogoutModal(true),
                    className: `flex items-center ${logoutButtonClasses} rounded-xl text-sm font-medium shadow-md backdrop-blur-sm backdrop-filter transition duration-100 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 sm:text-base`,
                    variants: buttonVariants,
                    animate: collapsed && !isMobile ? "collapsed" : "expanded",
                    "aria-label": t("sidebar.logout"),
                    children: [
                      /* @__PURE__ */ jsx(MdLogout, { className: "h-5 w-5 sm:h-6 sm:w-6" }),
                      (!collapsed || isMobile) && /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          variants: contentVariants,
                          className: "ml-2 overflow-hidden whitespace-nowrap sm:ml-3",
                          children: t("sidebar.logout")
                        }
                      )
                    ]
                  }
                )
              }
            )
          }
        )
      ]
    }
  ) });
};
function Authenticated({ auth, header, children }) {
  const { languages, secili_dil, scroll } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(getTheme());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");
    return savedCollapsed ? JSON.parse(savedCollapsed) : false;
  });
  const { isAdmin } = useRole();
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);
      if (newIsMobile) {
        setCollapsed(false);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setTheme(darkMode);
  }, [darkMode]);
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
    }
  }, [collapsed, isMobile]);
  useEffect(() => {
    if (scroll == null ? void 0 : scroll.y) {
      window.scrollTo(0, scroll.y);
    }
  }, [scroll]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleCollapse = () => {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };
  const handleLanguageChange = (langCode) => {
    setIsLoading(true);
    router.get(
      route("language.switch", langCode),
      {},
      {
        preserveState: true,
        preserveScroll: true,
        only: ["languages", "secili_dil"],
        onSuccess: () => {
          setIsLoading(false);
          window.location.reload();
        },
        onError: () => {
          setIsLoading(false);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex h-screen ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900" : "bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-300"} animate-gradient transition-all duration-500 ease-in-out`,
      children: [
        isLoading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx("div", { className: "h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white" }) }),
        sidebarOpen && isMobile && /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity",
            onClick: () => setSidebarOpen(false),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          Sidebar,
          {
            sidebarOpen,
            setSidebarOpen,
            darkMode,
            setShowLogoutModal,
            collapsed: isMobile ? false : collapsed,
            isAdmin: isAdmin()
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            Header$1,
            {
              sidebarOpen,
              setSidebarOpen,
              darkMode,
              toggleDarkMode,
              auth: { user: auth == null ? void 0 : auth.user },
              languages,
              secili_dil,
              header,
              collapsed: isMobile ? false : collapsed,
              setCollapsed,
              toggleCollapse,
              isMobile,
              setShowLogoutModal,
              onLanguageChange: handleLanguageChange
            }
          ),
          /* @__PURE__ */ jsx(
            "main",
            {
              className: `flex-1 overflow-y-auto overflow-x-hidden p-6 backdrop-blur-md backdrop-filter sm:p-8 lg:p-10 ${darkMode ? "text-gray-100" : "text-gray-900"} transition-all duration-500 ease-in-out`,
              children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          LogoutModal,
          {
            showLogoutModal,
            setShowLogoutModal,
            darkMode
          }
        )
      ]
    }
  );
}
export {
  Authenticated as A
};
