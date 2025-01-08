import { jsxs, jsx } from "react/jsx-runtime";
import { D as DangerButton, S as SecondaryButton } from "./SecondaryButton-Jyhki9mO.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { I as InputLabel, T as TextInput } from "./TextInput-CN3Z7KIl.js";
import { M as Modal } from "./Modal-Cm4dKujS.js";
import { useForm } from "@inertiajs/react";
import { useState, useRef } from "react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import "@headlessui/react";
function DeleteUserForm({
  className = ""
}) {
  const { t } = useTranslation();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef(null);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        var _a;
        return (_a = passwordInput.current) == null ? void 0 : _a.focus();
      },
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: t("delete_account") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: t("delete_account_warning") })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: t("delete_account") }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: t("confirm_delete_account") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: t("delete_account_confirmation") }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password",
            value: t("password"),
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: t("password")
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password ? t(errors.password) : "",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: t("cancel") }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: t("delete_account") })
      ] })
    ] }) })
  ] });
}
export {
  DeleteUserForm as default
};
