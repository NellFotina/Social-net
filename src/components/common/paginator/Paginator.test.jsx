import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component tests", () => {
  test("pages count is 20 but should be showed only 3", () => {
    const component = create(
      <Paginator totalItemsCount={22} pageSize={10} portionSize={9} />
    );
    const root = component.root;
    let spans = root.findAllByType("span");
    expect(spans.length).toBe(3);
  });
  test("If the difference between the last element of the 1 part and the first element of the 2 part is 1 button NEXT shouldn't be present", () => {
    const component = create(
      <Paginator totalItemsCount={11} pageSize={1} portionSize={10} />
    );
    const root = component.root;
    let button = root.findAllByType("button");
    expect(button.length).toBe(0);
  });
});
