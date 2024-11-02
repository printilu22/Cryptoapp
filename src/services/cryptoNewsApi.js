import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Helper function to create requests with the News API headers
const createRequest = (url) => ({ url });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Your Node server's base URL
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/everything?q=${newsCategory}&pageSize=${count}`),
    }),
  }),
});

// Exporting the hook for fetching news
export const { useGetCryptoNewsQuery } = cryptoNewsApi;
