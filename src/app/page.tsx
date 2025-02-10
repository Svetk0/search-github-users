'use client';
import { RepoSearch } from '@/components/RepoSearch/RepoSearch';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>GitHub Repository Search</h1>
        <RepoSearch />
      </main>
    </div>
  );
}
