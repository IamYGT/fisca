import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { I as InputLabel, T as TextInput } from "./TextInput-CN3Z7KIl.js";
import { P as PrimaryButton } from "./PrimaryButton-DDF1xnxF.js";
import PasswordSetupForm from "./PasswordSetupForm-Dpwp5UV6.js";
import EmailVerificationNotice from "./EmailVerificationNotice-rLtczur6.js";
function UpdateProfileInformation({
  mustVerifyEmail = false,
  status,
  className = "",
  socialLogin = false,
  hasPassword = false
}) {
  const { t } = useTranslation();
  const user = usePage().props.auth.user;
  if (!user) {
    return null;
  }
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: "",
    password_confirmation: ""
  });
  const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  const handlePasswordSet = (e) => {
    e.preventDefault();
    post(route("profile.set-password"), {
      data: passwordData,
      onSuccess: () => {
        setShowPasswordForm(false);
        setPasswordData({ password: "", password_confirmation: "" });
      }
    });
  };
  const handlePasswordInputChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [id]: value
    }));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: t("profile_information") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: t("update_profile_info") })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleProfileUpdate, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: t("name") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name && t(errors.name) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: t("email") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email && t(errors.email) })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsx(EmailVerificationNotice, { status }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t("save") }),
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
    ] }),
    Boolean(socialLogin) && !Boolean(hasPassword) && /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700", children: t("social_login_password_notice") }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowPasswordForm(true),
            className: "mt-2 text-sm font-medium text-yellow-700 hover:text-yellow-600",
            children: t("set_password")
          }
        )
      ] })
    ] }) }) }),
    showPasswordForm && /* @__PURE__ */ jsx(
      PasswordSetupForm,
      {
        passwordData,
        onSubmit: handlePasswordSet,
        onChange: handlePasswordInputChange
      }
    )
  ] });
}
export {
  UpdateProfileInformation as default
};
