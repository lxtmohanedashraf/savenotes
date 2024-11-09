import { setupServer } from "msw/node";
import { notesHandler } from "./notes";

export const server = setupServer(...notesHandler);
