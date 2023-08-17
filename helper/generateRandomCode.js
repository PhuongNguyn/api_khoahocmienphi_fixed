module.exports = (length = 6) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    const n = length || 15
    for (let i = 0; i < Number(n); i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
}