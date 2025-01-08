import { jsx, jsxs } from "react/jsx-runtime";
import { P as PriorityBadge, S as StatusBadge } from "./Badges-DUeZD0fO.js";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-C-BHxDfp.js";
import { a as formatDate } from "./ticket_format-Cs4F_5rM.js";
import { Head, Link } from "@inertiajs/react";
import { FaTicketAlt, FaComments, FaCheckCircle } from "react-icons/fa";
import "react";
import "./ApplicationLogo-Cm2He-vj.js";
import "react-icons/md";
import "framer-motion";
import "@tippyjs/react";
const StatCard = ({ title, value, icon: Icon, color, textColor, onClick }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick,
      className: `${color} rounded-xl p-6 shadow-sm transition-all hover:shadow-md ${textColor} ${onClick ? "cursor-pointer" : ""}`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-bold", children: value })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-white/10 p-3", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) })
      ] })
    }
  );
};
function Index({ auth, tickets, stats }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: { user: { ...auth.user, roles: auth.user.roles || [] } },
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("tickets.title") }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("tickets.title") }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: t("tickets.stats.total"),
                value: stats.total,
                icon: FaTicketAlt,
                color: "bg-indigo-500",
                textColor: "text-white"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: t("tickets.stats.open"),
                value: stats.open,
                icon: FaComments,
                color: "bg-blue-500",
                textColor: "text-white"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: t("tickets.stats.answered"),
                value: stats.answered,
                icon: FaCheckCircle,
                color: "bg-green-500",
                textColor: "text-white"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("tickets.create"),
              className: "inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700",
              children: [
                /* @__PURE__ */ jsx(FaTicketAlt, { className: "mr-2" }),
                t("tickets.create")
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: t("tickets.subject") }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: t("tickets.priority") }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: t("tickets.status") }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: t("tickets.lastReply") }),
              /* @__PURE__ */ jsx("th", { className: "relative px-6 py-3", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("common.actions") }) })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-700", children: tickets.data.map((ticket) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-gray-100", children: ticket.subject }) }),
              /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-center", children: /* @__PURE__ */ jsx(
                PriorityBadge,
                {
                  priority: ticket.priority
                }
              ) }),
              /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-center", children: /* @__PURE__ */ jsx(
                StatusBadge,
                {
                  status: ticket.status
                }
              ) }),
              /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400", children: formatDate(
                ticket.last_reply_at
              ) }),
              /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-right text-sm font-medium", children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route(
                    "tickets.show",
                    ticket.id
                  ),
                  className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300",
                  children: t("common.view")
                }
              ) })
            ] }, ticket.id)) })
          ] }) }) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
