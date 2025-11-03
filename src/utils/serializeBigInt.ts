/// Helper function to convert BigInt values to strings for JSON serialization
export function serializeBigInt(obj: any): any {
    return JSON.parse(JSON.stringify(obj, (_key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}
