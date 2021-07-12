import "@styles/globals.css";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css"

function Application({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default Application;
