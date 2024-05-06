import patients from "../data/patients";

import { Patient, NonSensitivePatient } from "../types";

const getPatient = (): Patient[] => {
    return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatient,
    getNonSensitivePatient
};