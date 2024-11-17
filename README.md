# bsearch

A TypeScript library for performing binary search with support for partial matching and custom comparators.

## Installation

```ts
import { search } from "jsr:@gwash3189/binary-search";
```

## Usage
### Basic Usage
```ts
const numbers = [1, 2, 3, 4, 5];
const comparator = (a: number, b: number) => a - b;

const result = search(numbers, 3, comparator);
console.log(result); // { value: 3, index: 2 }
```

### Object Search with Partial Matching
```ts
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

// Search with partial match
const comparator = (a: User, b: { id: number }) => a.id - b.id;
const result = search(users, { id: 2 }, comparator);
console.log(result); // { value: { id: 2, name: "Bob" }, index: 1 }
```

### Return Type
The search function returns an object with two properties:
- `value`: The found item or null if not found
- `index`: The index where the item was found, or where it should be inserted

```ts
interface SearchResult<T> {
  value: T | null;
  index: number;
}
```

### Type Parameters
```ts
function search<A, T>(
  arr: A[],          // Array to search in
  target: T,         // Search target (can be partial type)
  comparator: ComparatorFn<A, T>  // Comparison function
): SearchResult<A>
```

### Custom Comparator
The comparator function should return:
- Negative number if `a < b`
- Zero if `a === b`
- Positive number if `a > b`

```ts
type ComparatorFn<A, T> = (a: A, b: T) => number;
```

## Examples
### Complex Object Search
```ts
interface UserWithMetadata {
  id: number;
  name: string;
  metadata: {
    age: number;
    active: boolean;
  }
}

const users: UserWithMetadata[] = [
  { id: 1, name: "Alice", metadata: { age: 25, active: true } },
  { id: 2, name: "Bob", metadata: { age: 30, active: false } },
  { id: 3, name: "Charlie", metadata: { age: 35, active: true } }
];

// Search by age
const ageComparator = (a: UserWithMetadata, b: { metadata: { age: number } }) =>
  a.metadata.age - b.metadata.age;

const result = search(users, { metadata: { age: 30 } }, ageComparator);
```

### Multiple Search Criteria
```ts
interface SearchCriteria {
  id: number;
  name: string;
}

const multiCriteriaComparator = (a: User, b: SearchCriteria) => {
  if (a.id !== b.id) return a.id - b.id;
  return a.name.localeCompare(b.name);
};

const result = search(users, { id: 2, name: "Bob" }, multiCriteriaComparator);
```

## License

MIT License
