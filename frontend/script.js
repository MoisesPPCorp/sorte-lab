/* ===============================
NAVEGAÇÃO ENTRE TELAS
================================ */

function irLogin() {
    window.location.href = "login.html"
}

function irSorteio() {
    window.location.href = "sorteio.html"
}

function irConfig() {
    window.location.href = "configuracoes.html"
}

function voltar() {
    window.location.href = "index.html"
}

/* ===============================
LOGIN ADMINISTRADOR
================================ */

function entrar() {

    const loginInput = document.getElementById("login")
    const senhaInput = document.getElementById("senha")

    if (!loginInput || !senhaInput) {
        console.error("Campos de login não encontrados")
        return
    }

    const login = loginInput.value
    const senha = senhaInput.value

    fetch("http://localhost:3000/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            login,
            senha
        })

    })
        .then(res => res.json())

        .then(data => {

            if (data.time) {

                localStorage.setItem("time_id", data.time.id)

                alert("Login realizado com sucesso")

                window.location.href = "admin.html"

            } else {

                alert("Login ou senha inválidos")

            }

        })

        .catch(error => {

            console.error("Erro na conexão:", error)

            alert("Erro ao conectar com o servidor")

        })

}

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

    ev.target.appendChild(jogador)

}
