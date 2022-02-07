import parse from 'fdice'

export const standardRoll = () => {
    return parse('4dF')()
}

export const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export const sameLoc = (loc, loc2) => {
    if (loc.x === loc2.x) {
        if (loc.y === loc2.y) {
            return true
        }
    }
    return false
}