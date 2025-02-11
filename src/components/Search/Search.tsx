import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useGetUserReposQuery } from '@/api/github';
import { useAppDispatch } from '@/lib/hooks';
import { setRepos, setLoading, setError } from '@/store/reposSlice';
import staticData from '@/constants/data.json';
import styles from './Search.module.scss';

export function Search() {
  const {
    placeholder,
    errors: { user, fetching, no_avalaible },
  } = staticData.fetch;
  const [username, setUsername] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const {
    data: repos,
    isLoading,
    error,
  } = useGetUserReposQuery({ username, page }, { skip: !username });

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (repos) {
      dispatch(setRepos(repos));
      dispatch(setError(null));
      console.log('Dispatching repos:', repos);
    }
    if (repos?.length === 0 && page === 1) {
      dispatch(setError(no_avalaible));
    }
    if (error) {
      if ('status' in error) {
        dispatch(setError(user));
      } else dispatch(setError(fetching));
      dispatch(setRepos(null));
    }
  }, [repos, isLoading, error, dispatch]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setUsername(value);
    setPage(1);
    dispatch(setRepos(null));
  }, 1000);

  return (
    <>
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </>
  );
}
