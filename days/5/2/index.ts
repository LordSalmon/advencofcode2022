import { readInput } from "../../../utils/readInput";

export default async function run(): Promise<any> {
    const lines = await readInput("5", "1").split("\n").filter(Boolean);
    const matrix: string[][] = [];
    // get matrix x
    const axisLine = lines.filter(l => !l.trim().startsWith("m") && !l.trim().startsWith("["));
    const matrixSize = axisLine[0].trim().split(" ").filter(Boolean).length;
    for(let i = 0; i < matrixSize; i++) {
        matrix.push([]);
    }
    const stacks = lines.slice(0, lines.indexOf(axisLine[0]));
    const instructions = lines.slice(lines.indexOf(axisLine[0]) + 1, lines.length);
    // translate stacks to matrix
    stacks.forEach(stackLine => {
        for(let i = 0; i < matrixSize; i++) {
            const stackObject = stackLine.substring(i*4, (i+1)*4);
            if (stackObject.includes("[")) {
                matrix[i].push(stackObject.substring(1, 2));
            }
        }
    });

    // execute instructions
    instructions.forEach(instruction => {
        // example input: 'move 5 from 4 to 7'
        const [howMany, from, to] = instruction.split(" ").filter(Number).map(Number);
        const transferArray = matrix[from-1].splice(0, howMany);
        matrix[to-1].splice(0, 0, ...transferArray);
    });

    // get first elements as a string
    return matrix.map(m => m[0]).join("");
}