import { readFileSync } from "node:fs";

export function readInput(day: string, part: string): string {
    return readFileSync(`./days/${day}/${part}/input.txt`, "utf-8").toString();
}