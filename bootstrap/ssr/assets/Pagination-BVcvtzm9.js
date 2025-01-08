import { jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function Pagination({ links }) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-1", children: links.map((link, key) => {
    if (!link.url && link.label === "...") {
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: "px-4 py-2 text-gray-500 dark:text-gray-400",
          children: "..."
        },
        key
      );
    }
    return link.url ? /* @__PURE__ */ jsx(
      Link,
      {
        href: link.url,
        className: `px-4 py-2 text-sm rounded-md ${link.active ? "bg-primary-500 text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"}`,
        dangerouslySetInnerHTML: { __html: link.label }
      },
      key
    ) : /* @__PURE__ */ jsx(
      "span",
      {
        className: "px-4 py-2 text-sm text-gray-400 dark:text-gray-500",
        dangerouslySetInnerHTML: { __html: link.label }
      },
      key
    );
  }) });
}
export {
  Pagination as P
};
