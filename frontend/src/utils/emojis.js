// generate me 50 emojis like this

export const funEmojis = [
    "👋🏻",
    "🧠",
    "😍",
    "🧠",
    "👋🏻",
    "😍",
    "👋🏻",
    "🧠",
    "😍",
    "🧠",
    "👋🏻",
    "😍",
    "👋🏻",
    "🧠",
    "😍",
    "🧠",
    "😍",
    "🧠",
    "👋🏻",
    "😍",
]


export const getRandomEmoji = () => {
    return funEmojis[Math.floor(Math.random() * funEmojis.length)]
}