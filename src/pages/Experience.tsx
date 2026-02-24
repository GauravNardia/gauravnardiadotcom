import { useState, useMemo } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet";
import { Divider } from "@/components/Divider";

type Category = "All" | "Startup" | "Open Source";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  category: Category;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Peerlist",
    role: "Full Stack Developer",
    duration: "August 2025 - January 2026",
    description:
      "Built and maintained production features for a professional networking platform serving hundreds of thousands of users. Worked across React, Next.js, and backend services. Improved UI performance, collaborated in an agile team, participated in code reviews, and shipped features consistently.",
    category: "Startup",
  },
  {
    id: 2,
    company: "Klavish AI",
    role: "Open Source Contributor",
    duration: "August 2025 - October 2025",
    description:
      "Built a Spotify MCP server end-to-end, enabling music control via LLMs. Worked on backend logic, API integrations, and system architecture focused on scalability and clean structure.",
    category: "Open Source",
  },
  {
    id: 3,
    company: "Nimbus.storage",
    role: "Open Source Contributor",
    duration: "May 2025 - August 2025",
    description:
      "Developed a OneDrive provider SDK using Microsoft Graph API with full CRUD operations. Enabled account linking in BetterAuth. Improved type safety, test coverage using Jest, and overall codebase organization.",
    category: "Open Source",
  },
];

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
  const categories: Category[] = ["All", "Startup", "Open Source"];

  return (
    <div className="flex gap-4 items-center w-full relative">
      <input
        type="search"
        placeholder="Search experience"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-base text-[var(--foreground)] placeholder:text-slate-400"
      />

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-1 text-base text-[var(--foreground)] hover:opacity-70"
        >
          {selectedCategory}
          <ChevronDown size={16} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-md py-1 min-w-[140px]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  selectedCategory === category
                    ? "font-medium text-[var(--foreground)] bg-gray-100 dark:bg-gray-800"
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
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

function ExperienceCard({ experience }: { experience: ExperienceItem }) {
  return (
    <div className="flex flex-col gap-2 py-4 dark:border-gray-800 animate-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[var(--foreground)]">
          {experience.company}
        </h3>
        <span className="text-sm text-slate-500">
          {experience.duration}
        </span>
      </div>

      <p className="text-sm text-slate-500">{experience.role}</p>

      <p className="text-base text-[var(--foreground)] leading-relaxed">
        {experience.description}
      </p>
    {/* Divider */}
    <div className=''>
     <Divider />
    </div>
    </div>
  );
}

export function Experience() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");

  const filteredExperiences = useMemo(() => {
    return experiences
      .filter((exp) =>
        selectedCategory === "All"
          ? true
          : exp.category === selectedCategory
      )
      .filter((exp) =>
        exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Experience | Gaurav Nardia</title>
        <meta
          name="description"
          content="Professional experience across startups, SaaS, and open-source projects."
        />
        <link
          rel="canonical"
          href="https://gauravnardia.com/experience"
        />
      </Helmet>

      <div className="bg-[var(--background)] min-h-screen">
        <div className="flex flex-col gap-10 items-center mx-auto px-4 py-10 w-full max-w-[544px] animate-in">
          <Header activePage="experience" />

          <p className="text-lg text-[var(--foreground)] leading-relaxed animate-in">
            I've worked with startups and open-source teams, building products that solve real problems. Most of my experience comes from hands-on execution, designing systems, shipping features, and iterating fast. I value clarity, simplicity, and shipping consistently.
          </p>
          {/* Divider */}
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

          <div className="flex flex-col gap-6 w-full animate-in">
            {filteredExperiences.length === 0 ? (
              <p className="text-slate-500 py-6">
                No experience found.
              </p>
            ) : (
              filteredExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))
            )}
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}