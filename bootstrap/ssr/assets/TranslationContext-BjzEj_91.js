import "react/jsx-runtime";
import { createContext, useContext } from "react";
const TranslationContext = createContext(
  void 0
);
const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === void 0) {
    throw new Error(
      "useTranslation must be used within a TranslationProvider"
    );
  }
  return context;
};
export {
  useTranslation as u
};
