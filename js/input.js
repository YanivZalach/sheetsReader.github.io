import * as XLSX from "xlsx";
import { print } from "./debug.js";

export function convertExcelToCSV(file) {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const csvSheets = [];

          for (let sheet = 0; sheet < workbook.SheetNames.length; sheet++) {
            const csvRow = XLSX.utils.sheet_to_csv(
              workbook.Sheets[workbook.SheetNames[sheet]]
            );
            const csvData = csvRow.split("\n").map((row) => row.split(","));
            csvSheets.push(csvData);
          }

          resolve([csvSheets, workbook.SheetNames]);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("File is not provided."));
    }
  });
}

export function readCsvFile(file) {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const csvRow = XLSX.utils.sheet_to_csv(
            workbook.Sheets[workbook.SheetNames[0]]
          );
          const csvData = csvRow.split("\n").map((row) => row.split(","));
          resolve(csvData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("File is not provided."));
    }
  });
}

export function getFileExtension(fileName) {
  const fileExt = fileName.slice(fileName.lastIndexOf("."));
  print(`Got file of type: ${fileExt}`);
  return fileExt;
}
