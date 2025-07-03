import { onMounted, onUnmounted, toValue } from "vue";

export const useOnClickOutside = (
    targetRef, 
    callback, 
    options = { ignore: [] }) => {

        const handler = event => {
            const targetEl = toValue(toValue(targetRef)?.rootElRef) || toValue(targetRef)
            // console.log('targetRef', targetRef)
            // console.log('Target el',targetEl)
            if (!targetEl) return

            const clickedInsideTarget = targetEl.contains(event.target)

            const clickedIgnoredRefs = options.ignore.some(ignoredRef => {
                const ignoredEl = toValue(ignoredRef)
                console.log('ignored element', ignoredEl, 'clicked', event.target, 'equal', ignoredEl.contains(event.target))
                return (ignoredEl && ignoredEl.contains(event.target)) 
            })

            if (clickedIgnoredRefs) return 
            console.log('clicked ignored', clickedIgnoredRefs)
            console.log('clicked outside', !clickedInsideTarget)
            if (!clickedInsideTarget) {
                // setInterval(() => callback(event), 10)
                callback(event)
            }

        }

        onMounted(() => {
            document.addEventListener('click', handler)
            document.addEventListener('touchstart', handler)
        })


        onUnmounted(() => {
            document.removeEventListener('click', handler)
            document.removeEventListener('touchstart', handler)
        })
}