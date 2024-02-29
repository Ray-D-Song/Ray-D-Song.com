<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import usePagination from '@/hook/usePagination'

const { content, nav, pageCount, isLastPage, isFirstPage } = usePagination()

const router = useRouter()
function handleClick(name: string) {
	router.push(name)
}
</script>

<template>
	<div class="text-2xl font-500">
		<div
			v-for="(c, idx) in content"
			:key="idx" class="my-7 hover:cursor-pointer flex flex-row items-end w-full"
			@click="handleClick(c.name?.toString() ?? '')"
		>
			<span class="mr-2 w-full md:w-2/3">{{ c.meta?.title }}</span>
			<span class="text-base font-700 mr-5 opacity-45 hidden md:inline">{{ c.meta?.time }}</span>
		</div>
	</div>
</template>
