import {
  Action,
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {persistStore, persistReducer} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import overviewReducer, {OverviewState} from './slices/overview';
import formDataReducer, {FormDataState} from './slices/formData';

// Create a noop storage for server-side
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export interface InitialState {
  overview: OverviewState;
  formData: FormDataState;
}

const combinedReducer = combineReducers({
  overview: overviewReducer,
  formData: formDataReducer,
});

// Configure redux-persist only for formData slice
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['formData'], // Only persist formData
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const masterReducer = (
  state: any,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    // Preserve _persist if it exists
    if (state?._persist) {
      nextState._persist = state._persist;
    }
    return nextState;
  } else {
    return persistedReducer(state, action);
  }
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';
  
  if (isServer) {
    // Server-side: geen persistentie
    return configureStore({
      reducer: combinedReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActionPaths: ['payload', 'register', 'rehydrate'],
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
          },
        }),
    });
  } else {
    // Client-side: met persistentie
    return configureStore({
      reducer: masterReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActionPaths: ['payload', 'register', 'rehydrate'],
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
          },
        }),
    });
  }
};

export const wrapper = createWrapper(makeStore);

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
