const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789" as const;
const usedCodes = new Set<string>();

export default function uniqueGeneratedCode(): string {
    let code;

    do {
        const part1 = generatePart(characters, 4);
        const part2 = generatePart(characters, 5);
        const part3 = generatePart(characters, 4);

        code = `${part1}-${part2}-${part3}`;
    } while (usedCodes.has(code));
    
    usedCodes.add(code);
    return code;
}


const generatePart = (chars: string, length: number): string => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
