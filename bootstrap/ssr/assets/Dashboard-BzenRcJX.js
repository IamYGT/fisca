import { jsxs, jsx } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-CA30F8TA.js";
import { CurrencyDollarIcon, ChatBubbleLeftIcon, BanknotesIcon, ClockIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaExchangeAlt } from "react-icons/fa";
import "react";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  color
}) => /* @__PURE__ */ jsxs(
  motion.div,
  {
    whileHover: { scale: 1.02 },
    className: `group relative overflow-hidden rounded-xl bg-gradient-to-br ${color} p-3 sm:p-6 shadow-lg transition-all duration-300`,
    children: [
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 sm:mt-2 text-lg sm:text-3xl font-bold text-gray-900 dark:text-white", children: value }),
          change && /* @__PURE__ */ jsx(
            "p",
            {
              className: `mt-1 text-xs sm:text-sm ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`,
              children: change
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/20 p-2 sm:p-3 shadow-inner transition-transform group-hover:scale-110 dark:bg-gray-800/20", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 sm:h-8 sm:w-8 text-gray-700 dark:text-gray-300" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute -right-4 -top-4 h-16 w-16 sm:h-32 sm:w-32 rounded-full bg-white/10 transition-transform group-hover:scale-110" })
    ]
  }
);
const ActivityItem = ({
  activity
}) => {
  const { t } = useTranslation();
  const getActivityRoute = (activity2) => {
    switch (activity2.type) {
      case "transaction":
        return route("transactions.show", { transaction: activity2.id });
      case "withdrawal":
        return route("withdrawal.request");
      case "ticket":
        return route("tickets.show", { ticket: activity2.id });
      default:
        return "#";
    }
  };
  const activityStyles = {
    transaction: {
      icon: BanknotesIcon,
      baseColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-400/10",
      borderColor: "border-blue-100 dark:border-blue-400/20"
    },
    withdrawal: {
      icon: ArrowTrendingUpIcon,
      baseColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-400/10",
      borderColor: "border-green-100 dark:border-green-400/20"
    },
    ticket: {
      icon: ChatBubbleLeftIcon,
      baseColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-400/10",
      borderColor: "border-purple-100 dark:border-purple-400/20"
    }
  };
  const style = activityStyles[activity.type];
  const Icon = style.icon;
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      if (isNaN(date.getTime())) {
        return dateString;
      }
      const diffInMinutes = Math.floor((date.getTime() - now.getTime()) / (1e3 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const rtf = new Intl.RelativeTimeFormat("tr", { numeric: "auto" });
      if (Math.abs(diffInMinutes) < 60) {
        return rtf.format(diffInMinutes, "minute");
      } else if (Math.abs(diffInHours) < 24) {
        return rtf.format(diffInHours, "hour");
      } else if (Math.abs(diffInDays) < 30) {
        return rtf.format(diffInDays, "day");
      } else {
        return new Intl.DateTimeFormat("tr", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }).format(date);
      }
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };
  return /* @__PURE__ */ jsx(Link, { href: getActivityRoute(activity), children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: `group relative flex items-start gap-4 rounded-xl border p-4 mb-4
                    transition-all duration-300
                    hover:shadow-lg hover:scale-[1.01]
                    dark:border-gray-700/50 ${style.borderColor}
                    cursor-pointer
                    hover:bg-gray-50/90 dark:hover:bg-gray-700/50
                    bg-white/95 dark:bg-gray-800/95
                    backdrop-blur-sm
                    border-l-4 ${style.borderColor}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
          /* @__PURE__ */ jsx("div", { className: `rounded-full p-2.5 ${style.bgColor} shadow-sm ring-4 ring-white dark:ring-gray-800`, children: /* @__PURE__ */ jsx(Icon, { className: `h-4 w-4 ${style.baseColor}` }) }),
          !activity.isLast && /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute left-1/2 top-12 h-full w-0.5 -translate-x-1/2\n                            bg-gradient-to-b from-gray-200 to-transparent\n                            dark:from-gray-700"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900 dark:text-gray-100 truncate", children: activity.user }),
              /* @__PURE__ */ jsxs("span", { className: "shrink-0 text-sm text-gray-500 dark:text-gray-400", children: [
                "• ",
                formatTime(activity.created_at)
              ] })
            ] }),
            activity.amount_usd && /* @__PURE__ */ jsx("div", { className: "sm:ml-auto", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold
                                    shadow-sm ring-1 ring-inset
                                    ${activity.status === "completed" ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30" : "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/30"}`, children: new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(activity.amount_usd) }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: t(`activity.${activity.type}`, {
            amount: activity.amount_usd ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(activity.amount_usd) : "-"
          }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium
                            shadow-sm ring-1 ring-inset
                            ${activity.status === "completed" ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30" : activity.status === "pending" ? "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30" : "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/30"}`, children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
                                    ${activity.status === "completed" ? "bg-green-400" : activity.status === "pending" ? "bg-amber-400" : "bg-red-400"}`
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `relative inline-flex rounded-full h-2 w-2
                                    ${activity.status === "completed" ? "bg-green-500" : activity.status === "pending" ? "bg-amber-500" : "bg-red-500"}`
                }
              )
            ] }),
            t(`status.${activity.status}`)
          ] }) })
        ] })
      ]
    }
  ) });
};
const UserWelcome = ({ userName }) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-8 shadow-lg",
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-3xl font-bold text-white", children: t("dashboard.welcome", { name: userName }) }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 h-32 sm:h-64 w-32 sm:w-64 rounded-full bg-white/10" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-10 -left-10 h-32 sm:h-64 w-32 sm:w-64 rounded-full bg-white/10" })
      ]
    }
  );
};
const IbanList = ({ ibans }) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100", children: t("dashboard.myIbans") }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t("dashboard.registeredIbans") })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("profile.ibans.index"),
          className: "inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-400/10 dark:text-blue-400 dark:hover:bg-blue-400/20 transition-colors duration-200",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
            t("common.addNew")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: ibans.map((iban) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4\n                            transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50\n                            hover:border-blue-100 dark:hover:border-blue-900/50",
        children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50\n                                        dark:bg-gray-700/50 text-gray-400 dark:text-gray-500", children: /* @__PURE__ */ jsx(BanknotesIcon, { className: "h-6 w-6" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "truncate font-medium text-gray-900 dark:text-gray-100", children: iban.bank_name }),
              iban.is_default && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs\n                                                font-medium text-green-700 ring-1 ring-inset ring-green-600/20\n                                                dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30", children: t("common.default") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-gray-600 dark:text-gray-400", children: iban.iban.replace(/(.{4})/g, "$1 ") }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => navigator.clipboard.writeText(iban.iban),
                  className: "rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700\n                                                text-gray-400 hover:text-gray-600 dark:text-gray-500\n                                                dark:hover:text-gray-300 transition-colors",
                  title: t("common.copyToClipboard"),
                  children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    }
                  ) })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("profile.ibans.index"),
              className: "rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700\n                                            text-gray-400 hover:text-gray-600 dark:text-gray-500\n                                            dark:hover:text-gray-300 transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                }
              ) })
            }
          ) })
        ] }) })
      },
      iban.id
    )) })
  ] });
};
function Dashboard({ auth, stats }) {
  const { t } = useTranslation();
  const quickActions = [
    {
      icon: FaExchangeAlt,
      label: t("dashboard.transactions"),
      href: route("transactions.history"),
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      icon: CurrencyDollarIcon,
      label: t("dashboard.withdrawal"),
      href: route("withdrawal.request"),
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      icon: ChatBubbleLeftIcon,
      label: t("dashboard.supportTickets"),
      href: route("tickets.index"),
      color: "from-amber-500 to-amber-600",
      hoverColor: "hover:from-amber-600 hover:to-amber-700"
    },
    {
      icon: BanknotesIcon,
      label: t("dashboard.ibanManagement"),
      href: route("profile.ibans.index"),
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth,
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("dashboard") }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("dashboard") }),
        /* @__PURE__ */ jsx("div", { className: "py-6 sm:py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx(UserWelcome, { userName: auth.user.name }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4", children: [
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: t("dashboard.totalTransactions"),
                value: stats.transactions.total,
                icon: BanknotesIcon,
                color: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: t("dashboard.totalWithdrawn"),
                value: new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(stats.transactions.totalWithdrawn_usd),
                icon: CurrencyDollarIcon,
                color: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: t("dashboard.pendingTransactions"),
                value: stats.transactions.pending,
                icon: ClockIcon,
                color: "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: t("dashboard.openTickets"),
                value: stats.tickets.open,
                icon: ChatBubbleLeftIcon,
                color: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100", children: t("dashboard.recentActivity") }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("transactions.history"),
                  className: "inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
                  children: [
                    t("common.viewAll"),
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: stats.recentActivity.slice(0, 3).map((activity, index, array) => /* @__PURE__ */ jsx(
              ActivityItem,
              {
                activity: {
                  ...activity,
                  isLast: index === array.length - 1
                }
              },
              `${activity.type}-${activity.id}`
            )) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4", children: quickActions.map((action, index) => /* @__PURE__ */ jsx(Link, { href: action.href, className: "block", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              whileHover: { scale: 1.03 },
              className: `group relative overflow-hidden rounded-xl bg-gradient-to-br ${action.color} p-4 sm:p-6 shadow-lg transition-all duration-300 ${action.hoverColor}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center space-y-2 sm:space-y-3 text-white", children: [
                  /* @__PURE__ */ jsx(action.icon, { className: "h-6 w-6 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-medium text-center", children: action.label })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute -right-4 -top-4 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-white/10 transition-transform group-hover:scale-110" })
              ]
            }
          ) }, index)) }),
          /* @__PURE__ */ jsx(IbanList, { ibans: stats.ibans })
        ] }) })
      ]
    }
  );
}
export {
  Dashboard as default
};
