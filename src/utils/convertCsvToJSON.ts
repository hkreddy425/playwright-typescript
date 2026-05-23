import fs from "node:fs";
import * as csv from "csv-parse/sync";

export function convertCsvToJson(csvFileLocation: string) {
  return csv.parse(fs.readFileSync(csvFileLocation), {
    columns: true, // Uses the first row as object keys
    skip_empty_lines: true,
  });
}
