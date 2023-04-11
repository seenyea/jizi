
import { sqrt } from '@src/libs/machine-learning/utils/math';
/**
* @param {number[]} data
* @return {number}
*/
export const mean = (data: number[]) => {
    let sum = 0;
    const length = (data || []).length;
    if (length === 0) {
        /**
         * Mathematically, the mean of an empty set is undefined,
         * so we could return early here. We could also allow the function
         * to attempt dividing 0/0, would would return NaN in JavaScript
         * fail in some other languages (so probably a bad habit to encourage).
         * Ultimately, I would like this function to not return mixed
         * so instead let's throw an error.
         */
        throw new Error('Cannot calculate mean of empty set');
    }

    for (let i = 0; i < length; i++) {
        sum += data[i];
    }
    return sum / length;
}


/**
    * Calculates only the 2-dimensional distance between two points a and b.
    * Each point should be an array with length = 2, and both elements defined and numeric.
    * @param {number[]} a
    * @param {number[]} b
    * @return {number}
*/
export const distance2d = (a: number[], b: number[]) => {
    // Difference between b[0] and a[0]
    var diff_0 = b[0] - a[0];
    // Difference between b[1] and a[1]
    var diff_1 = b[1] - a[1];
    return sqrt(diff_0 * diff_0 + diff_1 * diff_1);
}



/**
    * Calculates the N-dimensional distance between two points a and b.
    * Each point should be an array with length = 2, and both elements defined and numeric.
    * @param {number[]} a
    * @param {number[]} b
    * @return {number}
*/
export const distance = (a: number[], b: number[]) => {
    const length = a.length;
    let sumOfSquares = 0;
    if (length !== b.length) {
        throw new Error('Points a and b must be the same length');
    }
    for (let i = 0; i < length; i++) {
        const diff = b[i] - a[i];
        sumOfSquares += diff * diff;
    }
    return Math.sqrt(sumOfSquares);
}