export interface Article {
  id: string;
  title: string;
  date: string;
}

export const articles: Article[] = [
  {
    id: 'oauth-and-pkce',
    title: 'OAuth and PKCE',
    date: '10.Apr.2026'
  },
  {
    id: 'deploy-frontend-on-aws',
    title: 'Deploy Frontend on AWS',
    date: '20.Mar.2026'
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    date: '17.Mar.2026'
  },
  {
    id: 'system-design-for-beginners',
    title: 'System Design For Beginners',
    date: '14.Mar.2026'
  },
    {
    id: 'i-built-my-own-analytics-tool',
    title: 'I Built My Own Analytics Tool. Here is How and Why.',
    date: '13.Mar.2026'
  },
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
