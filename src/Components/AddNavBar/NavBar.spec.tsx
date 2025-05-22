import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

describe(NavBar, () => {
  it("Should change current location to profile when link is clicked", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    const linkProfile = screen.getByText("Profile");
    userEvent.click(linkProfile);
  });
});
