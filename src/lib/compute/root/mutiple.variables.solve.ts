import { mvfd } from '@src/lib/compute/diff'
import 'array/ampl/matrix'
const abs = Math.abs;

const DELTA = 1e-5;
const isOk = (ds: number[]) => {
  return ds.filter((e: number) => abs(e) > DELTA).length === 0;
}

export const solveEquation = (fns: any, points: number[]) => {

  let p = points.map((e: number) => e);
    let ds = p.map(e => 1);
    let fx: any = [];
    let matrix: any = [];

    const genCompMatrix = () => {

      fx = [];
      matrix = [];

      fns.forEach((fn: any, j) => {
        fx.push(-fn(...p))
        matrix[j] = [];
        p.forEach((e, k) => {
          matrix[j].push(mvfd(fn, p, k));
        })
      })

      console.log(fx, matrix);

    }

    const computeDelta = () => {
        genCompMatrix();
        console.log('matrix', matrix);
        ds = matrix.m_inv().m_mutiply(fx).m_reverse();
        console.log('delta', ds);
    }

    let i = 0;
    const update = () => {
        console.log(`p[${++i}]`, p)
        if(isOk(ds)){
            return;
        }
        computeDelta();
        p = p.m_plus(ds);
        update()
    }

    update()

    return p;
    
}

export const fixedPointSolver = (fns: any, points: any) => {

    let p = points.map((e: number) => e);
  let oldp = points.map((e: number) => e);
  let ds = points.map((e: number) => 1);

    let i = 0;
    const update = () => {
        console.log(`p[${++i}]`, p)
        if(isOk(ds)){
            return;
        }

        oldp = p.map(e => e);

        p = fns.map((fn: any) => {
          return fn(...p)
        })

        ds = p.m_minus(oldp);

        update()
    }

    update()

    return p;

}
