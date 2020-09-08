function calcVH() {
    const windowHeight = (document
        && document.documentElement
        && document.documentElement.clientHeight) || window.innerHeight;

    let vh = windowHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

}

calcVH();
window.addEventListener('resize', calcVH);

// handle request fullscreen
function requestFullscreenFor(element) {
    if (!element) return false;

    // if the current element is not already full screen, make it full screen
    try {
        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element['mozRequestFullScreen']) {
            element['mozRequestFullScreen']()
        } else if (element['webkitRequestFullscreen']) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        } else if (element['msRequestFullscreen']) {
            element['msRequestFullscreen']()
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

}

// handle fullscreen exit
function exitFullScreen() {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document['mozCancelFullScreen']) {
            document['mozCancelFullScreen']()
        } else if (document['webkitExitFullscreen']) {
            document['webkitExitFullscreen']()
        } else if (document['msExitFullscreen']) {
            document['msExitFullscreen']()
        }

    } catch (e) {
        console.log(e);
    }

}

// check fullscreen status
function isFullscreen() {
    return Boolean(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.fullScreenMode)
}

function toggleFullscreen() {
    if (isFullscreen()) {
        exitFullScreen()
    } else {
        requestFullscreenFor(document.documentElement)
    }
}

