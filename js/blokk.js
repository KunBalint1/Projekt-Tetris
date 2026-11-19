class blokk {
    static #ALAKZATOK = [
        [[1, 1, 1, 1]],          // I
        [[1, 1], [1, 1]],        // O
        [[0, 1, 0], [1, 1, 1]],  // T
        [[1, 0, 0], [1, 1, 1]],  // fordított L
        [[0, 0, 1], [1, 1, 1]],  // L
        [[0, 1, 1], [1, 1, 0]],  // fordított Z
        [[1, 1, 0], [0, 1, 1]],  // Z

    ]

    #x
    #y = 0
    #alakzat

    constructor(jatekTer){
        const alakzatok = blokk.#ALAKZATOK
        this.#alakzat = alakzatok[Math.floor(Math.random * alakzatok.length)]
        this.#x = Math.floor((jatekTer - this.#alakzat[0].length) / 2)
        this.#y
    }
}