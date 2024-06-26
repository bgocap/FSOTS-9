
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;

}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}


export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitiveDiagnose = Omit<Diagnose, 'latin'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;