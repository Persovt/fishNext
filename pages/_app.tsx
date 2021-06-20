import type { AppProps } from "next/app";
import 'antd/dist/antd.css';
import "../styles/style.css";
import "../fonts/fonts.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    
      <Component {...pageProps} />{" "}
    </>
  );
}
export default MyApp;
