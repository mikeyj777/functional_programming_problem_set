# Functional Programming Solutions

## Problem 1: Double Each Number

### Functional Approach
The key functional principle here is using map to transform each element in an array without modifying the original array. This demonstrates pure functions and immutability.

### Pseudo Code
1. Take input array
2. Use map function to create new array
3. For each element, return element * 2

### Solution
```javascript
// Pure function that takes array and returns new transformed array
const doubleNumbers = arr => arr.map(num => num * 2);

const example = [1, 2, 3, 4];
console.log(doubleNumbers(example)); // [2, 4, 6, 8]
```

## Problem 2: Sum of Even Numbers

### Functional Approach
Combines filter and reduce to transform data in steps: first selecting elements, then combining them.

### Pseudo Code
1. Filter array to keep even numbers
2. Reduce filtered array by adding numbers

### Solution
```javascript
// Pipeline of pure functions: filter then reduce
const sumEvens = arr => 
  arr
    .filter(num => num % 2 === 0)    // First select evens
    .reduce((sum, num) => sum + num, 0); // Then sum them

console.log(sumEvens([1, 2, 3, 4, 5, 6])); // 12
```

## Problem 3: Long Strings Filter

### Functional Approach
Uses filter as a predicate function to select elements meeting a condition.

### Pseudo Code
1. Take array of strings
2. Filter based on length condition
3. Return new filtered array

### Solution
```javascript
// Predicate function - returns true/false for filtering
const isLongString = str => str.length > 5;

// Pure function composition
const getLongStrings = arr => arr.filter(isLongString);

console.log(getLongStrings(["hi", "hello", "greetings"]));
// ["greetings"]
```

## Problem 4: Total Cost Calculation

### Functional Approach
Uses reduce to aggregate values from objects, demonstrating how functional programming handles data structures.

### Pseudo Code
1. Take array of objects
2. Extract price from each object
3. Sum prices using reduce

### Solution
```javascript
// Pure function that works with objects
const calculateTotal = items =>
  items.reduce((total, item) => total + item.price, 0);

const items = [
  { name: "Book", price: 10 },
  { name: "Pen", price: 2 }
];
console.log(calculateTotal(items)); // 12
```

## Problem 5: Unique Values

### Functional Approach
Demonstrates function composition using Set for transformation and Array.from for immutability.

### Pseudo Code
1. Convert array to Set (removes duplicates)
2. Convert Set back to array
3. Return new array

### Solution
```javascript
// Composition of built-in functions
const getUnique = arr => Array.from(new Set(arr));

// Alternative using spread operator
const getUniqueSpread = arr => [...new Set(arr)];

console.log(getUnique([1, 2, 2, 3, 3, 4])); // [1, 2, 3, 4]
```

## Problem 6: Double and Filter Sum

### Functional Approach
Demonstrates function composition and chaining multiple array operations.

### Pseudo Code
1. Map to double numbers
2. Filter numbers > 10
3. Reduce to sum remaining numbers

### Solution
```javascript
// Each operation is a pure function that transforms data
const doubleAndSum = arr => 
  arr
    .map(n => n * 2)
    .filter(n => n > 10)
    .reduce((sum, n) => sum + n, 0);

console.log(doubleAndSum([1, 2, 3, 4, 5, 6])); // 24 (12 + 12)
```

## Problem 7: High Scorers

### Functional Approach
Demonstrates composing multiple operations with different data transformations.

### Pseudo Code
1. Filter objects by score
2. Map to extract names
3. Sort alphabetically

### Solution
```javascript
// Breaking down complex operations into smaller pure functions
const getHighScorers = students =>
  students
    .filter(student => student.score > 80)
    .map(student => student.name)
    .sort();

const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 75 },
  { name: "Charlie", score: 90 }
];
console.log(getHighScorers(students)); // ["Alice", "Charlie"]
```

## Problem 8: Product of Positives

### Functional Approach
Shows how reduce can be used with multiplication and filtering combined.

### Pseudo Code
1. Filter positive numbers
2. Reduce using multiplication

### Solution
```javascript
// Combining filter and reduce with multiplication
const productOfPositives = arr =>
  arr
    .filter(n => n > 0)
    .reduce((product, n) => product * n, 1);

console.log(productOfPositives([-1, 2, 3, -4, 5])); // 30
```

## Problem 9: Character Frequency

### Functional Approach
Uses reduce to build an object, demonstrating how functional programming can create data structures.

