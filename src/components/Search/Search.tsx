import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useGetUserReposQuery } from '@/api/github';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setRepos, setLoading, setError } from '@/store/reposSlice';
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

  // Обработка изменений в данных
  useEffect(() => {
    // Установка состояния загрузки
    dispatch(setLoading(isLoading));

    // Обработка ошибок
    if (error) {
      dispatch(setError('status' in error ? user : fetching));
      dispatch(setRepos(null));
      return;
    }

    // Обработка успешного получения данных
    if (repos) {
      // Обработка пустого результата
      if (repos.length === 0 && currentPage === 1) {
        dispatch(setError(no_avalaible));
        dispatch(setRepos(null));
        return;
      }

      // Обновление списка репозиториев
      const updatedRepos =
        currentPage === 1 ? repos : currentRepos ? [...currentRepos, ...repos] : repos;

      dispatch(setRepos(updatedRepos));
      dispatch(setError(null));
    }
  }, [repos, error, isLoading, currentPage]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setUsername(value);
    dispatch(setRepos(null));
  }, 1000);

  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  );
}
