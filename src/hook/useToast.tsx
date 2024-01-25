import { Teleport, defineComponent, ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

function useToast(content: string) {
	const toastVisible = ref(false)
	const { isPending, start } = useTimeoutFn(() => {
		toastVisible.value = false
	}, 3000)
	function handleShowToast() {
		if (isPending.value)
			return
		toastVisible.value = true
		start()
	}

	const toast = defineComponent(() => {
		return () => (
			<Teleport to="#teleported">
				<div v-show={toastVisible.value} class="toast">
					{content}
				</div>
			</Teleport>
		)
	})

	return {
		toast,
		handleShowToast,
	}
}

export default useToast
