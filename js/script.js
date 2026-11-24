document.addEventListener("DOMContentLoaded", () => {
    const mentettRekord = localStorage.getItem("tetrisRekord") || 0
    document.querySelectorAll(".rekord").forEach(elem => {
        elem.textContent = mentettRekord
    })

    const canvas = document.getElementById("myCanvas")
    if (!canvas)
        return

    const jatek = new Mozgatas(canvas)
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

    const gombok = document.querySelectorAll(".jatekOldal .btn")
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
})