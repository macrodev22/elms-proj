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
    if (!user) return 'N/A'
    const names = [user.first_name, user.middle_name, user.last_name]
    if (names.every(n => n)) return `${names[0]} ${names[1].slice(0,1)}, ${names[2]}`
    if (names.every(n => !n)) return 'Anonymous'
    if (names.some(n => n)) return names.filter(n => n).reduce((p,c) => `${p} ${c}`, '')
}

export const formatPhoto = user => {
    const { profile_picture_url, gender } = user
    if (profile_picture_url) return profile_picture_url
    if (gender == 'F') return femalePhoto
    if (gender == 'M') return malePhoto
    return personPhoto
}

export const duration = (request) => {

    const { start_time, end_time } = request
    const start = new Date(start_time)
    const end = new Date(end_time)
    
    const dTinMs = end - start 

    const days = dTinMs / (1000*60*60*24)
    return `${Math.ceil(days)} days`
}

export const greeting = () => {
    const now = new Date()
    const hours = now.getHours()
    if (hours >= 0 && hours < 12) return [`Good morning`, '☕🍵']
    if (hours <= 12 && hours < 16) return ['Good afternoon', '🧁']
    if (hours >= 16 && hours <= 19) return ['Good evening', '🌆']
    return ['Hello', '🌃']
}

export const formatError = (err) => {
// {
//     "start_time": [
//         "This field is required."
//     ],
//     "end_time": [
//         "This field is required."
//     ]
// }
const replaceKey = (key) => {
    const keys = {
        'start_time': 'Start Date',
        'end_time': 'End Date',
    }
    if (Object.keys(keys).includes(key)) return keys[key]
    return key
}


const errData = err.response?.data 
    if (!errData) return err.message
    if (errData.detail) return errData.detail 

    let errorStr = ''
    const entries = Object.entries(errData)
    for (const [key, values] of entries) {
        errorStr += `\n${replaceKey(key)}:\n`
        for(const v of values) errorStr += `${v}\n`
    }
    return errorStr
}

export const getLeaveColors = (type) => {
    const leaveColors = {
        "Annual Leave (Holiday Entitlement)": { bgColor: "#E0F7FA", highlightColor: "#00BCD4" },
        "Sick Leave": { bgColor: "#FFF3E0", highlightColor: "#FF9800" },
        "Maternity Leave": { bgColor: "#F8BBD0", highlightColor: "#D81B60" },
        "Personal Leave": { bgColor: "#E3F2FD", highlightColor: "#2196F3" },
        "Emergency Leave": { bgColor: "#FFEBEE", highlightColor: "#F44336" },
        "Bereavement Leave": { bgColor: "#D7CCC8", highlightColor: "#6D4C41" },
        "Sabbatical Leave": { bgColor: "#E0F2F1", highlightColor: "#00796B" },
        "Public Holidays": { bgColor: "#FFF9C4", highlightColor: "#FFEB3B" },
        "Religious Observance Leave": { bgColor: "#EDE7F6", highlightColor: "#673AB7" },
        "Military Leave": { bgColor: "#E8EAF6", highlightColor: "#3F51B5" },
        "Short Leave": { bgColor: "#BBDEFB", highlightColor: "#1976D2" },
        "Casual Leave": { bgColor: "#C8E6C9", highlightColor: "#4CAF50" },
        "Garden Leave": { bgColor: "#D1C4E9", highlightColor: "#9575CD" },
        "Unpaid Leave": { bgColor: "#FFFDE7", highlightColor: "#FBC02D" },
        "Time Off In Lieu (TOIL)": { bgColor: "#FFECB3", highlightColor: "#FFA000" }
    };

    return leaveColors[type] || { bgColor: "lightgray", highlightColor: "darkgray" };
}
