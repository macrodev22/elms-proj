export const vFocus = {
    mounted: el => el.focus()
}

export const vScrollIntoView = {
    mounted: (el, binding) => el.scrollIntoView({
        behavior: binding.value?.behavior || 'smooth',
        block: binding.value?.block || 'start'
    })
}

export const vClear = {
    mounted: el => {
        el.value = ''
        el.dispatchEvent(new Event('input'))
    },
}