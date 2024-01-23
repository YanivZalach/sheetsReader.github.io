// Local import
import {getFileExtension,convertExcelToCSV,readCsvFile} from "./input.js";
import {addTableOfCont,outCsvFile,addNameH2} from "./output.js";


// Getting file data
export async function workFile(fileInput,resultElement){
	// Getting the file
	let file = fileInput.files[0];
	if (file){
		const fileName = getFileExtension(file.name);
		// Clearing the resultElement
		resultElement.innerHTML = "";
		resultElement.appendChild(document.createElement('hr'));  // Adding a stop between tables
		if (fileName === ".xlsx"){
			// If the file is of exel type we convert it to csv
			try {
				let sheetsName;
				[file,sheetsName]= [...(await convertExcelToCSV(file))];  // Getting the sheets name and the sheets in the file
				for(let sheet = 0; sheet < file.length; sheet++){
					// Outputting the name of the sheet, the same number of names to the number of sheets
					addNameH2(sheetsName[sheet],resultElement);
					// Outputting the sheet
					outCsvFile(file[sheet],resultElement);
				}
				// Adding a table of content of the sheets
				addTableOfCont(sheetsName,resultElement);
			} catch (error) {
				console.error(error);
			}
		} else if (fileName === ".csv"){
			// If the file is of csv type
			try {
				// Getting the file
				file = await readCsvFile(file);
				// Outputting the sheet
				outCsvFile(file,resultElement);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error("File type is not supported");
		}
		// Returning the clean file data
		return file;
	}
}
