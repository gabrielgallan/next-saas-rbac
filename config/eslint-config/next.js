import base from "./base.js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...base,
  {
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
];