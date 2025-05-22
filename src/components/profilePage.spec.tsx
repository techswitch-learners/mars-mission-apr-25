import "@testing-library/jest-dom";
import ProfilePage from "./ProfilePage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
    fireEvent.change(datePicker, { target: { value: "12/03/2016" } });
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));
    expect(
      screen.getByText(/Welcome to your Mars profile/),
    ).toBeInTheDocument();
  });

  it("displays pop-up profile after clicking Mars button", async () => {
    render(<ProfilePage />);
    const nameInputField = screen.getByLabelText(/Name:/i);
    fireEvent.change(nameInputField, { target: { value: "Beth" } });
    const datePicker = screen.getByPlaceholderText("Select your birthday");
    fireEvent.change(datePicker, { target: { value: "12/03/2016" } });
    expect(
      screen.queryByText(/Welcome to your Mars profile/i),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));
    await waitFor(() =>
      expect(
        screen.getByText(/Welcome to your Mars profile/),
      ).toBeInTheDocument(),
    );
    expect(screen.getByText(/Age on Earth:/)).toBeInTheDocument();
    expect(screen.getByText(/Age on Mars:/)).toBeInTheDocument();
  });

  it("displays error message and images for birthdays before the Curiosity's launch date", async () => {
    render(<ProfilePage />);
    const datePicker = screen.getByPlaceholderText("Select your birthday");
    fireEvent.change(datePicker, { target: { value: "12/03/2010" } });
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));
    await waitFor(() =>
      expect(
        screen.getByText(/Uh Oh! You're older than the Curiosity Rover/i),
      ).toBeInTheDocument(),
    );
  });

  it("displays rover photos when API returns images", async () => {
    const mockRoverPhotos = {
      photos: [
        {
          img_src:
            "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG",
        },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRoverPhotos),
    });
    render(<ProfilePage />);
    const datePicker = screen.getByPlaceholderText("Select your birthday");
    fireEvent.change(datePicker, { target: { value: "03/06/2015" } });
    fireEvent.click(screen.getByAltText(/clickable picture of mars/i));

    const images = (await screen.findAllByAltText(
      /photo of Mars/i,
    )) as HTMLImageElement[];
    expect(images.length).toBeGreaterThan(0);
    const image = images[0] as HTMLImageElement;

    expect(image.src).toContain("nasa.gov");
  });
});
