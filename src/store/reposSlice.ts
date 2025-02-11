import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRepository } from '@/types/repo';

interface ReposState {
  repos: IRepository[] | null;
  loading: boolean;
  error: string | null;
  page: number;
}

const initialState: ReposState = {
  repos: null,
  loading: false,
  error: null,
  page: 1,
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setRepos: (state, action: PayloadAction<IRepository[] | null>) => {
      state.repos = action.payload;
      console.log('Repos updated in store:', action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setRepos, setLoading, setError, setPage } = reposSlice.actions;
export default reposSlice.reducer;
