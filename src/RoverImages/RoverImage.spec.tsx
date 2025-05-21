import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RoverImages from "./RoverImages";
import type { RoverResponse } from "./RoverImages";

//fake test data with rover response type

const photo_mock_data = {
  photos: [
    {
      id: 1,
      img_src: "https://mars.nasa.gov/",
    }
  ]
};
const manifest_mock_data = {
  photo_manifest: {
    photos: [
      {
        cameras: ["HAZ"]
      }
    ]
  }
};
//setLatestCameras(manifestData.photo_manifest.photos[manifestData.photo_manifest.photos.length - 1].cameras);

describe("The image component", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValueOnce(
    {
      json: jest.fn().mockResolvedValue(manifest_mock_data)
    }
  ).mockResolvedValueOnce(
    {
      json: jest.fn().mockResolvedValue(photo_mock_data)
    }
  )
});
  test("src contains correct value", async () => {
    render(<RoverImages name="curiosity" />);

    await waitFor(() => {
      const testImage = document.querySelector("img") as HTMLImageElement;
      expect(testImage).toHaveAttribute("src", photo_mock_data.photos[0].img_src);
      //expect(testImage).toBeInTheDocument();
    });
  });
});

// })

//   test("renders rover image", () => {
//   const {container} = render(<RoverImages name="curiosity"/>);
//   console.log(container)
//  const imageElement = document.querySelector("img") as HTMLElement;
//   expect(imageElement).toBeInTheDocument();
// });
