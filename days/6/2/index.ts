import { readInput } from "../../../utils/readInput";

export default async function run(): Promise<any> {
        const input = readInput("6", "2");
        const markerLength = 14;
        let out = undefined;
        input.split("").forEach((char, index) => {
            if (out !== undefined) {
                return;
            }
            const substring = input.substring(index, index-markerLength);
            if (substring.length === markerLength && new Set(substring.split("")).size === markerLength) {
                out = index;
            }
        });
        return out;
}