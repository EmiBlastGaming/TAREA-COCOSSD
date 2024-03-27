estatus = false
lista = []

function setup() {
    canvas = createCanvas(500, 300)
    canvas.center()
    detectorobjetos = ml5.objectDetector("cocossd", modelLoaded)
    img.resize(width, height)
}
function preload() {
    switch (localStorage.getItem("valor")) {
        case "1":
            img = loadImage("dog_cat.jpg")
            break
        case "2":
            img = loadImage("hamstermejorfoto.jpg")
            break
        case "3":
            img = loadImage("pandaranda.jpg")
            break
    }
}
function draw() {
    image(img, 0, 0, width, height)
    if (estatus == true) {
        for (i = 0; i < lista.length; i++) {
            obj = lista[i]
            porcentaje = round(obj.confidence * 100)
            stroke("red")
            strokeWeight(5)
            noFill()
            rect(obj.x, obj.y, obj.width, obj.height)
            noStroke()
            fill("black")
            textSize(15)
            textStyle(BOLD)
            text(obj.label + " " + porcentaje + "%", obj.x, obj.y + 10)
        }
        document.getElementById("status").innerHTML = lista.length + " objetos detectados"
    }
}
function modelLoaded() {
    console.log("Cargo cocossd")
    estatus = true
    detectorobjetos.detect(img, Respuestas)
}
function Respuestas(error, resultados) {
    if (error) {
        console.error("ERROR")
    } else {
        console.log(resultados)
        lista = resultados
    }
}