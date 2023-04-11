import single_variable_solver from 'lib/compute/root/single.variable.solve';

const {
    biSection,
    regulaFalsi,
    secantMethod
} = single_variable_solver;

globalThis.biSection = biSection;
globalThis.regulaFalsi = regulaFalsi;
globalThis.secantMethod = secantMethod;
