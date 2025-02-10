'use client';
import { RepoSearch } from '@/components/RepoSearch/RepoSearch';
//import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <h1>GitHub Repository Search</h1>
      <RepoSearch />
    </>
  );
}
