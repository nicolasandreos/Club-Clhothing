import { screen } from "@testing-library/react";
import Header from "./header";
import { expect, test } from "vitest";
import renderWithUser from "../../helpers/test-utils";
import type { UserType } from "../../../types/user-type";

test("endure sign out button is shown when user is logged in", () => {
  const user: UserType = {
    email: "test@test.com",
    password: "test",
    firstName: "Test",
    lastName: "Test",
  };
  renderWithUser(<Header />, user);
  const signOutButton = screen.getByText("Sair");
  expect(signOutButton).toBeInTheDocument();
});
