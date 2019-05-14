const labels = require("./labels.json"); // TensorFlow models
const initialRounds = 10; //how many rounds
const questions = labels; //questions
const duration = 20; //time in sec to solve round

export { initialRounds, duration, labels, questions };