import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const logsApi = createApi({
  reducerPath: 'predictLogs',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8001',
  }),
  endpoints(builder) {
    return {
      fetchAllLogs: builder.query({
        query: () => { 
          return {
            url: '/get_prediction_logs/', 
            method: 'GET',
          };
        },
      }),

      fetchLogs: builder.query({
        providesTags:['fetchPredictLogsById'],
        query: (userId) => { 
          return {
            url: `/get_prediction_logs_by_userid/${userId}`, 
            method: 'GET',
          };
        },
      }),

      addNewPrediction: builder.mutation({
        invalidatesTags: ['fetchPredictLogsById'],
        query: (requestData) => {
          return {
            url: '/predict/',
            method: 'POST',
            body: requestData
          };
        },
      }),

      deletePredictionLogs: builder.mutation({
        invalidatesTags: ['fetchPredictLogsById'],
        query: (logIds) => ({
          url: '/prediction_log_delete/',
          method: 'DELETE',
          body: logIds,
        }),
      }),

    };
  },
});



export const {
  useFetchAllLogsQuery,
  useFetchLogsQuery,
  useAddNewPredictionMutation,
  useDeletePredictionLogsMutation
} = logsApi;
export { logsApi };