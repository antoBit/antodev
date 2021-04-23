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

const progressBar : HTMLElement | null = document.getElementById('reading-progress')

if (progressBar) {
    let windowHeight = window.innerHeight || 0
    let documentHeight = getDocumentHeight()
    let maximumHeight = documentHeight - windowHeight

    progressBar.setAttribute('max', maximumHeight.toString())

    document.addEventListener('scroll', () => {
        const scrollPosition = getScrollPosition()
        progressBar.setAttribute('value', scrollPosition.toString())
    })

    window.addEventListener('resize', () => {
        windowHeight = window.innerHeight || 0
        documentHeight = getDocumentHeight()

        maximumHeight = documentHeight - windowHeight
        progressBar.setAttribute('max', maximumHeight.toString())

        const scrollPosition = getScrollPosition()
        progressBar.setAttribute('value', scrollPosition.toString())
    })
}