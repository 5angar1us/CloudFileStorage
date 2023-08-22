export class StringExtentions {
    public static isEmpty(path: string): boolean {
        return typeof path === 'string' && path.trim().length === 0;
    }
}
