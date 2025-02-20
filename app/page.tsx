'use client'

import { ChatWindow } from "@/components/ChatWindow"
import { useState } from "react"

export default function Home() {
	const [link, setLink] = useState("")
	const [linkStatus, setLinkStatus] = useState<"empty" | "set" | "error">("empty")
	const [linkData, setLinkData] = useState(null)

	const handleLinkSubmit = async (inputLink: string) => {
		// Basic URL validation
		try {
			new URL(inputLink)
		} catch {
			setLinkStatus("error")
			return
		}

		try {
			const response = await fetch("/api/link-consumer", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ link: inputLink }),
			})

			if (!response.ok) {
				throw new Error("Failed to process link")
			}

			const data = await response.json()
			setLinkData(data)
			setLink(inputLink)
			setLinkStatus("set")
		} catch (error) {
			setLinkStatus("error")
		}
	}

	const LinkInput = (
		<div className="mb-4 p-4 rounded bg-[#25252d]">
			<div className="flex flex-col gap-2">
				<label htmlFor="linkInput" className="text-sm">
					YouTube link for investment strategy (optional)
				</label>
				<div className="flex gap-2">
					<input
						id="linkInput"
						type="text"
						value={link}
						onChange={(e) => setLink(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleLinkSubmit(e.currentTarget.value)
							}
						}}
						placeholder="Enter URL here..."
						className="flex-1 px-3 py-2 bg-[#1c1c1c] rounded border border-gray-600 focus:outline-none focus:border-blue-500"
					/>
					<button
						onClick={() => handleLinkSubmit(link)}
						className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
					>
						Set
					</button>
				</div>
				{linkStatus === "error" && (
					<p className="text-red-500 text-sm">Please enter a valid URL</p>
				)}
				{linkStatus === "set" && (
					<p className="text-green-500 text-sm">Link successfully set</p>
				)}
			</div>
		</div>
	)

	const InfoCard = (
		<div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
			<h1 className="text-3xl md:text-4xl mb-4">Aptos + Merkle Trade + LangChain</h1>
			<ul>
				<li className="text-l">
					🤝
					<span className="ml-2">
						This is an AI agent helping users diagest YouTube videos about investment strategy and deploy user's trading operation on Merkle Trade.
					</span>
				</li>
				{/* <li className="hidden text-l md:block">
					💻
					<span className="ml-2">
						You can find the prompt and model logic for this use-case in <code>app/api/chat/route.ts</code>.
					</span>
				</li>
				<li className="hidden text-l md:block">
					🎨
					<span className="ml-2">
						The main frontend logic is found in <code>app/page.tsx</code>.
					</span>
				</li>
				<li className="text-l">
					🐙
					<span className="ml-2">
						This template is open source - you can see the source code and deploy your own version{" "}
						<a href="#" target="_blank">
							from the GitHub repo (coming soon)
						</a>
						!
					</span>
				</li>
				<li className="text-l">
					👇
					<span className="ml-2">
						Try asking e.g. <code>What is my wallet address?</code> below!
					</span>
				</li> */}
			</ul>
		</div>
	)

	return (
		<div className="flex flex-col w-full">
			{LinkInput}
			<ChatWindow
				endpoint="api/hello"
				emoji="🤖"
				titleText="Aptos agent"
				placeholder="I'm your friendly Aptos agent! Ask me anything..."
				emptyStateComponent={InfoCard}
				linkData={linkData}
			></ChatWindow>
		</div>
	)
}
