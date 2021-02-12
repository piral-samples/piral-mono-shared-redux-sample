import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put, call } from "redux-saga/effects";

// Reducer
const initialState = {
    url: "",
    loading: false,
    error: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "REQUESTED_DOG":
            return {
                url: "",
                loading: true,
                error: false,
            };
        case "REQUESTED_DOG_SUCCEEDED":
            return {
                url: action.url,
                loading: false,
                error: false,
            };
        case "REQUESTED_DOG_FAILED":
            return {
                url: "",
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

// Action Creators
const requestDog = () => {
    return { type: "REQUESTED_DOG" };
};

const requestDogSuccess = (data) => {
    return { type: "REQUESTED_DOG_SUCCEEDED", url: data.message };
};

const requestDogError = () => {
    return { type: "REQUESTED_DOG_FAILED" };
};

const fetchDog = () => {
    return { type: "FETCHED_DOG" };
};

// Sagas
function* watchFetchDog() {
    yield takeEvery("FETCHED_DOG", fetchDogAsync);
}

function* fetchDogAsync() {
    try {
        yield put(requestDog());
        const data = yield call(() => {
            return fetch("https://dog.ceo/api/breeds/image/random").then((res) => res.json());
        });
        yield put(requestDogSuccess(data));
    } catch (error) {
        yield put(requestDogError());
    }
}

// Store
const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchFetchDog);

export const actions = {
    fetchDog,
};
