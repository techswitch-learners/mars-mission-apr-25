import React from "react";
import { render} from "@testing-library/react";
import PhotoOfTheDay from "./Components/photoOfTheDay";

test("renders photo of the day", () => {
  render(<PhotoOfTheDay/>);
 const imageElement = document.querySelector("img") as HTMLImageElement;
  expect(imageElement).toBeInTheDocument();
});
