import { readInput } from "../../../utils/readInput";

export default async function run(): Promise<any> {
    
    return getSortedCalories()[0];
}

export function getSortedCalories(): number[] {
    const input = readInput("1", "1");
    const separatedCalories = input.split("\n\n");
    const summedCalories = separatedCalories.map((calories) => {
        return sumCalories(calories);
    });
    return summedCalories.sort((a, b) => b - a);
}

function sumCalories(lines: string): number {
    const numbers = lines.split("\n").map(line => parseInt(line, 10));
    return numbers.reduce((acc, number) => acc + number, 0);
}



