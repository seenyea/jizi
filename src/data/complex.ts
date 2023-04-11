class Complex{

    realPart: number;
    complexPart: number;

    constructor(realPart:number = 0, complexPart: number = 0){
        this.realPart = realPart;
        this.complexPart = complexPart
    }

    plus(b: Complex): Complex{
        const { realPart = 0,  complexPart = 0 } = this;
        let brealPart = b.realPart;
        let bcomplexPart = b.complexPart;

        let r = realPart + brealPart;
        let c = complexPart + bcomplexPart;
        return new Complex(r, c);
    }

    minus(b: Complex): Complex{
        const { realPart = 0,  complexPart = 0 } = this;
        let brealPart = b.realPart;
        let bcomplexPart = b.complexPart;

        let r = realPart - brealPart;
        let c = complexPart - bcomplexPart;
        return new Complex(r, c);
    }

    mutiply(b: Complex): Complex{
        const { realPart = 0,  complexPart = 0 } = this;
        let brealPart = b.realPart;
        let bcomplexPart = b.complexPart;

        let r = realPart * brealPart - complexPart * bcomplexPart;
        let c = realPart * bcomplexPart + complexPart * brealPart;
        return new Complex(r, c);
    }

    divide(b: Complex): Complex{
        const { realPart = 0,  complexPart = 0 } = this;
        const divide = b.normal();
        let brealPart = b.realPart;
        let bcomplexPart = -1 * b.complexPart;

        let r = realPart * brealPart - complexPart * bcomplexPart;
        let c = realPart * bcomplexPart + complexPart * brealPart;
        return new Complex(r / divide, c / divide);
    }

    normal(): number{
        const { realPart = 0,  complexPart = 0 } = this;
        return realPart * realPart + complexPart * complexPart;
    }

    isEqual(b: Complex): boolean{
        const { realPart = 0,  complexPart = 0 } = this;
        let brealPart = b.realPart;
        let bcomplexPart = b.complexPart;

        return realPart === brealPart && complexPart === bcomplexPart;
    }

    display(): string{
        const { realPart = 0,  complexPart = 0 } = this;
        const realStr = realPart ? `${realPart}` : '';
        const complexStr = complexPart ? `${complexPart}i` : '';
        const flag = realPart ^ complexPart; //1 ^ -1 = -1 < 0, 1 ^ 1 = 0 === 0, -2 ^ -3 = 3 > 0, so flag >= 0 => '+' else '-'
        const joiner = flag >= 0 ? ' + ' : '-';
        const res = [];
        if(realStr){
            res.push(realStr);
        }

        if(complexStr){
            res.push(complexStr);
        }
        
        return res.join(joiner);
    }

    clone(): Complex{
        const { realPart = 0,  complexPart = 0 } = this;
        return new Complex(realPart, complexPart);
    }
}