import Link from 'next/link';
import { IRepository } from '@/types/repo';
import staticData from '@/constants/data.json';
import styles from './RepoCard.module.scss';

type Props = {
  repo: IRepository;
};

export function RepoCard({ repo }: Props) {
  const {
    no_data,
    updated,
    buttons: { view },
  } = staticData.card;
  return (
    <div className={styles.repoCard}>
      <h3>{repo.name}</h3>
      <p>{repo.description || no_data}</p>
      <div className={styles.repoInfo}>
        <span>⭐ {repo.stargazers_count}</span>
        <span>
          {updated} {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>

      <Link
        href={repo.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.repoLink}
      >
        {view}
      </Link>
    </div>
  );
}
