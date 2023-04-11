/**
 * 
 */
const solveTridiagLinearSys = (arr: number[][], f: number[]): number[] => {

    const lens = arr.length;
    const lastIndex = lens - 1;
    //
    const lower = [];
    const diag = [];
    const upper = [];

    for(let i = 0;i < lens;i++){
        diag[i] = arr[i][i];
        if(i > 0){
            lower[i] = arr[i][i-1];
        }

        if(i < lastIndex){
            upper[i] = arr[i][i+1];
        }
    }

    const delta = [diag[0]];
    const g = [f[0]];

    for(let i = 1;i < lens;i++){
        let common = lower[i] / delta[i - 1];
        delta[i] = diag[i] - upper[i - 1] * common;
        g[i] = f[i] - g[i - 1] * common;
    }

    var x = [];
    x[lastIndex] = g[lastIndex] / delta[lastIndex];

    for(let i = lastIndex - 1;i > -1;i--){
        x[i] = (g[i] - x[i+1] * upper[i]) / delta[i];
    }

    return x;
}
