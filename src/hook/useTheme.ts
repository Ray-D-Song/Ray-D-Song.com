import type { RemovableRef } from '@vueuse/core'
import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'

interface UseThemeReturn {
	currentTheme: RemovableRef<'light' | 'dark'>
	toggle: () => void
}

function useTheme(): UseThemeReturn {
	const currentTheme = useLocalStorage<'light' | 'dark'>('theme', 'light')

	function toggle() {
		currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
	}

	watch(currentTheme, (value, oldValue) => {
		const doc = document.documentElement
		doc.classList.remove(oldValue)
		doc.classList.add(value)
	})

	return {
		currentTheme,
		toggle,
	}
}

export default useTheme
