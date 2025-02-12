'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { incrementPage } from '@/store/reposSlice';
import { IRepository } from '@/types/repo';
import { RepoCard, Search } from '@/components';
import staticData from '@/constants/data.json';
import styles from './RepoSearch.module.scss';

export function RepoSearch() {
  const {
    title,
    loader: { load, fetch },
  } = staticData.home;
  const dispatch = useAppDispatch();
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { repos, loading, error, page } = useAppSelector((state) => state.repos);
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (repos) {
          const total = (page * repos?.length) % 20;
          if (entries[0].isIntersecting && !loading && total === 0 && repos?.length > 19) {
            setIsLoadingMore(true);
            dispatch(incrementPage());
          }
        }
      },
      { threshold: 0.1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.disconnect();
        setIsLoadingMore(false);
      }
    };
  }, [loading, repos?.length, dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <Search currentPage={page} />
      <div className={styles.repoGrid}>
        {repos?.map((repo: IRepository) => <RepoCard repo={repo} key={repo.id} />)}
      </div>
      {loading && <div className={styles.loading}>{load}</div>}
      {error && <div className={styles.error}>{error}</div>}
      <div ref={loader} style={{ height: '20px' }} />
      {isLoadingMore && <div className={styles.loading}>{fetch}</div>}
    </div>
  );
}
