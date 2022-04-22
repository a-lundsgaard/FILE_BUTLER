export default function DisplayTitleWithoutBreak(string: string, maxStringLength: number) {
    if (string.length > maxStringLength) {
        const newTitle = string.slice(0, (maxStringLength - 2)).trimEnd() + "..";
        return newTitle
    } else {
        return string;
    }
}