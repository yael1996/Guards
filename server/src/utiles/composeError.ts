
const compose = (...fns: [(x: any) => any]) => (x: any) => {
    let result: any;
    let input = x;
    for (const fn of fns) {
        result = fn(input);
        if (result instanceof Error) {
            break;;
        }
        input = x;
    }
    return result;
}