import { readInput } from "../../../utils/readInput";

export default async function run(): Promise<any> {
    
    return getSortedCalories("1", "2")[0];
}

export function getSortedCalories(day: string, part: string): number[] {
    const input = readInput(day, part);
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