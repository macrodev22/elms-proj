export const formatDate = (dateString, addDay=false) => {
    const date = new Date(dateString)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const day = date.getDate()
    const weekDay = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()

    const suffix = (day) => {
        if (day >3 && day < 21) return 'th'
        switch(day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    return `${addDay ? days[weekDay] + ', ': ''} ${day}${suffix(day)} ${months[month]} ${year}`.trim()
}
