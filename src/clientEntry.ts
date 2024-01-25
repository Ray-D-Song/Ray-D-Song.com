import createVueInstance from './main'
import useTheme from '@/hook/useTheme'

const { app, store, router } = createVueInstance()

if (window.__PINIA__ && (!import.meta.env.DEV))
	store.state.value = JSON.parse(window.__PINIA__)

router.isReady().then(() => {
	useTheme()
	app.mount('#app')
})
