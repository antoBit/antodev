const fadeInElements = document.querySelectorAll('.fade')

let fadeInObserverOptions = {
    rootMargin: '100px',
    threshold: 1.0,
}

let fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return
        }
        entry.target.classList.add('in')
        observer.unobserve(entry.target)
    })
}, fadeInObserverOptions)

fadeInElements.forEach((fadeInElement) => fadeInObserver.observe(fadeInElement))
