"use client";

import { useEffect } from "react";
import { languages } from "../tina/templating/special-fields";

export function LanguageInitializer() {
  useEffect(() => {
    // Only set language cookie if it doesn't already exist
    const existingLanguage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("language="))
      ?.split("=")[1];

    if (!existingLanguage) {
      // Detect browser language preference
      const browserLanguage = navigator.language.toLowerCase();

      // Check if browser language matches any of our supported languages
      const preferredLanguage =
        languages.find((lang) => browserLanguage.startsWith(lang)) ||
        languages[languages.length - 1]; // Default to last language (en)

      // Set language cookie
      document.cookie = `language=${preferredLanguage}; path=/; max-age=${
        60 * 60 * 24 * 365
      }; SameSite=Lax`;

      // Only reload if language is not the default
      if (preferredLanguage !== languages[languages.length - 1]) {
        window.location.reload();
      }
    }
  }, []);

  return null;
}

