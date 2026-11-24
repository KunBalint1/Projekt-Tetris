class Mozgatas {
    #kiiras
    #cellaSzelesseg
    #cellaMagassag
    #jatekter
    #blokk = null
    #ido = null
    #szunetel = false
    #vege = false
    #cellaKep = null
    #cellaKepek = []
    #kepSzam = 1

    constructor(canvas) {
        this.#kiiras = canvas.getContext("2d")
        this.#jatekter = new Jatek(12, 10)
        canvas.width = 500
        canvas.height = 600
        this.#cellaSzelesseg = canvas.width / this.#jatekter.oszlopok
        this.#cellaMagassag = canvas.height / this.#jatekter.sorok
    }

    setCellaKepek(utvonalak) {
        this.#kepSzam = utvonalak.length
        this.#cellaKepek = utvonalak.map(utvonal => {
            const kep = new Image()
            kep.onload = () => this.rajarol()
            kep.onerror = () => kep.betoltve = false
            kep.src = utvonal
            kep.betoltve = true
            return kep
        })
    }

    indit() {
        this.#jatekter = new Jatek(12, 10)
        this.#szunetel = false
        this.#vege = false
        this.#blokk = new blokk(this.#jatekter.oszlopok, this.#kepSzam)
        this.frissitPontszamot()

        if (this.#ido)
            clearInterval(this.#ido)

        this.#ido = setInterval(() => this.leptet(), 500)
        this.rajarol()
    }

    leptet() {
        if (this.#szunetel || this.#vege)
            return

        if (!this.#jatekter.utkozes(this.#blokk, this.#blokk.x, this.#blokk.y + 1)) {
            this.#blokk.move(0, 1)
        } else {
            this.ragad()
        }

        this.rajarol()
    }

    oldalra(irany) {
        if (this.#szunetel || this.#vege)
            return

        if (!this.#jatekter.utkozes(this.#blokk, this.#blokk.x + irany, this.#blokk.y))
            this.#blokk.move(irany, 0)

        this.rajarol()
    }

    gyorsLepes() {
        if (this.#szunetel || this.#vege)
            return

        if (!this.#jatekter.utkozes(this.#blokk, this.#blokk.x, this.#blokk.y + 1)) {
            this.#blokk.move(0, 1)
        } else {
            this.ragad()
        }

        this.rajarol()
    }

    rogzit() {
        if (this.#szunetel || this.#vege)
            return

        while (!this.#jatekter.utkozes(this.#blokk, this.#blokk.x, this.#blokk.y + 1)) {
            this.#blokk.move(0, 1)
        }
        this.ragad()
        this.rajarol()
    }

    ragad() {
        this.#jatekter.ragadas(this.#blokk)
        this.#jatekter.sorTorol()
        this.frissitPontszamot()
        this.#blokk = new blokk(this.#jatekter.oszlopok, this.#kepSzam)

        if (this.#jatekter.utkozes(this.#blokk)) {
            this.#vege = true
            clearInterval(this.#ido)
        }
    }

    szunet() {
        if (this.#vege)
            return

        this.#szunetel = !this.#szunetel
        return this.#szunetel
    }

    rajarol() {
        this.#kiiras.clearRect(0, 0, this.#kiiras.canvas.width, this.#kiiras.canvas.height)
        this.#kiiras.fillStyle = "#1a1a1a"
        this.#kiiras.fillRect(0, 0, this.#kiiras.canvas.width, this.#kiiras.canvas.height)

        for (let sor = 0; sor < this.#jatekter.sorok; sor++) {
            for (let oszlop = 0; oszlop < this.#jatekter.oszlopok; oszlop++) {
                if (this.#jatekter.grid[sor][oszlop]) {
                    this.#rajzolCella(oszlop, sor, this.#jatekter.grid[sor][oszlop])
                }
            }
        }

        if (this.#blokk) {
            this.#blokk.shape.forEach((sor, s) => {
                sor.forEach((cella, c) => {
                    if (cella)
                        this.#rajzolCella(
                            this.#blokk.x + c,
                            this.#blokk.y + s,
                            this.#blokk.kepIndex + 1
                        )
                })
            })
        }

        this.#kiiras.strokeStyle = "#333"
        this.#kiiras.lineWidth = 1
        for (let x = 0; x <= this.#kiiras.canvas.width; x += this.#cellaSzelesseg) {
            this.#kiiras.beginPath()
            this.#kiiras.moveTo(x, 0)
            this.#kiiras.lineTo(x, this.#kiiras.canvas.height)
            this.#kiiras.stroke()
        }
        for (let y = 0; y <= this.#kiiras.canvas.height; y += this.#cellaMagassag) {
            this.#kiiras.beginPath()
            this.#kiiras.moveTo(0, y)
            this.#kiiras.lineTo(this.#kiiras.canvas.width, y)
            this.#kiiras.stroke()
        }

        if (this.#vege) {
            this.#kiiras.fillStyle = "rgba(0, 0, 0, 0.75)"
            this.#kiiras.fillRect(0, 0, this.#kiiras.canvas.width, this.#kiiras.canvas.height)
            this.#kiiras.fillStyle = "#ffffff"
            this.#kiiras.font = "32px sans-serif"
            this.#kiiras.textAlign = "center"
            this.#kiiras.fillText("Vége a játéknak", this.#kiiras.canvas.width / 2, this.#kiiras.canvas.height / 2)
        }
    }

    #rajzolCella(oszlop, sor, szin) {
        const x = oszlop * this.#cellaSzelesseg + 1
        const y = sor * this.#cellaMagassag + 1
        const szelesseg = this.#cellaSzelesseg - 2
        const magassag = this.#cellaMagassag - 2

        const kepIndex = Math.max(0, Number(szin) - 1)
        const kep = this.#cellaKepek[kepIndex]

        if (kep && kep.complete && kep.naturalWidth > 0) {
            this.#kiiras.drawImage(kep, x, y, szelesseg, magassag)
        } else {
            const tartalekSzinek = ["#d32f2f", "#1976d2", "#388e3c", "#fbc02d", "#7b1fa2", "#00796b", "#e64a19"]
            this.#kiiras.fillStyle = typeof szin === "string"
                ? szin
                : tartalekSzinek[kepIndex % tartalekSzinek.length]
            this.#kiiras.fillRect(x, y, szelesseg, magassag)
        }
    }

    frissitPontszamot() {
        const pontElem = document.querySelector(".pont")
        if (pontElem)
            pontElem.textContent = this.#jatekter.pontszam

        const rekordElem = document.querySelector(".rekord")
        if (rekordElem) {
            const elozoRekord = Number(localStorage.getItem("tetrisRekord") || 0)
            const rekord = Math.max(elozoRekord, this.#jatekter.pontszam)
            localStorage.setItem("tetrisRekord", rekord)
            rekordElem.textContent = rekord

            document.querySelectorAll(".rekord").forEach(elem => {
                elem.textContent = rekord
            })
        }
    }
}