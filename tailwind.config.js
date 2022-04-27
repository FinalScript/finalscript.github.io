module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                'center-lg': '0px 0px 10px 2px',
                'center-xl': '0px 0px 15px 4px',
            },
            width: {
                '400px': '400px',
            },
            minWidth: {
                '400px': '400px',
            },
            screens: {
                '2xl': '1560px',
                xs: '475px',
            },
        },
    },
    plugins: [],
};
