import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  textColor,
  onClick
}) => /* @__PURE__ */ jsx(
  motion.div,
  {
    variants: cardVariants,
    initial: "hidden",
    animate: "visible",
    className: `${color} rounded-2xl p-6 shadow-sm ${textColor} ${onClick ? "cursor-pointer transition-opacity hover:opacity-90" : ""}`,
    onClick,
    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-bold", children: value })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-white/10 p-3", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) })
    ] })
  }
);
export {
  StatCard
};
