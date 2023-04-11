import {
    calc_array_demension
} from 'util/array/calc';

declare global {
    interface Array<T> {
        m_one():any;
        m_lu_decomp(): any;
        m_solve(): any;
        m_inv(): any;
        m_reverse(): any;
        m_mutiply(b: any): any;
        m_plus(b: any): any;
        m_minus(b: any): any
    }
}

const methods = {
    m_one(){
        const {
            rows,
            cols
        } = calc_array_demension(this);
        const res = [];

        for (let j = 0; j < cols; j++) {
            res[j] = [];
            for (let i = 0; i < rows; i++) {
                res[j][i] = 0;
                if (i === j) {
                    res[j][i] = 1;
                }
            }
        }

        return res;
    },
    m_lu_decomp(){
        const {
            rows,
            cols
        } = calc_array_demension(this);
        const L = [];
        const U = [];

        for (let i = 0; i < rows; i++) {
            if (!L[i]) L[i] = [];
            if (!U[i]) U[i] = [];
            for (let j = 0; j < cols; j++) {
                if (i === j) {
                    L[i][j] = 1;
                } else if (j < i) {
                    U[i][j] = 0;
                } else if (j > i) {
                    L[i][j] = 0;
                }
            }
        }

        for (let j = 0; j < cols; j++) {
            for (let i = 0; i <= j; i++) {
                U[i][j] = this[i][j];
                for (let k = 0; k < i; k++) {
                    U[i][j] -= L[i][k] * U[k][j]
                }
            }

            for (let i = j + 1; i < rows; i++) {
                L[i][j] = this[i][j];
                for (let k = 0; k < j; k++) {
                    L[i][j] -= L[i][k] * U[k][j];
                }
                L[i][j] /= U[j][j];
            }
        }

        return {
            L,
            U
        }
    },
    m_solve(b){
        const {
            L,
            U
        } = this.m_lu_decomp();
        const y = [];
        const x = [];
        let lens = b.length;
        for (let i = 0; i < lens; i++) {
            if (i === 0) {
                y[0] = b[0] / L[0][0];
                continue;
            }
            y[i] = b[i];
            for (let j = 0; j < i; j++) {
                y[i] -= L[i][j] * y[j];
            }
            y[i] /= L[i][i];
        }
        lens = lens - 1;
        x[lens] = y[lens] / U[lens][lens];
        for (let i = lens - 1; i > -1; i--) {
            x[i] = y[i];
            for (let j = i + 1; j <= lens; j++) {
                x[i] -= U[i][j] * x[j];
            }
            x[i] /= U[i][i];
        }
        return {
            x,
            y
        };
    },
    m_inv() {
        const b = this.m_one();
        return b.map(e => this.m_solve(e).x).m_reverse();
    },
    m_reverse() {
        const {
            rows,
            cols
        } = calc_array_demension(this);

        const res = [];

        for (let j = 0; j < cols; j++) {
            res[j] = [];
            for (let i = 0; i < rows; i++) {
                res[j][i] = this[i][j];
            }
        }
        const demen = calc_array_demension(res);
        return demen.rows === 1 ? res[0] : res;
    },
    m_mutiply(b){
        const {
            rows,
            cols
        } = calc_array_demension(this);

        let tb = b;
        let bDemen = calc_array_demension(tb);
        if(bDemen.rows !== cols){
            tb = b.m_reverse();
        }

        if(bDemen.rows === cols && bDemen.cols === 0){
            tb = b.map(e => [e]);
        }

        bDemen = calc_array_demension(tb);

        let res = [];

        for (let i = 0; i < rows; i++) {
            res[i] = [];
            for (let j = 0; j < bDemen.cols; j++) {
                res[i][j] = 0;
                for (let k = 0; k < bDemen.rows; k++) {
                    res[i][j] += this[i][k] * tb[k][j];
                }
            }
        }
        return res;
    },
    m_plus(b){
        const {
            rows,
            cols
        } = calc_array_demension(this);

        let tb = b;
        let bDemen = calc_array_demension(tb);

        if(rows !== bDemen.rows){
            throw new Error(`Rows are not equal`);
        }

        if(cols !== bDemen.cols){
            throw new Error(`Colomns are not equal`);
        }

        let res = [];

        if(cols === 0){
            res = this.map((e, index) => {
                return e + b[index]
            })

            return res;
        }

        for (let i = 0; i < rows; i++) {
            res[i] = [];
            for (let j = 0; j < cols; j++) {
                res[i][j] = this[i][j] + b[i][j]
            }
        }
        return res;
    },
    m_minus(b){
        const {
            rows,
            cols
        } = calc_array_demension(this);

        let tb = b;
        let bDemen = calc_array_demension(tb);

        if(rows !== bDemen.rows){
            throw new Error(`Rows are not equal`);
        }

        if(cols !== bDemen.cols){
            throw new Error(`Colomns are not equal`);
        }

        let res = [];

        if(cols === 0){
            res = this.map((e, index) => {
                return e - b[index]
            })

            return res;
        }

        for (let i = 0; i < rows; i++) {
            res[i] = [];
            for (let j = 0; j < cols; j++) {
                res[i][j] = this[i][j] - b[i][j]
            }
        }
        return res;
    }
};

/*propotype chains methods*/
let protos = Array.prototype;
const slice = protos.slice;

for (let method in methods) {
    if (!protos[method]) {
        protos[method] = function () {
            let that = this;
            let args = slice.call(arguments, 0);
            return methods[method].apply(that, args);
        };
    }
};

const MATRIX = () => {};
export default MATRIX;