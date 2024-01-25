import 'vue-router'

declare module '*.vue' {
	import type { ComponentOptions } from 'vue'

	const Component: ComponentOptions
	export default Component
}

declare module '*.md' {
	import type { ComponentOptions } from 'vue'

	const Component: ComponentOptions
	export default Component
}

export {}

declare module 'vue-router' {
	interface RouteMeta {
		title: string
		intro: string
		time: string
	}
}
