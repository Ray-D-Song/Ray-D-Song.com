import { describe, expect, it } from 'vitest'
import usePagination from '@/hook/usePagination'

describe('usePagination', async () => {
	it('nav', async () => {
		const { nav, currentPage } = usePagination()
		expect(currentPage.value).toEqual(1)
		nav(2)
		expect(currentPage.value).toEqual(2)
	})
})
