import { jsx, jsxs } from "react/jsx-runtime";
const Stats = () => {
  return /* @__PURE__ */ jsx("div", { className: "bg-white py-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8 text-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h5", { className: "text-4xl font-bold text-blue-900 mb-2", children: "2,457,726+" }),
      /* @__PURE__ */ jsxs("div", { className: "text-gray-600", children: [
        "complaint",
        /* @__PURE__ */ jsx("br", {}),
        "searches"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h5", { className: "text-4xl font-bold text-blue-900 mb-2", children: "3 days" }),
      /* @__PURE__ */ jsxs("div", { className: "text-gray-600", children: [
        "average",
        /* @__PURE__ */ jsx("br", {}),
        "resolution time"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h5", { className: "text-4xl font-bold text-blue-900 mb-2", children: "1,270+" }),
      /* @__PURE__ */ jsxs("div", { className: "text-gray-600", children: [
        "complaint",
        /* @__PURE__ */ jsx("br", {}),
        "resolved"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h5", { className: "text-4xl font-bold text-blue-900 mb-2", children: "30+" }),
      /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "memberships" })
    ] })
  ] }) }) });
};
export {
  Stats as default
};
