import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Ignore build output
  {
    ignores: ["dist", "node_modules"],
  },

  // TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
  },

  // JavaScript files (if any)
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs",
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
]);
