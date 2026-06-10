import { useState, useMemo, useRef, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet";
import { Divider } from "@/components/Divider";

/* ================================
   PROJECT DATA (YOUR REAL WORK)
================================ */

type FavoriteCategory = "Product" | "Project";

interface Favorite {
  id: number;
  name: string;
  description: string;
  url: string;
  category: FavoriteCategory;
  nofollow?: boolean;
}

const favorites: Favorite[] = [
  {
    id: 1,
    name: "Better Vercel",
    description:
      "Vercel alternative that lets developers deploy applications on managed infrastructure or directly into their own AWS account. Built with automated deployments, custom domains, SSL, logs, and BYOC.",
    url: "https://better-vercel.com",
    category: "Project",
  },
  {
    id: 1,
    name: "Vercel",
    description:
      "Deploy your apps in seconds.",
    url: "https://vercel.gauravnardia.com",
    category: "Project",
  },
    {
    id: 2,
    name: "Puffin Analytics",
    description:
      "Simple, privacy-first web analytics built for developers and founders. No cookies. No tracking creepiness. Just fast, reliable insights.",
    url: "https://puffinanalytics.com",
    category: "Project",
  },
  {
    id: 3,
    name: "Trybit",
    description:
      "Real-time developer challenge platform. Built authentication, challenge engine, real-time leaderboard & Razorpay integration. 300+ signups in 30 days.",
    url: "https://trybit.in",
    category: "Project",
  },
  {
    id: 4,
    name: "HTTP Protocol Project",
    description:
      "Built simplified HTTPS protocol from scratch. Implemented TCP handshake, encrypted data exchange & certificate validation.",
    url: "https://github.com/GauravNardia/tcp-protocol",
    category: "Project",
  },
  // {
  //   id: 4,
  //   name: "AI App Builder",
  //   description:
  //     "Prompt-based web app builder using OpenAI. Built dynamic generation logic and structured output handling.",
  //   url: "https://builder-flax-six.vercel.app",
  //   category: "Project",
  // },
  {
    id: 5,
    name: "Multiplayer Chess",
    description:
      "Real-time multiplayer chess app using WebSockets. Live board sync, move validation & room-based architecture.",
    url: "https://github.com/GauravNardia/chess",
    category: "Project",
  },
];

/* ================================
   OG IMAGE CACHE
================================ */

const ogImageCache: Record<string, { image: string | null; loading: boolean }> =
  {};

async function prefetchOgImage(url: string): Promise<string | null> {
  if (ogImageCache[url]) return ogImageCache[url].image;

  ogImageCache[url] = { image: null, loading: true };

  try {
    const response = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(url)}`
    );
    const data = await response.json();
    const imageUrl =
      data?.data?.image?.url || data?.data?.logo?.url || null;

    ogImageCache[url] = { image: imageUrl, loading: false };
    return imageUrl;
  } catch {
    ogImageCache[url] = { image: null, loading: false };
    return null;
  }
}

let prefetchStarted = false;
function prefetchAllOgImages() {
  if (prefetchStarted) return;
  prefetchStarted = true;

  favorites.forEach((fav, index) => {
    setTimeout(() => {
      prefetchOgImage(fav.url);
    }, index * 50);
  });
}

/* ================================
   CATEGORY
================================ */

type Category = "All" | "Products" | "Project";

/* ================================
   SEARCH + FILTER (UNCHANGED STYLE)
================================ */

function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categories: Category[] = ["All", "Products", "Project"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className='flex gap-4 items-center w-full relative'>
      <input
        type='search'
        placeholder='Search projects'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='flex-1 bg-transparent border-none outline-none text-base text-[var(--foreground)] placeholder:text-slate-400'
      />

      <div className='relative z-50' ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className='flex items-center gap-1 hover:opacity-70'
        >
          {selectedCategory}
          <ChevronDown size={16} />
        </button>

        {showDropdown && (
          <div className='absolute right-0 mt-2 bg-white dark:bg-black border rounded-lg shadow-lg py-1'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowDropdown(false);
                }}
                className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================
   PROJECT ITEM (MATCHES ORIGINAL STYLE)
================================ */

function ProjectItem({ favorite }: { favorite: Favorite }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ogImage, setOgImage] = useState<string | null>(null);

  useEffect(() => {
    if (isHovered) {
      prefetchOgImage(favorite.url).then(setOgImage);
    }
  }, [isHovered, favorite.url]);

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const getFaviconUrl = (url: string, name: string) => {
    if (name.toLowerCase().includes("vercel") && !name.toLowerCase().includes("better")) {
      return "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png";
    }
    if (name === "Better Vercel") {
      return "/assets/dark-logo.svg"; // put your image in the /public folder
    }
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return "";
    }
  };

  return (
    <div className="relative w-full">
      {/* Hover OG Preview */}
      {isHovered && ogImage && (
        <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 z-50">
          <img
            src={ogImage}
            alt="preview"
            className="h-[140px] w-auto max-w-[260px] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl"
          />
        </div>
      )}

      <a
        href={favorite.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group block w-full rounded-xl px-4 py-4 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/5"
      >
        <div className="flex gap-4 items-start">
          {/* Favicon */}
          <div className="mt-1 shrink-0">
            <img
              src={getFaviconUrl(favorite.url, favorite.name)}
              className={`size-6 rounded-md ${favorite.name === "Better Vercel" ? "invert dark:invert-0" : ""}`}
              alt="favicon"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-lg group-hover:underline underline-offset-4">
                {favorite.name}
              </p>

              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-slate-500">
                {favorite.category}
              </span>
            </div>

            <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
              {favorite.description}
            </p>

            <p className="text-sm text-slate-400 pt-1">
              {getDomain(favorite.url)}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

/* ================================
   MAIN WORK PAGE
================================ */

export function Work() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");

  useEffect(() => {
    prefetchAllOgImages();
  }, []);

  const filtered = useMemo(() => {
    return favorites.filter((fav) =>
      fav.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <Helmet>
        <title>Work | Gaurav Nardia</title>
      </Helmet>

      <div className='bg-[var(--background)] min-h-screen'>
        <div className='flex flex-col gap-10 items-center mx-auto px-4 py-10 w-full max-w-[544px] animate-in'>
          <Header activePage='work' />

          <p className='text-lg leading-relaxed animate-in'>
            Each project here started with a problem I couldn't ignore. From Puffin Analytics (privacy-first web analytics, no cookies) to Trybit (a real-time dev challenge platform with 300+ signups in 30 days) to Vercel deployments that go live in seconds — these are systems I designed, deployed, and own end-to-end — infrastructure, auth, payments, and all.
          </p>

          <div>
            <Divider/>
          </div>
{/* 
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          /> */}

          <div className='flex flex-col gap-3 w-full animate-in'>
            {filtered.map((fav) => (
              <ProjectItem key={fav.id} favorite={fav} />
            ))}
          </div>
			{/* Divider */}
			<div className='animate-in animate-delay-7'>
			  <Divider/>
			</div>
          <Footer />
        </div>
      </div>
    </>
  );
}