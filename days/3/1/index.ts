import { readInput } from "../../../utils/readInput";

export default async function run(): Promise<any> {
    const input = readInput("3", "1");
    const backpack = input.split("\n").map(line => {
        return line;
    });
    const backpacksWithCompartments = backpack.map(row => {
        const firstCompartment = row.substring(0, row.length / 2);
        const secondCompartment = row.substring(row.length / 2);
        return [firstCompartment.split(""), secondCompartment.split("")];
    });
    const duplicates = backpacksWithCompartments.map(([first, second]) => {
        return first.filter(item => second.includes(item))[0];
    });
    const priorities = duplicates.reduce((acc, duplicate) => {
        return acc+getPriorityByCharacter(duplicate);
    }, 0);
    return priorities;
}

export function getPriorityByCharacter(character: string): number {
    if (character.toLowerCase() === character) {
        return character.charCodeAt(0) - 96;
    }
    return character.charCodeAt(0) - 64 + 26;
}