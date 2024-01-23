// For working with exel and csv files
import * as XLSX from 'xlsx';

// Local import
import { print } from './debug.js';


/**
* Converts an Excel file to CSV format and returns a Promise with the CSV data.
* @param {File} file - The Excel file to convert.
* @returns {Promise<string>} - A Promise that resolves with the CSV data.
*/
export function convertExcelToCSV(file) {
	// Returning a promise
	return new Promise((resolve, reject) => {
		if (file) {  // Check if the file is provided
			// Creating a reader for reading the file
			const reader = new FileReader();
			// Event handler when the file is loaded
			reader.onload = function (e) {
				try {
					const data = new Uint8Array(e.target.result);  // Getting the binary data
					const workbook = XLSX.read(data, { type: 'array' });  // Reading the data as an array using XLSX library
					const csvSheets = [];
					for(let sheet = 0; sheet < workbook.SheetNames.length; sheet++ ){
						const csvRow = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[sheet]]);  // Converting the data to CSV format
						const csvData = csvRow.split('\n').map(row => row.split(','));  // Convert CSV string to an array
						csvSheets.push(csvData);  // Adding to the sheet list
					}
					// Returning the resolved CSV data, with there name
					resolve([csvSheets,workbook.SheetNames]);
				} catch (error) {
					// Rejecting the promise if an error occurs during processing
					reject(error);
				}
			};
			// Event handler for errors during file reading
			reader.onerror = function (error) {
				// Rejecting the promise with the encountered error
				reject(error);
			};
			// Read the file as an array buffer, triggering the async onload function
			reader.readAsArrayBuffer(file);
		} else {
			// Rejecting the promise if the file is not provided
			reject(new Error('File is not provided.'));
		}
	});
}

/**
* Reads a CSV file and returns a Promise with the CSV data.
* @param {File} file - The CSV file to read.
* @returns {Promise<string>} - A Promise that resolves with the CSV data.
*/
export function readCsvFile(file) {
	return new Promise((resolve, reject) => {
		if (file) {
			// Creating a reader for reading the file
			const reader = new FileReader();
			reader.onload = function (e) {
				try {
					// Getting the CSV data as a string
					const data = e.target.result;
					const workbook = XLSX.read(data, { type: 'array' });  // Reading the data as an array using XLSX library
					const csvRow = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);  // Converting the data to CSV format
					const csvData = csvRow.split('\n').map(row => row.split(','));  // Convert CSV string to an array - every `\n` and then every `,` we create a 2D array
					// Returning the resolved CSV data
					resolve(csvData);
				} catch (error) {
					// Rejecting the promise if an error occurs during processing
					reject(error);
				}
			};
			reader.onerror = function (error) {
				// Rejecting the promise with the encountered error
				reject(error);
			};
			// Read the file as an array buffer, triggering the async onload function
			reader.readAsArrayBuffer(file);
		} else {
			// Rejecting the promise if the file is not provided
			reject(new Error('File is not provided.'));
		}
	});
}


// Finding the file extension (Knowing if we got .csv file or .xlsx)
export function getFileExtension(fileName) {
	const fileExt = fileName.slice(fileName.lastIndexOf("."));
	print(`Got file of type: ${fileExt}`);  // Printing confirmation in debug mode
	return fileExt;
}


