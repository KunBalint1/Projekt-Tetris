class Jatek {
    #sorok = 4
    #oszlopok = 15
    #grid
    #pontszam = 0
    #szorzo = 1

    constructor(sorok, oszlopok) {
        this.#sorok = sorok
        this.#oszlopok = oszlopok
        this.#grid = Array.from({ length: sorok }, () => Array(oszlopok).fill(0))
    }

    utkozes(blokk, x = blokk.x, y = blokk.y) {
        for (let i = 0; i < blokk.shape.length; i++) {
            for (let j = 0; j < blokk.shape[i].length; j++) {
                if (!blokk.shape[i][j])
                    continue

                var blokkx = x + j
                var blokky = y + i

                if (blokkx < 0 || blokkx >= this.#oszlopok || blokky >= this.#sorok)
                    return true
                if (blokky >= 0 && this.#grid[blokky][blokkx])
                    return true
            }
        }
        return false
    }

    ragadas(blokk) {
        blokk.shape.forEach((sor, s) => {
            sor.forEach((cella, c) => {
                if (!cella)
                    return

                var sorIndex = blokk.y + s
                var oszlopIndex = blokk.x + c
                if (sorIndex >= 0 && sorIndex < this.#sorok &&
                    oszlopIndex >= 0 && oszlopIndex < this.#oszlopok) {
                    this.#grid[sorIndex][oszlopIndex] = blokk.kepIndex + 1
                }
            })
        })
    }

    sorTorol() {
        let toroltSorok = 0
       

        for (let i = this.#sorok - 1; i >= 0; i--) {
            if (this.#grid[i].every(cella => cella !== 0)) {
                this.#grid.splice(i, 1)
                this.#grid.unshift(Array(this.#oszlopok).fill(0))
                toroltSorok++
                i++
            }
        }

        this.#pontszam += toroltSorok * 100 * this.#szorzo
        return toroltSorok
    }

    szorzoVasarlas(){
        var ar = 500

        if (this.#pontszam < ar)
            return false

        this.#pontszam -= ar
        this.#szorzo++
        return true
    }


    get grid() {
        return this.#grid
    }

    get sorok() {
        return this.#sorok
    }

    get oszlopok() {
        return this.#oszlopok
    }

    get pontszam() {
        return this.#pontszam
    }
}