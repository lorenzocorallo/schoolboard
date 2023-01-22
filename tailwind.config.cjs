/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                fadein: 'fadein 0.3s ease-in',
            },
            keyframes: {
                fadein: {
                    '0%': { opacity: "0%" },
                    '100%': { opacity: "100%" },
                }
            }
        },
    },
    plugins: [],
    darkMode: "class"}
