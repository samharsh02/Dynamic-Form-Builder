const fieldTable = document.getElementById('fieldTable').getElementsByTagName('tbody')[0];
const htmlCodeElement = document.getElementById('htmlCode');
const generatedCodeSection = document.getElementById('generatedCode');

let fields = [];

function addField() {
  const fieldName = document.getElementById('fieldName').value;
  const fieldType = document.getElementById('fieldType').value;
  const fieldRequired = document.getElementById('fieldRequired').value;
  const fieldLabel = document.getElementById('fieldLabel').value;

  if (!fieldName || !fieldLabel) {
    alert('Please fill out all fields.');
    return;
  }

  const field = {
    name: fieldName,
    type: fieldType,
    required: fieldRequired === 'true',
    label: fieldLabel
  };

  fields.push(field);
  addRowToTable(field);
  clearForm();
}

function addRowToTable(field) {
  const row = fieldTable.insertRow();
  row.innerHTML = `
    <td>${field.name}</td>
    <td>${field.type}</td>
    <td>${field.required ? 'True' : 'False'}</td>
    <td>${field.label}</td>
  `;
}

function clearForm() {
  document.getElementById('fieldName').value = '';
  document.getElementById('fieldLabel').value = '';
}

function generateForm() {
  let formHtml = '<form>';

  fields.forEach(field => {
    formHtml += `<label for="${field.name}">${field.label}</label>`;
    
    if (field.type === 'text' || field.type === 'email' || field.type === 'number') {
      formHtml += `<input type="${field.type}" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}><br>`;
    } else if (field.type === 'radio') {
      formHtml += `<input type="radio" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}> ${field.label}<br>`;
    } else if (field.type === 'dropdown') {
      formHtml += `<select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                    <option value="">--Select--</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    </select><br>`;
    } else if (field.type === 'checkbox') {
      formHtml += `<input type="checkbox" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}> ${field.label}<br>`;
    } else if (field.type === 'file') {
      formHtml += `<input type="file" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}><br>`;
    }

    formHtml += '<br>';
  });

  formHtml += '<input type="submit" value="Submit">';
  formHtml += '</form>';

  htmlCodeElement.textContent = formHtml;
  generatedCodeSection.style.display = 'block';
}
