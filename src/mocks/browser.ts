import { setupWorker } from "msw/browser";
import { notesHandler } from "./notes";

export const worker = setupWorker(...notesHandler);
