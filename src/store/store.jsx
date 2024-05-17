import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { logsApi } from './apis/logsApi';
import { predictionApi } from './apis/predictionApi'


export const store = configureStore({
  reducer: {
    [logsApi.reducerPath]: logsApi.reducer,
    [predictionApi.reducerPath]: predictionApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(logsApi.middleware)
  .concat(predictionApi.middleware)
});

setupListeners(store.dispatch);

export {
  useFetchLogsQuery,
  useFetchAllLogsQuery,
  useAddNewPredictionMutation
} from './apis/logsApi';


export {
  useAddPredictionMutation
} from './apis/predictionApi';


