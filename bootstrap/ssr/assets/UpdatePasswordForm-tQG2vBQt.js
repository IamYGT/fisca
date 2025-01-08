import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { I as InputLabel, T as TextInput } from "./TextInput-CN3Z7KIl.js";
import { P as PrimaryButton } from "./PrimaryButton-DDF1xnxF.js";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
function UpdatePasswordForm({
  className = "",
  socialLogin = false
}) {
  const { t } = useTranslation();
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasLetter: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const checkPasswordRequirements = (password) => {
    setPasswordRequirements({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasLetter: /[a-zA-Z]/.test(password)
    });
  };
  useEffect(() => {
    setPasswordsMatch(
      data.password === data.password_confirmation && data.password.length > 0 && data.password_confirmation.length > 0
    );
  }, [data.password, data.password_confirmation]);
  const allRequirementsMet = Object.values(passwordRequirements).every((req) => req);
  const isSubmitDisabled = () => {
    if (socialLogin) {
      return !allRequirementsMet || !passwordsMatch || processing;
    }
    return !allRequirementsMet || !passwordsMatch || !data.current_password || processing;
  };
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toast.success(t("password_updated_successfully"), {
          position: "top-right",
          autoClose: 1e3,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        });
      },
      onError: (errors2) => {
        var _a, _b;
        toast.error(t("password_update_error"), {
          position: "top-right",
          autoClose: 3e3,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        if (errors2.password) {
          reset("password", "password_confirmation");
          (_a = passwordInput.current) == null ? void 0 : _a.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          (_b = currentPasswordInput.current) == null ? void 0 : _b.focus();
        }
      }
    });
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setData("password", newPassword);
    checkPasswordRequirements(newPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setData("password_confirmation", e.target.value);
  };
  const renderRequirement = (met, text) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
    met ? /* @__PURE__ */ jsx(CheckCircleIcon, { className: "h-5 w-5 text-green-500" }) : /* @__PURE__ */ jsx(XCircleIcon, { className: "h-5 w-5 text-red-500" }),
    /* @__PURE__ */ jsx("span", { className: `text-sm ${met ? "text-green-600" : "text-red-600"}`, children: text })
  ] });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  return /* @__PURE__ */ jsxs("section", { className: `${className} p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm`, children: [
    /* @__PURE__ */ jsx("header", { className: "mb-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: t("ensure_long_password") }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "space-y-4", children: [
      !socialLogin && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "current_password", value: t("current_password") }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "current_password",
              ref: currentPasswordInput,
              value: data.current_password,
              onChange: (e) => setData("current_password", e.target.value),
              type: showCurrentPassword ? "text" : "password",
              className: "block w-full pr-10",
              autoComplete: "current-password"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowCurrentPassword(!showCurrentPassword),
              className: "absolute inset-y-0 right-0 flex items-center pr-3",
              children: showCurrentPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "h-5 w-5 text-gray-500" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5 text-gray-500" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputError, { message: errors.current_password ? t(errors.current_password) : "", className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t("new_password") }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              ref: passwordInput,
              value: data.password,
              onChange: handlePasswordChange,
              onFocus: () => setIsPasswordFocused(true),
              type: showNewPassword ? "text" : "password",
              className: "block w-full pr-10",
              autoComplete: "new-password"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowNewPassword(!showNewPassword),
              className: "absolute inset-y-0 right-0 flex items-center pr-3",
              children: showNewPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "h-5 w-5 text-gray-500" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5 text-gray-500" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputError, { message: errors.password ? t(errors.password) : "", className: "mt-1" }),
        isPasswordFocused && /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-1", children: [
          renderRequirement(passwordRequirements.minLength, t("password_min_length_6")),
          renderRequirement(passwordRequirements.hasLetter, t("password_letter")),
          renderRequirement(passwordRequirements.hasNumber, t("password_number")),
          renderRequirement(passwordRequirements.hasSpecial, t("password_special")),
          renderRequirement(passwordsMatch, t("passwords_match"))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: t("confirm_password") }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password_confirmation",
              value: data.password_confirmation,
              onChange: handleConfirmPasswordChange,
              type: showConfirmPassword ? "text" : "password",
              className: "block w-full pr-10",
              autoComplete: "new-password"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowConfirmPassword(!showConfirmPassword),
              className: "absolute inset-y-0 right-0 flex items-center pr-3",
              children: showConfirmPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "h-5 w-5 text-gray-500" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5 text-gray-500" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation ? t(errors.password_confirmation) : "", className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pt-2", children: [
        /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            disabled: isSubmitDisabled(),
            className: `px-3 py-1.5 ${isSubmitDisabled() ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-500"}`,
            children: t("save")
          }
        ),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: t("saved") })
          }
        )
      ] })
    ] })
  ] });
}
export {
  UpdatePasswordForm as default
};
