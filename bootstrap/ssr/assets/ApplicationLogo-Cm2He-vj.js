import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, memo, useState, useRef, useCallback } from "react";
import { MdCheck, MdExpandMore, MdLightMode, MdDarkMode } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
const getTheme = () => {
  const theme = localStorage.getItem("theme");
  return theme === "dark";
};
const setTheme = (isDark) => {
  localStorage.setItem("theme", isDark ? "dark" : "light");
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
const useOnClickOutside = (ref, handler, ignoredRefs) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      if (ignoredRefs) {
        for (const ignoredRef of ignoredRefs) {
          if (ignoredRef.current && ignoredRef.current.contains(event.target)) {
            return;
          }
        }
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, ignoredRefs]);
};
const LanguageSelector = ({
  darkMode,
  languages,
  secili_dil,
  isMobile,
  embedded = false,
  onLanguageChange
  // Prop eklendi
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setDropdownOpen(false));
  const getFlagUrl = useCallback((langCode) => {
    const langToCountryCode = { en: "gb", tr: "tr" };
    const countryCode = langToCountryCode[langCode.toLowerCase()] || langCode.toLowerCase();
    return `https://flagcdn.com/w160/${countryCode}.png`;
  }, []);
  const handleLanguageChange = useCallback((langCode) => {
    onLanguageChange(langCode);
  }, [onLanguageChange]);
  const dropdownItemClasses = useCallback((isSelected = false) => `
        flex items-center justify-between w-full text-left px-3 py-2 text-sm transition-all duration-200 ease-in-out
        ${darkMode ? `${isSelected ? "bg-gray-700" : ""} hover:bg-gray-700 text-gray-200` : `${isSelected ? "bg-gray-200" : ""} hover:bg-gray-200 text-gray-900`}
        rounded-lg
    `, [darkMode]);
  const FlagImage = memo(({ langCode, alt, className }) => {
    return /* @__PURE__ */ jsx("div", { className: `relative overflow-hidden ${className}`, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: getFlagUrl(langCode),
        alt,
        className: "absolute inset-0 w-full h-full object-contain",
        style: {
          imageRendering: "crisp-edges",
          transform: "scale(0.80)"
        }
      }
    ) });
  });
  if (embedded) {
    return /* @__PURE__ */ jsx("div", { className: "space-y-1 p-1", children: languages.map((lang) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleLanguageChange(lang.dil_kod),
        className: `
                            flex items-center justify-between w-full text-left px-3 py-2 text-sm
                            ${darkMode ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-200 text-gray-900"}
                            rounded-lg
                        `,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              FlagImage,
              {
                langCode: lang.dil_kod,
                alt: `${lang.dil_baslik} bayrağı`,
                className: "w-7 h-7 mr-2 rounded-full shadow-sm flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: `font-medium ${lang.dil_kod === secili_dil.dil_kod ? darkMode ? "text-white" : "text-gray-900" : ""}`, children: lang.dil_baslik })
          ] }),
          lang.dil_kod === secili_dil.dil_kod && /* @__PURE__ */ jsx(MdCheck, { className: `w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}` })
        ]
      },
      lang.dil_id
    )) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setDropdownOpen((prev) => !prev),
        className: `
                    flex items-center justify-center px-3 py-2 rounded-full
                    focus:outline-none focus:ring-2 focus:ring-opacity-50
                    shadow-md hover:shadow-lg backdrop-filter backdrop-blur-sm
                    ${darkMode ? "bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-600" : "bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-300"}
                `,
        "aria-label": "Dil seç",
        children: [
          /* @__PURE__ */ jsx(
            FlagImage,
            {
              langCode: secili_dil.dil_kod,
              alt: `${secili_dil.dil_baslik} bayrağı`,
              className: "w-7 h-7 rounded-full shadow-sm flex-shrink-0 overflow-hidden"
            }
          ),
          !isMobile && /* @__PURE__ */ jsx("span", { className: "hidden sm:inline font-medium text-sm ml-2 mr-1", children: secili_dil.dil_baslik }),
          /* @__PURE__ */ jsx(MdExpandMore, { className: `w-5 h-5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}` })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: dropdownOpen && !embedded && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: -5 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -5 },
        transition: { duration: 0.15, ease: "easeOut" },
        className: `
                            absolute right-0 mt-2 w-52 rounded-lg shadow-lg backdrop-blur-sm p-1.5 z-30
                            ${darkMode ? "bg-gray-800 border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-900"}
                        `,
        children: /* @__PURE__ */ jsx("div", { className: "space-y-0.5", children: languages.map((lang) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleLanguageChange(lang.dil_kod),
            className: dropdownItemClasses(lang.dil_kod === secili_dil.dil_kod),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  FlagImage,
                  {
                    langCode: lang.dil_kod,
                    alt: `${lang.dil_baslik} bayrağı`,
                    className: "w-6 h-6 mr-2 rounded-full shadow-sm flex-shrink-0 overflow-hidden"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: lang.dil_baslik })
              ] }),
              lang.dil_kod === secili_dil.dil_kod && /* @__PURE__ */ jsx(MdCheck, { className: `w-4 h-4 ${darkMode ? "text-green-500" : "text-green-600"}` })
            ]
          },
          lang.dil_id
        )) })
      }
    ) })
  ] });
};
const LanguageSelector$1 = memo(LanguageSelector);
const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleDarkMode,
      className: `
                flex items-center justify-center p-2 sm:p-2.5 rounded-full transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-opacity-50
                shadow-md hover:shadow-lg backdrop-filter backdrop-blur-lg
                ${darkMode ? "bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-600" : "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300"}
            `,
      "aria-label": "Tema değiştir",
      children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: darkMode ? /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, rotate: -180 },
          animate: { opacity: 1, rotate: 0 },
          exit: { opacity: 0, rotate: 180 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ jsx(MdLightMode, { className: "w-5 h-5 sm:w-6 sm:h-6" })
        },
        "light"
      ) : /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, rotate: 180 },
          animate: { opacity: 1, rotate: 0 },
          exit: { opacity: 0, rotate: -180 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ jsx(MdDarkMode, { className: "w-5 h-5 sm:w-6 sm:h-6" })
        },
        "dark"
      ) })
    }
  );
};
function ApplicationLogo({
  mode = "light",
  size = "medium",
  collapsed = false,
  className,
  ...props
}) {
  if (collapsed) {
    return /* @__PURE__ */ jsx(
      "img",
      {
        src: "/assets/mavi_kucuk.png",
        alt: "Logo",
        className,
        ...props
      }
    );
  }
  const logoSrc = mode === "dark" ? "/assets/beyaz.png" : "/assets/siyah.png";
  const sizeClasses = {
    small: "h-8 w-auto sm:h-10",
    medium: "h-12 w-auto sm:h-14",
    large: "h-16 w-auto sm:h-20"
  };
  const combinedClassName = `${sizeClasses[size]} ${className || ""}`.trim();
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: logoSrc,
      alt: "Logo",
      className: combinedClassName,
      ...props
    }
  );
}
export {
  ApplicationLogo as A,
  LanguageSelector$1 as L,
  ThemeToggle as T,
  getTheme as g,
  setTheme as s,
  useOnClickOutside as u
};
