
const compose = (...fns: [(x: any) => any]) => (x: any) => {
    let result: any;
    for (const fn of fns) {
        result = fn(x);
        if (result instanceof Error) {
            return result;
        }
    }
    return x;
}

export { compose };