### Pseudo Code
1. Convert string to array of characters
2. Filter out spaces and punctuation
3. Reduce to create frequency object

### Solution
```javascript
// Pure function that builds a frequency map
const getCharFrequency = str =>
  str
    .toLowerCase()
    .split('')
    .filter(char => /[a-z]/.test(char))
    .reduce((freq, char) => ({
      ...freq,
      [char]: (freq[char] || 0) + 1
    }), {});

console.log(getCharFrequency("Hello World!")); 
// {h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1}
```

## Problem 10: Second Largest Value

### Functional Approach
Combines sorting and array operations while maintaining immutability.

### Pseudo Code
1. Get unique values
2. Sort in descending order
3. Take second element

### Solution
```javascript
// Composition of multiple array operations
const getSecondLargest = arr => {
  const uniqueSorted = [...new Set(arr)]
    .sort((a, b) => b - a);
  return uniqueSorted[1];
};

console.log(getSecondLargest([1, 5, 5, 3, 4])); // 4
```

## Problem 11: Even Fibonacci Sum

### Mathematical Reasoning
Fibonacci numbers follow F(n) = F(n-1) + F(n-2). In functional programming, we can use an accumulator 
that holds the last two numbers, making it perfect for reduce().

### Functional Approach
Uses reduce to generate Fibonacci numbers and filter for even ones simultaneously.

### Solution
```javascript
// Generate Fibonacci numbers up to limit using reduce
const evenFibSum = limit => {
  const generateFib = (acc, _, i) => {
    const nextFib = acc[i] + acc[i+1];
    return nextFib < limit ? [...acc, nextFib] : acc;
  };

  return Array(limit)
    .fill(0)
    .reduce(generateFib, [1, 2])
    .filter(n => n % 2 === 0)
    .reduce((sum, n) => sum + n, 0);
};

console.log(evenFibSum(100)); // Sum of even Fibs under 100
```

## Problem 12: Sum Pairs

### Mathematical Reasoning
Instead of nested loops, we can use functional programming to create pairs and filter them.

### Functional Approach
Uses flatMap to create pairs and filter to find matches.

### Solution
```javascript
// Creates pairs using flatMap and filters for target sum
const findSumPairs = (arr, target) =>
  arr.flatMap((x, i) => 
    arr.slice(i + 1).map(y => [x, y])
  ).filter(([x, y]) => x + y === target);

console.log(findSumPairs([1, 2, 3, 4, 5], 7)); // [[2, 5], [3, 4]]
```

## Problem 13: Prime Numbers

### Mathematical Reasoning
Prime numbers can be generated by filtering out multiples of each prime we find.

### Functional Approach
Uses reduce to build up a list of primes, with each step filtering multiples.

### Solution
```javascript
// Pure function to test if a number is prime
const isPrime = num => {
  if (num < 2) return false;
  const sqrt = Math.sqrt(num);
  return Array.from({ length: Math.floor(sqrt) - 1 }, (_, i) => i + 2)
    .every(i => num % i !== 0);
};

// Generate n prime numbers using functional approach
const generatePrimes = n =>
  Array.from({ length: n * 10 }, (_, i) => i + 2)
    .filter(isPrime)
    .slice(0, n);

console.log(generatePrimes(5)); // [2, 3, 5, 7, 11]
```

## Problem 14: Perfect Numbers

### Mathematical Reasoning
A perfect number equals the sum of its proper divisors. We can use functional programming to find divisors and sum them.

### Solution
```javascript
// Find proper divisors using functional approach
const properDivisors = num =>
  Array.from({ length: Math.floor(num/2) }, (_, i) => i + 1)
    .filter(i => num % i === 0);

// Check if number is perfect
const isPerfect = num =>
  properDivisors(num)
    .reduce((sum, n) => sum + n, 0) === num;

console.log(isPerfect(28)); // true (1 + 2 + 4 + 7 + 14 = 28)
```

## Problem 15: Pythagorean Triplets

### Mathematical Reasoning
Instead of nested loops, we can use functional programming to generate combinations and filter valid triplets.

### Solution
```javascript
// Generate triplets using functional composition
const findPythagoreanTriplets = limit =>
  Array.from({ length: limit }, (_, i) => i + 1)
    .flatMap(a => 
      Array.from({ length: limit - a }, (_, i) => i + a + 1)
        .flatMap(b => 
          Array.from({ length: limit - b }, (_, i) => i + b + 1)
            .map(c => [a, b, c])
        )
    )
    .filter(([a, b, c]) => a*a + b*b === c*c);

console.log(findPythagoreanTriplets(15)); 
// Includes [3, 4, 5], [5, 12, 13], etc.
```

