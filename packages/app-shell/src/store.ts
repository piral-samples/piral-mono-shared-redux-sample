import { applyMiddleware } from "redux";
import { createStore, IModuleStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { takeEvery, put, call } from "redux-saga/effects";

// Reducer
const initialState = {
    url: "",
    loading: false,
    error: false,
};
const dogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TEST":
            console.log("reducer is called", { state });
            return state;
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
// const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function getDogModule() {
    return {
        id: "dogs",
        reducerMap: {
            dogs: dogReducer,
        },
        sagas: [watchFetchDog],
    };
}

export const store = createStore({
    // enhancers: [window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()],
    extensions: [getSagaExtension({})],
});

store.addModule(getDogModule());
// sagaMiddleware.run(watchFetchDog);

export const actions = {
    fetchDog,
};
