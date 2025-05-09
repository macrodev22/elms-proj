export const vFocus = {
    mounted: el => el.focus()
}

export const vClear = {
    mounted: el => {
        el.value = ''
        el.dispatchEvent(new Event('input'))
    },
}