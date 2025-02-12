import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useGetUserReposQuery } from '@/api/github';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setRepos, setLoading, setError, setPage } from '@/store/reposSlice';
import staticData from '@/constants/data.json';
import styles from './Search.module.scss';

interface SearchProps {
  currentPage: number;
}

export function Search({ currentPage }: SearchProps) {
  const {
    placeholder,
    errors: { user, fetching, no_avalaible },
  } = staticData.fetch;
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const currentRepos = useAppSelector((state) => state.repos.repos);

  const {
    data: repos,
    isLoading,
    error,
  } = useGetUserReposQuery({ username, page: currentPage }, { skip: !username });

  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (error) {
      dispatch(setError('status' in error ? user : fetching));
      dispatch(setRepos(null));
      return;
    }

    if (repos) {
      if (repos.length === 0 && currentPage === 1) {
        dispatch(setError(no_avalaible));
        dispatch(setRepos(null));
        return;
      }

      dispatch(setError(null));
    }
  }, [repos, error, isLoading, currentPage]);
  useEffect(() => {
    const existingIds = new Set(currentRepos?.map((repo) => repo.id));
    const updatedRepos =
      currentPage === 1
        ? repos
        : currentRepos
          ? [...currentRepos, ...(repos?.filter((repo) => !existingIds.has(repo.id)) || [])]
          : repos || [];
    dispatch(setRepos(updatedRepos || []));
  }, [repos, dispatch]);
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setUsername(value);
    dispatch(setRepos(null));
    dispatch(setPage(1));
  }, 1000);

  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  );
}
