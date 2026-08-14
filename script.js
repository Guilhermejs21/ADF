const cabecalho = document.getElementById("cabecalho");
const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");
const itensGaleria = [...document.querySelectorAll(".item-galeria")];
const modal = document.getElementById("modal-galeria");
const imagemModal = document.getElementById("imagem-modal");
const legendaModal = document.getElementById("legenda-modal");
const fecharModal = document.getElementById("fechar-modal");
const anteriorModal = document.getElementById("anterior-modal");
const proximaModal = document.getElementById("proxima-modal");

let imagemAtual = 0;
let elementoAnterior = null;

// Cabeçalho
function atualizarCabecalho() {
    cabecalho.classList.toggle("rolado", window.scrollY > 40);
}

window.addEventListener("scroll", atualizarCabecalho, { passive: true });
atualizarCabecalho();

// Menu mobile
function fecharMenu() {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
}

botaoMenu.addEventListener("click", () => {
    const menuAberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
    botaoMenu.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
});

// Galeria
function mostrarImagem(indice) {
    imagemAtual = indice;
    const item = itensGaleria[imagemAtual];

    imagemModal.src = item.dataset.imagem;
    imagemModal.alt = item.dataset.legenda;
    legendaModal.textContent = item.dataset.legenda;
}

function abrirModal(indice) {
    elementoAnterior = document.activeElement;
    mostrarImagem(indice);
    modal.hidden = false;
    document.body.classList.add("modal-aberto");
    fecharModal.focus();
}

function fecharJanela() {
    modal.hidden = true;
    document.body.classList.remove("modal-aberto");
    imagemModal.src = "";

    if (elementoAnterior) {
        elementoAnterior.focus();
    }
}

function mostrarProximaImagem() {
    mostrarImagem((imagemAtual + 1) % itensGaleria.length);
}

function mostrarImagemAnterior() {
    mostrarImagem((imagemAtual - 1 + itensGaleria.length) % itensGaleria.length);
}

itensGaleria.forEach((item, indice) => {
    item.addEventListener("click", () => abrirModal(indice));
});

fecharModal.addEventListener("click", fecharJanela);
proximaModal.addEventListener("click", mostrarProximaImagem);
anteriorModal.addEventListener("click", mostrarImagemAnterior);

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        fecharJanela();
    }
});

document.addEventListener("keydown", (evento) => {
    if (modal.hidden) return;

    if (evento.key === "Escape") fecharJanela();
    if (evento.key === "ArrowRight") mostrarProximaImagem();
    if (evento.key === "ArrowLeft") mostrarImagemAnterior();
});
