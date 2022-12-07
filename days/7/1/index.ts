import { readInput } from "../../../utils/readInput";
import * as _ from "lodash";

// if the element has a size, it is a file, otherwise it is a folder
export type FolderElement = {
    name: string;
    size?: number;
    children?: FolderElement[];
}

export default async function run(): Promise<any> {
    const folderSize = 100000;
    let structure: FolderElement = {
        name: ""
    };
    const lines = readInput("7", "1").split("\n");
    structure = createStructureOfCommands(structure, lines);
    const folders = getFolders(structure);
    const filteredFolders = folders.filter(folder => {
        return getSizeOfFolder(folder) <= folderSize;
    });
    return filteredFolders.reduce((acc, folder) => {
        return acc+getSizeOfFolder(folder);
    }, 0);
}

export function createStructureOfCommands(structure: FolderElement, lines: string[]): FolderElement {
    let currentFolderPosition: string[] = [];
    lines.forEach(line => {
        if (isCommand(line)) {
            const [dollar, command, ...args] = line.split(" ");
            if (command === "cd") {
                if (args[0] === "..") {
                    currentFolderPosition.pop();
                } else if (args[0] === "/") {
                    currentFolderPosition = [];
                } else {
                    currentFolderPosition.push(args[0]);
                }
            }
            // ls command can be ignored because it is not needed for the solution
        } else {
            const [size, name] = line.split(" ");
            const folderToAdd: FolderElement = {
                name,
                size: parseInt(size, 10)
            };
            addFileToStructure(structure, folderToAdd, currentFolderPosition);
        }
    });
    return structure;
}

export function addFileToStructure(structure: FolderElement, folderToAdd: FolderElement, currentFolderPosition: string[]): void {
    const position = currentFolderPosition.filter(() => true);
    let currentFolder = structure;
    while (position.length > 0) {
        const folderName = position.shift();
        const folder = currentFolder.children.find(child => child.name === folderName);
        if (!folder) {
            throw new Error("Folder not found");
        }
        currentFolder = folder;
    }
    if (!currentFolder.children) {
        currentFolder.children = [];
    }
    currentFolder.children.push(folderToAdd);
    
}

export function isCommand(line: string): boolean {
    return line.startsWith("$ ");
}

export function getSizeOfFolder(element: FolderElement): number {
    if (element.size) {
        return element.size;
    }
    return element.children.reduce((acc, child) => {
        return acc + getSizeOfFolder(child);
    }, 0);
} 

export function getFolders(structure: FolderElement, folders: FolderElement[] = []): FolderElement[] {
    if (!structure.children) {
        return folders;
    }
    structure.children.forEach(child => {
        if (child.children) {
            folders.push(child);
            getFolders(child, folders);
        }
    });
    return folders;
}