## Problem 16: Maybe Monad

### Step 1: Understanding Monads
A monad wraps a value and provides methods to operate on it safely.

### Step 2: Basic Maybe Implementation
```javascript
// Maybe monad for handling null checks functionally
class Maybe {
  constructor(value) {
    this._value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  // Map only operates if value exists
  map(fn) {
    return this._value == null 
      ? Maybe.of(null) 
      : Maybe.of(fn(this._value));
  }

  // Get value or default
  getOrElse(defaultValue) {
    return this._value ?? defaultValue;
  }
}

// Example usage
const user = { name: "Alice", address: null };
const getPostalCode = Maybe.of(user)
  .map(u => u.address)
  .map(a => a.postalCode)
  .getOrElse("Unknown");
```

## Problem 17: Function Composition

### Step 1: Basic Composition
```javascript
// Simple two-function composition
const compose = (f, g) => x => f(g(x));
```

### Step 2: Multi-function Composition
```javascript
// Compose any number of functions
const compose = (...fns) => 
  fns.reduce((f, g) => (...args) => f(g(...args)));

// Example usage
const add2 = x => x + 2;
const multiply3 = x => x * 3;
const toString = x => x.toString();

const pipeline = compose(toString, multiply3, add2);
console.log(pipeline(4)); // "18"
```

## Problem 18: Memoization

### Step 1: Understanding Memoization
Memoization caches function results for pure functions.

### Solution
```javascript
// Generic memoization function
const memoize = fn => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Example usage with fibonacci
const fib = memoize(n => 
  n < 2 ? n : fib(n-1) + fib(n-2)
);
```

## Problem 19: Curried Matrix Multiplication

### Step 1: Understanding Currying
```javascript
// Basic currying example
const curry = fn => 
  (...args) => 
    args.length >= fn.length 
      ? fn(...args)
      : (...more) => curry(fn)(...args, ...more);
```

### Step 2: Matrix Operations
```javascript
// Matrix multiplication helper
const multiply = (m1, m2) => 
  m1.map(row => 
    m2[0].map((_, i) => 
      row.reduce((sum, cell, j) => 
        sum + cell * m2[j][i], 0
      )
    )
  );
```

### Step 3: Curried Implementation
```javascript
// Curried matrix multiplication
const matrixMultiply = curry((m1, m2) => multiply(m1, m2));

// Example usage
const m1 = [[1, 2], [3, 4]];
const m2 = [[5, 6], [7, 8]];
const multiplyByM1 = matrixMultiply(m1);
console.log(multiplyByM1(m2));
```

## Problem 20: Either Monad

### Step 1: Understanding Either
Either represents a value that can be one of two types - usually success or failure.

### Step 2: Implementation
```javascript
// Either monad for error handling
class Either {
  constructor(value) {
    this._value = value;
  }

  static right(value) {
    return new Right(value);
  }

  static left(value) {
    return new Left(value);
  }
}

class Left extends Either {
  map() {
    return this;
  }

  getOrElse(other) {
    return other;
  }
}

class Right extends Either {
  map(fn) {
    return Either.right(fn(this._value));
  }

  getOrElse() {
    return this._value;
  }
}

// Example usage
const divide = (a, b) =>
  b === 0 
    ? Either.left("Division by zero!")
    : Either.right(a / b);

console.log(
  divide(10, 2)
    .map(n => n * 2)
    .getOrElse("Error")
); // 10

console.log(
  divide(10, 0)
    .map(n => n * 2)
    .getOrElse("Error")); // "Error"

// More complex example with chaining
const validateUser = user => 
  user.name 
    ? Either.right(user)
    : Either.left("Name required");

const validateAge = user =>
  user.age >= 18
    ? Either.right(user)
    : Either.left("Must be 18 or older");

// Compose validations using Either
const validateAndProcessUser = user =>
  Either.right(user)
    .map(u => validateUser(u).getOrElse(null))
    .map(u => validateAge(u).getOrElse(null))
    .map(u => `Welcome ${u.name}!`)
    .getOrElse("Invalid user");

console.log(validateAndProcessUser({
  name: "Alice",
  age: 25
})); // "Welcome Alice!"

console.log(validateAndProcessUser({
  name: "Bob",
  age: 16
})); // "Invalid user"