import { jsxs, jsx } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { I as InputLabel, T as TextInput } from "./TextInput-CN3Z7KIl.js";
import { P as PrimaryButton } from "./PrimaryButton-DDF1xnxF.js";
import "react";
function PasswordSetupForm({
  passwordData,
  onSubmit,
  onChange
}) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("form", { onSubmit, className: "mt-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t("password") }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "password",
          type: "password",
          className: "mt-1 block w-full",
          value: passwordData.password,
          onChange,
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx(
        InputLabel,
        {
          htmlFor: "password_confirmation",
          value: t("confirm_password")
        }
      ),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "password_confirmation",
          type: "password",
          className: "mt-1 block w-full",
          value: passwordData.password_confirmation,
          onChange,
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", children: t("set_password") }) })
  ] });
}
export {
  PasswordSetupForm as default
};
