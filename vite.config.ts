import { URL, fileURLToPath } from 'node:url'
import { join } from 'node:path'
import fs from 'node:fs'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'unplugin-vue-markdown/vite'
import VueRouter from 'unplugin-vue-router/vite'
import matter from 'gray-matter'
import { presetIcons, presetTypography, presetWind } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { bundledLanguages, getHighlighter } from 'shikiji'
import { setupCodeCopy } from './script/setupCodeCopy'
import generateRSSPlugin from './script/generateRSSPlugin'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		UnoCSS({
			transformers: [
				transformerDirectives(),
			],
			presets: [
				presetIcons(),
				presetWind(),
				presetTypography(),
			],
			rules: [
				['text-light', {
					color: '#333333',
				}],
				['text-dark', {
					color: '#D0D0D0',
				}],
				['bg-light', {
					background: '#F5EFD9',
				}],
				['bg-dark', {
					background: '#121212',
				}],
			],
		}),
		VueRouter({
			routesFolder: 'src/page',
			extensions: ['.vue', '.md'],
			extendRoute: (route) => {
				if (route.name.startsWith('/post') && route.name !== '/post') {
					const path = join(__dirname, `/src/page${route.name}.md`)
					const md = fs.readFileSync(path, 'utf-8')
					const { data } = matter(md)
					route.meta = { ...route.meta, ...data }
				}
				return route as any
			},
		}),
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		vueJsx(),
		Markdown({
			markdownItOptions: {
				html: true,
				linkify: true,
				typographer: true,
			},
			async markdownItSetup(md) {
				const shikiji = await getHighlighter({
					themes: ['rose-pine-dawn', 'tokyo-night'],
					langs: Object.keys(bundledLanguages) as any,
				})
				md.use(async (markdown) => {
					markdown.options.highlight = (code, lang) => {
						const codeHtml = shikiji.codeToHtml(code, {
							lang,
							themes: {
								light: 'rose-pine-dawn',
								dark: 'tokyo-night',
							},
						})
						return setupCodeCopy({
							docStr: codeHtml,
							code,
							lang,
						})
					}
				})
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		port: 80,
	},
	build: {
		outDir: './dist/client',
		rollupOptions: {
			plugins: [
				await generateRSSPlugin(),
			],
		},
	},
})
