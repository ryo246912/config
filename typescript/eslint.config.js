import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImportX from "eslint-plugin-import-x";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import { configs, parser as tslintParser } from "typescript-eslint";

export default [
  {
    ignores: ["dist", "storybook-static"],
  },
  // Shareable Configsの設定
  pluginJs.configs.recommended,
  ...configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015,
      },
      parserOptions: {
        parser: tslintParser,
      },
      ecmaVersion: "latest",
    },
  },
  // eslint
  {
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      eqeqeq: ["error", "always", { null: "never" }],
      "no-console": "error",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-else-return": ["error", { allowElseIf: false }],
      "no-lonely-if": "error",
      "no-negated-condition": "error",
      "no-plusplus": "error",
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
          },
        },
      ],
      "no-restricted-imports": "off", // typescript-eslint側で設定
      "no-unused-vars": "off", // typescript-eslint側で設定
      "no-useless-return": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-object-spread": "error",
      "prefer-template": "error",
      "require-await": "error",
      yoda: "error",
    },
  },
  {
    files: ["**/*.stories.ts", "**/*.config.{js,ts}", ".storybook/*.ts"],
    rules: {
      "no-restricted-exports": "off",
    },
  },

  // typescript-eslint
  {
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "vue",
              importNames: ["default"],
              message: "名前付きImportを使用してください。",
              allowTypeImports: true,
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  // eslint-plugin-vue
  {
    rules: {
      "vue/block-order": [
        "error",
        {
          order: ["script:not([setup])", "script[setup]", "template", "style"],
        },
      ],
      "vue/define-emits-declaration": ["error", "type-literal"],
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineOptions", "defineProps", "defineEmits"],
          defineExposeLast: true,
        },
      ],
      "vue/define-props-declaration": "error",
      "vue/enforce-style-attribute": [
        "error",
        {
          allow: ["module"],
        },
      ],
      "vue/html-button-has-type": [
        "error",
        {
          button: true,
          submit: false,
          reset: false,
        },
      ],
      "vue/no-empty-component-block": "error",
      "vue/no-ref-object-reactivity-loss": "error",
      "vue/no-required-prop-with-default": [
        "error",
        {
          autofix: true,
        },
      ],
      "vue/no-restricted-class": ["error", "fas", "/^fa-.*/", "far", "fab"],
      "vue/no-restricted-custom-event": ["error", "input"],
      "vue/no-restricted-props": ["error", "value"],
      "vue/no-restricted-v-bind": ["error", "enter-class", "leave-class"],
      "vue/no-static-inline-styles": "error",
      "vue/no-template-target-blank": [
        "error",
        {
          allowReferrer: true,
          enforceDynamicLinks: "always",
        },
      ],
      "vue/no-useless-mustaches": [
        "error",
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: true,
        },
      ],
      "vue/no-useless-v-bind": [
        "error",
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: false,
        },
      ],
      "vue/padding-line-between-blocks": "error",
      "vue/prop-name-casing": "off",
      "vue/require-macro-variable-name": "error",
      "vue/require-typed-ref": "error",
    },
  },
  // eslint-plugin-import-x
  {
    settings: {
      "import-x/resolver": {
        typescript: {
          project: ["./tsconfig.app.json"],
        },
      },
    },
    rules: {
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "object",
            "type",
            "index",
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "@/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/components/layout/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/components/ui/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/modules/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/api/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/hooks/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/utils/**",
              group: "internal",
              position: "before",
            },
          ],
        },
      ],
    },
  },
];
