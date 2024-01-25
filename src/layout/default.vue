<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import * as clipboard from 'clipboard-polyfill'
import useTheme from '@/hook/useTheme'
import useToast from '@/hook/useToast'

const { toggle: toggleTheme } = useTheme()

const routeTable = {
	1: '/',
	2: 'https://github.com/Ray-D-Song',
	3: 'https://ray-d-song.com/feed.xml',
}
const router = useRouter()
const { toast, handleShowToast } = useToast('copy success')
function handleNav(key: number) {
	switch (key) {
		case 1:
			router.push(routeTable[1])
			break
		case 2:
			window.location.replace(routeTable[2])
			break
		case 3:
			clipboard.writeText(routeTable[3]).then(() => {
				handleShowToast()
			})
			break
	}
}
</script>

<template>
	<div class="w-full flex justify-center items-center flex-col">
		<div class="w-full backdrop-blur-xl fixed left-0 top-0 flex justify-between">
			<div
				class="i-mdi-dinosaur-pixel w-10 h-10 mx-2 my-1 hover:cursor-pointer hover:opacity-80"
				@click="handleNav(1)"
			/>
			<div class="flex">
				<div
					class="i-grommet-icons:github w-6 h-6 m-2 hover:cursor-pointer hover:opacity-80"
					@click="handleNav(2)"
				/>
				<div
					class="i-fluent:rss-24-filled w-6 h-6 m-2 hover:cursor-pointer hover:opacity-80"
					@click="handleNav(3)"
				/>
				<div
					class="i-fluent:dark-theme-24-filled w-6 h-6 m-2 hover:cursor-pointer hover:opacity-80"
					@click="toggleTheme"
				/>
			</div>
		</div>
		<div class="w-9/10 lg:8/10 xl:7/10 prose mt-15">
			<slot />
		</div>
		<toast />
	</div>
</template>
