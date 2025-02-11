import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRepository } from '@/types/repo';

// interface SearchResponse {
//   items: IRepository[];
//   total_count: number;
// }

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  endpoints: (builder) => ({
    getUserRepos: builder.query<IRepository[], { username: string; page: number }>({
      query: ({ username, page = 1 }) => ({
        url: `/users/${username}/repos`,
        params: {
          per_page: 20,
          page,
          sort: 'updated',
        },
      }),
    }),
  }),
});

export const { useGetUserReposQuery, useLazyGetUserReposQuery } = githubApi;
