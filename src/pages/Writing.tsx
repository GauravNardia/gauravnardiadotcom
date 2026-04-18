import { Link } from 'react-router-dom';
import { sortedArticles } from '../data/articles';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Helmet } from 'react-helmet';

function ArticleList() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Article List">
      {sortedArticles.map((article) => (
        <Link 
          key={article.id}
          to={`/writing/${article.id}`}
          className="content-stretch flex items-center justify-between leading-[1.4] not-italic relative shrink-0 text-justify text-nowrap w-full whitespace-pre hover:opacity-70 transition-opacity group"
        >
          <p className="font-medium relative shrink-0 text-[var(--foreground)] text-lg group-hover:underline underline-offset-4">{article.title}</p>
          <p className="relative shrink-0 text-base text-[var(--muted)]">{article.date}</p>
        </Link>
      ))}
    </div>
  );
}

function ColorDots() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-0 py-[8px] relative shrink-0 w-full">
      <div className="relative shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="#E9573F" id="Ellipse 1" r="4" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="#F0BF2E" id="Ellipse 2" r="4" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="#4E964E" id="Ellipse 3" r="4" />
        </svg>
      </div>
    </div>
  );
}

export function Writing() {
  return (
    <>
      <Helmet>
        <title>Writing | Gaurav Nardia</title>
        <meta name="description" content="Raw thoughts on design, building products, and the startup journey by Gaurav Nardia." />
        <link rel="canonical" href="https://gauravnardia.com/writing" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Writing | Gaurav Nardia" />
        <meta property="og:description" content="Raw thoughts on design, building products, and the startup journey by Gaurav Nardia." />
        <meta property="og:url" content="https://gauravnardia.com/writing" />
        <meta property="og:image" content="https://gauravnardia.com/assets/og-images/og-writing.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Writing | Gaurav Nardia" />
        <meta name="twitter:description" content="Raw thoughts on building products, and the startup journey by Gaurav Nardia." />
        <meta name="twitter:image" content="https://gauravnardia.com/assets/og-images/og-writing.jpg" />
      </Helmet>
      <div className="bg-[var(--background)] relative size-full min-h-screen" data-name="gauravnardia.com/writing">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-center mx-auto px-[16px] py-[40px] w-full max-w-[544px]">
          <div className="animate-in w-full">
            <Header activePage="writing" />
          </div>
          <p className="leading-[1.4] not-italic relative shrink-0 text-[var(--foreground)] text-lg text-justify w-full animate-in animate-delay-1">
          I write about what I actually build and break. You'll find deep dives on Docker internals, OAuth flows, AWS deployments, system design patterns, and the real-world lessons that never make it into tutorials. These aren't summaries — they're field notes from someone in the trenches.
          </p>
          <div className="animate-in animate-delay-2 w-full">
            <ArticleList />
          </div>
          {/* <MailingList /> */}
          <div className="animate-in animate-delay-3">
            <ColorDots />
          </div>
          <div className="animate-in animate-delay-4 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}