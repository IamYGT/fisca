import { jsxs, jsx } from "react/jsx-runtime";
import { P as Pagination } from "./Pagination-BVcvtzm9.js";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-CA30F8TA.js";
import { useForm, router, Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash/debounce.js";
import { useState, useEffect, useCallback, useMemo } from "react";
import { FaChartBar, FaCheck, FaClock, FaMoneyBillWave, FaSearch, FaSync, FaFilter, FaDownload, FaFileAlt, FaFileCsv, FaUser, FaEye, FaEdit, FaInfoCircle, FaTimesCircle, FaCheckCircle, FaBitcoin, FaUniversity } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
function Index({
  auth,
  transactions,
  filters,
  statuses,
  types,
  stats
}) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { data, setData } = useForm({
    search: filters.search || "",
    status: filters.status || "",
    type: filters.type || ""
  });
  useEffect(() => {
    setInitialLoad(false);
  }, []);
  const resetFilters = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      setShowFilters(false);
      setData({
        search: "",
        status: "",
        type: ""
      });
      router.get(
        route("admin.transactions.index"),
        {},
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => setIsLoading(false)
        }
      );
    }
  }, [isLoading, setData]);
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      if (!initialLoad) {
        setIsLoading(true);
        const searchQuery = query.trim();
        router.get(
          route("admin.transactions.index"),
          {
            search: searchQuery,
            status: data.status,
            type: data.type
          },
          {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(false)
          }
        );
      }
    }, 300),
    [data.status, data.type, initialLoad]
  );
  useEffect(() => {
    if (!initialLoad && data.search) {
      debouncedSearch(data.search);
    }
  }, [data.search]);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const exportData = (format) => {
    const data2 = transactions.data.map((t2) => ({
      reference_id: t2.reference_id,
      user: t2.user.name,
      email: t2.user.email,
      type: t2.type,
      amount: t2.amount,
      amount_usd: t2.amount_usd,
      exchange_rate: t2.exchange_rate,
      status: t2.status,
      bank_account: t2.bank_account,
      bank_id: t2.bank_id,
      crypto_address: t2.crypto_address,
      crypto_network: t2.crypto_network,
      crypto_fee: t2.crypto_fee,
      crypto_txid: t2.crypto_txid,
      processed_at: t2.processed_at ? new Date(t2.processed_at).toLocaleDateString("tr-TR") : "",
      created_at: new Date(t2.created_at).toLocaleDateString("tr-TR"),
      updated_at: new Date(t2.updated_at).toLocaleDateString("tr-TR"),
      notes: t2.notes
    }));
    let content;
    let mimeType;
    let fileExtension;
    if (format === "json") {
      content = JSON.stringify(data2, null, 2);
      mimeType = "application/json";
      fileExtension = "json";
    } else {
      const headers = [
        t("transaction.referenceId"),
        t("transaction.user"),
        t("common.email"),
        t("transaction.type"),
        t("transaction.amount"),
        t("transaction.amountUsd"),
        t("transaction.exchangeRate"),
        t("transaction.status"),
        t("transaction.bankAccount"),
        t("transaction.bank"),
        t("transaction.cryptoAddress"),
        t("transaction.cryptoNetwork"),
        t("transaction.cryptoFee"),
        t("transaction.cryptoTxid"),
        t("transaction.processedAt"),
        t("transaction.createdAt"),
        t("transaction.updatedAt"),
        t("transaction.notes")
      ];
      const csvContent = [
        headers.join(","),
        ...data2.map(
          (item) => Object.values(item).map((val) => `"${val}"`).join(",")
        )
      ].join("\n");
      content = csvContent;
      mimeType = "text/csv";
      fileExtension = "csv";
    }
    const fileName = `${t("transaction.transactions")}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${fileExtension}`;
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "cancelled":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };
  const getTypeColor = (type) => {
    switch (type) {
      case "bank_withdrawal":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
      case "crypto_withdrawal":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-4 w-4 text-green-500" });
      case "pending":
        return /* @__PURE__ */ jsx(FaClock, { className: "h-4 w-4 text-yellow-500" });
      case "cancelled":
        return /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-4 w-4 text-gray-500" });
      case "rejected":
        return /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-4 w-4 text-red-500" });
      default:
        return /* @__PURE__ */ jsx(FaInfoCircle, { className: "h-4 w-4 text-gray-500" });
    }
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case "bank_withdrawal":
        return /* @__PURE__ */ jsx(FaUniversity, { className: "h-4 w-4" });
      case "crypto_withdrawal":
        return /* @__PURE__ */ jsx(FaBitcoin, { className: "h-4 w-4" });
      default:
        return /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "h-4 w-4" });
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth,
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("admin.transactions") }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("admin.transactions") }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: containerVariants,
              className: "mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    variants: cardVariants,
                    className: "group overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:from-blue-900/30 dark:to-blue-800/30",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-blue-600 dark:text-blue-400", children: t("stats.totalTransactions") }),
                        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-3xl font-bold text-blue-700 dark:text-blue-300", children: stats.counts.total.toLocaleString() }),
                        /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-blue-500 dark:text-blue-400", children: t("stats.todayCount", { count: stats.today.count }) })
                      ] }),
                      /* @__PURE__ */ jsx(FaChartBar, { className: "h-12 w-12 text-blue-500/50 transition-transform group-hover:scale-110" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    variants: cardVariants,
                    className: "group overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:from-green-900/30 dark:to-green-800/30",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-green-600 dark:text-green-400", children: t("stats.completedTransactions") }),
                        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-3xl font-bold text-green-700 dark:text-green-300", children: stats.counts.completed.toLocaleString() }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-green-500 dark:text-green-400", children: [
                          (stats.counts.completed / stats.counts.total * 100).toFixed(1),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(FaCheck, { className: "h-12 w-12 text-green-500/50 transition-transform group-hover:scale-110" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    variants: cardVariants,
                    className: "group overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:from-amber-900/30 dark:to-amber-800/30",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-amber-600 dark:text-amber-400", children: t("stats.pendingTransactions") }),
                        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-3xl font-bold text-amber-700 dark:text-amber-300", children: stats.counts.pending.toLocaleString() }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-amber-500 dark:text-amber-400", children: [
                          (stats.counts.pending / stats.counts.total * 100).toFixed(1),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(FaClock, { className: "h-12 w-12 text-amber-500/50 transition-transform group-hover:scale-110" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    variants: cardVariants,
                    className: "group overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:from-purple-900/30 dark:to-purple-800/30",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-purple-600 dark:text-purple-400", children: t("stats.totalVolume") }),
                        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-3xl font-bold text-purple-700 dark:text-purple-300", children: new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0
                        }).format(stats.total_usd) }),
                        /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-purple-500 dark:text-purple-400", children: new Intl.NumberFormat("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                          maximumFractionDigits: 0
                        }).format(stats.total_try) })
                      ] }),
                      /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "h-12 w-12 text-purple-500/50 transition-transform group-hover:scale-110" })
                    ] })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 },
              className: "overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 p-6 dark:border-gray-700", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
                    /* @__PURE__ */ jsx("div", { className: "relative flex-1", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          className: "focus:ring-primary-500 w-full rounded-xl border-gray-200 py-3 pl-12 pr-4 text-base transition-all focus:ring-2 dark:border-gray-600 dark:bg-gray-700/50",
                          placeholder: t("common.searchPlaceholder"),
                          value: data.search,
                          onChange: (e) => {
                            const value = e.target.value;
                            setData("search", value);
                            if (!value.trim()) {
                              router.get(
                                route("admin.transactions.index"),
                                { ...data, search: "" },
                                {
                                  preserveState: true,
                                  preserveScroll: true
                                }
                              );
                              return;
                            }
                            debouncedSearch(value);
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(FaSearch, { className: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" }),
                      isLoading && /* @__PURE__ */ jsx(FaSync, { className: "absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-gray-400" })
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => setShowFilters(!showFilters),
                          className: `flex items-center rounded-xl px-4 py-2.5 transition-all ${showFilters ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"}`,
                          children: [
                            /* @__PURE__ */ jsx(FaFilter, { className: "mr-2 h-4 w-4" }),
                            t("common.filters"),
                            (data.status || data.type) && /* @__PURE__ */ jsx("span", { className: "bg-primary-500 ml-2 rounded-full px-2 py-0.5 text-xs text-white", children: [data.status, data.type].filter(Boolean).length })
                          ]
                        }
                      ),
                      (data.status || data.type || data.search) && /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: resetFilters,
                          className: "rounded-xl px-4 py-2.5 text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                          children: t("common.reset")
                        }
                      ),
                      /* @__PURE__ */ jsxs(Menu, { as: "div", className: "relative", children: [
                        /* @__PURE__ */ jsxs(Menu.Button, { className: "group flex items-center rounded-xl bg-primary-600 px-4 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow dark:bg-primary-700 dark:hover:bg-primary-600", children: [
                          /* @__PURE__ */ jsx(FaDownload, { className: "mr-2 h-4 w-4" }),
                          t("common.export")
                        ] }),
                        /* @__PURE__ */ jsx(
                          Transition,
                          {
                            enter: "transition duration-100 ease-out",
                            enterFrom: "transform scale-95 opacity-0",
                            enterTo: "transform scale-100 opacity-100",
                            leave: "transition duration-75 ease-out",
                            leaveFrom: "transform scale-100 opacity-100",
                            leaveTo: "transform scale-95 opacity-0",
                            children: /* @__PURE__ */ jsx(Menu.Items, { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "p-1", children: [
                              /* @__PURE__ */ jsx(Menu.Item, { children: ({ active }) => /* @__PURE__ */ jsxs(
                                "button",
                                {
                                  onClick: () => exportData("json"),
                                  className: `${active ? "bg-gray-100 dark:bg-gray-600" : ""} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-100`,
                                  children: [
                                    /* @__PURE__ */ jsx(FaFileAlt, { className: "mr-2 h-4 w-4" }),
                                    "JSON"
                                  ]
                                }
                              ) }),
                              /* @__PURE__ */ jsx(Menu.Item, { children: ({ active }) => /* @__PURE__ */ jsxs(
                                "button",
                                {
                                  onClick: () => exportData("csv"),
                                  className: `${active ? "bg-gray-100 dark:bg-gray-600" : ""} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-100`,
                                  children: [
                                    /* @__PURE__ */ jsx(FaFileCsv, { className: "mr-2 h-4 w-4" }),
                                    "CSV"
                                  ]
                                }
                              ) })
                            ] }) })
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(AnimatePresence, { children: showFilters && /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { height: 0, opacity: 0 },
                      animate: { height: "auto", opacity: 1 },
                      exit: { height: 0, opacity: 0 },
                      transition: { duration: 0.2 },
                      className: "overflow-hidden",
                      children: /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-1 gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-700/30 md:grid-cols-2", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300", children: t("transaction.status") }),
                          /* @__PURE__ */ jsxs(
                            "select",
                            {
                              value: data.status,
                              onChange: (e) => {
                                setData("status", e.target.value);
                                router.get(
                                  route("admin.transactions.index"),
                                  {
                                    ...data,
                                    status: e.target.value
                                  },
                                  {
                                    preserveState: true
                                  }
                                );
                              },
                              className: "w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700",
                              children: [
                                /* @__PURE__ */ jsx("option", { value: "", children: t("common.all") }),
                                statuses.map((status) => /* @__PURE__ */ jsx("option", { value: status, children: t(`status.${status}`) }, status))
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300", children: t("transaction.type") }),
                          /* @__PURE__ */ jsxs(
                            "select",
                            {
                              value: data.type,
                              onChange: (e) => {
                                setData("type", e.target.value);
                                router.get(
                                  route("admin.transactions.index"),
                                  {
                                    ...data,
                                    type: e.target.value
                                  },
                                  {
                                    preserveState: true
                                  }
                                );
                              },
                              className: "w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700",
                              children: [
                                /* @__PURE__ */ jsx("option", { value: "", children: t("common.all") }),
                                types.map((type) => /* @__PURE__ */ jsx("option", { value: type, children: t(`transaction.${type}`) }, type))
                              ]
                            }
                          )
                        ] })
                      ] })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 text-xs uppercase dark:bg-gray-700/50", children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: t("transaction.referenceId") }),
                    /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: t("transaction.user") }),
                    /* @__PURE__ */ jsx("th", { className: "hidden px-4 py-3 md:table-cell", children: t("transaction.type") }),
                    /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: t("transaction.amount") }),
                    /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: t("transaction.status") }),
                    /* @__PURE__ */ jsx("th", { className: "hidden px-4 py-3 lg:table-cell", children: t("transaction.lastUpdate") }),
                    /* @__PURE__ */ jsx("th", { className: "w-20 px-4 py-3", children: t("common.actions") })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-700", children: transactions.data.map((transaction) => /* @__PURE__ */ jsxs(
                    "tr",
                    {
                      className: "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50",
                      children: [
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium", children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: transaction.reference_id }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx("div", { className: "hidden h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 sm:flex", children: /* @__PURE__ */ jsx(FaUser, { className: "h-3 w-3 text-gray-500" }) }),
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsx("div", { className: "truncate font-medium", children: transaction.user.name }),
                            /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-gray-500", children: transaction.user.email })
                          ] })
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "hidden px-4 py-3 md:table-cell", children: /* @__PURE__ */ jsxs(
                          "span",
                          {
                            className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${getTypeColor(
                              transaction.type
                            )}`,
                            children: [
                              getTypeIcon(transaction.type),
                              /* @__PURE__ */ jsx("span", { className: "ml-1", children: t(`transaction.${transaction.type}`) })
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
                          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 dark:text-gray-100", children: new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD"
                          }).format(parseFloat(transaction.amount_usd)) }),
                          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: new Intl.NumberFormat("tr-TR", {
                            style: "currency",
                            currency: "TRY"
                          }).format(parseFloat(transaction.amount)) }),
                          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
                            t("transaction.rate"),
                            ":",
                            " ",
                            transaction.exchange_rate ? Number(transaction.exchange_rate).toFixed(4) : "-"
                          ] })
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs(
                          "span",
                          {
                            className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${getStatusColor(
                              transaction.status
                            )}`,
                            children: [
                              getStatusIcon(transaction.status),
                              /* @__PURE__ */ jsx("span", { className: "ml-1", children: t(`status.${transaction.status}`) })
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsx("td", { className: "hidden px-4 py-3 lg:table-cell", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: new Date(transaction.updated_at).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        }) }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1", children: [
                          /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route("admin.transactions.show", transaction.id),
                              className: "p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                              children: /* @__PURE__ */ jsx(FaEye, { className: "h-4 w-4" })
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route("admin.transactions.edit", transaction.id),
                              className: "p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                              children: /* @__PURE__ */ jsx(FaEdit, { className: "h-4 w-4" })
                            }
                          )
                        ] }) })
                      ]
                    },
                    transaction.id
                  )) })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 p-4 dark:border-gray-700", children: /* @__PURE__ */ jsx(Pagination, { links: transactions.links }) })
              ]
            }
          )
        ] }) }),
        isLoading && !initialLoad && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm dark:bg-black/40", children: /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800", children: /* @__PURE__ */ jsx(FaSync, { className: "text-primary-600 h-8 w-8 animate-spin" }) }) })
      ]
    }
  );
}
export {
  Index as default
};
