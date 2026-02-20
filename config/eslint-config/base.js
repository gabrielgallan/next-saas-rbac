import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // desativa as regras padrão
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // ativa remoção automática
      "unused-imports/no-unused-imports": "error",

      // opcional: remove variáveis não usadas
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
      ],
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ["dist", "node_modules", "prisma"],
  },
];