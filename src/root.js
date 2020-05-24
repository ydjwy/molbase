import App, {configureStore} from "./app";
import React from "react";

import {Provider} from "react-redux";
import {Router} from "react-router";
import {createHashHistory}from "history";
import {LocaleProvider, BackTop} from 'antd';
import errorBoundary from "utils/hoc/error-boundary";
import InitUserData from "utils/hoc/init-user-data";
import {ClientErrorFallback} from "components/exception";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

export const store = configureStore.createStore(window.__PRELOADED_STATE__);
export const history = new createHashHistory();

const ErrorBoundary = errorBoundary(() => (
  <ClientErrorFallback history={history}/>
));

export default function root() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <InitUserData store={store}>
          <BackTop visibilityHeight="300"/>
          <Router history={history}>
            <LocaleProvider locale={zh_CN}>
              <App />
            </LocaleProvider>
          </Router>
        </InitUserData>
      </ErrorBoundary>
    </Provider>
  );
}
