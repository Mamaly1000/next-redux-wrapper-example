import React  from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Wrapper from "../store/store";
import { Provider } from "react-redux";
const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = Wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

export default Wrapper.withRedux(MyApp);
