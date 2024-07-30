import { call, put, takeEvery } from "redux-saga/effects";
import { SERVER_URL } from "../../constants/urls";
import {
  createCafeFailure,
  createCafeSuccess,
  deleteCafeFailure,
  deleteCafeSuccess,
  getCafeFailure,
  getCafesFailure,
  getCafesSuccess,
  getCafeSuccess,
  updateCafeFailure,
  updateCafeSuccess,
} from "../state/cafeState";

function* getCafesSaga(action) {
  const location = action.payload;
  const url = location ? `${SERVER_URL}/api/cafe?location=${location}` : `${SERVER_URL}/api/cafe`;
  try {
    const response = yield call(() => fetch(url));
    const cafes = yield call([response, "json"]);
    yield put(getCafesSuccess(cafes.data));
  } catch (error) {
    yield put(getCafesFailure(error));
  }
}

function* getCafe(action) {
  try {
    const response = yield call(() => fetch(`${SERVER_URL}/api/cafe/${action.payload}`));
    const cafe = yield call([response, "json"]);
    yield put(getCafeSuccess(cafe));
  } catch (error) {
    yield put(getCafeFailure(error));
  }
}

function* createCafeSaga(action) {
  try {
    const response = yield call(() =>
      fetch(`${SERVER_URL}/api/cafe`, {
        method: "POST",
        body: action.payload,
      })
    );
    const cafe = yield call([response, "json"]);
    yield put(createCafeSuccess(cafe));
  } catch (error) {
    yield put(createCafeFailure(error));
  }
}

function* deleteCafeSaga(action) {
  try {
    yield call(() =>
      fetch(`${SERVER_URL}/api/cafe/${action.payload}`, {
        method: "DELETE",
      })
    );
    yield put(deleteCafeSuccess(action.payload));
  } catch (error) {
    console.log({ error });
    yield put(deleteCafeFailure(error));
  }
}

function* updateCafeSaga(action) {
  try {
    const { id, formData } = action.payload;
    const response = yield call(() =>
      fetch(`${SERVER_URL}/api/cafe/${id}`, {
        method: "PUT",
        body: formData,
      })
    );
    const cafe = yield call([response, "json"]);
    yield put(updateCafeSuccess(cafe.data.id));
  } catch (error) {
    yield put(updateCafeFailure(error));
  }
}

function* watchCafes() {
  yield takeEvery("cafe/createCafe", createCafeSaga);
  yield takeEvery("cafe/getCafes", getCafesSaga);
  yield takeEvery("cafe/deleteCafe", deleteCafeSaga);
  yield takeEvery("cafe/getCafe", getCafe);
  yield takeEvery("cafe/updateCafe", updateCafeSaga);
}

export default watchCafes;
