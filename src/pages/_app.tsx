import { type AppType } from "next/app";
import { Provider } from 'react-redux';

import store from '~/store/store';
import "~/styles/globals.css";
import Layout from "../features/layout/layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
