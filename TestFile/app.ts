import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

// Question 1: Fibonacci Series

function fibonacci(position: number): number {
    if (position <= 1) {
        return position;
    }
    return fibonacci(position - 1) + fibonacci(position - 2);
}

app.get('/fibonacci/:position', (req: Request, res: Response) => {
    const position = parseInt(req.params.position);
    if (isNaN(position) || position < 0) {
        return res.status(400).send('Position must be a non-negative integer.');
    }
    const fibValue = fibonacci(position);
    res.json({ position, fibValue });
});


// Question 2: Longest Balanced Substring

function getBalancedSubstrings(S: string): string[] {
    const result: string[] = [];
    let start = 0;
    let end = 0;
    let charCount = new Map<string, number>();

    while (end < S.length) {
        charCount.set(S[end], (charCount.get(S[end]) || 0) + 1);

        while (charCount.size > 2) {
            charCount.set(S[start], charCount.get(S[start])! - 1);
            if (charCount.get(S[start]) === 0) {
                charCount.delete(S[start]);
            }
            start++;
        }

        if (charCount.size === 2) {
            result.push(S.substring(start, end + 1));
        }

        end++;
    }

    const maxLength = Math.max(...result.map(str => str.length));
    return result.filter(str => str.length === maxLength);
}

app.get('/balanced-substring/:S', (req: Request, res: Response) => {
    const S: string = req.params.S;
    const balancedSubstrings = getBalancedSubstrings(S);
    res.json(balancedSubstrings);
});


// Question 3: Migrating Rings

type Plate = "A" | "B" | "C";
type Step = `${number}: ${Plate} to ${Plate}`;

function migrateRings(N: number, source: Plate, target: Plate, aux: Plate | undefined) {
    const steps: Step[] = [];
    const stack = [{ N, source, target, aux }];

    while (stack.length > 0) {
        const { N, source, target, aux } = stack.pop()!;
        if (N === 1) {
            steps.push(`${N}: ${source} to ${target}`);
        } else {
            stack.push({ N: N - 1, source: aux!, target, aux: source });
            stack.push({ N: 1, source, target, aux: undefined });
            stack.push({ N: N - 1, source, target, aux });
        }
    }

    return steps;
}

app.get('/migrate-rings/:N/:source/:target/:aux', (req: Request, res: Response) => {
    const { N, source, target, aux } = req.params;
    const steps = migrateRings(parseInt(N), source as Plate, target as Plate, aux as Plate | undefined);
    res.json(steps);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
