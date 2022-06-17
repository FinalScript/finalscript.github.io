import BigNumber from 'bignumber.js';

export const decimalToHexString = (number: number) => {
    if (number < 0) {
        number = 0xffffffff + number + 1;
    }

    return number.toString(16).toUpperCase();
};

export const abbreviateNumber = (num: BigNumber, decimal: number = 3) => {
    if (num.isGreaterThanOrEqualTo('1000000000000000000000000')) {
        return (
            num
                .div('1000000000000000000000000')
                .toFixed(decimal, 1)
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .replace(/\.0$/, '') + ' Septillion'
        );
    }
    if (num.isGreaterThanOrEqualTo('1000000000000000000000')) {
        return (
            num
                .div('1000000000000000000000')
                .toFixed(decimal, 1)
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .replace(/\.0$/, '') + ' Sextillion'
        );
    }
    if (num.isGreaterThanOrEqualTo('1000000000000000000')) {
        return (
            num
                .div('1000000000000000000')
                .toFixed(decimal, 1)
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .replace(/\.0$/, '') + ' Quintillion'
        );
    }
    if (num.isGreaterThanOrEqualTo(1000000000000000)) {
        return (
            num
                .div(1000000000000000)
                .toFixed(decimal, 1)
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .replace(/\.0$/, '') + ' Quadrillion'
        );
    }
    if (num.isGreaterThanOrEqualTo(1000000000000)) {
        return (
            num
                .div(1000000000000)
                .toFixed(decimal, 1)
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .replace(/\.0$/, '') + ' Trillion'
        );
    }
    if (num.isGreaterThanOrEqualTo(1000000000)) {
        return (
            num
                .div(1000000000)
                .toFixed(decimal, 1)
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .replace(/\.0$/, '') + ' Billion'
        );
    }
    if (num.isGreaterThanOrEqualTo(1000000)) {
        return (
            num
                .div(1000000)
                .toFixed(decimal, 1)
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .replace(/\.0$/, '') + ' Million'
        );
    }

    return num.toFixed(decimal, 1).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
