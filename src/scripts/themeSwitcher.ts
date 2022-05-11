function loadTheme() {
    const prefersDarkTheme = localStorage.getItem('darkTheme') !== null
    console.log('prefersDarkTheme: ', prefersDarkTheme);
    document.body.classList.toggle('darktheme', prefersDarkTheme)   
}

function switchTheme() {
    const prefersDarkTheme = localStorage.getItem('darkTheme') !== null

    if (prefersDarkTheme) {
        localStorage.removeItem('darkTheme')
    } else {
        localStorage.setItem('darkTheme', 'enabled')
    }

    document.body.classList.toggle('darktheme', prefersDarkTheme)   
}

const themeSwitcher = document.getElementById('theme-switcher')

if (themeSwitcher) {
themeSwitcher.addEventListener('click', switchTheme)
}

window.addEventListener('load', (loadTheme))