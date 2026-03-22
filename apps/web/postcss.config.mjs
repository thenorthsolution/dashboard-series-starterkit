/**
 * PostCSS config for Tailwind CSS v4.
 * Tailwind v4 ships its own PostCSS plugin via @tailwindcss/postcss.
 * No separate autoprefixer needed — it's included in the plugin.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
