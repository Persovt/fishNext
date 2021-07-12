import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/style.css";
import "../fonts/fonts.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
export default MyApp;
