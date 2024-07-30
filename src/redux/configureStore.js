import { configureStore } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";

import createSagaMiddleware from "redux-saga";
import watchCafes from "./sagas/cafeSaga";
import watchEmployees from "./sagas/employeeSaga";
import cafesReducer from "./state/cafeState";
import employeesReducer from "./state/employeeState";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    cafe: cafesReducer,
    employee: employeesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["cafe/updateCafe", "cafe/updateCafeFailure", "cafe/createCafe", "cafe/createCafeFailure"],
        ignoredPaths: ["cafe.error"],
      },
    }).concat(middleware),
});

function* rootSaga() {
  yield all([watchCafes(), watchEmployees()]);
}

sagaMiddleware.run(rootSaga);

export default store;
