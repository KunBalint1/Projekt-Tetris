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
    #kepIndex

    constructor(jatekTer, kepSzam = 1) {
        var alakzatok = blokk.#ALAKZATOK
        var veletlen = Math.floor(Math.random() * alakzatok.length)
        this.#alakzat = alakzatok[veletlen].map(sor => [...sor])
        this.#x = Math.floor((jatekTer - this.#alakzat[0].length) / 2)
        this.#y = 0
        this.#kepIndex = kepSzam > 1 ? Math.floor(Math.random() * kepSzam) : 0
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    get shape() {
        return this.#alakzat
    }

    forgatAlakzat() {
        var sorok = this.#alakzat.length
        var oszlopok = this.#alakzat[0].length

        return Array.from({ length: oszlopok }, (valami, sor) =>
            Array.from({ length: sorok }, (valami, oszlop) =>
                this.#alakzat[sorok - 1 - oszlop][sor]))
    }

    Beallit(alakzat){
        this.#alakzat = alakzat.map(sor => [...sor])
    }
    
    get kepIndex() {
        return this.#kepIndex
    }

    move(x, y) {
        this.#x += x
        this.#y += y
    }

    setPosition(x, y) {
        this.#x = x
        this.#y = y
    }
}