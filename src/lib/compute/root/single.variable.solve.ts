import MathLibs from 'buildin/math';
const { abs, log2 } = MathLibs;
const DELTA = 1e-10
const biSection = (f: any, a: number, b: number, delta: number = DELTA) => {

    if(a > b){
        [b, a] = [a, b];
    }
    
    let root = (a + b) / 2;
    let fa = f(a);
    let fb = f(b);

    if(fa * fb > 0){
        throw new Error(`Wrong range [${a}, ${b}]`);
    }

    const n = parseInt(log2((b - a) / delta)) + 1;

    for(let i = 0;i < n;i++){

      root = a + 0.5 * (b - a);
      let fc = f(root);

      if(fa * fc < 0){
        b = root;
        fb = fc;
      }else{
        if(fa * fc > 0){
          a = root;
          fa = fc;
        }else{
          break;
        }
      }

      console.log(`inex: ${i+1} => a: ${a} => b: ${b} => fa: ${fa} => fb: ${fb} => fc: ${fc}`)

    }

    return root;
}

const regulaFalsi = (f: any, a: number, b: number, delta:number = DELTA): number => {
    let fa = f(a);
    let fb = f(b);

    let root = (a * abs(fb) + b * abs(fa)) / (abs(fa) + abs(fb))
    let d = f(root);

    let index = 0;
    while(abs(d) > delta){
        console.log(`${++index}`, `a = ${a}`, `f(a) = ${fa}`, `b = ${b}`, `f(b) = ${fb}`, `root = ${root}`, `f(root) = ${f(root)}`);
        if(d > 0){
            b = root;
        }else{
            a = root;
        }

        fa = f(a);
        fb = f(b);
        
        root = (a * abs(fb) + b * abs(fa)) / (abs(fa) + abs(fb));
        d = f(root);
    }
    return root;
}

const secantMethod = (f: any, a: number, b: number, delta:number = DELTA): number => {
    let fa = f(a);
    let fb = f(b);

    let root = b - (b - a) / (fb - fa) * fb;
    let d = f(root);

    let index = 0;

    while(abs(d) > delta){
        console.log(`${++index}`, `a = ${a}`, `b = ${b}`, `f(a) = ${fa}`, `f(b) = ${fb}`, `root = ${root}`, `f(root) = ${f(root)}`);
        if(d < 0){
            b = root;
        }else{
            a = root;
        }

        fa = f(a);
        fb = f(b);
        
        root = b - (b - a) / (fb - fa) * fb;
        d = f(root);
    }
    return root;
}

const single_variable_solver = {
    biSection,
    regulaFalsi,
    secantMethod
}

export default single_variable_solver;