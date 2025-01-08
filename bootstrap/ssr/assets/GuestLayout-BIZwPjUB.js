import { jsxs, jsx } from "react/jsx-runtime";
import { g as getTheme, s as setTheme, T as ThemeToggle, L as LanguageSelector, A as ApplicationLogo } from "./ApplicationLogo-Cm2He-vj.js";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
function Guest({
  children,
  languages,
  secili_dil = {
    dil_id: 1,
    dil_kod: "tr",
    dil_baslik: "Türkçe"
  }
}) {
  const [darkMode, setDarkMode] = useState(getTheme());
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    sessionStorage.setItem("dil_kod", secili_dil.dil_kod);
  }, [secili_dil]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setTheme(darkMode);
  }, [darkMode]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
      className: `flex min-h-screen flex-col ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900" : "bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-300"} transition-all duration-500 ease-in-out`,
      children: [
        isLoading && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsx("div", { className: "h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end p-4 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx(
            ThemeToggle,
            {
              darkMode,
              toggleDarkMode
            }
          ),
          /* @__PURE__ */ jsx(
            LanguageSelector,
            {
              darkMode,
              languages,
              secili_dil,
              isMobile,
              onLanguageChange: handleLanguageChange
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-grow items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full px-6 py-4 sm:max-w-md", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2 },
              children: /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx(
                ApplicationLogo,
                {
                  mode: darkMode ? "dark" : "light",
                  className: "h-20 w-20 object-contain sm:h-36 sm:w-36"
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.4 },
              className: "backdrop-blur-lg backdrop-filter",
              children
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  Guest as G
};
