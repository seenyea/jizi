declare global {
    interface Array<T> {
        p_compute(x: number): number;
        p_mutiply(p: number[]):number[];
        p_minus(p: number[]): number[];
        p_plus(p: number[]): number[];
        p_diff(p: number[]): number[];
        p_integral(p: number[]): number[];
    }
}

const methods: any = {
    p_compute(x: number): number{
        const lens = this.length;

        if(!lens){
            throw Error(`empty polynomial can not compute.`)
        }

        const lastIndex = lens - 1;
        let res = this[lastIndex];

        for(let i = lastIndex - 1;i > -1;i--){
            res = this[i] + res * x;
        }

        return res;
    },
    p_mutiply(p: number[]): number[]{
        const res: number[] = [];
        
        this.forEach((e, i) => {
            p.forEach((e2, j) => {
                let index = i + j;
                if(!res[index]){
                    res[index] = 0;
                }
                res[index] += e * e2;

            })
        })

        return res;
    },
    p_minus(p: number[]):number[] {
        const res: number[] = [];
        const lens = this.length;
        const lens2 = p.length;
        
        let [bigOne, smallOne] = lens >= lens2 ? [this, p] : [p, this];

        smallOne.forEach((e, i) => {
            res.push(bigOne[i] - e)
        });

        return res;
    },
    p_plus(p: number[]): number[]{
        const res: number[] = [];
        const lens = this.length;
        const lens2 = p.length;
        
        let [bigOne, smallOne] = lens >= lens2 ? [this, p] : [p, this];

        smallOne.forEach((e, i) => {
            res.push(bigOne[i] + e)
        });

        return res;
    },
    p_diff(p: number[]): number[]{
        const input = p || this;
        const res = input.filter((e, i) => i !== 0).map((e, i) => e * (i + 1));
        return res;
    },
    p_integral(p: number[]): number[]{
        const input = p || this;
        const res = input.map((e, i) => e / (i + 1));
        res.unshift(1);
        return res;
    }
};

/*propotype chains methods*/
let protos: any = Array.prototype;
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