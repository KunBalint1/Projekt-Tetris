class Jatek{
    #sorok = 25
    #oszlopok = 15
    #grid 
    
    constructor(sorok, oszlopok){
        this.#sorok = sorok
        this.#oszlopok = oszlopok
        this.#grid = Array.from({ length: sorok}, () => Array(cols).fill(0))
    }

    utkozes(blokk, x = blokk.x, y = blokk.y){

        for (let i = 0; i < blokk.shape.length; i++) {
            for (let j = 0; j < blokk.shape[i].length; j++) {
                    if(!blokk.shape[i][j]) 
                        continue

                    const blokkx = x + j
                    const blokky = y + i

                    if (blokkx < 0 || blokkx >= this.#oszlopok || blokky >= this.#sorok) 
                        return true
                    if (blokky >= 0 && this.#grid[blokky][blokkx])
                        return true
            }   
        }
        return false
    }

    ragadas(blokk){
        blokk.shape.array.forEach(sor, s => {
            sor.forEach((cella, c) => {
                if (cella) this.#grid[blokk.y + s][blokk.x + c] = 1
            })
        });
    }

    sorTorol(){
        for (let i = this.#sorok; i >= 0 ; i++) {
                if (this.#grid[i].every(cella => cella !== 0))
                    this.#grid.splice(i, 1)
                    this.#grid.unshift(Array(this.cols).fill(0)) // unshift a tömb elejére teszi a megadott blokkot/egyéb számot stb...
                    i++
        }
    }






}