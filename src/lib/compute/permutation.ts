/**
 * permutation function
 * p(1,1) = 1
 * p(1,0) = 1
 * p(2,1) = 2
 * p(3,2) = 3 * 2 = 6
 * p(3) = 3 * 2 * 1 = 6
 */
const permutation = (n: number, p: number): number => {
    if(n < 0 || p < 0) throw Error(`Neither 'n=${n}' nor 'p=${p}' are less than 1`)
    if(n < p) throw Error(`'n=${n}' can not less than 'p=${p}'`);
    if(!n || p === 0) return 1;
    
    p = p ? p : n; //solve the p is undefined

    if( p === 1) return n;
    var d = 1;
    for(var i = 0;i < p;i++){
      d *= n--;
    }
    return d;
}