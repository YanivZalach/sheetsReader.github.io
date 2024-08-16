import { print } from "./debug";

export async function outCsvFile(file, resultElement) {
  if (file) {
    print("The file:");
    print(file);
    file = addNumToFile(file);
    print(file);

    const table = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    for (let row = 0; row < file.length; row++) {
      const table_row = document.createElement("tr");

      for (let column = 0; column < file[row].length; column++) {
        let cell;
        if (column === 0 || row === 0) {
          cell = document.createElement("th");
        } else {
          cell = document.createElement("td");
        }

        cell.innerText = file[row][column];
        print(file[row][column]);
        table_row.appendChild(cell);
      }

      if (row === 0) {
        tableHead.appendChild(table_row);
      } else {
        tableBody.appendChild(table_row);
      }
    }

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    resultElement.appendChild(table);
    resultElement.appendChild(document.createElement("hr"));
  } else {
    print("File not chosen");
  }
}

export function addNameH2(name, resultElement) {
  if (name) {
    print("The sheet name:");
    print(name);
    const h2 = document.createElement("h2");
    h2.id = name;
    h2.innerText = name;
    resultElement.appendChild(h2);
  } else {
    print("Name not given");
  }
}

export function addTableOfCont(names, resultElement) {
  const ul = document.createElement("ul");

  for (let i = 0; i < names.length; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = names[i];
    a.href = "#" + names[i];
    li.appendChild(a);
    ul.appendChild(li);
  }
  resultElement.prepend(ul);
}

function addNumToFile(arr2d) {
  arr2d.forEach((row, index) => {
    row.unshift(index + 1);
  });

  const numCol = arr2d[0].map((_, index) => {
    return index;
  });

  arr2d.unshift(numCol);

  return arr2d;
}
