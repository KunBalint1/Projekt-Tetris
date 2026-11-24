document.addEventListener("DOMContentLoaded", () => {
    var mentettRekord = localStorage.getItem("tetrisRekord") || 0
    document.querySelectorAll(".rekord").forEach(elem => {
        elem.textContent = mentettRekord
    })

    var canvas = document.getElementById("myCanvas")
    if (!canvas)
        return

    var jatek = new Mozgatas(canvas)
    var kockaKepek = []

    for (let i = 1; i <= 7; i++) {
        kockaKepek.push(`img/blokk/blokk${i}.png`)
    }

    jatek.setCellaKepek(kockaKepek)
    jatek.indit()

    document.addEventListener("keydown", esemeny => {
        if (esemeny.key === "ArrowLeft") {
            esemeny.preventDefault()
            jatek.oldalra(-1)
        } else if (esemeny.key === "ArrowRight") {
            esemeny.preventDefault()
            jatek.oldalra(1)
        } else if (esemeny.key === "ArrowDown") {
            esemeny.preventDefault()
            jatek.gyorsLepes()
        } else if (esemeny.key === " " || esemeny.key === "ArrowUp") {
            esemeny.preventDefault()
            jatek.rogzit()
        } else if (esemeny.key.toLowerCase() === "p") {
            jatek.szunet()
        }
    })

    var gombok = document.querySelectorAll(".jatekOldal .btn")
    gombok.forEach(gomb => {
        if (gomb.textContent.includes("Újrakezdés")) {
            gomb.addEventListener("click", () => {
                jatek.indit()
                const szunetGomb = document.querySelector(".szunetGomb")
                if (szunetGomb)
                    szunetGomb.textContent = "Szünet"
            })
        } else if (gomb.textContent.includes("Szünet")) {
            gomb.addEventListener("click", () => {
                const szunetel = jatek.szunet()
                gomb.textContent = szunetel ? "Folytatás" : "Szünet"
            })
        }
    })

    var szorzoGomb = document.querySelector(".szorzoGomb")

    if (szorzoGomb) {
        szorzoGomb.addEventListener("click", () => {
            if (!jatek.szorzoVasarlas())
                alert("Nincs elég pontod a fejlesztéshez.")
        })
    }
})