let target = {}
let target2 = {}
let intervalId = null
function createObject() {
    intervalId = setInterval(() => {
        const elm = document.createElement("div")
        target = { strangeVal: new Array(100000).join(","), parent: target2, elm }
        target2 = { strangeVal: new Array(100000).join(","), parent: target, elm: target.elm }
    }, 10)
}

function clearObject() {
    clearInterval(intervalId)
    target = null
    target2 = null
}
