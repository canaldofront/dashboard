import Layout from 'src/Layout/Layout';
import '../styles/globals.scss';
import store from 'src/store';
import { Provider } from 'react-redux';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(process.env.NEXT_PUBLIC_LICENSE_KEY);

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
