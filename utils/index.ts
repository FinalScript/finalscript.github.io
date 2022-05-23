export const decimalToHexString = (number: number) => {
    if (number < 0) {
        number = 0xffffffff + number + 1;
    }

    return number.toString(16).toUpperCase();
};
