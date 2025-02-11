import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { RepoCard, Search } from '@/components';
import styles from './RepoSearch.module.scss';

export function RepoSearch() {
  const { repos, loading, error } = useAppSelector((state) => state.repos);

  useEffect(() => {
    console.log('Repos from store:', repos);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [repos, loading, error]);

  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.repoGrid}>
        {repos?.map((repo) => <RepoCard repo={repo} key={repo.id} />)}
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
