import { createContext } from "react";
import type { Language } from "../../tina/templating/special-fields";

export const LanguageContext = createContext<Language>("en");
