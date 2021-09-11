module.exports = {
    root: true,
    ignorePatterns: ["dist/", "*.js"],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: "tsconfig.json",
    },
    env: {
      node: true,
    },
  };