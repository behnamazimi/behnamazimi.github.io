let longTextElm = document.getElementById("long-text")

function removeDomNode() {
    longTextElm.remove()
    longTextElm = null
}

function logElmVar() {
    console.log(longTextElm);
}