import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

interface SearchResponse {
  items: Repository[];
  total_count: number;
}

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  endpoints: (builder) => ({
    getUserRepos: builder.query<Repository[], { username: string; page: number }>({
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
