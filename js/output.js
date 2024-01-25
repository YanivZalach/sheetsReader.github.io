// Local imports
import { print } from "./debug";

// Function to display the file we got
export async function outCsvFile(file,resultElement){
	if (file){  // Did we got a file
		print("The file:");
		print(file);
		// Adding numbers to find locations in the file
		file = addNumToFile(file);
		print(file);
		const table = document.createElement('table');  // Table of the sheet
		const tableHead = document.createElement('thead');  // Head of the table
		const tableBody = document.createElement('tbody');  // Body of the table
		// Creating list for each of the rows
		for(let row = 0; row<file.length;row++){
			const table_row = document.createElement('tr');  // List to after add the columns
			for(let column = 0; column<file[row].length;column++){
				let cell;
				if(column === 0 || row === 0){  // Number
					cell = document.createElement('th');  // List element
				} else{
					cell = document.createElement('td');  // List element
				}
				// Adding the data
				cell.innerHTML = file[row][column];
				print(file[row][column])
				// Appending to the list
				table_row.appendChild(cell);
			}
			// Adding the table
			if(row === 0){  // Numbers and not the sheet
				tableHead.appendChild(table_row);  // Adding to the body
			} else {
				tableBody.appendChild(table_row);  // Adding to the body
			}
		}
		table.appendChild(tableHead);
		table.appendChild(tableBody);
		resultElement.appendChild(table);  // Adding The table
		resultElement.appendChild(document.createElement('hr'));  // Adding a stop between tables
	} else {  // Didn't got a file
		print("File not chosen");
	}
}

// Adding the given name to the dom
export function addNameH2(name,resultElement){
	if (name){  // Did we got a name
		print("The sheet name:");
		print(name);
		const h2 = document.createElement('h2');  // Creating h2 element
		h2.id = name;  // Adding an id
		h2.innerHTML = name;  // Adding the name to the element
		resultElement.appendChild(h2);  // Adding the element to the dom
	} else {  // Didn't got a name
		print("Name not given");
	}
}

// Adding a table of content
export function addTableOfCont(names,resultElement){
	// Creating a ul of the sheets
	const ul = document.createElement('ul');
	// Creating item for each name
	for(let i = 0;i<names.length;i++){
		const li = document.createElement('li');  // List item
		const a = document.createElement('a');  // The link to the sheet
		a.innerText = names[i];  // Adding the name
		a.href = "#"+names[i];  // Adding the link
		li.appendChild(a);  // Adding the link to the list item
		ul.appendChild(li);  // Adding the item to the list
	}
	resultElement.prepend(ul);  // Adding the list to the dom
}

// Adding numbers as the first element to the output to be able to talk about the location of the information
function addNumToFile(arr2d) {
	// Row
	arr2d.forEach((row, index) => {
		row.unshift(index + 1); // Add numbers sequentially starting from 1
	});
	// Column - creating
	const numCol = arr2d[0].map((_,index) => { // Must have at list 1 row and column
		return index;
	})
	// Column - adding
	arr2d.unshift(numCol);

	return arr2d;
}
