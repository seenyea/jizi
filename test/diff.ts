import { mvfd } from 'lib/compute/diff'
import 'array/ampl/matrix'
const abs = Math.abs;

const DELTA = 1e-5;
const solveEquation = (f, g, prams) => {

    const p = prams;
    let dx = 1;
    let dy = 1;

    const isOk = () => {
        return abs(dx) < DELTA && abs(dy) < DELTA
    }

    const Jn = (f, g, p) => {
        const dfx = mvfd(f, p, 0);
        const dgx = mvfd(g, p, 0);
        const dfy = mvfd(f, p, 1);
        const dgy = mvfd(g, p, 1);

        console.log(dfx, dfy, dgx, dgy);
        return dfx * dgy -  dfy * dgx;
    }

    const Jx = (f, g, p) => {
        const fxy = f(...p);
        const dgy = mvfd(g, p, 1);
        const gxy = g(...p);
        const dfy = mvfd(f, p, 1);

        console.log('Jx', fxy, dgy, gxy, dfy);
        return fxy * dgy -  gxy * dfy;
    }

    const Jy= (f, g, p) => {
        const dfx = mvfd(f, p, 0);
        const gxy = g(...p);
        const fxy = f(...p);
        const dgx = mvfd(g, p, 0)

        console.log('Jy', dfx, gxy, fxy, dgx);
        return dfx * gxy -   fxy * dgx;
    }

    const computerDelta = () => {
        const j0 = Jn(f, g, p);
        dx = Jx(f, g, p) / j0;
        dy = Jy(f, g, p) / j0;
        console.log('delta', dx, dy);
    }

    const update = () => {
        console.log('p', p)
        if(isOk()){
            return;
        }
        computerDelta();
        p[0] =  p[0] - dx
        p[1] =  p[1] - dy
        update()
    }

    update()
}

//globalThis.solveEquation = solveEquation