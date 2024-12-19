/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require('daisyui')],
}