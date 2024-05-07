import patients from "../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v4 as uuid } from 'uuid';


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

const addPatient = (patient: NewPatient): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = uuid() as string;
    const newPatient = {
        id: id,
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatient,
    getNonSensitivePatient,
    addPatient
};