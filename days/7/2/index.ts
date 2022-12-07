import { readInput } from "../../../utils/readInput";
import { createStructureOfCommands, FolderElement, getFolders, getSizeOfFolder, isCommand } from "../1";

export default async function run(): Promise<any> {
    const lines = readInput("7", "2").split("\n");
    const systemSize = 70000000;
    const minUpdateSize = 30000000;
    let structure: FolderElement = {
        name: ""
    };
    structure = createStructureOfCommands(structure, lines);
    const folders = getFolders(structure);
    const folderSizeArray: {size: number, folder: FolderElement}[] = [];
    folders.forEach(folder => {
        folderSizeArray.push({folder, size: getSizeOfFolder(folder)});
    });
    const sortedFolders = folderSizeArray.sort((a, b) => a.size - b.size);
    const usedSize = getAllFiles(lines).reduce((acc, file) => acc + file.size, 0);
    const minSizeNeeded = Math.abs(systemSize - minUpdateSize - usedSize);
    for(const folder of sortedFolders) {
        if (folder.size > minSizeNeeded) {
            return folder.size;
        }
    }
}

function getAllFiles(lines: string[]): FolderElement[] {
    const out: FolderElement[] = [];
    lines.forEach(line => {
        if (!isCommand(line)) {
            if (!line.startsWith("dir")) {
                const [size, name] = line.split(" ");
                out.push({name, size: parseInt(size, 10)});
            }
        }
    });
    return out;
}