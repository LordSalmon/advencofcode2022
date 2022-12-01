import { readInput } from "../../../utils/readInput";
import { getSortedCalories } from "../1";

export default async function run(): Promise<any> {
    const input = readInput("1", "2");
    const sortedCalories = getSortedCalories("1", "2");
    return sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
}