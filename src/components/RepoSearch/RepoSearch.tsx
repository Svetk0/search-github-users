import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { useAppDispatch } from '@/lib/hooks';
import { setPage } from '@/store/reposSlice';
import { RepoCard, Search } from '@/components';
import styles from './RepoSearch.module.scss';

export function RepoSearch() {
  const dispatch = useAppDispatch();
  const { repos, loading, error, page } = useAppSelector((state) => state.repos);
  //const [page, setPage] = useState(1);
  const loader = useRef(null);
  useEffect(() => {
    console.log('Repos from store:', repos);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
    console.log('current page:', page);
  }, [repos, loading, error, page]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && repos?.length === 20) {
          dispatch(setPage(page + 1));
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [loading, repos]);
  return (
    <div className={styles.container}>
      <Search currentPage={page} />
      <div className={styles.repoGrid}>
        {repos?.map((repo) => <RepoCard repo={repo} key={repo.id} />)}
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && repos?.length === 20 && <div className={styles.loading}>Loading more...</div>}
      <div ref={loader} style={{ height: '20px' }} />
    </div>
  );
}
