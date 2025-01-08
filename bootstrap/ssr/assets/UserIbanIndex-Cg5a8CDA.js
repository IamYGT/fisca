import { jsx, jsxs } from "react/jsx-runtime";
import { S as SecondaryButton, D as DangerButton } from "./SecondaryButton-Jyhki9mO.js";
import { M as Modal } from "./Modal-Cm4dKujS.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { I as InputLabel, T as TextInput } from "./TextInput-CN3Z7KIl.js";
import { P as PrimaryButton } from "./PrimaryButton-DDF1xnxF.js";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-B41ZkwdL.js";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { FaBuildingColumns } from "react-icons/fa6";
import { FiEdit2, FiTrash2, FiCopy, FiCreditCard } from "react-icons/fi";
import { toast } from "react-toastify";
import "@headlessui/react";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "framer-motion";
import "@tippyjs/react";
function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Sil",
  cancelText = "İptal",
  processing = false
}) {
  return /* @__PURE__ */ jsx(Modal, { show: isOpen, onClose, children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: title }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 dark:text-gray-400", children }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-4", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { onClick: onClose, disabled: processing, children: cancelText }),
      /* @__PURE__ */ jsx(DangerButton, { onClick: onConfirm, disabled: processing, children: confirmText })
    ] })
  ] }) });
}
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
function UserIbanIndex({ auth, ibans, banks }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIban, setSelectedIban] = useState(null);
  const [ibanValid, setIbanValid] = useState(null);
  const [lastValidIban, setLastValidIban] = useState("");
  const [hasExistingIban, setHasExistingIban] = useState(false);
  const [existingIbanError, setExistingIbanError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ibanToDelete, setIbanToDelete] = useState(null);
  const {
    data,
    setData,
    post,
    put,
    delete: destroy,
    processing,
    errors,
    reset
  } = useForm({
    bank_id: "",
    iban: "",
    title: "",
    is_default: false,
    name: "",
    surname: ""
  });
  const handleIbanChange = (value) => {
    let formattedValue = value.replace(/[^A-Z0-9]/g, "").toUpperCase();
    if (formattedValue && !formattedValue.startsWith("TR")) {
      formattedValue = "TR" + formattedValue;
    }
    if (formattedValue.length > 26) {
      formattedValue = formattedValue.slice(0, 26);
    }
    const isValid = validateIBAN(formattedValue);
    setIbanValid(isValid);
    const existingIban = ibans.find(
      (iban) => iban.iban === formattedValue && (!selectedIban || selectedIban.id !== iban.id)
    );
    if (existingIban) {
      setHasExistingIban(true);
      setExistingIbanError(t("iban.alreadyExists"));
      toast.warning(t("iban.alreadyExists"), {
        position: "top-right",
        autoClose: 3e3
      });
    } else {
      setHasExistingIban(false);
      setExistingIbanError("");
    }
    if (formattedValue.length === 26) {
      if (isValid && !existingIban) {
        if (formattedValue !== lastValidIban) {
          toast.success(t("iban.validIBAN"), {
            position: "top-right",
            autoClose: 3e3
          });
          setLastValidIban(formattedValue);
        }
      } else if (!isValid) {
        toast.error(t("iban.invalidIBAN"), {
          position: "top-right",
          autoClose: 3e3
        });
      }
    }
    setData("iban", formattedValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ibanValid) {
      toast.error(t("iban.errors.invalid_iban"));
      return;
    }
    if (hasExistingIban) {
      toast.error(t("iban.errors.already_exists"));
      return;
    }
    if (isEditMode && selectedIban) {
      put(route("profile.ibans.update", selectedIban.id), {
        onSuccess: () => {
          toast.success(t("iban.updated"));
          handleCloseModal();
        },
        onError: (errors2) => {
          Object.values(errors2).forEach((error) => {
            if (error) toast.error(error);
          });
        }
      });
    } else {
      post(route("profile.ibans.store"), {
        onSuccess: () => {
          toast.success(t("iban.added"));
          handleCloseModal();
        },
        onError: (errors2) => {
          Object.values(errors2).forEach((error) => {
            if (error) toast.error(error);
          });
        }
      });
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedIban(null);
    reset();
  };
  const handleEdit = (iban) => {
    setSelectedIban(iban);
    setIsEditMode(true);
    setData({
      bank_id: iban.bank_id,
      iban: iban.iban,
      title: iban.title,
      is_default: iban.is_default,
      name: iban.name,
      surname: iban.surname
    });
    setIsModalOpen(true);
  };
  const handleDelete = (iban) => {
    setIbanToDelete(iban);
    setDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (!ibanToDelete) return;
    try {
      await destroy(route("profile.ibans.destroy", ibanToDelete.id), {
        onSuccess: () => {
          toast.success(t("iban.deleted"));
          setDeleteModalOpen(false);
          setIbanToDelete(null);
        },
        onError: () => {
          toast.error(t("iban.errors.delete_failed"));
        },
        preserveScroll: true
      });
    } catch {
      toast.error(t("iban.errors.delete_failed"));
    }
  };
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("common.copied"));
    } catch {
      toast.error(t("common.copyError"));
    }
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleanedText = text.replace(/\s/g, "");
      handleIbanChange(cleanedText);
      toast.success(t("withdrawal.ibanPasted"), {
        position: "top-right",
        autoClose: 2e3
      });
    } catch (error) {
      toast.error(t("withdrawal.pasteError"), {
        position: "top-right",
        autoClose: 3e3
      });
    }
  };
  const canSubmit = () => {
    return ibanValid && !hasExistingIban && !processing && data.iban.length === 26 && data.bank_id && data.title && data.name && data.surname;
  };
  return /* @__PURE__ */ jsxs(Authenticated, { auth, children: [
    /* @__PURE__ */ jsx(Head, { title: t("iban.management") }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 dark:text-white", children: t("iban.management") }),
        /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            onClick: () => setIsModalOpen(true),
            children: t("iban.add")
          }
        )
      ] }),
      ibans.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center dark:border-gray-700", children: [
        /* @__PURE__ */ jsx(FaBuildingColumns, { className: "mb-4 h-12 w-12 text-gray-400 dark:text-gray-600" }),
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-medium text-gray-900 dark:text-white", children: t("iban.noIbans") }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-gray-500 dark:text-gray-400", children: t("iban.addFirst") }),
        /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            onClick: () => setIsModalOpen(true),
            children: t("iban.addNew")
          }
        )
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: ibans.map((iban) => {
        const bankDetails = banks.find(
          (bank) => bank.id === iban.bank_id
        );
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] ${iban.is_default ? "bg-gradient-to-br from-light-primary/10 to-light-accent/5 shadow-lg ring-2 ring-light-primary/20 dark:from-dark-primary/20 dark:to-dark-accent/10 dark:ring-dark-primary/30" : "bg-white shadow-md hover:shadow-xl dark:bg-gray-900"}`,
            children: [
              iban.is_default && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 rounded-bl-xl bg-light-primary px-3 py-1 text-white dark:bg-dark-primary", children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "h-4 w-4",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M5 13l4 4L19 7"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: t(
                  "iban.default"
                ) })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute right-4 top-4 flex space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleEdit(iban),
                    className: "rounded-full bg-light-primary/10 p-2 text-light-primary hover:bg-light-primary/20 dark:bg-dark-primary/20 dark:text-dark-primary dark:hover:bg-dark-primary/30",
                    children: /* @__PURE__ */ jsx(FiEdit2, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(iban),
                    className: "rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400",
                    children: /* @__PURE__ */ jsx(FiTrash2, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "rounded-full bg-light-primary/10 p-2 dark:bg-dark-primary/20", children: /* @__PURE__ */ jsx(FaBuildingColumns, { className: "h-5 w-5 text-light-primary dark:text-dark-primary" }) }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: (bankDetails == null ? void 0 : bankDetails.name) || t(
                  "iban.bankNotFound"
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: t("iban.accountTitle") }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: iban.title })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: t("iban.accountHolder") }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
                    iban.name,
                    " ",
                    iban.surname
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400", children: t("iban.number") }),
                  /* @__PURE__ */ jsx("div", { className: "font-mono text-lg tracking-wider text-gray-700 dark:text-gray-300", children: formatIBAN(iban.iban) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => copyToClipboard(
                      iban.iban
                    ),
                    className: "flex items-center gap-1 rounded-lg bg-light-primary/10 px-3 py-1.5 text-sm text-light-primary hover:bg-light-primary/20 dark:bg-dark-primary/20 dark:text-dark-primary dark:hover:bg-dark-primary/30",
                    children: [
                      /* @__PURE__ */ jsx(FiCopy, { className: "h-4 w-4" }),
                      t("common.copy")
                    ]
                  }
                ) })
              ] })
            ]
          },
          iban.id
        );
      }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: handleCloseModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-lg font-medium text-gray-900 dark:text-white", children: isEditMode ? t("iban.edit") : t("iban.add") }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "bank_id",
            value: t("iban.bankSelect")
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "bank_id",
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm",
            value: data.bank_id,
            onChange: (e) => setData("bank_id", e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: t("common.select") }),
              banks.map((bank) => /* @__PURE__ */ jsx("option", { value: bank.id, children: bank.name }, bank.id))
            ]
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.bank_id, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "iban", value: t("iban.number") }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(
            FiCreditCard,
            {
              className: `h-5 w-5 ${data.iban.length > 0 ? hasExistingIban ? "text-red-500" : ibanValid ? "text-green-500" : "text-red-500" : "text-gray-400"}`
            }
          ) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formatIBAN(data.iban),
              onChange: (e) => handleIbanChange(e.target.value),
              placeholder: "TR00 0000 0000 0000 0000 0000 00",
              className: `block w-full rounded-lg border pl-10 pr-32 uppercase ${data.iban.length > 0 ? hasExistingIban ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ibanValid ? "border-green-500 focus:border-green-500 focus:ring-green-200" : "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"} dark:border-gray-600 dark:bg-gray-700`,
              required: true
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex items-center space-x-1 pr-3", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handlePaste,
              className: "flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-100",
              children: [
                /* @__PURE__ */ jsx(FiCopy, { className: "mr-1.5 h-4 w-4" }),
                t("common.paste")
              ]
            }
          ) })
        ] }),
        existingIbanError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: existingIbanError }),
        /* @__PURE__ */ jsx(InputError, { message: errors.iban, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: t("iban.title") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "title",
            type: "text",
            className: "mt-1 block w-full",
            value: data.title,
            onChange: (e) => setData("title", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t("iban.name") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            type: "text",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "surname", value: t("iban.surname") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "surname",
            type: "text",
            className: "mt-1 block w-full",
            value: data.surname,
            onChange: (e) => setData("surname", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.surname, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900",
            checked: data.is_default,
            onChange: (e) => setData("is_default", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-900 dark:text-white", children: t("iban.setDefault") })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: handleCloseModal, children: t("common.cancel") }),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-3", disabled: !canSubmit(), children: isEditMode ? t("common.update") : t("common.save") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      DeleteConfirmationModal,
      {
        isOpen: deleteModalOpen,
        onClose: () => {
          setDeleteModalOpen(false);
          setIbanToDelete(null);
        },
        onConfirm: confirmDelete,
        title: t("iban.deleteTitle"),
        confirmText: t("common.delete"),
        cancelText: t("common.cancel"),
        processing,
        children: [
          /* @__PURE__ */ jsx("p", { children: t("iban.deleteConfirmation", {
            title: (ibanToDelete == null ? void 0 : ibanToDelete.title) || "",
            iban: ibanToDelete ? formatIBAN(ibanToDelete.iban) : ""
          }) }),
          (ibanToDelete == null ? void 0 : ibanToDelete.is_default) && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: t("iban.deleteDefaultWarning") })
        ]
      }
    )
  ] });
}
export {
  UserIbanIndex as default
};
