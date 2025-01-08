import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaMoneyBillWave, FaInfoCircle, FaUniversity, FaCreditCard, FaCopy, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";
const formatIBAN = (iban) => {
  const cleaned = iban.replace(/\s/g, "");
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
};
const validateIBAN = (iban) => {
  const ibanRegex = /^TR[0-9]{24}$/;
  const cleaned = iban.replace(/\s/g, "").toUpperCase();
  if (!ibanRegex.test(cleaned)) {
    return false;
  }
  const reformat = cleaned.slice(4) + cleaned.slice(0, 4);
  const digits = reformat.split("").map((d) => {
    const code = d.charCodeAt(0);
    return code >= 65 ? code - 55 : d;
  }).join("");
  let remainder = "";
  for (let i = 0; i < digits.length; i++) {
    remainder = remainder + digits[i];
    const temp = parseInt(remainder, 10);
    remainder = (temp % 97).toString();
  }
  return parseInt(remainder, 10) === 1;
};
const WithdrawalForm = ({
  exchangeRate,
  savedIbans,
  banks,
  onAmountChange,
  onProcessingChange
}) => {
  const { t } = useTranslation();
  const [ibanValid, setIbanValid] = useState(null);
  const [showIbanFeedback, setShowIbanFeedback] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    amount_usd: "",
    type: "bank_withdrawal",
    bank_id: "",
    bank_account: "",
    customer_name: "",
    customer_surname: "",
    customer_meta_id: "",
    exchange_rate: exchangeRate.toString()
  });
  useEffect(() => {
    onAmountChange(data.amount_usd);
  }, [data.amount_usd, onAmountChange]);
  useEffect(() => {
    if (data.bank_account) {
      const isValid = validateIBAN(data.bank_account);
      setIbanValid(isValid);
      setShowIbanFeedback(true);
    } else {
      setShowIbanFeedback(false);
    }
  }, [data.bank_account]);
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleIbanChange(text);
      toast.success(t("withdrawal.ibanPasted"));
    } catch (err) {
      toast.error(t("withdrawal.pasteError"));
    }
  };
  const handleIbanChange = (value, preserveFormData = false) => {
    let formattedValue = value.replace(/[^A-Z0-9]/g, "").toUpperCase();
    if (formattedValue && !formattedValue.startsWith("TR")) {
      formattedValue = "TR" + formattedValue;
    }
    if (formattedValue.length > 26) {
      formattedValue = formattedValue.slice(0, 26);
    }
    if (formattedValue.length === 26) {
      const isValid = validateIBAN(formattedValue);
      setIbanValid(isValid);
      setShowIbanFeedback(true);
      if (isValid) {
        toast.success(t("withdrawal.validIBAN"));
      } else {
        toast.error(t("withdrawal.invalidIBAN"));
      }
    } else {
      setIbanValid(null);
      setShowIbanFeedback(false);
    }
    setData((currentData) => ({
      ...currentData,
      bank_account: formattedValue,
      // Eğer preserveFormData true ise veya bank_id zaten varsa, bank_id'yi koruyalım
      bank_id: preserveFormData ? currentData.bank_id : currentData.bank_id || "",
      // Diğer alanları da aynı mantıkla koruyalım
      customer_name: preserveFormData ? currentData.customer_name : currentData.customer_name || "",
      customer_surname: preserveFormData ? currentData.customer_surname : currentData.customer_surname || ""
    }));
  };
  const handleIbanSelect = (iban) => {
    setData({
      ...data,
      bank_id: iban.bank_id,
      bank_account: iban.iban,
      customer_name: iban.name,
      customer_surname: iban.surname,
      type: "bank_withdrawal",
      exchange_rate: exchangeRate.toString()
    });
    handleIbanChange(iban.iban, true);
  };
  useEffect(() => {
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onProcessingChange(true);
    setData("exchange_rate", exchangeRate.toString());
    post(route("withdrawal.store"), {
      onSuccess: () => {
        onProcessingChange(false);
        toast.success(t("withdrawal.requestCreated"));
      },
      onError: () => {
        onProcessingChange(false);
        toast.error(t("withdrawal.createError"));
      }
    });
  };
  useEffect(() => {
    onProcessingChange(processing);
  }, [processing, onProcessingChange]);
  const renderSavedIbans = () => {
    return savedIbans.map((iban) => {
      return /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => handleIbanSelect(iban),
          className: `cursor-pointer rounded-lg border p-4 transition-colors ${data.bank_account === iban.iban ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20" : "border-gray-200 hover:border-indigo-500 dark:border-gray-700"}`,
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-blue-100 p-2 dark:bg-blue-900/20", children: /* @__PURE__ */ jsx(FaCreditCard, { className: "h-5 w-4 text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "font-medium text-gray-900 dark:text-gray-100", children: [
                  iban.bank_details.name,
                  iban.is_default && /* @__PURE__ */ jsxs("span", { className: "ml-2 text-xs text-indigo-600 dark:text-indigo-400", children: [
                    "(",
                    t("common.default"),
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "font-mono text-sm text-gray-500 dark:text-gray-400", children: formatIBAN(iban.iban) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: [
                  iban.name,
                  " ",
                  iban.surname
                ] })
              ] })
            ] }),
            data.bank_account === iban.iban && /* @__PURE__ */ jsx(FaCheck, { className: "h-5 w-5 text-indigo-600" })
          ] })
        },
        iban.id
      );
    });
  };
  const renderCustomerFields = () => /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.accountInfo") }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: [
        t("withdrawal.customerMetaId"),
        /* @__PURE__ */ jsx("span", { className: "ml-1 text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          name: "customer_meta_id",
          value: data.customer_meta_id,
          onChange: (e) => {
            const value = e.target.value;
            if (value === "" || /^\d+$/.test(value)) {
              setData("customer_meta_id", value);
            }
          },
          onKeyPress: (e) => {
            if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
              e.preventDefault();
            }
          },
          className: "block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700",
          placeholder: t("withdrawal.customerMetaIdPlaceholder"),
          required: true
        }
      ),
      errors.customer_meta_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.customer_meta_id }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-500", children: t("withdrawal.customerMetaIdHelp") })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.accountHolderName") }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "customer_name",
          value: data.customer_name,
          onChange: (e) => setData("customer_name", e.target.value),
          className: "block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700",
          required: true
        }
      ),
      errors.customer_name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.customer_name })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.accountHolderSurname") }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "customer_surname",
          value: data.customer_surname,
          onChange: (e) => setData("customer_surname", e.target.value),
          className: "block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700",
          required: true
        }
      ),
      errors.customer_surname && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.customer_surname })
    ] })
  ] });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "overflow-hidden rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800",
      children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: [
            t("withdrawal.amount"),
            " (USD)",
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs font-normal text-amber-600 dark:text-amber-400", children: t("withdrawal.usdOnly") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "h-5 w-5 text-gray-400" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                step: "0.01",
                min: "1",
                value: data.amount_usd,
                onChange: (e) => setData("amount_usd", e.target.value),
                className: "block w-full rounded-lg border-gray-300 pl-10 pr-16 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700",
                required: true,
                placeholder: "0.00"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "USD" }) })
          ] }),
          errors.amount_usd && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.amount_usd }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(FaInfoCircle, { className: "mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500 dark:text-blue-400" }),
            /* @__PURE__ */ jsx("p", { className: "ml-2 text-sm text-blue-700 dark:text-blue-300", children: t("withdrawal.usdOnlyInfo") })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.selectBank") }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(FaUniversity, { className: "h-5 w-5 text-gray-400" }) }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.bank_id,
                onChange: (e) => setData("bank_id", e.target.value),
                className: "block w-full rounded-lg border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700",
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: t("common.select") }),
                  banks.map((bank) => /* @__PURE__ */ jsx("option", { value: bank.id, children: bank.name }, bank.id))
                ]
              }
            )
          ] }),
          errors.bank_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.bank_id })
        ] }),
        savedIbans.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.savedIbans") }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: renderSavedIbans() })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.manualIban") }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(
              FaCreditCard,
              {
                className: `h-5 w-5 ${ibanValid === true ? "text-green-500" : ibanValid === false ? "text-red-500" : "text-gray-400"}`
              }
            ) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formatIBAN(data.bank_account),
                onChange: (e) => handleIbanChange(e.target.value),
                className: `block w-full rounded-lg border pl-10 pr-20 uppercase focus:ring-2 ${ibanValid === true ? "border-green-500 focus:border-green-500 focus:ring-green-200" : ibanValid === false ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"} dark:border-gray-600 dark:bg-gray-700`,
                placeholder: "TR00 0000 0000 0000 0000 0000 00",
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
          showIbanFeedback && /* @__PURE__ */ jsx("div", { className: "mt-2 flex items-center space-x-2", children: ibanValid ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(FaCheck, { className: "h-4 w-4 text-green-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-green-500", children: t("withdrawal.validIBAN") })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(FaExclamationTriangle, { className: "h-4 w-4 text-red-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-red-500", children: t("withdrawal.invalidIBAN") })
          ] }) }),
          errors.bank_account && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.bank_account })
        ] }),
        renderCustomerFields(),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing || !data.amount_usd || !data.bank_id || !data.bank_account,
            className: "inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50",
            children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
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
              /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "mr-2 h-4 w-4" }),
              t("withdrawal.submit")
            ] })
          }
        ) })
      ] })
    }
  );
};
export {
  WithdrawalForm
};
