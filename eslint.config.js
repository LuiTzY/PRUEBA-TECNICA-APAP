const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    // Archivos de la app — entorno Node.js CommonJS
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "writable",
        exports: "writable",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
    }
  },
  {
    // Archivos de pruebas — entorno Jest
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        it: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "semi": ["error", "always"]
    }
  }
];