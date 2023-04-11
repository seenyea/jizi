/**
 * book: Numerical Methods
 * author: S.R.K Lyengar, R.K. Jain
 */

/**
 * 拉格朗日插值, page64 - page78
 * @param x: number[]
 * @param y: number[]
 * @returns Function
 */
const lagrangeInterpolation = (x: number[], y: number[]): any => {
    let lens = y.length - 1;
    let pn = [];
    for(let i = 0;i <= lens;i++){
      pn[i] = 1;
      let cx = x[i];
      let cy = y[i];
      let fStr = [];
      for(let j = 0;j <= lens;j++){
        if(j !== i){
          pn[i] *= (cx - x[j]);
          fStr.push(`(x - ${x[j]})`);
        }
      }

      pn[i] = 1 / pn[i] * cy;
      pn[i] = `${fStr.join('*')} * ${pn[i]}`;
    }
    return new Function('x', `return ${pn.join('+')}`)
}

/**
 * 牛顿除法差分插值
 * @param x: number[]
 * @param y: number[]
 * @returns number[][]
 */
const  newtonDividedDifferenceInterpolation = (x: number[], y: number[]): number[][] => {

    var lens = y.length;
    var N = lens - 1;
    var res = [y];

    for(var i = 1;i <= N;i++){
        let prev = res[i - 1];
        let current = [];
        for(var j = 0, l = lens - i;j < l;j++){
            var r = (prev[j + 1] - prev[j]) / (x[j + i] - x[j]);
            current.push(r);
        }
        res.push(current);
    }
    return res;
}