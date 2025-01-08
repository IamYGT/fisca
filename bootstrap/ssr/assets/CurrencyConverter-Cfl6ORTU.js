import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { FaExchangeAlt, FaInfoCircle, FaDollarSign, FaEuroSign, FaLiraSign } from "react-icons/fa";
const CurrencyConverter = ({
  amount,
  exchangeRate,
  t
}) => {
  const euroRate = 0.92;
  const amountNumber = parseFloat(amount || "0");
  const tryAmount = amountNumber * exchangeRate;
  const eurAmount = amountNumber * euroRate;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      className: "rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-sm dark:from-gray-800 dark:to-gray-700",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: t("withdrawal.currencyInfo") }),
          /* @__PURE__ */ jsx(FaExchangeAlt, { className: "h-5 w-5 text-gray-400" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600 dark:text-gray-300", children: [
          /* @__PURE__ */ jsx(FaInfoCircle, { className: "mr-2 h-4 w-4 text-blue-500" }),
          t("withdrawal.usdOnlyInfo")
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "flex items-center justify-between rounded-lg bg-green-50 p-4 dark:bg-green-900/20",
              whileHover: { scale: 1.02 },
              transition: { type: "spring", stiffness: 300 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(FaDollarSign, { className: "mr-2 h-5 w-5 text-green-600 dark:text-green-400" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-green-800 dark:text-green-200", children: "USD" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-green-800 dark:text-green-200", children: new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD"
                }).format(amountNumber) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "flex items-center justify-between rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20",
              whileHover: { scale: 1.02 },
              transition: { type: "spring", stiffness: 300 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(FaEuroSign, { className: "mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-blue-800 dark:text-blue-200", children: "EUR" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-800 dark:text-blue-200", children: new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR"
                }).format(eurAmount) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "flex items-center justify-between rounded-lg bg-red-50 p-4 dark:bg-red-900/20",
              whileHover: { scale: 1.02 },
              transition: { type: "spring", stiffness: 300 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(FaLiraSign, { className: "mr-2 h-5 w-5 text-red-600 dark:text-red-400" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-red-800 dark:text-red-200", children: "TRY" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-red-800 dark:text-red-200", children: new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY"
                }).format(tryAmount) })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-700/50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-600 dark:text-gray-400", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "1 USD = ",
              exchangeRate.toFixed(2),
              " TRY"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "1 USD = ",
              euroRate.toFixed(2),
              " EUR"
            ] })
          ] }) })
        ] })
      ]
    }
  );
};
export {
  CurrencyConverter
};
