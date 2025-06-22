import genericAvatar from '../assets/generic_person_avatar.jpg'
import genericMaleAvatar from '../assets/generic_male_avatar.png'
import genericFemaleAvatar from '../assets/generic_female_avatar.png'

export const formatDate = (dateStr, withDay = false, html = true, withTime = false) => {
    const date = new Date(dateStr)
    const weekDay = date.getDay()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const hours = date.getHours()
    const mins = date.getMinutes()
    let time = ''
    if (withTime) time = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} HRS`

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

    if(html)
        return `${withDay ? days[weekDay] : ''} ${day}<sup>${suffix(day)}</sup> ${months[month]} ${year} ${time}`.trim()
    return `${withDay ? days[weekDay] : ''} ${day}${suffix(day)} ${months[month]} ${year} ${time}`.trim()
}

export const getDurationLabel = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffMs = end - start 

    const diffSec = Math.floor(diffMs/1000)
    const diffHrs = Math.floor(diffSec/(60*60))
    const diffDays = Math.floor(diffHrs/24)
    const diffWeeks = diffDays/7
    const days = diffMs / (1000*60*60*24)

    return `${Math.ceil(days)} Days`
}

export const dateToCalendarFormat = (dateStr) => {
// "2025-04-23T17:05:45Z" to the format '2025-04-23 17:05'
    const pad = n => n.toString().padStart(2, '0')

    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getUTCHours())
    const mins = pad(date.getMinutes())

    return `${year}-${month}-${day} ${hours}:${mins}`
}

export const formatName = (user, full = false) => {
    if (!user) return ''
    const names = [user.first_name, user.middle_name, user.last_name]
    if (names.every(n => !n)) {
        return 'Anonymous'
    }
    if (names.every(n => n)) {
        return full ? `${names[0]} ${names[1]} ${names[2]}`: `${names[0]} ${names[1].slice(0, 1)}. ${names[2]}`
    }
    if (names.some(n => !n)) {
        return names.reduce((p, c) => c ? `${p} ${c}` : p, '').slice(1).trim()
    }
}

export const formatPhoto = (p, gender = null) => {
    if (p) return p
    if (!gender) return genericAvatar
    if(gender.toLowerCase().startsWith('m')) return genericMaleAvatar
    if(gender.toLowerCase().startsWith('f')) return genericFemaleAvatar
    }

export const cleanUserData = (user) => {
    const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

    const clean = obj => {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (
                value === null ||
                value === '' ||
                value === undefined ||
                (isObject(value) && Object.keys(clean(value)).length === 0)
            ) {
                // Skip this key
                return acc;
            }

            // Recurse if it's an object
            acc[key] = isObject(value) ? clean(value) : value;
            return acc;
        }, {});
    };

    return clean(user);
}

export const getColor = type => {
    const leaveColors = {
        "Annual Leave (Holiday Entitlement)": "#AD7EE9",
        "Sick Leave": "#EAA750",
        "Maternity Leave": "#FF6F61",
        "Personal Leave": "#E76CC1",
        "Emergency Leave": "#6B5B95",
        "Bereavement Leave": "#88B04B",
        "Sabbatical Leave": "#6497E3",
        "Public Holidays": "#F7CAC9",
        "Religious Observance Leave": "#92A8D1",
        "Military Leave": "#955251",
        "Short Leave": "#E76CC1",
        "Casual Leave": "#B565A7",
        "Garden Leave": "#009B77",
        "Unpaid Leave": "#DD4124",
        "Time Off In Lieu (TOIL)": "#45B8AC"
    }
    
    return leaveColors[type]
}