import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Divider } from "../components/Divider";
import { WritingSection } from "../components/WritingSection";
import { useState } from "react";

export function Home() {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipText, setTooltipText] = useState("Copy email");

	const handleCopyEmail = (e: React.MouseEvent) => {
		e.preventDefault();
		const email = "gauravnardia07@gmail.com";

		// Fallback method using textarea
		const textArea = document.createElement("textarea");
		textArea.value = email;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand("copy");
			if (successful) {
				setTooltipText("Copied!");
				setTimeout(() => {
					setTooltipText("Copy email");
					setShowTooltip(false);
				}, 2000);
			}
		} catch (err) {
			console.error("Failed to copy text: ", err);
		} finally {
			document.body.removeChild(textArea);
		}
	};

	return (
		<div className='bg-[var(--background)] min-h-screen w-full flex justify-center py-10'>
			<div className='flex flex-col gap-10 items-center w-full max-w-[544px] px-4 m-0'>
				{/* Header */}
				<div className='animate-in w-full'>
					<Header />
				</div>

				{/* Bio Content */}
                <div className='font-normal min-w-full relative shrink-0 text-[var(--foreground)] text-lg text-justify flex flex-col gap-4'>
               	<p className='leading-[1.4] relative animate-in animate-delay-1'>
	            <span>
			        Hey, I'm Gaurav 👋 a self-taught full stack developer who builds things that actually ship. I don't just write code; I architect systems, debug production incidents, and iterate until it works. I've gone from zero to production across SaaS platforms, real-time applications, and open-source tools, solo and in teams.
		        </span>
               	</p>

	             <p className='leading-[1.4] animate-in animate-delay-2'>
		         <span>
			         I've worked on products like{" "}
		         </span>
				 	<a
			         href='https://better-vercel.com'
			         target='_blank'
			         rel='noopener noreferrer'
			         className='underline underline-offset-4 hover:opacity-80 transition'>
			         Better Vercel
		         </a>
				 <span>,{" "}</span>
				 	<a
			         href='https://puffinanalytics.com'
			         target='_blank'
			         rel='noopener noreferrer'
			         className='underline underline-offset-4 hover:opacity-80 transition'>
			         Puffin Analytics
		         </a>
				 <span>,{" "}</span>
		         <a
			         href='https://trybit.in'
			         target='_blank'
			         rel='noopener noreferrer'
			         className='underline underline-offset-4 hover:opacity-80 transition'>
			         TryBit
		         </a>
	           	<span>{" "}and MedipulseX, and contributed to open-source projects while shipping real-world systems.</span>
	             </p>

	             {/* <p className='leading-[1.4] animate-in animate-delay-3'>
		         <span>
			         I've worked as a Full Stack Engineer at Peerlist.
			         I'm deeply interested in technology, systems, science,
			         and honest work. I believe progress comes from shipping — not talking.
		         </span>
	             </p> */}

            	<p className='leading-[1.4] animate-in animate-delay-4'>
		<span>
			I share what I learn about building, code, and startups.
		</span>
		<span
			className='relative inline-block ml-1'
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => {
				if (tooltipText === "Copy email") {
					setShowTooltip(false);
				}
			}}>
			<button
				onClick={handleCopyEmail}
				className='underline underline-offset-4 hover:opacity-80 transition cursor-pointer bg-transparent border-none p-0 text-[var(--foreground)] text-lg'>
				Say hello
			</button>
			{showTooltip && (
				<span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[var(--foreground)] text-[var(--background)] rounded whitespace-nowrap'>
					{tooltipText}
				</span>
			)}
		</span>
		<span>{" "}or connect with me on{" "}</span>
		{/* <a
			href='https://peerlist.io/gauravnardia'
			target='_blank'
			rel='noopener noreferrer'
			className='underline underline-offset-4 hover:opacity-80 transition'>
			Peerlist
		</a> */}
		<span>{" "}</span>
		<a
			href='https://x.com/gaurav_nardia'
			target='_blank'
			rel='noopener noreferrer'
			className='underline underline-offset-4 hover:opacity-80 transition'>
			X
		</a>
		<span>,{" "}</span>
		<a
			href='https://www.linkedin.com/in/gauravnardia'
			target='_blank'
			rel='noopener noreferrer'
			className='underline underline-offset-4 hover:opacity-80 transition'>
			LinkedIn
		</a>
		<span>.</span>
            	</p>
                </div>

				{/* Divider */}
				<div className='animate-in animate-delay-5'>
					<Divider />
				</div>

				{/* Writing Section */}
				<div className='animate-in animate-delay-6 w-full'>
					<WritingSection />
				</div>

				{/* Divider */}
				<div className='animate-in animate-delay-7'>
					<Divider />
				</div>

				{/* Footer */}
				<div className='animate-in animate-delay-8 w-full'>
					<Footer />
				</div>
			</div>
		</div>
	);
}
