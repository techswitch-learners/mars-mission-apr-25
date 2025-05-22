import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NavBar from "./NavBar";
import {BrowserRouter} from "react-router-dom";
import { createBrowserHistory } from "history";

describe(NavBar, () => {
  it("Should change current location to profile when link is clicked", () => {
    const history = createBrowserHistory({ window });
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    const linkProfile = screen.getByText("Profile");
    userEvent.click(linkProfile);
  });
});
