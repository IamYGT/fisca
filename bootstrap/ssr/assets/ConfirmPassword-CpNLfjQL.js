import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { I as InputLabel, T as TextInput } from "./TextInput-CN3Z7KIl.js";
import { P as PrimaryButton } from "./PrimaryButton-DDF1xnxF.js";
import { G as Guest } from "./GuestLayout-B9k0PQV6.js";
import { useForm, Head } from "@inertiajs/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import "react";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "framer-motion";
function ConfirmPassword({ languages, secili_dil }) {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(Guest, { languages, secili_dil, children: [
    /* @__PURE__ */ jsx(Head, { title: t("confirmPassword.title") }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: t("confirmPassword.secureArea") }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: t("confirmPassword.password") }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: t("confirmPassword.confirm") }) })
    ] })
  ] });
}
export {
  ConfirmPassword as default
};
