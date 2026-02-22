export interface Article {
  id: string;
  title: string;
  date: string;
}

export const articles: Article[] = [
  {
    id: 'reverse-engineering',
    title: 'Reverse Engineering',
    date: '22.Feb.2026'
  },
];

// Sort articles by date (newest first)
export const sortedArticles = [...articles].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});
