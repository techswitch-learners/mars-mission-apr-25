import "@testing-library/jest-dom";
import { TextEncoder } from "node:util";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
