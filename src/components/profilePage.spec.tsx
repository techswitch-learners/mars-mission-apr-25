import "@testing-library/jest-dom";
import ProfilePage from "./ProfilePage";
import { render, screen, fireEvent, waitFor, findAllByAltText, } from "@testing-library/react";
import React from "react";

describe("ProfilePage", () => {
  it("renders the name input", () => {
    render(<ProfilePage />);
    const nameInputField = screen.getByLabelText(/Name:/i);
    fireEvent.change(nameInputField, { target: { value: "Beth" } });
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));
    expect(screen.getByText(/Beth/)).toBeInTheDocument();
  });

    it("allows user to select birthday", () => {
    render(<ProfilePage />);
    const datePicker = screen.getByPlaceholderText("Select your birthday");
    fireEvent.change(datePicker, { target: { value: "12/03/2016" }});
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));
    expect(screen.getByText(/Welcome to your Mars profile/),).toBeInTheDocument();
  });


  it("displays pop-up profile after clicking Mars button", async () => {
    render(<ProfilePage />);
    const nameInputField = screen.getByLabelText(/Name:/i);
    fireEvent.change(nameInputField, { target: { value: "Beth" } });
    const datePicker = screen.getByPlaceholderText("Select your birthday");
    fireEvent.change(datePicker, { target: { value: "12/03/2016" }});
    expect(screen.queryByText(/Welcome to your Mars profile/i),).not.toBeInTheDocument();
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));
    await waitFor(() =>
    expect(screen.getByText(/Welcome to your Mars profile/),).toBeInTheDocument(),);
    expect(screen.getByText(/Age on Earth:/)).toBeInTheDocument();
    expect(screen.getByText(/Age on Mars:/)).toBeInTheDocument();
  });

  it("displays error message and images for birthdays before the Curiosity's launch date", async () => {
    render(<ProfilePage />);
    const datePicker = screen.getByPlaceholderText("Select your birthday");
    fireEvent.change(datePicker, { target: { value: "12/03/2010" }});
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));
    await waitFor(() => expect(screen.getByText(/Uh Oh! You're older than the Curiosity Rover/i),).toBeInTheDocument());
  });

    it("displays rover photos when API returns images", async () => {
    const {getAllByAltText} = render(<ProfilePage />);
    const datePicker = screen.getByPlaceholderText("Select your birthday");
    fireEvent.change(datePicker, { target: { value: "12/03/2016" }});
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));

    const images = await getAllByAltText("photo of Mars") as HTMLImageElement[];
    const image = images[0] as HTMLImageElement;

    // await waitFor (() => expect(image.src).toBe("https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01279/opgs/edr/fcam/FRB_511043770EDR_F0531182FHAZ00206M_.JPG"));
     expect(image.src).toBe("https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01279/opgs/edr/fcam/FRB_511043770EDR_F0531182FHAZ00206M_.JPG");
    });
  });
