import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import { routes } from 'vue-router/auto/routes'
import _ from 'lodash'
import type { RouteRecordRaw } from 'vue-router/auto'

interface UsePaginationReturn {
	content: ComputedRef<RouteRecordRaw[]>
	next: () => void
	pre: () => void
	nav: (target: number) => void
	total: ComputedRef<number>
	pageCount: ComputedRef<number>
	pageSize: number
	currentPage: Ref<number>
	isFirstPage: ComputedRef<boolean>
	isLastPage: ComputedRef<boolean>
}

function usePagination(): UsePaginationReturn {
	const currentPage = ref(1)
	const pageSize = 10
	const posts = ref(routes
		.find(item => item.path === '/post')?.children
		?.sort((a, b) => {
			const timeA = new Date(a.meta?.time as string)
			const timeB = new Date(b.meta?.time as string)
			return timeB.getTime() - timeA.getTime()
		}))

	const total = computed(() => posts.value?.length ?? 0)
	const contentList = computed(() => {
		return _.chunk(posts.value, pageSize)
	})
	const pageCount = computed(() => contentList.value.length + 1)
	const content = computed(() => {
		return contentList.value[currentPage.value - 1] as unknown as RouteRecordRaw[]
	})

	const isFirstPage = computed(() => {
		return currentPage.value === 1
	})
	const isLastPage = computed(() => {
		return currentPage.value === pageCount.value
	})

	function next() {
		if (!isLastPage)
			currentPage.value++
	}
	function pre() {
		if (!isFirstPage.value)
			currentPage.value--
	}
	function nav(target: number) {
		if (target <= pageCount.value)
			currentPage.value = Number(target)
	}

	return {
		content,
		next,
		pre,
		nav,
		total,
		pageCount,
		pageSize,
		currentPage,
		isFirstPage,
		isLastPage,
	}
}

export default usePagination
