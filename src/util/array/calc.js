import { isArray } from 'util/is';
export const calc_array_demension = (array) => {
    return {
        rows: (isArray(array) ? array : []).length,
        cols: (isArray(array[0]) ? array[0] : []).length
    }
}