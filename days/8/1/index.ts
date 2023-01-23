import { readInput } from "../../../utils/readInput";

export default async function run(): Promise<any> {
    const lines = readInput("8", "1").split("\n");
    let matrix: number[][] = [];
    lines.forEach(line => {
        matrix.push(line.split("").map(char => parseInt(char, 10)));
    });
    let result = 0;
    // default
    result += getVisibleNumberFromLeft(matrix);
    // reversed
    matrix = reverseMatrix(matrix);
    result += getVisibleNumberFromLeft(matrix);
    // reversed and transposed
    matrix = transposeMatrix(matrix);
    result += getVisibleNumberFromLeft(matrix);
    // dereverse so its default and transposed
    matrix = reverseMatrix(matrix);
    result += getVisibleNumberFromLeft(matrix);
    return result;
}

export function getVisibleNumberFromLeft(matrix: number[][]): number {
    let out = 0;
    matrix.forEach(row => {
        row.forEach((height, index) => {
            if (index === 0) {
                return;
            }
            // you cannot take the element before, take the slice from 0 to index-1 and compare it to the current height
            if (row.at(index-1) >= height) {
                out += index;
            }
        });
    });
    return out;
}

export function reverseMatrix(matrix: number[][]): number[][] {
    return matrix.map(row => row.reverse());
}

export function transposeMatrix(matrix: number[][]): number[][] {
    for(let i = 0; i < matrix.length; i++) {
        for(let j = i; j < matrix[i].length; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    return matrix;
    
}