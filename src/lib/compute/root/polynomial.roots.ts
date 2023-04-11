import '@src/array/ampl/polynomial'
const abs = Math.abs;
const pow = Math.pow;
const DELTA = 1e-5
const LOOP_UPPER = 5;
export const polynomialRoots = (coffs: number[]): number[] => {
    let roots = coffs.map(e => e);

    let c = coffs.map(e => e);

    const detect = (function(c){
        const cfs = c.map((e: number) => e);
        return function (r: any) {
            return cfs.map((e: number , i) => e * pow(r, i)).reduce((a: number, b: number) => a + b, 0)
        }
    })(c);

    const stillLoop = (r) => {
        return r.filter(e => detect(e) > DELTA).length > 0;
    }

    const _genEven = (c) => c.map((e, i) => {
        if(i % 2 === 0) return e;
        return 0;
    });
    const _genOdds = (c) => c.map((e, i) => {
        if(i % 2 === 1) return e;
        return 0;
    });
    const _cnts = (n) => pow(2, n)

    let loop = (num) => {
        let even = _genEven(c);
        let odds = _genOdds(c);

        even = even.p_mutiply(even);
        odds = odds.p_mutiply(odds);
        
        c = odds.p_minus(even);

        roots = c.filter((e, i) => i % 2 === 0).reverse();
        c = c.filter((e , i) => i % 2 === 0).map(e => abs(e));

        roots = roots.map((e, i) => {
            const prev = roots[i - 1];
            if(!prev){
                return 1;
            }
            return pow(abs(e/prev), 1 / _cnts(num))
        })

        console.log(num, even, odds, c, roots)
    }

    let i = 0;
    while(stillLoop(roots) && i < LOOP_UPPER){
        loop(++i);
    }

    return roots;
}