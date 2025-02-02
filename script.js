const html = document.querySelector('html')
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll(".app__card-button")
const startPauseBt = document.querySelector("#start-pause")
const iniciarOuPausarBt = document.querySelector("#start-pause span")
const imagemPausar = document.querySelector("#start-pause img")
const tempoNaTela = document.querySelector("#timer")

const musicaFocoInput = document.querySelector("#alternar-musica")
const musica = new Audio("sons/luna-rise-part-one.mp3")
const musicaFim = new Audio("sons/beep.mp3")
const musicaPause = new Audio("sons/pause.mp3")
const musicaPlay = new Audio("sons/play.wav")

let TempoDecorridoEmSegundo = 1500
let intervaloId = null

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener("click", () => {
    TempoDecorridoEmSegundo = 1500
    alterarContexto('foco')
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
    TempoDecorridoEmSegundo = 300
    alterarContexto("descanso-curto")
    curtoBt.classList.add("active")
})

longoBt.addEventListener("click", () => {
    TempoDecorridoEmSegundo = 900
    alterarContexto("descanso-longo")
    longoBt.classList.add("active")
})

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active")
    })
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `imagens/${contexto}.png`)
    switch(contexto) {
        case "foco":
        titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            default:
                break;
    }
}

const contagemRegressiva = () => {
    if(TempoDecorridoEmSegundo <= 0){
        musicaFim.play()
        alert("Tempo finalizado!")
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return;
    }
    TempoDecorridoEmSegundo -= 1
    mostrarTempo()
}

startPauseBt.addEventListener("click", iniciarOupausar)

function iniciarOupausar () {
    if(intervaloId) {
        musicaPause.play()
        zerar()
        return;
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    imagemPausar.setAttribute("src", "imagens/pause.png")    
}

function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    imagemPausar.setAttribute("src", "imagens/play_arrow.png")
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(TempoDecorridoEmSegundo * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit" })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()