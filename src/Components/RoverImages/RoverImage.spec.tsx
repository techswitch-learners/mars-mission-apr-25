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

const manifest_mock_data = {
  photo_manifest: {
    photos: [
      {
        cameras: ["HAZ"],
      },
    ],
  },
};

describe("Testing the rover image displayed on page load", () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(manifest_mock_data),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(photo_mock_data),
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
});
