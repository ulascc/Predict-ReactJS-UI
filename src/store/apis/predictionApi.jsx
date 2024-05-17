import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const predictionApi = createApi({

  reducerPath: 'predictionRequest',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8001',
  }),
  endpoints(builder) {
    return {
      addPrediction: builder.mutation({
        query: (requestData) => {
          return {
            url: '/predict/',
            method: 'POST',
            body: requestData
          };
        },
        invalidatesTags: ['fetchPredictLogsById'],
      }),
    };
  },
});

export const { useAddPredictionMutation } = predictionApi;
export { predictionApi };
