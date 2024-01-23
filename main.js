// Local imports
import { workFile } from './js/open_file.js';

// Getting html from the browser
const app = document.querySelector("#app");
// Naming
const fileInputName = "fileInput";
const resultName = "result";

// Adding the elements to the DOM
app.innerHTML = `
	<input type="file" id="${fileInputName}" accept=".xlsx,.csv">
	<div id="${resultName}"></div>
	`;
// The html of the browser to work in with js
const fileInput = document.getElementById(fileInputName);
const resultElement = document.getElementById(resultName);


// Inside your script tag in main.js
document.getElementById('fileInput').addEventListener('change',() => {
	workFile(fileInput,resultElement);
});

