import { getFileExtension, convertExcelToCSV, readCsvFile } from "./input.js";
import { addTableOfCont, outCsvFile, addNameH2 } from "./output.js";

export async function workFile(fileInput, resultElement) {
  let file = fileInput.files[0];

  if (file) {
    const fileName = getFileExtension(file.name);
    resultElement.innerHTML = "";
    resultElement.appendChild(document.createElement("hr"));

    if (fileName === ".xlsx") {
      try {
        let sheetsName;
        [file, sheetsName] = [...(await convertExcelToCSV(file))];

        for (let sheet = 0; sheet < file.length; sheet++) {
          addNameH2(sheetsName[sheet], resultElement);
          outCsvFile(file[sheet], resultElement);
        }

        addTableOfCont(sheetsName, resultElement);
      } catch (error) {
        console.error(error);
      }
    } else if (fileName === ".csv") {
      try {
        file = await readCsvFile(file);
        outCsvFile(file, resultElement);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("File type is not supported");
    }
    return file;
  }
}
