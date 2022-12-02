import { readInput } from "../../../utils/readInput"


const shapeWeight = {
    "A": 1,
    "B": 2,
    "C": 3,
}

// depth = 0: what the enemy chooses
// depth = 1: what the outcome is
// value of depth = 1: what I need to chose
const strategyMapping = {
    "A": {
        "X": "C",
        "Y": "A",
        "Z": "B",
    },
    "B": {
        "X": "A",
        "Y": "B",
        "Z": "C",
    },
    "C": {
        "X": "B",
        "Y": "C",
        "Z": "A",
    }
};

const outcomeArray = ["X", "Y", "Z"];

export default async function run(): Promise<any> {
    const input = readInput("2", "1");
    const lines = input.split("\n");
    const rounds = lines.map(line => {
        return line.split(" ");
    });
    return rounds.reduce((acc, round) => {
        const [enemyMove, outcome] = round;
        const myMove = strategyMapping[enemyMove][outcome];
        return acc + shapeWeight[myMove] + outcomeArray.indexOf(outcome)*3;
    }, 0);
}