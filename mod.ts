/**
 * Interface for the binary search result
 */
export interface SearchResult<T> {
  value: T | null;
  index: number;
}

/**
 * Type for the comparison function allowing comparison between full and partial types
 */
type ComparatorFn<A, T> = (a: A, b: T) => number;

/**
 * Performs a binary search on a **sorted** array, allowing partial matching of types
 * The provided array must be sorted for this search to work as advertised.
 *
 * @template A - The type of elements in the array (full type)
 * @template T - The type of search target (can be partial)
 * @param {A[]} arr - The sorted array to search in
 * @param {T} target - The value to search for
 * @param {ComparatorFn<A, T>} comparator - Comparison function
 * @returns {SearchResult<A>} Object containing found value and index
 */
export function search<A, T>(
  arr: A[],
  target: T,
  comparator: ComparatorFn<A, T>,
): SearchResult<A> {
  // Handle empty array case
  if (arr.length === 0) {
    return { value: null, index: -1 };
  }

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = comparator(arr[mid], target);

    if (comparison === 0) {
      return { value: arr[mid], index: mid };
    }

    if (comparison < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Item not found - return insertion point
  return { value: null, index: -1 };
}

export function compareNumbers(a: number, b: number): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
