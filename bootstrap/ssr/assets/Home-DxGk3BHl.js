import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import Header from "./Header-B--zoGwX.js";
import Features from "./Features-BRp2DbhY.js";
import Stats from "./Stats-CO-nqWOM.js";
import News from "./News-QjgCOwUy.js";
import Footer from "./Footer-CmrxVAPM.js";
import "react";
import "lucide-react";
const Home = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "IFCSA - International Financial Commission Supervisory Authority" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "International Financial Commission Supervisory Authority - Protecting traders' interests and ensuring fair practices in the financial markets"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
        /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6", children: "International Financial Commission Supervisory Authority" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl mb-8", children: "Protecting traders' interests and ensuring fair practices in the financial markets" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/check-your-broker",
                className: "inline-block bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors",
                children: "Check Your Broker"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/apply-for-membership",
                className: "inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors",
                children: "Apply for Membership"
              }
            )
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Features, {}),
        /* @__PURE__ */ jsx(Stats, {}),
        /* @__PURE__ */ jsx(News, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
};
export {
  Home as default
};
