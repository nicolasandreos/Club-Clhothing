import Input from "./input";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";

test("loads error message when provided", () => {
  render(<Input label="Test" error="Error message" />);
  const errorMessage = screen.getByText("Error message");
  expect(errorMessage).toHaveClass("text-xs text-red-500");
});
