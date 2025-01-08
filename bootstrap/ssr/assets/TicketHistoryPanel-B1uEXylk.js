import { jsx, jsxs } from "react/jsx-runtime";
import { FaHistory, FaTag, FaCheckCircle, FaReply, FaExchangeAlt } from "react-icons/fa";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import "react";
function TicketHistoryPanel({ history }) {
  const { t } = useTranslation();
  if (!history || history.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: t("ticket.noHistory") }) });
  }
  const getIcon = (type) => {
    switch (type) {
      case "status":
        return /* @__PURE__ */ jsx(FaExchangeAlt, { className: "w-4 h-4 text-blue-500" });
      case "reply":
        return /* @__PURE__ */ jsx(FaReply, { className: "w-4 h-4 text-green-500" });
      case "create":
        return /* @__PURE__ */ jsx(FaCheckCircle, { className: "w-4 h-4 text-purple-500" });
      case "priority":
        return /* @__PURE__ */ jsx(FaTag, { className: "w-4 h-4 text-orange-500" });
      default:
        return /* @__PURE__ */ jsx(FaHistory, { className: "w-4 h-4 text-gray-400" });
    }
  };
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short"
    });
  };
  const groupedHistory = history.reduce((groups, item) => {
    const date = new Date(item.created_at).toLocaleDateString("tr-TR");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.entries(groupedHistory).map(([date, items]) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: formatDate(items[0].created_at) }),
    items.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 py-2", children: [
      /* @__PURE__ */ jsx("div", { className: "mt-1", children: getIcon(item.type) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700 dark:text-gray-300", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 dark:text-gray-100", children: item.user.name }),
          " ",
          t(`ticket.actions.${item.action.replace("ticket.", "")}`, item.params)
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: formatTime(item.created_at) })
      ] })
    ] }, item.id))
  ] }, date)) });
}
export {
  TicketHistoryPanel as default
};
