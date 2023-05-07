const btnEncriptar = document.getElementById("btn-encriptar");
const btnDesencriptar = document.getElementById("btn-desencriptar");
const btnCopiar = document.getElementById("btn-copiar");
const textoReceptor = document.getElementById("txt-receptor");
const textoTraductor = document.getElementById("txt-traductor");
const containerTraductor = document.getElementById("container-traductor");
const containerTraductorTexto = document.getElementById("container-traductortexto");
const spanError = document.getElementById("spanError");
showHidden();
textoReceptor.focus();

const llaves = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
};

btnEncriptar.addEventListener("click", encriptar);
btnDesencriptar.addEventListener("click", desencriptar);
btnCopiar.addEventListener("click", copiar);

function encriptar() {
    if (validar()) {
        const arrayText = textoReceptor.value.split("");
        const arrayResult = arrayText.map((caracter) => llaves[caracter] || caracter);
        textoTraductor.value = arrayResult.join("");
        showHidden();
        clearText();
    } else {
        animar();
    }

}

function desencriptar() {
    if (validar()) {
        let result = textoReceptor.value;
        for (const key in llaves) result = result.replaceAll(llaves[key], key);
        textoTraductor.value = result;
        showHidden()
        clearText();
    } else {
        animar();
    }
}

function copiar() {
    textoTraductor.select();
    navigator.clipboard.writeText(textoTraductor.value);
}

function showHidden() {
    if (textoReceptor.value === "") {
        containerTraductorTexto.style.display = "none"
        containerTraductor.style.display = "block"
    } else {
        containerTraductorTexto.style.display = "flex"
        containerTraductor.style.display = "none"
    }
}

function validar() {
    const arrayText = textoReceptor.value.split("");
    const result = arrayText.find((caracter) => (caracter.charCodeAt() >= 65 && caracter.charCodeAt() <= 90) || (caracter.charCodeAt() >= 192 && caracter.charCodeAt() <= 255));
    if (result) return false
    return true
}

function animar() {
    spanError.classList.remove("animate-error")
    setTimeout(() => spanError.classList.add("animate-error"), 88);
    clearText();
    showHidden();
}

function clearText() {
    textoReceptor.value = "";
}