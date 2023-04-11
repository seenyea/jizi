declare global {
    interface Array<T> {
        v_ones(lens: number):any;
        v_zeros(lens: number):any;
        v_plus(b: any): any;
        v_minus(b: any): any
        v_dot(b: any): number;
        v_normal(): number;
        v_distance(b: any): number;
    }
}

const methods: any = {
    v_ones(lens: number = 0): any{
        var res: any = [];
        var l = lens || this.length;

        for(let i = 0;i < l;i++){
            res.push(1);
        }

        return res;
    },
    v_zeros(lens: number = 0): any{
        var res: any = [];
        var l = lens || this.length;

        for(let i = 0;i < l;i++){
            res.push(0);
        }

        return res;
    },
    v_plus(b: any): any{
        const bl = b.length;
        const l = this.length;

        if(bl !== l){
            throw Error(`${bl} is not equal to ${l}`);
        }

        return this.map((e, i) => e + b[i]);
    },
    v_minus(b: any): any{
        const bl = b.length;
        const l = this.length;

        if(bl !== l){
            throw Error(`${bl} is not equal to ${l}`);
        }

        return this.map((e: number, i: number) => e - b[i]);
    },
    v_dot(b: any): number{
        let res = 0;
        const bl = b.length;
        const l = this.length;

        if(bl !== l){
            throw Error(`${bl} is not equal to ${l}`);
        }

        this.forEach((e: number, i: number) => {
            res += e * b[i];
        });
        return res;
    },
    v_normal(): number{
        return this.reduce((a: number, b: number) => a + b * b, 0);
    },
    v_distance(b: any): number{
        let res = 0;
        const bl = b.length;
        const l = this.length;

        if(bl !== l){
            throw Error(`${bl} is not equal to ${l}`);
        }

        this.forEach((e: number, i: number) => {
            let s = e - b[i];
            s *= s;
            res += s;
        });
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