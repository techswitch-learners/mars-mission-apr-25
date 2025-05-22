import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

describe(NavBar, () => {
  it("Should change current location to profile when link is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
  });
});
