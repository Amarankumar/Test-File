function migrateRings(N: number, A: string, B: string, C: string): string[] {
    const steps: string[] = [];

    function moveRings(n: number, source: string, target: string, auxiliary: string) {
        if (n === 1) {
            steps.push(`${n}: ${source} to ${target}`);
            return;
        }
        moveRings(n - 1, source, auxiliary, target);
        steps.push(`${n}: ${source} to ${target}`);
        moveRings(n - 1, auxiliary, target, source);
    }

    moveRings(N, A, B, C);
    return steps;
}

const migrationSteps = migrateRings(3, 'A', 'B', 'C');
console.log(migrationSteps);
