// ============================================================
// UNIQUE STRINGS
// ============================================================

export function uniqueStrings(values: unknown[]): string[] {

    return [
        ...new Set(
            values
                .filter(Boolean)
                .map((value) =>
                    String(value).trim()
                )
                .filter(Boolean)
        )
    ];
}
