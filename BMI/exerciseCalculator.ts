// eslint-disable-next-line import/no-unresolved
import { isNotNumber } from "./isNotNumber";

interface finalResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


const calculateExercises = (target: number, weekHours: number[]): finalResult => {
    const periodLength = weekHours.length;
    const trainingDays = weekHours.filter((day) => day !== 0).length;
    const totalHours = weekHours.reduce((acc, day) => acc + day, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
    let rating = 0;
    let ratingDescription = "";

    switch (true) {
        case average === 0:
            rating = 1;
            ratingDescription = "Train more";
            break;
        case average < target:
            rating = 2;
            ratingDescription = "not too bad but could be better";
            break;
        case average >= target:
            rating = 3;
            ratingDescription = "well Done";
            break;
    }



    const result = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };

    return result;
};

const argsBool = process.argv.slice(3).map((arg) => isNotNumber(arg));

if (argsBool.every((bool) => bool)) {
    console.log("There is argument that is not a number");
} else {
    const a: number = Number(process.argv[2]);
    const b: Array<number> = process.argv.slice(3).map(Number);
    console.log(calculateExercises(a, b));
}



