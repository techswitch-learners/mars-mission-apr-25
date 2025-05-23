import React from "react";
import { render, screen } from "@testing-library/react";
import MissionManifest, { Rovers } from "./MissionManifest";

const mockManifestResponse = {
  photo_manifest: {
    name: "Opportunity",
    landing_date: "2004-01-25",
    launch_date: "2003-07-07",
    status: "complete",
    max_sol: 5111,
    max_date: "2018-06-11",
    total_photos: 198439,
  },
};

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockManifestResponse),
  });
});

test("renders loading message on initial render", () => {
  render(<MissionManifest roverType={Rovers.SPIRIT} />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("opportunity rover renders correct p elements", async () => {
  render(<MissionManifest roverType={Rovers.OPPORTUNIY} />);
  const expectedTexts = [
    "Rover Name: ",
    mockManifestResponse.photo_manifest.name,
    "Landing Date: ",
    mockManifestResponse.photo_manifest.landing_date,
    "Launch Date: ",
    mockManifestResponse.photo_manifest.launch_date,
    "Status: ",
    mockManifestResponse.photo_manifest.status,
    "Max Sol: ",
    mockManifestResponse.photo_manifest.max_sol.toString(),
    "Max Date: ",
    mockManifestResponse.photo_manifest.max_date,
    "Total photos: ",
    mockManifestResponse.photo_manifest.total_photos.toString(),
  ];

  const missionManifestContainer = await screen.findByTestId(
    "mission-manifest-container",
  );
  const pElements = missionManifestContainer.querySelectorAll("p");

  expect(pElements.length).toBe(14);
  pElements.forEach((p, index) => {
    expect(p.textContent).toBe(expectedTexts[index]);
    console.log(p.textContent);
  });
});

test("opportunity rover renders correct Heading", async () => {
  render(<MissionManifest roverType={Rovers.OPPORTUNIY} />);

  const heading = await screen.findByText("MISSION MANIFEST");

  expect(heading).toBeInTheDocument();
});

test("invalid rover renders correct p elements", async () => {
  const mockInvalidFetchResponse = {
    photo_manifest: {
      name: undefined,
      landing_date: undefined,
      launch_date: undefined,
      status: undefined,
      max_sol: undefined,
      max_date: undefined,
      total_photos: undefined,
    },
  };
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockInvalidFetchResponse),
  });

  render(<MissionManifest roverType={Rovers.OPPORTUNIY} />);

  const missionManifestContainer = await screen.findByTestId(
    "mission-manifest-container",
  );
  const pElements = missionManifestContainer.querySelectorAll("p");
  let NaCounter = 0;

  pElements.forEach((p) => {
    if (p.textContent === "N/A") NaCounter++;
  });

  expect(NaCounter).toBe(7);
});
