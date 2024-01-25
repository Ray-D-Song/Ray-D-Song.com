import * as jsdom from 'jsdom'

interface SetupCodeCopyParam {
	docStr: string
	code: string
	lang: string
}

const { JSDOM } = jsdom
globalThis.DOMParser = new JSDOM().window.DOMParser

export function setupCodeCopy({ docStr, code, lang }: SetupCodeCopyParam) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(docStr, 'text/html')
	const pre = doc.querySelector('pre')

	const ele = doc.createElement('div')
	ele.className = 'copy-container'

	const icon = doc.createElement('img')
	icon.src = '/copy.svg'
	icon.className = 'copy-icon'
	icon.dataset.code = code

	const langSymbol = doc.createElement('div')
	langSymbol.className = 'lang-symbol'
	langSymbol.textContent = lang

	ele.appendChild(langSymbol)
	ele.appendChild(icon)

	pre?.insertBefore(ele, pre?.firstChild)
	return pre?.outerHTML ?? ''
}
