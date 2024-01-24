export class StringBuilder
 {
    strArray: Array<string> = new Array<string>();
    constructor()
    {
        
    }
    get(nIndex: number): string {
        return this.strArray[nIndex];
    }
    isEmpty(): boolean {
        return this.strArray.length === 0;
    }
    append(str: string): void {
        if (!str) {
            this.strArray.push(str);
        }
    }
    toString(): string {
        return this.joinToString("");
    }

    joinToString(delimeter: string): string {
        return this.strArray.join(delimeter);
    }
 }