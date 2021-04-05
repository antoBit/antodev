const getScrollPosition = () => {
    return window.pageYOffset || document.documentElement.scrollTop || 0
}

const getDocumentHeight = () => {
    return Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    )
}

const progressBar = document.getElementById('reading-progress')

let windowHeight = window.innerHeight || 0
let documentHeight = getDocumentHeight()
let maximumHeight = documentHeight - windowHeight

progressBar.setAttribute('max', maximumHeight)

document.addEventListener('scroll', () => {
    let scrollPosition = getScrollPosition()
    progressBar.setAttribute('value', scrollPosition)
})

window.addEventListener('resize', () => {
    windowHeight = window.innerHeight || 0
    documentHeight = getDocumentHeight()

    maximumHeight = documentHeight - windowHeight
    progressBar.setAttribute('max', maximumHeight)

    let scrollPosition = getScrollPosition()
    progressBar.setAttribute('value', scrollPosition)
})
