import eslintReact from "@eslint-react/eslint-plugin";
import eslint from "@eslint/js";
import {defineConfig, globalIgnores} from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores(["addon/**", "coverage/**", "dist-types/**", "node_modules/**"]),
    {
        files: ["**/*.{js,mjs,cjs}"],
        extends: [eslint.configs.recommended],
        languageOptions: {
            globals: globals.node,
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        extends: [eslint.configs.recommended, tseslint.configs.recommended],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.webextensions,
            },
        },
        plugins: {
            "@eslint-react": eslintReact,
            "react-hooks": reactHooks,
        },
        rules: {
            "@eslint-react/dom-no-dangerously-set-innerhtml-with-children": "error",
            "@eslint-react/dom-no-void-elements-with-children": "error",
            "@eslint-react/jsx-no-children-prop-with-children": "error",
            "@eslint-react/jsx-no-key-after-spread": "error",
            "@eslint-react/jsx-no-namespace": "error",
            "@eslint-react/no-missing-key": "error",
            "@typescript-eslint/no-empty-object-type": [
                "error",
                {
                    allowInterfaces: "with-single-extends",
                },
            ],
            "react-hooks/exhaustive-deps": "warn",
            "react-hooks/rules-of-hooks": "error",
        },
    },
]);
