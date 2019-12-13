
export function removeQuerySymbol(params: string) {
    if (params[0] === "?") {
        return params.substring(1);
    }
    return params;
}

export function parseParams(params: string): {[key: string]: string} {
    const parts = params.split("=");
    let result: {[key: string]: string} = {};
    for (let index = 0; index < parts.length; index += 2) {
        result[parts[index]] = parts[index + 1];    
    }
    return result;
}