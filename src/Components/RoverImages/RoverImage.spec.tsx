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
      img_src: "https://mars.nasa.gov/3",
    }
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

const mock_cameras = ['HAZ', 'CHEM'];

describe("Testing the rover image displayed on page load", () => {
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
      render(<RoverImages name="curiosity" />);
  });
  test("Testing the rover image displayed on page load", async () => {
      await waitFor(() => {
      const testImage = document.querySelector("img") as HTMLImageElement;
      expect(testImage).toHaveAttribute(
        "src",
        photo_mock_data.photos[0].img_src,
      );
    });
  });

  test("Testing the rover image is displayed when next is clicked", async () => {
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

//  test("Test the drop down values are updated when selected", async () => {
//     render(<RoverImages name="curiosity" />);
//     await waitFor(() => {
//        const dropdown = document.querySelector("select") as HTMLSelectElement;
//         //fireEvent.change(dropdown, { target: { value: mock_cameras[1] } })
//         // const dropdownOptions = document.querySelectorAll('option');
//         // console.log('options: ' + dropdownOptions[1].value);
//         // fireEvent.click(dropdownOptions[1]);
//         // expect(dropdown.value).toEqual(dropdownOptions[1].value);
      
//     });
//   });

  // test("Test the images are updated when different values are selected from the dropdown", async () => {
    
  //   await waitFor(() => {
  //     const testImage = document.querySelector("img") as HTMLImageElement;
  //     const firstImageSourceUrl = testImage.src;
       
  //     const dropdown = document.querySelector("select") as HTMLSelectElement;
  //     fireEvent.click(dropdown);
  //     const dropdownOptions = document.querySelectorAll('option');
  //     fireEvent.click(dropdownOptions[1]);

  //     const updatedImage = document.querySelector("img") as HTMLImageElement;
  //     const secondImageSourceUrl = updatedImage.src;
  //     console.log(secondImageSourceUrl)
  //     expect(firstImageSourceUrl).not.toEqual(secondImageSourceUrl);
  //   });
  // });

});
