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

    for (let i = 1; i <= 16; i++) {
        kockaKepek.push(`img/blokk/blokk${i}.png`)
    }

    jatek.setCellaKepek(kockaKepek)
    jatek.indit()

    document.addEventListener("keydown", esemeny => { // Billentyűzet kiosztás
        if (esemeny.key === "ArrowLeft") {
            esemeny.preventDefault()
            jatek.oldalra(-1)
        } else if (esemeny.key === "ArrowRight") {
            esemeny.preventDefault()
            jatek.oldalra(1)
        } else if (esemeny.key === "ArrowDown") {
            esemeny.preventDefault()
            jatek.gyorsLepes()
        } else if (esemeny.key === "ArrowUp") {
            esemeny.preventDefault()
            jatek.forgatas()
        } else if (esemeny.key.toLowerCase() === " ") {
            esemeny.preventDefault()
            jatek.rogzit()
        }
    })

    var gombok = document.querySelectorAll(".jatekOldal .btn")
    gombok.forEach(gomb => {
        if (gomb.textContent.includes("Újrakezdés")) {
            gomb.addEventListener("click", () => {
                jatek.indit()
                var szunetGomb = document.querySelector(".szunetGomb")
                if (szunetGomb)
                    szunetGomb.textContent = "Szünet"
            })
        } else if (gomb.textContent.includes("Szünet")) {
            gomb.addEventListener("click", () => {
                var szunetel = jatek.szunet()
                gomb.textContent = szunetel ? "Folytatás" : "Szünet"
            })
        }
    })

    var szorzoGomb = document.querySelector(".szorzoGomb")

    if (szorzoGomb) {
        szorzoGomb.addEventListener("click", () => {
            if (!jatek.szorzoVasarlas())
                uzenetMutat("Nincs elég pontod a fejlesztéshez.")
        })
    }

    var fejlesztesek = [
        [".szorzoGomb", () => jatek.szorzoVasarlas()],
        [".sorBonuszGomb", () => jatek.sorBonuszVasarlas()],
        [".lassitasGomb", () => jatek.lassitasVasarlas()],
        [".kockaCsereGomb", () => jatek.kockaCsereVasarlas()],
        [".mentesGomb", () => jatek.mentesVasarlas()]
    ]

    fejlesztesek.forEach(([selector, vasarlas]) => {
        var gomb = document.querySelector(selector)

        if (gomb) {
            gomb.addEventListener("click", () => {
                if (!vasarlas())
                    uzenetMutat("Nincs elég pontod a fejlesztéshez.")
            })
        }
    })


})

var toastElem = document.getElementById("gameToast")
var toastBody = toastElem?.querySelector(".toast-body")

if (!toastElem || !toastBody || !window.bootstrap?.Toast)
    throw new Error("A Bootstrap toast értesítés nem található.")

var gameToast = bootstrap.Toast.getOrCreateInstance(toastElem, { delay: 3000 })

function uzenetMutat(szoveg) {
    toastBody.textContent = szoveg
    gameToast.show()
}