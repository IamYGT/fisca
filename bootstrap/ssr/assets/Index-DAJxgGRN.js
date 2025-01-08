import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { useForm, Head, router, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CA30F8TA.js";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { FaTicketAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaSearch, FaFilter, FaEye } from "react-icons/fa";
import { P as Pagination } from "./Pagination-BVcvtzm9.js";
import { AnimatePresence, motion } from "framer-motion";
import debounce from "lodash/debounce.js";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
const StatCard = ({ title, value, icon: Icon, color, textColor, onClick }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: `${color} rounded-2xl shadow-sm p-6 ${textColor} ${onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}`,
    onClick,
    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold mt-2", children: value })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/10 rounded-xl", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6" }) })
    ] })
  }
);
function Index({ auth, tickets, filters = {}, statuses, priorities, categories, stats }) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const defaultFilters = {
    search: "",
    status: "",
    priority: "",
    category: "",
    sort: "",
    direction: "asc",
    page: "1"
  };
  const { data, setData, reset } = useForm({
    ...defaultFilters,
    ...filters
  });
  const [sortState, setSortState] = useState({
    column: data.sort || "",
    direction: data.direction || "asc"
  });
  const resetFilters = () => {
    reset();
    router.get(route("admin.tickets.index"), defaultFilters);
  };
  const applyFilters = (newData) => {
    router.get(route("admin.tickets.index"), {
      ...newData,
      page: "1"
      // Her filtre değişiminde ilk sayfaya dön
    }, {
      preserveState: true,
      preserveScroll: false,
      onBefore: () => setIsLoading(true),
      onFinish: () => {
        setIsLoading(false);
        setShowFilters(false);
      },
      onError: () => {
        setIsLoading(false);
        resetFilters();
      }
    });
  };
  const handleSearch = useCallback(
    debounce((query) => {
      if (!initialLoad) {
        const newData = { ...data, search: query, page: "1" };
        setData(newData);
        applyFilters(newData);
      }
    }, 300),
    [data, initialLoad]
  );
  useEffect(() => {
    if (!initialLoad) {
      applyFilters(data);
    }
  }, [data.status, data.priority, data.category]);
  const handleSort = useCallback((column) => {
    const newDirection = sortState.column === column && sortState.direction === "asc" ? "desc" : "asc";
    const newSortState = {
      column,
      direction: newDirection
    };
    setSortState(newSortState);
    const newData = {
      ...data,
      sort: column,
      direction: newDirection,
      page: "1"
      // Sıralama değiştiğinde ilk sayfaya dön
    };
    setData(newData);
    applyFilters(newData);
  }, [sortState, data]);
  const handleStatCardClick = (filterType, value) => {
    const newData = {
      ...defaultFilters,
      [filterType]: value,
      page: "1"
    };
    setData(newData);
    applyFilters(newData);
  };
  const SortableHeader = ({ column, children }) => {
    const isActive = sortState.column === column;
    return /* @__PURE__ */ jsx(
      "th",
      {
        scope: "col",
        className: `px-6 py-4 text-left text-xs font-medium tracking-wider whitespace-nowrap cursor-pointer transition-colors
                    ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`,
        onClick: () => handleSort(column),
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
          /* @__PURE__ */ jsx("span", { children }),
          isActive && /* @__PURE__ */ jsx("span", { className: "text-indigo-600 dark:text-indigo-400", children: sortState.direction === "asc" ? "↑" : "↓" })
        ] })
      }
    );
  };
  useEffect(() => {
    setInitialLoad(false);
  }, []);
  return /* @__PURE__ */ jsxs(Authenticated, { auth, children: [
    /* @__PURE__ */ jsx(Head, { title: t("admin.tickets") }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6", children: [
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: t("stats.totalTickets"),
            value: stats.total,
            icon: FaTicketAlt,
            color: "bg-gradient-to-br from-indigo-500 to-purple-600",
            textColor: "text-white",
            onClick: resetFilters
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: t("stats.openTickets"),
            value: stats.open,
            icon: FaClock,
            color: "bg-gradient-to-br from-amber-500 to-orange-600",
            textColor: "text-white",
            onClick: () => handleStatCardClick("status", "open")
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: t("stats.answeredTickets"),
            value: stats.answered,
            icon: FaCheckCircle,
            color: "bg-gradient-to-br from-emerald-500 to-teal-600",
            textColor: "text-white",
            onClick: () => handleStatCardClick("status", "answered")
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: t("stats.highPriority"),
            value: stats.high_priority,
            icon: FaExclamationCircle,
            color: "bg-gradient-to-br from-rose-500 to-red-600",
            textColor: "text-white",
            onClick: () => handleStatCardClick("priority", "high")
          }
        )
      ] }),
      tickets.data.length === 0 && !isLoading && /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsx(FaTicketAlt, { className: "mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900 dark:text-gray-100", children: t("ticket.noTickets") }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t("ticket.noTicketsDescription") }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: resetFilters,
            className: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: t("common.resetFilters")
          }
        ) })
      ] }),
      isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-12", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-200/50 dark:border-gray-700/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-gray-100", children: t("admin.tickets") }),
              /* @__PURE__ */ jsxs("div", { className: "relative max-w-md", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: t("common.search"),
                    className: "w-full pl-12 pr-4 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow duration-150",
                    value: data.search,
                    onChange: (e) => {
                      setData("search", e.target.value);
                      handleSearch(e.target.value);
                    }
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(FaSearch, { className: "w-4 h-4 text-gray-400" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setShowFilters(!showFilters),
                className: `inline-flex items-center px-5 py-3 rounded-xl text-sm font-medium transition-all duration-150
                                            ${showFilters ? "bg-indigo-500 text-white hover:bg-indigo-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"}`,
                children: [
                  /* @__PURE__ */ jsx(FaFilter, { className: `w-4 h-4 mr-2 ${showFilters ? "text-white" : "text-gray-500 dark:text-gray-400"}` }),
                  t("common.filters")
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: showFilters && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.2 },
              className: "mt-6",
              children: /* @__PURE__ */ jsx("div", { className: "p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 rounded-xl border border-gray-200/50 dark:border-gray-700/50", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: t("ticket.status") }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: data.status,
                      onChange: (e) => setData("status", e.target.value),
                      className: "w-full py-3 pl-4 pr-10 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: t("ticket.allStatuses") }),
                        statuses.map((status) => /* @__PURE__ */ jsx("option", { value: status, children: t(`ticket.status.${status}`) }, status))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: t("ticket.priority") }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: data.priority,
                      onChange: (e) => setData("priority", e.target.value),
                      className: "w-full py-3 pl-4 pr-10 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: t("ticket.allPriorities") }),
                        priorities.map((priority) => /* @__PURE__ */ jsx("option", { value: priority, children: t(`ticket.priority.${priority}`) }, priority))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: t("ticket.category") }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: data.category,
                      onChange: (e) => setData("category", e.target.value),
                      className: "w-full py-3 pl-4 pr-10 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: t("ticket.allCategories") }),
                        categories.map((category) => /* @__PURE__ */ jsx("option", { value: category, children: t(`ticket.category.${category}`) }, category))
                      ]
                    }
                  )
                ] })
              ] }) })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx("div", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: [
              /* @__PURE__ */ jsx(SortableHeader, { column: "subject", children: t("ticket.subject") }),
              /* @__PURE__ */ jsx(SortableHeader, { column: "user", children: t("ticket.user") }),
              /* @__PURE__ */ jsx(SortableHeader, { column: "priority", children: t("ticket.priority") }),
              /* @__PURE__ */ jsx(SortableHeader, { column: "status", children: t("ticket.status") }),
              /* @__PURE__ */ jsx(SortableHeader, { column: "last_reply_at", children: t("ticket.lastReply") }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap", children: t("common.actions") })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: tickets.data.map((ticket, index) => /* @__PURE__ */ jsxs(
              "tr",
              {
                className: `group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/30 dark:bg-gray-800/30"}`,
                children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "text-sm font-medium text-gray-900 dark:text-gray-100 group relative",
                        title: ticket.subject,
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx("span", { className: "cursor-help", children: truncateText(ticket.subject, 60) }) }),
                          /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("span", { className: "cursor-help", children: truncateText(ticket.subject, 30) }) }),
                          /* @__PURE__ */ jsxs("div", { className: "absolute z-10 invisible group-hover:visible bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg py-2 px-3 -top-10 left-1/2 transform -translate-x-1/2 w-auto max-w-xs", children: [
                            ticket.subject,
                            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-700" })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "md:hidden mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400", children: [
                      /* @__PURE__ */ jsx("div", { className: "h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-gray-600 dark:text-gray-300", children: ticket.user.name.charAt(0).toUpperCase() }) }),
                      /* @__PURE__ */ jsx("span", { className: "truncate max-w-[120px]", children: ticket.user.name })
                    ] })
                  ] }) }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap hidden md:table-cell", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-600 dark:text-gray-300", children: ticket.user.name.charAt(0).toUpperCase() }) }),
                    /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400",
                          onClick: () => {
                            setData("search", ticket.user.name);
                            router.get(route("admin.tickets.index", { search: ticket.user.name }));
                          },
                          children: ticket.user.name
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]", children: ticket.user.email })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-center", children: /* @__PURE__ */ jsx(PriorityBadge, { priority: ticket.priority }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-center", children: /* @__PURE__ */ jsx(StatusBadge, { status: ticket.status }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell", children: formatDate(ticket.last_reply_at) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-3", children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("admin.tickets.show", ticket.id),
                      className: "p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700",
                      children: /* @__PURE__ */ jsx(FaEye, { className: "w-5 h-5" })
                    }
                  ) }) })
                ]
              },
              ticket.id
            )) })
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "sticky bottom-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800", children: /* @__PURE__ */ jsx(Pagination, { links: tickets.links }) })
        ] })
      ] })
    ] }) })
  ] });
}
const PriorityBadge = ({ priority }) => {
  const colors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  return /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${colors[priority]}`, children: priority });
};
const StatusBadge = ({ status }) => {
  const colors = {
    open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    answered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  };
  return /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`, children: status });
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
export {
  Index as default
};
