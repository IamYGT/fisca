import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle } from "lucide-react";
const News = () => {
  return /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-blue-900 mb-6", children: "Company News" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-12 h-12 text-red-500" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: /* @__PURE__ */ jsx("a", { href: "/scam-alert-ayox-trade", className: "hover:text-blue-600", children: "Scam Alert - Ayox Trade" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm mb-2", children: "Sep 27, 2021" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Important Notice to Investors: AyoxTrade is an internationally unregistered brokerage house..." }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/scam-alert-ayox-trade",
                className: "text-blue-600 hover:text-blue-800 mt-2 inline-block",
                children: "Learn more"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-12 h-12 text-red-500" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: /* @__PURE__ */ jsx("a", { href: "/scam-alert-xprime-capital", className: "hover:text-blue-600", children: "Scam Alert - xPrime Capital" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm mb-2", children: "Aug 12, 2021" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Important Notice to Investors: xPrime Capital is an internationally unregistered brokerage house..." }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/scam-alert-xprime-capital",
                className: "text-blue-600 hover:text-blue-800 mt-2 inline-block",
                children: "Learn more"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-blue-900 mb-6", children: "Quick Links" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Who can make a complaint?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2", children: "Traders of our broker members can file complaints absolutely free" }),
          /* @__PURE__ */ jsx("a", { href: "/our-members", className: "text-blue-600 hover:text-blue-800", children: "See our Members" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "Who decides the outcome of the complaints?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2", children: "The Dispute Resolution Committee accepts, investigates and issues decisions on complaints" }),
          /* @__PURE__ */ jsx("a", { href: "/about/ifcsa-leadership", className: "text-blue-600 hover:text-blue-800", children: "MEET OUR TEAM" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", children: "How does the process work?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2", children: "The dispute resolution process is simple and straightforward for all parties" }),
          /* @__PURE__ */ jsx("a", { href: "/resolving-a-dispute/dispute-resolution-process", className: "text-blue-600 hover:text-blue-800", children: "REVIEW THE PHASES" })
        ] })
      ] })
    ] })
  ] }) }) });
};
export {
  News as default
};
