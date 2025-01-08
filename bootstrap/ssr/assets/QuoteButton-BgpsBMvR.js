import { jsx } from "react/jsx-runtime";
import { FaQuoteRight } from "react-icons/fa";
function QuoteButton({ onClick, t }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: "p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 \n                dark:hover:bg-gray-800 rounded-lg transition-colors",
      title: t("ticket.quote"),
      children: /* @__PURE__ */ jsx(FaQuoteRight, { className: "w-4 h-4" })
    }
  );
}
export {
  QuoteButton as default
};
