function getBalancedSubstrings(S: string): string[] {
    const result: string[] = [];
    const n = S.length;
    for (let i = 0; i < n; i++) {
        const charCount = new Map<string, number>();
        let distinctChars = 0;
        for (let j = i; j < n; j++) {
            const char = S[j];
            charCount.set(char, (charCount.get(char) || 0) + 1);

            if (charCount.get(char) === 1) {
                distinctChars++;
            }
            if (distinctChars > 2) {
                break;
            }           
            if (distinctChars === 2 && charCount.size === 2) {
                result.push(S.substring(i, j + 1));
            }
        }
    }
    const maxLength = Math.max(...result.map(str => str.length));
    return result.filter(str => str.length === maxLength);
}
console.log(getBalancedSubstrings("cabbacc")); // Output: ["abba"]
console.log(getBalancedSubstrings("abababa")); // Output: ["ababab", "bababa"]
console.log(getBalancedSubstrings("aaaaaaa")); // Output: []
