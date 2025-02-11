import { useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useGetUserReposQuery } from '@/api/github';
import { RepoCard } from '@/components';
import { IRepository } from '@/types/repo';
import styles from './RepoSearch.module.scss';

export function RepoSearch() {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState(1);
  const [allRepos, setAllRepos] = useState<IRepository[] | null>(null);
  const loader = useRef(null);

  const {
    data: repos,
    isLoading,
    error,
    isFetching,
  } = useGetUserReposQuery({ username, page }, { skip: !username });

  useEffect(() => {
    if (repos) {
      setAllRepos((prev) => (page === 1 ? repos : [...prev, ...repos]));
    }
  }, [repos]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setUsername(value);
    setPage(1);
    setAllRepos(null);
  }, 1000);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && repos?.length === 20) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [isFetching, repos]);

  const renderError = () => {
    if (error) {
      if ('status' in error) {
        return <div className={styles.error}>User not found</div>;
      }
      return <div className={styles.error}>Error fetching repositories</div>;
    }
    return null;
  };
  const renderNodata = () => {
    if (repos?.length === 0 && page === 1) {
      return <div className={styles.error}>No public repositories avalaible</div>;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder='Enter GitHub username'
        onChange={(e) => debouncedSearch(e.target.value)}
      />

      {isLoading && <div className={styles.loading}>Loading...</div>}
      {renderError()}
      {renderNodata()}

      <div className={styles.repoGrid}>
        {allRepos?.map((repo) => <RepoCard repo={repo} key={repo.id} />)}
      </div>

      {isFetching && <div className={styles.loading}>Loading more...</div>}
      <div ref={loader} style={{ height: '200px' }} />
    </div>
  );
}
