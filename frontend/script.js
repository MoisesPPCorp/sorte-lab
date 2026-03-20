/* ===============================
NAVEGAÇÃO ENTRE TELAS
================================ */

function irLogin() {
    window.location.href = "login.html"
}

function irCadastro() {
    window.location.href = "cadastro.html"
}

function irSorteio() {
    window.location.href = "sorteio.html"
}

function irConfig() {
    window.location.href = "configuracoes.html"
}

function irHistorico() {
    window.location.href = "historico.html"
}

function voltar() {
    window.location.href = "index.html"
}

function sair() {
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

/* ===============================
DRAG & DROP (SORTEIO)
================================ */

function permitirSoltar(ev) {
    ev.preventDefault()
}

function arrastar(ev) {
    ev.dataTransfer.setData("text", ev.target.id)
}

function soltar(ev) {
    ev.preventDefault()

    const data = ev.dataTransfer.getData("text")
    const jogador = document.getElementById(data)

    if (jogador) {
        ev.target.appendChild(jogador)
    }
}

/* ===============================
UTILS
================================ */

function mostrarErro(msg) {
    alert(msg || "Erro inesperado")
}

function mostrarSucesso(msg) {
    alert(msg || "Sucesso")
}