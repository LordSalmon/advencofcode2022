import { readInput } from "../../../utils/readInput";
import { getPriorityByCharacter } from "../1";

const groupSize = 3;

export default async function run(): Promise<any> {
    const input = readInput("3", "2");
    const backpacks = input.split("\n");
    const backpackGroups: string[][] = [];
    let currentGroup = [];
    backpacks.forEach((backpack, index) => {
        if ((index % groupSize) === groupSize-1) {
            currentGroup.push(backpack);
            backpackGroups.push(currentGroup);
            currentGroup = [];
        } else {
            currentGroup.push(backpack);
        }
    });
    const badges = backpackGroups.map(group => {
        let possibilities = group[0].split("");
        group.forEach(backpack => {
            possibilities = findDuplicates(backpack, possibilities);
        });
        return possibilities;
    });
    const dedupedBadges = badges.map(badgeArray => {
        return Array.from(new Set(badgeArray));
    });
    const priorities = dedupedBadges.reduce((acc, badge) => {
        return acc+getPriorityByCharacter(badge[0]);
    }, 0);
    return priorities;
}

function findDuplicates(backpack: string, possibilities: string[]): string[] {
    return possibilities.filter(possibility => {
        return backpack.includes(possibility);
    });
}