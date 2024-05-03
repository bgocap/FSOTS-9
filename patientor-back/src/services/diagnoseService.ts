import diagnoses from "../data/diagnoses";
import { Diagnose, NonSensitiveDiagnose } from "../types";


const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

const getNonSensitiveDiagnose = (): NonSensitiveDiagnose[] => {
    return diagnoses.map(({ code, name }) => ({
        code,
        name
    }));
};

export default {
    getDiagnoses,
    getNonSensitiveDiagnose
};