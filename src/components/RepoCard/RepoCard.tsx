'use client';
import Link from 'next/link';
import { IRepo } from '@/types/repo';
import styles from './RepoCard.module.scss';

type Props = {
  repo: IRepo;
};

export function RepoCard({ repo }: Props) {
  return (
    <div className={styles.repoCard}>
      <h3>{repo.name}</h3>
      <p>{repo.description || 'No description available'}</p>
      <div className={styles.repoInfo}>
        <span>⭐ {repo.stargazers_count}</span>
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      <Link
        href={repo.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.repoLink}
      >
        View Repository
      </Link>
    </div>
  );
}
