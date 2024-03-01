<script setup lang="ts">
import { RouterView } from 'vue-router'
import Default from '@/layout/default.vue'
import VConsole from 'vconsole'

if(import.meta.env.DEV) {
  const vConsole = new VConsole({ theme: 'dark' })
}
</script>

<template>
	<div class="min-h-screen flex justify-center items-center dark:bg-dark bg-light dark:text-dark text-light">
		<Default>
			<RouterView />
		</Default>
	</div>
</template>
