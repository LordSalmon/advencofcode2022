import { readInput } from "../../../utils/readInput"


const shapeWeight = {
    "X": 1,
    "Y": 2,
    "Z": 3,
}

const gameMapping = {
    "A": {
        "X": 3,
        "Y": 6,
        "Z": 0,
    },
    "B": {
        "X": 0,
        "Y": 3,
        "Z": 6,
    },
    "C": {
        "X": 6,
        "Y": 0,
        "Z": 3,
    }
}

export default async function run(): Promise<any> {
    const input = readInput("2", "1");
    const lines = input.split("\n");
    const rounds = lines.map(line => {
        return line.split(" ");
    });
    return rounds.reduce((acc, round) => {
        const [enemyMove, myMove] = round;
        return acc + shapeWeight[myMove] + gameMapping[enemyMove][myMove];
    }, 0);
}