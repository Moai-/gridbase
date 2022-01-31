import { Character } from '../character'

export default (g, upKey) => {
    let chars = []
    // for (const charName of Object.keys(g.characters)) {
    //     const char = g.characters[charName]
    //     chars.push(
    //         <Character 
    //             key={`${charName}`} 
    //             char={char}
    //             onClick={() => g.toggleSelectChar(charName)}
    //         />
    //     )
    // }
    return chars
}
