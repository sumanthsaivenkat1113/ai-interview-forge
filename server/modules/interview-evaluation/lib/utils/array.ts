// ============================================================
// CHUNK ARRAY
// ============================================================

export function chunkArray<T>(array: T[], size: number): T[][] {

    const chunks: T[][] = [];

    for (
        let i = 0;
        i < array.length;
        i += size
    ) {
        chunks.push(
            array.slice(i, i + size)
        );
    }

    return chunks;
}


// ============================================================
// AVERAGE
// ============================================================

export function average(values: number[]): number {

    if (
        !values.length
    ) {
        return 0;
    }


    const total =
        values.reduce(
            (sum, value) =>
                sum + Number(value || 0),
            0
        );


    return total /
        values.length;
}
