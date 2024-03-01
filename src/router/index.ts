import { routes } from 'vue-router/auto/routes'
import { type Router, createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

export default function (): Router {
	return createRouter({
		history: !import.meta.env.SSR ? createWebHistory(import.meta.env.BASE_URL) : createMemoryHistory(),
    routes
	})
}
