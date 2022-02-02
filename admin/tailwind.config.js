module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        buttom: "buttom",
      },
      width: {
        "device-width": "360px",
      },
      height: {
        "device-height": "640px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
