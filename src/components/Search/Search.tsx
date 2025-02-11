// import Link from 'next/link';
// import { IRepository } from '@/types/repo';
// import { useState, useEffect, useRef } from 'react';
// import { useDebouncedCallback } from 'use-debounce';
// import { useGetUserReposQuery } from '@/api/github';
// import staticData from '@/constants/data.json';
// import styles from './Search.module.scss';

// export async function Search() {
//   const [username, setUsername] = useState('');
//   const [page, setPage] = useState(1);
//   const [allRepos, setAllRepos] = useState<IRepository[] | null>(null);
//   const loader = useRef(null);

//   const {
//     data: repos,
//     isLoading,
//     error,
//     isFetching,
//   } = await useGetUserReposQuery({ username, page }, { skip: !username });
//   const debouncedSearch = useDebouncedCallback((value: string) => {
//     setUsername(value);
//     setPage(1);
//     setAllRepos([]);
//   }, 1000);
//   const renderError = () => {
//     if (error) {
//       if ('status' in error) {
//         return <div className={styles.error}>User not found</div>;
//       }
//       return <div className={styles.error}>Error fetching repositories</div>;
//     }
//     return null;
//   };
//   const renderNodata = () => {
//     if (repos?.length === 0 && page === 1) {
//       return <div className={styles.error}>No public repositories avalaible</div>;
//     }
//     return null;
//   };
//   return (
//     <>
//       <input
//         className={styles.input}
//         placeholder='Enter GitHub username'
//         onChange={(e) => debouncedSearch(e.target.value)}
//       />

//       {isLoading && <div className={styles.loading}>Loading...</div>}
//       {renderError()}
//       {renderNodata()}
//     </>
//   );
// }
