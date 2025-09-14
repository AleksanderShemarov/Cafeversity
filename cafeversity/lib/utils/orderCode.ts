const numbers = "0123456789" as const;
const usedOrdersCodes = new Set<string>([
    "98765", "67831", "29706", "231478", "6789", "1052", "866"
]);


export default function orderCode() {
    const randomDigits = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    let resultCode = "";

    do {
        for(let i = 1; i <= randomDigits; i++) {
            resultCode += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
    }
    while (usedOrdersCodes.has(resultCode));

    usedOrdersCodes.add(resultCode);
    return resultCode;
}
