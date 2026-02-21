/**
 * Site Configuration
 *
 * This file contains all personal/site-specific information.
 * When forking this project, update these values to match your own.
 */

export const siteConfig = {
  // Basic site info
  name: "gauravnardia.com",
  title: "Gaurav Nardia",
  description:
    "Full Stack Developer. Building cool stuffs with code.",
  url: "https://gauravnardia.com",

  // Author info
  author: {
    name: "Gaurav Nardia",
    handle: "@gaurav_nardia",
    email: "gauravnardia07@gmail.com",
      bio: "Full Stack Developer. Building cool stuffs with code.",
    shortBio:
      "Full Stack Developer. Building cool stuffs with code.",
  },

  // Social links
  social: {
    twitter: "https://x.com/gaurav_nardia",
    linkedin: "https://www.linkedin.com/in/gauravnardia",
    github: "https://github.com/GauravNardia",
  },

  // Featured projects/companies
  projects: {
    trybit: "https://trybit.in",
  },

  // Default images
  images: {
    profile: "/assets/profile.jpeg",
    ogDefault: "/assets/og-images/og-home.jpg",
    ogWriting: "/assets/og-images/og-writing.jpg",
    ogExperience: "/assets/og-images/og-experience.jpg",
    ogWork: "/assets/og-images/og-work.jpg",
    ogPhotography: "/assets/og-images/og-photography.jpg",
    footerSignature: "/assets/footer-signature.png",
  },
};

// Helper to get full URL for images
export function getImageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path}`;
}

// Helper to get canonical URL
export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}
