import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaMoneyBillWave, FaQrcode, FaCopy, FaInfoCircle } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { toast } from "react-toastify";
const NETWORKS = [
  { id: "trc20", name: "Tron (TRC20)", fee: "1", isDefault: true }
];
const CryptoWithdrawalForm = ({
  exchangeRate,
  onAmountChange,
  onProcessingChange
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    amount_usd: "",
    wallet_address: "",
    network: "trc20",
    type: "crypto_withdrawal",
    exchange_rate: exchangeRate.toString()
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    onAmountChange(formData.amount_usd);
  }, [formData.amount_usd, onAmountChange]);
  useEffect(() => {
    onProcessingChange(isProcessing);
  }, [isProcessing, onProcessingChange]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    router.post(route("withdrawal.store"), {
      ...formData,
      type: "crypto_withdrawal",
      exchange_rate: exchangeRate.toString()
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsProcessing(false);
        toast.success(t("withdrawal.success"));
      },
      onError: (errors2) => {
        setIsProcessing(false);
        setErrors(errors2);
        toast.error(t("withdrawal.error"));
      }
    });
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "amount_usd") {
      onAmountChange(value);
    }
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleChange("wallet_address", text);
      toast.success(t("withdrawal.crypto.addressPasted"));
    } catch (err) {
      toast.error(t("withdrawal.crypto.pasteError"));
    }
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800",
      children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.crypto.amount") }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "h-5 w-5 text-gray-400" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                step: "0.01",
                min: "1",
                value: formData.amount_usd,
                onChange: (e) => handleChange("amount_usd", e.target.value),
                className: "block w-full rounded-lg border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700",
                required: true
              }
            )
          ] }),
          errors.amount_usd && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.amount_usd })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.crypto.network") }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: NETWORKS.map((network) => /* @__PURE__ */ jsx(
            "div",
            {
              className: `cursor-pointer rounded-lg border p-4 transition-colors ${formData.network === network.id ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20" : "border-gray-200 hover:border-indigo-200 dark:border-gray-700 dark:hover:border-indigo-700"}`,
              onClick: () => handleChange("network", network.id),
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ jsx(SiTether, { className: "h-6 w-6 text-green-500" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 dark:text-gray-100", children: network.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
                      t("withdrawal.crypto.fee"),
                      ": $",
                      network.fee,
                      " USDT"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `h-4 w-4 rounded-full border ${formData.network === network.id ? "border-indigo-500 bg-indigo-500" : "border-gray-300"}`
                  }
                )
              ] })
            },
            network.id
          )) }),
          errors.network && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.network })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.crypto.walletAddress") }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(FaQrcode, { className: "h-5 w-5 text-gray-400" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.wallet_address,
                onChange: (e) => handleChange("wallet_address", e.target.value),
                className: "block w-full rounded-lg border-gray-300 pl-10 pr-20 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700",
                placeholder: t("withdrawal.crypto.walletPlaceholder"),
                required: true
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: handlePaste,
                className: "absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700",
                children: [
                  /* @__PURE__ */ jsx(FaCopy, { className: "mr-1 h-4 w-4" }),
                  t("common.paste")
                ]
              }
            )
          ] }),
          errors.wallet_address && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.wallet_address })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx(FaInfoCircle, { className: "mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" }),
          /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-yellow-800 dark:text-yellow-200", children: t("withdrawal.crypto.warning.title") }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-yellow-700 dark:text-yellow-300", children: /* @__PURE__ */ jsxs("ul", { className: "list-inside list-disc space-y-1", children: [
              /* @__PURE__ */ jsx("li", { children: t("withdrawal.crypto.warning.network") }),
              /* @__PURE__ */ jsx("li", { children: t("withdrawal.crypto.warning.address") }),
              /* @__PURE__ */ jsx("li", { children: t("withdrawal.crypto.warning.fee") })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isProcessing,
            className: "inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50",
            children: isProcessing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("svg", { className: "mr-2 h-4 w-4 animate-spin", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                    fill: "none"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  }
                )
              ] }),
              t("common.processing")
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(SiTether, { className: "mr-2 h-4 w-4" }),
              t("withdrawal.crypto.submit")
            ] })
          }
        ) })
      ] }) })
    }
  );
};
export {
  CryptoWithdrawalForm
};
