import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import RoverImages from "./RoverImages";

const photo_mock_data = {
  photos: [
    {
      id: 1,
      img_src: "https://mars.nasa.gov/",
    },
    {
      id: 2,
      img_src: "https://mars.nasa.gov/1",
    },
  ],
};

const photo_mock_data_cameras = {
  photos: [
    {
      id: 1,
      camera: {
        id: 51,
        name: "CHEMCAM_RMI",
        rover_id: 5,
        full_name: "CHEMCAM_RMI",
      },
      img_src: "https://mars.nasa.gov/3",
    },
  ],
};

const manifest_mock_data = {
  photo_manifest: {
    photos: [
      {
        cameras: ["HAZ", "CHEM"],
      },
    ],
  },
};

describe("Rover Image Tests", () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(manifest_mock_data),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(photo_mock_data),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(photo_mock_data_cameras),
      });
  });
  test("Testing the rover image displayed on page load", async () => {
    render(<RoverImages name="curiosity" />);

    await waitFor(() => {
      const testImage = document.querySelector("img") as HTMLImageElement;
      expect(testImage).toHaveAttribute(
        "src",
        photo_mock_data.photos[0].img_src,
      );
    });
  });

  test("Testing the rover image is displayed when next is clicked", async () => {
    render(<RoverImages name="curiosity" />);
    await waitFor(() => {
      const firstTestImage = document.querySelector("img") as HTMLImageElement;
      const firstTestImageDiv = firstTestImage.parentElement?.parentElement;
      const nextButton = document.getElementsByClassName(
        "slick-arrow slick-next",
      );
      fireEvent.click(nextButton[0]);
      expect(firstTestImageDiv).toHaveAttribute("aria-hidden", "true");
    });
  });

  test("Test the drop down values are updated when selected", async () => {
    render(<RoverImages name="curiosity" />);
    await waitFor(() => {
      const dropdown = document.querySelector(
        "#cameraDropdown",
      ) as HTMLSelectElement;
      fireEvent.click(dropdown);
      const dropdownOptions = document.querySelectorAll("option");
      console.log(dropdownOptions[0].value);
      fireEvent.change(dropdown, {
        target: { value: dropdownOptions[1].value },
      });
      expect(dropdown.value).toEqual(dropdownOptions[1].value);
    });
  });
});
