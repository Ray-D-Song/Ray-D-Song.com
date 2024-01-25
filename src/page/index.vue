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
	<div class="text-2xl mt-10 font-500">
		<div
			v-for="(c, idx) in content"
			:key="idx" class="my-7 hover:cursor-pointer flex flex-col"
			@click="handleClick(c.name?.toString() ?? '')"
		>
			<span class="text-base font-700 mr-5 opacity-45">{{ c.meta?.time }}</span>
			<span>{{ c.meta?.title }}</span>
		</div>
	</div>
</template>
