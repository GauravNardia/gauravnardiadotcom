import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Writing } from "./pages/Writing";
import { WritingDetail } from "./pages/WritingDetail";
import { AdminPhotos } from "./pages/AdminPhotos";
import { Helmet } from "react-helmet";
import { Analytics } from "@vercel/analytics/react";
import { Experience } from "./pages/Experience";
import { Work } from "./pages/Work";

export default function App() {
	return (
		<Router>
			<Helmet>
				<title>Gaurav Nardia aka @gaurav_nardia</title>
				<meta
					name='description'
					content='Full Stack Developer. Building cool stuffs with code.'
				/>
				<meta name='author' content='Gaurav Nardia' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<html lang='en' />

				{/* Open Graph / Social Media */}
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Gaurav Nardia aka @gaurav_nardia' />
				<meta
					property='og:description'
					content='Full Stack Developer. Building cool stuffs with code.'
				/>
				<meta property='og:site_name' content='gauravnardia.com' />
				<meta property='og:url' content='https://gauravnardia.com' />
				<meta property='og:image' content='https://gauravnardia.com/assets/og-images/og-home.jpg' />

				{/* Twitter */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:creator' content='@gaurav_nardia' />
				<meta name='twitter:site' content='@gaurav_nardia' />
				<meta name='twitter:title' content='Gaurav Nardia aka @gaurav_nardia' />
				<meta
					name='twitter:description'
					content='Full Stack Developer. Building cool stuffs with code.'
				/>
				<meta
					name='twitter:image'
					content='https://gauravnardia.com/assets/og-images/og-home.jpg'
				/>

				{/* Theme color */}
				<meta name='theme-color' content='#ffffff' media='(prefers-color-scheme: light)' />
				<meta name='theme-color' content='#000000' media='(prefers-color-scheme: dark)' />

				{/* JSON-LD Structured Data */}
				<script type='application/ld+json'>
					{JSON.stringify({
						"@context": "https://schema.org",
						"@graph": [
							{
								"@type": "Person",
								"@id": "https://gauravnardia.com/#person",
								name: "Gaurav Nardia",
								alternateName: "@gaurav_nardia",
								url: "https://gauravnardia.com",
								image: "https://gauravnardia.com/profile.jpeg",
								jobTitle: "Full Stack Developer",
								description:
									"Full Stack Developer. Building cool stuffs with code.",	
								sameAs: [
									"https://x.com/gaurav_nardia",
									"https://www.linkedin.com/in/gauravnardia",
									"https://github.com/GauravNardia",
								],
							},
							{
								"@type": "WebSite",
								"@id": "https://gauravnardia.com/#website",
								url: "https://gauravnardia.com",
								name: "Gaurav Nardia - @gaurav_nardia",
								description:
									"Full Stack Developer. Building cool stuffs with code.",
								publisher: {
									"@id": "https://gauravnardia.com/#person",
								},
								inLanguage: "en-US",
							},
						],
					})}
				</script>
			</Helmet>

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/writing' element={<Writing />} />
				<Route path='/writing/:id' element={<WritingDetail />} />
				<Route path='/experience' element={<Experience />} />
				<Route path='/work' element={<Work />} />
				<Route path='/admin/photos' element={<AdminPhotos />} />
			</Routes>
			<Analytics />
		</Router>
	);
}
