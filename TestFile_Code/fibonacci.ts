function fibonacci(position: number): number {
    if (position <= 1) {
        return position;
    }
    return fibonacci(position - 1) + fibonacci(position - 2);
}

const fibValue = fibonacci(10); 
console.log(fibValue); 
