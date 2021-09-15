import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import sagas from "./sagas";

export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "complianceOfficer",
    "teamMemberFlow",
    "auth",
    "users",
    "adminMenu",
    "HistoryReducer",
    "UpdatesReducer",
    "userList",
    "PaymentReducer",
  ],
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = createRootReducer(history);
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer, // root reducer with router state
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
}
