import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-B41ZkwdL.js";
import { p as parseAmount, g as getStatusColor } from "./format-DHO-As0T.js";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHashtag, FaDollarSign, FaBuilding, FaCreditCard, FaUser, FaCalendar, FaTicketAlt, FaWallet, FaCopy, FaExternalLinkAlt, FaNetworkWired, FaMoneyBillWave, FaInfoCircle, FaTimesCircle, FaClock, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
const StatusBadge = ({ status }) => {
  const { t } = useTranslation();
  const getIcon = (status2) => {
    switch (status2) {
      case "completed":
        return /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-4 w-4" });
      case "pending":
      case "waiting":
        return /* @__PURE__ */ jsx(FaClock, { className: "h-4 w-4" });
      case "rejected":
        return /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-4 w-4" });
      default:
        return /* @__PURE__ */ jsx(FaInfoCircle, { className: "h-4 w-4" });
    }
  };
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium ${getStatusColor(
        status
      )}`,
      children: [
        getIcon(status),
        t(`transaction.status.${status}`)
      ]
    }
  );
};
const DetailCard = ({ icon: Icon, title, value, className = "" }) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: `group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${className}`,
    children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-50 transition-opacity duration-300 group-hover:opacity-100" }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600 dark:text-gray-400", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: value })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/90 p-4 shadow-lg ring-1 ring-black/5 dark:bg-gray-800", children: /* @__PURE__ */ jsx(Icon, { className: "h-8 w-8 transition-transform duration-300 group-hover:scale-110" }) })
      ] })
    ]
  }
);
const getTransactionType = (type) => {
  switch (type) {
    case "bank_withdrawal":
      return "Banka Havalesi";
    case "crypto_withdrawal":
      return "Kripto Para Çekimi";
    default:
      return type;
  }
};
const getTransactionStatus = (status) => {
  switch (status) {
    case "pending":
      return "Bekliyor";
    case "completed":
      return "Tamamlandı";
    case "cancelled":
      return "İptal Edildi";
    case "rejected":
      return "Reddedildi";
    default:
      return status;
  }
};
const renderBankDetails = (transaction) => {
  useTranslation();
  if (transaction.type !== "bank_withdrawal") return null;
  return /* @__PURE__ */ jsx(Fragment, {});
};
const renderCryptoDetails = (transaction) => {
  const { t } = useTranslation();
  if (transaction.type !== "crypto_withdrawal" || !transaction.crypto_address) {
    return null;
  }
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(transaction.crypto_address);
      toast.success(t("common.copied"));
    } catch (err) {
      toast.error(t("common.copyError"));
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      DetailCard,
      {
        icon: FaWallet,
        title: t("transaction.cryptoAddress"),
        value: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-sm break-all", children: transaction.crypto_address }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCopyAddress,
              className: "p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300",
              children: /* @__PURE__ */ jsx(FaCopy, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `https://tronscan.org/#/address/${transaction.crypto_address}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300",
              children: /* @__PURE__ */ jsx(FaExternalLinkAlt, { className: "h-4 w-4" })
            }
          )
        ] }),
        className: "bg-gradient-to-br from-purple-100 to-indigo-200 hover:from-purple-200 hover:to-indigo-300 dark:from-purple-900/30 dark:to-indigo-900/30"
      }
    ),
    transaction.crypto_network && /* @__PURE__ */ jsx(
      DetailCard,
      {
        icon: FaNetworkWired,
        title: t("transaction.cryptoNetwork"),
        value: transaction.crypto_network.toUpperCase(),
        className: "bg-gradient-to-br from-blue-100 to-cyan-200 hover:from-blue-200 hover:to-cyan-300 dark:from-blue-900/30 dark:to-cyan-900/30"
      }
    ),
    transaction.crypto_fee && /* @__PURE__ */ jsx(
      DetailCard,
      {
        icon: FaMoneyBillWave,
        title: t("transaction.cryptoFee"),
        value: `${transaction.crypto_fee} USDT`,
        className: "bg-gradient-to-br from-green-100 to-emerald-200 hover:from-green-200 hover:to-emerald-300 dark:from-green-900/30 dark:to-emerald-900/30"
      }
    )
  ] });
};
function Show({ auth, transaction, banks }) {
  const { t } = useTranslation();
  const bank = transaction.type === "bank_withdrawal" && transaction.bank_id ? banks.find((b) => b.id === transaction.bank_id) : null;
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Geçersiz Tarih";
    return date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: { user: { ...auth.user, roles: auth.user.roles || [] } },
      header: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("transaction.details") }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800",
            children: [
              /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 sm:p-6 text-white", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto", children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("transactions.history"),
                      className: "inline-flex items-center rounded-lg bg-white/10 px-3 sm:px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20 dark:text-gray-200 dark:hover:bg-gray-700/50",
                      children: [
                        /* @__PURE__ */ jsx(FaArrowLeft, { className: "mr-2 h-4 w-4" }),
                        t("common.back")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/10 p-2 sm:p-3 backdrop-blur-sm", children: /* @__PURE__ */ jsx(FaHashtag, { className: "h-5 w-5 sm:h-6 sm:w-6" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm opacity-80", children: t("transaction.referenceId") }),
                      /* @__PURE__ */ jsx("div", { className: "text-lg sm:text-2xl font-bold truncate", children: transaction.reference_id })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-full sm:w-auto flex justify-end", children: /* @__PURE__ */ jsx(StatusBadge, { status: transaction.status }) })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-6 p-6 md:grid-cols-2", children: [
                /* @__PURE__ */ jsx(
                  DetailCard,
                  {
                    icon: FaDollarSign,
                    title: t("transaction.amountUSD"),
                    value: `$${parseAmount(transaction.amount_usd).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
                    className: "bg-gradient-to-br from-green-100 to-emerald-200 hover:from-green-200 hover:to-emerald-300 dark:from-green-900/30 dark:to-emerald-900/30 [&>div]:text-green-600 dark:[&>div]:text-green-400"
                  }
                ),
                transaction.bank_account && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    DetailCard,
                    {
                      icon: FaBuilding,
                      title: t("transaction.bank"),
                      value: (bank == null ? void 0 : bank.name) || t("common.unknown"),
                      className: "bg-gradient-to-br from-amber-100 to-orange-200 hover:from-amber-200 hover:to-orange-300 dark:from-amber-900/30 dark:to-orange-900/30 [&>div]:text-orange-600 dark:[&>div]:text-orange-400"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    DetailCard,
                    {
                      icon: FaCreditCard,
                      title: t("withdrawal.ibanNumber"),
                      value: /* @__PURE__ */ jsx("span", { className: "font-mono", children: transaction.bank_account.replace(/(.{4})/g, "$1 ") }),
                      className: "bg-gradient-to-br from-purple-100 to-fuchsia-200 hover:from-purple-200 hover:to-fuchsia-300 dark:from-purple-900/30 dark:to-fuchsia-900/30 [&>div]:text-fuchsia-600 dark:[&>div]:text-fuchsia-400"
                    }
                  )
                ] }),
                (transaction.customer_name || transaction.customer_surname) && /* @__PURE__ */ jsx(
                  DetailCard,
                  {
                    icon: FaUser,
                    title: t("withdrawal.accountHolder"),
                    value: /* @__PURE__ */ jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxs("div", { className: "font-medium", children: [
                      transaction.customer_name,
                      " ",
                      transaction.customer_surname
                    ] }) }),
                    className: "bg-gradient-to-br from-violet-100 to-purple-200 hover:from-violet-200 hover:to-purple-300 dark:from-violet-900/30 dark:to-purple-900/30 [&>div]:text-purple-600 dark:[&>div]:text-purple-400"
                  }
                ),
                transaction.customer_meta_id && /* @__PURE__ */ jsx(
                  DetailCard,
                  {
                    icon: FaHashtag,
                    title: t("withdrawal.customerMetaId"),
                    value: transaction.customer_meta_id,
                    className: "bg-gradient-to-br from-pink-100 to-rose-200 hover:from-pink-200 hover:to-rose-300 dark:from-pink-900/30 dark:to-rose-900/30 [&>div]:text-rose-600 dark:[&>div]:text-rose-400"
                  }
                ),
                /* @__PURE__ */ jsx(
                  DetailCard,
                  {
                    icon: FaCalendar,
                    title: t("transaction.createdAt"),
                    value: formatDateTime(transaction.created_at),
                    className: "bg-gradient-to-br from-teal-100 to-cyan-200 hover:from-teal-200 hover:to-cyan-300 dark:from-teal-900/30 dark:to-cyan-900/30 [&>div]:text-cyan-600 dark:[&>div]:text-cyan-400"
                  }
                ),
                transaction.type === "bank_withdrawal" ? renderBankDetails(transaction) : renderCryptoDetails(transaction)
              ] }),
              /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 p-6 dark:border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: t("transaction.needHelp") }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t("transaction.createTicketDescription") })
                ] }),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("user.tickets.create", {
                      transaction: transaction.id,
                      subject: `İşlem Destek Talebi #${transaction.reference_id}`,
                      message: `Bu işlemle ilgili destek talebim var.

İşlem Detayları:
Referans No: ${transaction.reference_id}
İşlem Türü: ${getTransactionType(transaction.type)}
USD Tutarı: $${parseAmount(transaction.amount_usd).toLocaleString("en-US", { minimumFractionDigits: 2 })}
Durum: ${getTransactionStatus(transaction.status)}
Oluşturulma Tarihi: ${formatDateTime(transaction.created_at)}`,
                      priority: "high",
                      category: "billing"
                    }),
                    className: "inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700",
                    children: [
                      /* @__PURE__ */ jsx(FaTicketAlt, { className: "mr-2 h-4 w-4" }),
                      t("transaction.createTicketButton")
                    ]
                  }
                )
              ] }) })
            ]
          }
        ) }) })
      ]
    }
  );
}
export {
  Show as default
};
