import { jsxs, jsx } from "react/jsx-runtime";
import { P as PrimaryButton } from "./PrimaryButton-DDF1xnxF.js";
import { G as Guest } from "./GuestLayout-B9k0PQV6.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import "./ApplicationLogo-B9pIlq8y.js";
import "react";
import "react-icons/md";
import "framer-motion";
function VerifyEmail({ status, languages, secili_dil }) {
  const { t } = useTranslation();
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(Guest, { languages, secili_dil, children: [
    /* @__PURE__ */ jsx(Head, { title: t("verifyEmail.title") }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: t("verifyEmail.description") }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600 dark:text-green-400", children: t("verifyEmail.linkSent") }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: t("verifyEmail.resendEmail") }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800",
          children: t("verifyEmail.logOut")
        }
      )
    ] }) })
  ] });
}
export {
  VerifyEmail as default
};
