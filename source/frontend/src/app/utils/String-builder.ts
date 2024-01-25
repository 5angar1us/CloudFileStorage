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
        if (str != null && str !=undefined) {
            this.strArray.push(str);
        }
    }
    appendLine(str: string): void {
        if (str != null && str !=undefined) {
            this.strArray.push(str + "<br/>");
        }
    }
    toString(): string {
        return this.joinToString("");
    }

    joinToString(delimeter: string): string {
        return this.strArray.join(delimeter);
    }
 }