import "../styles/globals.css";
import wrapper from "../src/module/store";
import { AppProps } from "next/app";
import { NextPage } from "next";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
