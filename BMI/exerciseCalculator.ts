interface finalResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating:number;
    ratingDescription: String;
    target: number;
    average: number;
  }

const calculateExercises = (weekHours:number[],target:number): finalResult =>{
    const periodLength = weekHours.length
    const trainingDays = weekHours.filter((day)=>day!==0).length
    const totalHours= weekHours.reduce((acc, day) => acc + day, 0)
    const average = totalHours/periodLength
    const success = average>=target
    let rating=0
    let ratingDescription=""

    switch (true) {
        case average === 0 :
            rating = 1
            ratingDescription = "Train more"
            break
        case average < target :
            rating = 2
            ratingDescription = "not too bad but could be better"
            break
        case average >= target :
            rating = 3
            ratingDescription = "well Done"
            break
    }

    
        
    const result = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    }

    return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))

