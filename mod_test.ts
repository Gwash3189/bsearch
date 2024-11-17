import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "@std/expect";
import { compareNumbers, search, type SearchResult } from "./mod.ts";

type User = {
  id: number;
  name: string;
};

describe("search", () => {
  const arr = [
    {
      id: 1,
      name: "Alice",
    },
    {
      id: 2,
      name: "Bob",
    },
    {
      id: 3,
      name: "Charlie",
    },
  ];

  describe("when the array is empty", () => {
    let result: SearchResult<number>;

    beforeEach(() => {
      result = search([], 1, compareNumbers);
    });

    it("returns an object with value null", () => {
      expect(result.value).toEqual(null);
    });

    it("returns an object with an index of -1", () => {
      expect(result.index).toEqual(-1);
    });
  });

  describe("when the target is in the array", () => {
    let result: SearchResult<User>;

    beforeEach(() => {
      result = search(
        arr,
        { id: 2 },
        (user: User, target: { id: number }) => {
          if (user.id === target.id) return 0;
          return user.id < target.id ? -1 : 1;
        },
      );
    });

    it("returns an object with the value", () => {
      expect(result.value).toEqual(arr[1]);
    });

    it("returns an object with the index", () => {
      expect(result.index).toEqual(1);
    });
  });

  describe("when the target is not in the array", () => {
    let result: SearchResult<User>;

    beforeEach(() => {
      result = search(
        arr,
        { id: 4 },
        (user: User, target: { id: number }) => {
          if (user.id === target.id) return 0;
          return user.id < target.id ? -1 : 1;
        },
      );
    });

    it("returns an object with value null", () => {
      expect(result.value).toEqual(null);
    });

    it("returns an object with index -1", () => {
      expect(result.index).toEqual(-1);
    });
  });
});
