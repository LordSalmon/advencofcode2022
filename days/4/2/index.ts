import { readInput } from "../../../utils/readInput";

/**
 * Algorithm explanation: 
 * Goal: Count the number of times the sectiosn in a pair completely overlap.
 * To do this, I'm creating a set with all sections of the bigger range. After that, I'm adding all sections of the smaller range to the set. If the set's size is not len(firstrange) + len(secondrange), there is an overlap.
 * @returns number
 */
export default async function run(): Promise<any> {
    const pairs = readInput("4", "1").split("\n");
    return pairs.filter(pair => {
        const sections = new Set();
        const [firstRange, secondRange] = pair.split(",")
        .map(range => getSectionArrayByRange(range))
        .sort((a, b) => {
            return b.length - a.length;
        });
        firstRange.forEach(section => sections.add(section));
        secondRange.forEach(section => sections.add(section));
        return sections.size !== firstRange.length + secondRange.length;
    }).length;
}

export function getSectionArrayByRange(range: string): Number[] {
    const [start, end] = range.split("-");
    const section = [];
    for (let i = Number(start); i <= Number(end); i++) {
        section.push(i);
    }
    return section;
}