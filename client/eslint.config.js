import next from "eslint-config-next";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...next.configs["core-web-vitals"],
  },
];
