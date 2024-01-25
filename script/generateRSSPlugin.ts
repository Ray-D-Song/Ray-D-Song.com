import fs from 'node:fs'
import fg from 'fast-glob'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { FeedOptions, Item } from 'feed'
import { Feed } from 'feed'

const domain = 'https://ray-d-song.com'
const author = {
	name: 'Ray-D-Song',
	email: 'songraysmail@gmail.com',
	link: domain,
}
const markdown = MarkdownIt({
	html: true,
	breaks: true,
	linkify: true,
})

function convert(opts: FeedOptions, posts: Item[]) {
	opts.author = author
	opts.image = `${domain}/avatar.jpeg`
	opts.favicon = `${domain}/dino.svg`

	const feed = new Feed(opts)

	posts.forEach(p => feed.addItem(p))

	return {
		xml: feed.rss2(),
		json: feed.json1(),
		atom: feed.atom1(),
	}
}

async function setup() {
	const files = await fg('src/page/post/*.md')

	const options = {
		title: 'Ray-D-Song',
		description: `Ray's blog, Just for fun`,
		id: `${domain}/`,
		link: `${domain}/`,
		copyright: 'CC BY-NC-SA 4.0 2024 © Ray-D-Song',
		feedLinks: {
			json: `${domain}/feed.json`,
			atom: `${domain}/feed.atom`,
			rss: `${domain}/rss.xml`,
		},
	}

	const posts: any[] = (
		await Promise.all(
			files.filter(i => !i.includes('index'))
				.map(async (i) => {
					const raw = fs.readFileSync(i, 'utf-8')
					const { data, content } = matter(raw)
					const html = markdown.render(content)

					return {
						...data,
						date: new Date(data.time),
						content: html,
						author: [author],
						link: domain + '/' + i.replace(/^src\/page\//, '').replace(/\.md$/, '')
					}
				}),
		))
		.filter(Boolean)

	posts.sort((a, b) => b.date.getTime() - a.date.getTime())

	return convert(options, posts)
}

async function generateRSSPlugin() {
	const { xml, json, atom } = await setup()

	return {
		name: 'generate-rss',
		generateBundle() {
			(this as any).emitFile({
				type: 'asset',
				fileName: 'feed.xml',
				source: xml,
			});
			(this as any).emitFile({
				type: 'asset',
				fileName: 'feed.json',
				source: json,
			});
			(this as any).emitFile({
				type: 'asset',
				fileName: 'feed.atom',
				source: atom,
			})
		},
	}
}

export default generateRSSPlugin
