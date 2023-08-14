export class StringExtentions {
    public static isStringEmpty(path: string): boolean {
        return typeof path === 'string' && path.trim().length === 0;
    }
}
