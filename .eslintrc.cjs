/**
 * @type {import("@types/eslint").Linter.BaseConfig}
 */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "plugin:hydrogen/recommended",
    "plugin:hydrogen/typescript",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/naming-convention": "off",
    "hydrogen/prefer-image-component": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "no-case-declarations": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Apply these settings to TypeScript files
      rules: {
        "object-curly-spacing": "off", // Ensure it's off for TypeScript files
        // other TypeScript-specific rules...
      },
    },
  ],
};
