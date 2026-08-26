export const compilers = {
    Python: "python-3.14",
    C: "gcc-15",
    Cpp: "g++-15",
    Java: "openjdk-25",
    TypeScript: "typescript-deno",
} as const;

export type CompilerLabel = keyof typeof compilers;

export const DEFAULT_SNIPPETS: Record<CompilerLabel, string> = {
    Python: `def solution():
    pass

print(solution())`,

    C: `#include <stdio.h>

int main() {
    return 0;
}`,

    Cpp: `#include <iostream>
using namespace std;

int main() {
    return 0;
}`,

    Java: `public class Main {
    public static void main(String[] args) {
        
    }
}`,

    TypeScript: `function solution() {
    
}

console.log(solution());`,
};
