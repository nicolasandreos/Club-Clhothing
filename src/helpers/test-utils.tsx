import { render } from "@testing-library/react";
import type React from "react";
import { UserContext } from "../contexts/user-context";
import type { UserType } from "../../types/user-type";
import { MemoryRouter } from "react-router";

const renderUserWithProviders = (
  component: React.ReactNode,
  user: UserType | null = null,
) => {
  return render(
    <MemoryRouter>
      <UserContext.Provider
        value={{
          user,
          loading: false,
          loginUser: () => {},
          signOutUser: () => {},
          getUserByEmail: () => Promise.resolve(null),
        }}
      >
        {component}
      </UserContext.Provider>
    </MemoryRouter>,
  );
};

export default renderUserWithProviders;
