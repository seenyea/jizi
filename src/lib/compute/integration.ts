const DELTA = 1e-5;


const Trapezoidal = 'T';
const Simpson = 'S';

const RULES = {
    Trapezoidal,
    Simpson
}
/*

read book: Numerical Analysis-Burden Faires-9th(p193 - p196)

*/
export const Integration = (fn: any, intevals: number[], delta: number = DELTA, type: string = RULES.Trapezoidal): number => {

    let [a, b] = intevals;
    if(a > b){
        [b, a] = intevals;
    }
    const h = (b - a);
    const half = (a + b) / 2
    switch(type){
        case Trapezoidal:
            return simpleTrapezoidIntegration(fn, [a, b], 1)
        case Simpson:
            return h * (fn(a) +4 * fn(half) + fn(b)) / 6
    }
}

export const simpleTrapezoidIntegration = (fn: any, intevals: number[], n: number): number => {

    let [a, b] = intevals;
    if(a > b){
        [b, a] = intevals;
    }
    const h = (b - a) / n;
    let sum = (fn(a) + fn(b)) * 0.5

    for(var i = 1, l = n - 1;i < l;i++){
        let x = a + i * h;
        sum += fn(x);
    }
    return h * sum;
}