import malePhoto from '../assets/male_profile_pic.jpg'
import femalePhoto from '../assets/female_profile_pic.jpg'
import personPhoto from '../assets/person_image.jpg'

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

export const formatName = user => {
    const names = [user.first_name, user.middle_name, user.last_name]
    if (names.every(n => n)) return `${names[0]} ${names[1].slice(0,1)}, ${names[2]}`
    if (names.every(n => !n)) return 'Anonymous'
    if (names.some(n => n)) return names.filter(n => n).reduce((p,c) => `${p} ${c}`, '')
}

export const formatPhoto = user => {
    const { profile_picture_url, gender } = user
    if (profile_picture_url) return profile_picture_url
    if (gender == 'M') return femalePhoto
    if (gender == 'F') return malePhoto
    return personPhoto
}

export const duration = (request) => {

    const { start_time, end_time } = request
    const start = new Date(start_time)
    const end = new Date(end_time)
    
    const dTinMs = end - start 

    const days = dTinMs / (1000*60*60*24)
    return `${Math.ceil(days)} days old`
}

export const greeting = () => {
    const now = new Date()
    const hours = now.getHours()
    if (hours >= 0 && hours < 12) return [`Good morning`, '☕🍵']
    if (hours <= 12 && hours < 16) return ['Good afternoon', '🧁']
    if (hours >= 16 && hours <= 19) return ['Good evening', '🌆']
    return ['Hello', '🌃']
}
