import { mvfd } from 'lib/compute/diff'
import 'array/ampl/matrix'
const abs = Math.abs;

const DELTA = 1e-5;
const isOk = (ds) => {
  return ds.filter(e => abs(e) > DELTA).length === 0;
}

export const solveEquation = (fns, points) => {

    let p = points.map(e => e);
    let ds = p.map(e => 1);
    let fx = [];
    let matrix = [];

    const genCompMatrix = () => {

      fx = [];
      matrix = [];

      fns.forEach((fn, j) => {
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

export const fixedPointSolver = (fns, points) => {

    let p = points.map(e => e);
    let oldp = points.map(e => e);
    let ds = points.map(e => 1);

    let i = 0;
    const update = () => {
        console.log(`p[${++i}]`, p)
        if(isOk(ds)){
            return;
        }

        oldp = p.map(e => e);

        p = fns.map(fn => {
          return fn(...p)
        })

        ds = p.m_minus(oldp);

        update()
    }

    update()

    return p;

}
