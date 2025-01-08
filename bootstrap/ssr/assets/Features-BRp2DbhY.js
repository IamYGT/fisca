import { jsx, jsxs } from "react/jsx-runtime";
const Features = () => {
  return /* @__PURE__ */ jsx("div", { className: "bg-gray-100 py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-blue-900 mb-4", children: "Resolution Disputes" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "IFCSA is a resolution body that comes to a conclusion on disputes between the brokerage house and the investor, especially in the forex market. At this point, in the evaluations made in defense of investor rights, the company has the legal authority to file a lawsuit on behalf of the investor." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-blue-900 mb-4", children: "Membership" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "We bring together more than 30 brokers, technology and stock exchange companies that have earned the highest success and respect in their activities." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-blue-900 mb-4", children: "Guaranteed Funds" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "By managing a solution-oriented process with the institution with which you have a disagreement, we ensure the return of guaranteed funds up to 50.000 € in line with the rights of the investor." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-8", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/tradefora",
          className: "bg-blue-900 text-white text-center py-3 px-6 rounded hover:bg-blue-800 transition-colors",
          children: "Check Market Prices"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/financial-regulators",
          className: "bg-blue-900 text-white text-center py-3 px-6 rounded hover:bg-blue-800 transition-colors",
          children: "Search Financial Regulators"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/tips-for-all",
          className: "bg-blue-900 text-white text-center py-3 px-6 rounded hover:bg-blue-800 transition-colors",
          children: "Get Tips For All"
        }
      )
    ] })
  ] }) });
};
export {
  Features as default
};
