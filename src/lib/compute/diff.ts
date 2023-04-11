import { one_sub_one_expand } from './combine'
import Mathlibs from 'buildin/math';
const { cos, sin, pow, PI } = Mathlibs;

const DELTA = 1e-5

const _genDelta = (n: number): number[] => {
    var res:number[] = [];
    for(var i = 0;i <= n;i++){
        res.push((n - i * 2) * DELTA)
    }
    return res
} 

/**
 * following the diff of function, we can get:
 * first diff: (f(x + h) - f(x - h))/2 h
 * mutiply-parmas:[1, -1]
 * deltas:[h, -h]
 * divider: 2h
 * 
 * second diff: (f(x + 2h) - 2f(x) + f(x - 2h))/(2h*2h)
 * mutiply-parmas:[1, -2 ,1]
 * deltas:[2h, 0, -2h]
 * divider: 2h * 2h
 * 
 * third diff: (f(x + 3h) - 3f(x +h ) + 3f(x - h) - f(x - 3h))/(2h*2h*2h)
 * mutiply-parmas:[1, -3, 3 , -1]
 * deltas:[3h, h, -h, -3h]
 * divider: 2h * 2h * 2h
 * 
 * you can check out the forth order diff
 */
const high_order_single_variable_funcction_diff =  (n: number): any => {
    const mutiplyParmas:number[] = one_sub_one_expand(n);
    const deltas:number[] = _genDelta(n)
    const divider: number = Math.pow(2 * DELTA, n);

    return function (f: any, x: any):number {
        let res = 0;

        for(var i = 0;i <= n;i++){
            let d = deltas[i];
            let p = mutiplyParmas[i];

            res += p * f(x + d);
        }
        res /= divider;
        return res;
    }
}

const mutiple_variable_function_diff = (f: any, parmas:any = [], diff_vari) => {

    const coff = parmas.map(e => e);
    var p = coff[diff_vari];
    coff[diff_vari] = p + DELTA;

    var result = f(...coff);

    coff[diff_vari] = p - DELTA;
    result -= f(...coff);

    return result / (2 * DELTA);
}
const mvfd = mutiple_variable_function_diff;

const fisrt_function_diff = high_order_single_variable_funcction_diff(1);


export {
    fisrt_function_diff,
    mvfd,
    high_order_single_variable_funcction_diff
}