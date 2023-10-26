/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.html',
        './src/**/*.njk',
        './src/**/*.md',
        './src/**/*.11ty.js',
    ],
    theme: {
        colors: {
            background: 'hsl(212, 33%, 15%)',
            background_dark: 'hsl(212, 33%, 10%)',
            background_light: 'hsl(212, 33%, 20%)',
            background_lighter: 'hsl(212, 33%, 22%)',
            transparent: 'transparent',
            white: 'hsl(0, 0%, 100%)',
            black: 'hsl(0, 0%, 20%)',
            accent: 'hsl(39, 94%, 59%)',
            accent_alt: 'hsl(192, 66%, 60%)',
            light: 'hsl(206, 100%, 93%)',
            light_alt: 'hsl(206, 100%, 93%)',
            violet: 'hsl(258, 40%, 57%)',
            violet_dark: 'hsl(258, 40%, 52%)',
            teal: 'hsl(192, 66%, 60%)',
            orange: 'hsl(0, 96%, 70%)',
            blue: 'hsl(230, 96%, 62%)',
            yellow: 'hsl(62, 100%, 47%)',
            pink: 'hsl(297, 96%, 63%)',
            purple: 'hsl(262, 96%, 56%)'
        },
        fontFamily: {
            sans: ['Nunito Sans', 'sans'],
            serif: ['Arvo', 'serif'],
            mono: ['Fira Code', 'monospace'],
            icomoon: ['icomoon'],
        },
        fontSize: {
            small: '0.9rem',
            xs: '1rem',
            sm: '1.063rem',
            base: '1.125rem',
            lg: '1.4rem',
            xl: '1.688rem',
            '2xl': '2rem',
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
          },
        extend: {
            transitionProperty: {
                'background-size': 'background-size',
            },
            backgroundImage: {
                'quote': "url('/images/quotations.svg')",
                'gradient-1': "linear-gradient(90deg, hsl(0, 96%, 70%) 0%, hsl(230, 96%, 62%) 100%)",
                'gradient-2': "linear-gradient(90deg, hsl(0, 96%, 70%) 0%, hsl(62, 100%, 47%) 100%)",
                'gradient-3': "linear-gradient(90deg, hsl(297, 96%, 63%) 0%, hsl(262, 96%, 56%) 100%)"
            },
            animation: {
                'wave': '1.3s linear 1s 1 wave',
                'rubberBand': '1s linear 1s 3 rubberBand both'
            },
            keyframes: {
                wave: {
                    '0%': {
                        transform: 'scale(1.3) rotate(0deg)'
                    },
                    '25%': {
                        transform: 'scale(1.3) rotate(10deg)'
                    },
                    '50%': {
                        transform: 'scale(1.3) rotate(-10deg)'
                    },
                    '75%': {
                        transform: 'scale(1.3) rotate(0deg)'
                    },
                    '100%': {
                        transform: 'scale(1) rotate(0deg)'
                    }
                },
                rubberBand: {
                    '0%': {
                        transform: 'scale3d(1, 1, 1)'
                    },
                    '30%': {
                        transform: 'scale3d(1.25, 0.75, 1)'
                    },
                    '40%': {
                        transform: 'scale3d(0.75, 1.25, 1)'
                    },
                    '50%': {
                        transform: 'scale3d(1.15, 0.85, 1)'
                    },
                    '65%': {
                        transform: 'scale3d(0.95, 1.05, 1)'
                    },
                    '75%': {
                        transform: 'scale3d(1.05, 0.95, 1)'
                    },
                    '100%': {
                        transform: 'scale3d(1, 1, 1)'
                    }
                }
            }
        },
    },
    plugins: [],
}
