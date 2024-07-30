import { call, put, takeLatest } from "redux-saga/effects";
import { SERVER_URL } from "../../constants/urls";
import {
  createEmployeeFailure,
  createEmployeeSuccess,
  deleteEmployeeFailure,
  deleteEmployeeSuccess,
  getEmployeeFailure,
  getEmployeesFailure,
  getEmployeesSuccess,
  getEmployeeSuccess,
  updateEmployeeFailure,
  updateEmployeeSuccess,
} from "../state/employeeState";

function* createEmployeeSaga(action) {
  try {
    const response = yield call(() =>
      fetch(`${SERVER_URL}/api/employee`, {
        method: "POST",
        body: JSON.stringify(action.payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    const employee = yield call([response, "json"]);
    yield put(createEmployeeSuccess(employee));
  } catch (error) {
    yield put(createEmployeeFailure(error));
  }
}

function* getEmployeesSaga(action) {
  const cafeId = action.payload;
  const url = cafeId ? `${SERVER_URL}/api/employee?cafe=${cafeId}` : `${SERVER_URL}/api/employee`;
  try {
    const response = yield call(() => fetch(url));
    const employees = yield call([response, "json"]);
    yield put(getEmployeesSuccess(employees.data));
  } catch (error) {
    yield put(getEmployeesFailure(error));
  }
}

function* getEmployeeSaga(action) {
  const url = `${SERVER_URL}/api/employee/${action.payload}`;
  try {
    const response = yield call(() => fetch(url));
    const employee = yield call([response, "json"]);
    yield put(getEmployeeSuccess(employee));
  } catch (error) {
    yield put(getEmployeeFailure(error));
  }
}

function* deleteEmployeeSaga(action) {
  try {
    yield call(() =>
      fetch(`${SERVER_URL}/api/employee/${action.payload}`, {
        method: "DELETE",
      })
    );
    yield put(deleteEmployeeSuccess(action.payload));
  } catch (error) {
    yield put(deleteEmployeeFailure(error));
  }
}

function* updateEmployeeSaga(action) {
  const { id, employeeFormData } = action.payload;
  try {
    const response = yield call(() =>
      fetch(`${SERVER_URL}/api/employee/${id}`, {
        method: "PUT",
        body: JSON.stringify(employeeFormData),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    const employee = yield call([response, "json"]);
    yield put(updateEmployeeSuccess(employee.data.id));
  } catch (error) {
    console.log({ error });
    yield put(updateEmployeeFailure(error));
  }
}

function* watchEmployees() {
  yield takeLatest("employee/createEmployee", createEmployeeSaga);
  yield takeLatest("employee/getEmployees", getEmployeesSaga);
  yield takeLatest("employee/deleteEmployee", deleteEmployeeSaga);
  yield takeLatest("employee/updateEmployee", updateEmployeeSaga);
  yield takeLatest("employee/getEmployee", getEmployeeSaga);
}

export default watchEmployees;
