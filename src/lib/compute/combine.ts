/**
 * combine function
 * c(1,1) = 1
 * c(1,0) = 1
 * c(2,1) = 2
 * c(3,2) = 3
 */
const combine = (n: number, p: number): number => {
    if(n < 0 || p < 0) throw Error(`Neither 'n=${n}' nor 'p=${p}' are less than 1`)
    if(n < p) throw Error(`'n=${n}' can not less than 'p=${p}'`);
    if(!n || !p || n === p) return 1;
    if( p === 1) return n;
    var d = 1;
    var s = 1;
    while(p){
      s *= p--;
      d *= n--;
    }
    return d / s;
}
/**
 * (1-1)^1  expands like this: 1 + (-1)
 * (1-1)^2  expands like this: 1 + (-2) + 1
 * (1-1)^3  expands like this: 1 + (-3) + 3 + (-1)
 * (1-1)^4  expands like this: 1 + (-4) + 6 + (-4) + 1
 */
const one_sub_one_expand = (n: number): number[] => {
    var res = [];
    for(var i = 0;i <= n;i++){
      let flag = i % 2 ? -1 : 1
      res.push(combine(n, i) * flag)
    }
    return res;
}

export{
    combine,
    one_sub_one_expand
}