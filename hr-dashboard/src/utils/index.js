export const formatDate = (dateStr, withDay = false) => {
    const date = new Date(dateStr)
    const weekDay = date.getDay()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const suffix = day => {
        if (day > 3 && day < 21 ) return 'th'
        switch(day%10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    return `${withDay ? days[weekDay] + ', ' : ''}${day}<sup>${suffix(day)}</sup> ${months[month]} ${year}`
}

export const getDurationLabel = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffMs = end - start 

    const diffSec = Math.floor(diffMs/1000)
    const diffHrs = Math.floor(diffSec/(60*60))
    const diffDays = Math.floor(diffHrs/24)
    const diffWeeks = diffDays/7

    return `${diffDays} Days`
}