import "@testing-library/jest-dom";
import { TextEncoder } from "node:util";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
