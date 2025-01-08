import { jsx, jsxs } from "react/jsx-runtime";
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://ifcsa.co.uk/wp-content/uploads/2021/09/ifcsa-logo-white.png",
            alt: "IFCSA Logo",
            className: "h-12 mb-4"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: "International Financial Commission Supervisory Authority" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:text-center", children: /* @__PURE__ */ jsx("p", { className: "font-bold", children: "International Financial Commission Supervisor Authority services are absolutely free for traders" }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:text-right", children: /* @__PURE__ */ jsx("a", { href: "mailto:info@ifcsa.co.uk", className: "text-blue-400 hover:text-blue-300", children: "info@ifcsa.co.uk" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.location.href = "/check-your-broker",
            className: "w-full bg-blue-800 hover:bg-blue-700 py-2 px-4 rounded",
            children: "Check your Broker"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.location.href = "/resolving-a-dispute/how-to-file-a-complaint-dispute",
            className: "w-full bg-blue-800 hover:bg-blue-700 py-2 px-4 rounded",
            children: "File a Complaint"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.location.href = "/apply-for-membership",
            className: "w-full bg-blue-800 hover:bg-blue-700 py-2 px-4 rounded",
            children: "Apply for Membership"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: "Company" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/about/what-we-do", className: "hover:text-blue-400", children: "About Us" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/our-members", className: "hover:text-blue-400", children: "Our Members" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/resolving-a-dispute/dispute-resolution-process", className: "hover:text-blue-400", children: "Dispute Resolution Process" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/warning-list", className: "hover:text-blue-400", children: "Warning List" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: "Info" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/tips-for-all", className: "hover:text-blue-400", children: "Tips for all" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/about", className: "hover:text-blue-400", children: "About" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/about/commission-news", className: "hover:text-blue-400", children: "Commission News" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/check-your-broker", className: "hover:text-blue-400", children: "Check your Broker" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: "IFCSA MANAGEMENT LTD" }),
        /* @__PURE__ */ jsxs("address", { className: "not-italic", children: [
          "Two Snowhill, 2 Snow Hill Queensway,",
          /* @__PURE__ */ jsx("br", {}),
          "Birmingham B4 6GA, United Kingdom"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-gray-400 border-t border-gray-800 pt-8", children: [
      /* @__PURE__ */ jsx("p", { children: "International Financial Commission Supervisor Authority logo is a trademark of International Financial Commission Supervisor Authority Ltd." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "International Financial Commission Supervisor Authority © 2013 - ",
        (/* @__PURE__ */ new Date()).getFullYear()
      ] })
    ] })
  ] }) });
};
export {
  Footer as default
};
