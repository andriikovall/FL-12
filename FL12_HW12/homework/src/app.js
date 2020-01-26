const rootElement = document.getElementById('root');

const setForm = document.getElementById('set-form');
const termsForm = document.getElementById('terms');

const addOrUpdateElement = document.getElementById('add-or-update');
const mainElement = document.getElementById('main');

function resetToMain() {
  window.location.hash = '/main';
  resetForm();
}

function resetForm() {
  setForm.reset();
  termsForm.innerHTML = '';
}

const { 
  insertSet, 
  updateSet, 
  deleteSet, 
  getAllSets, 
  getSetById, 
  markSetAsStudied
} = (function() {
  let nextId = JSON.parse(localStorage['nextId'] || '1');
  let studiedSets = JSON.parse(localStorage['studiedSets'] || '[]');
  let newSets = JSON.parse(localStorage['newSets'] || '[]');

  // -----------------------------
  function saveSets() {
    localStorage['studiedSets'] = JSON.stringify(studiedSets);
    localStorage['newSets'] = JSON.stringify(newSets);
    localStorage['nextId'] = nextId;
  }

  // -----------------------------
  function getSetById(id) {
    const firstElemIndex = 0;
    return getAllSets().filter(s => s.id === id)[firstElemIndex] || null;
  }
  function getAllSets() {
    return newSets.concat(studiedSets);
  }
  function updateSet(set) {
    studiedSets = studiedSets.map(s => s.id === set.id ? set : s);
    newSets = newSets.map(s => s.id === set.id ? set : s);
    saveSets();
  }
  function insertSet(set) {
    set.id = nextId++;
    set.isStudied = false;
    newSets.push(set);
    saveSets();
  }
  function deleteSet(id) {
    studiedSets = studiedSets.filter(s => s.id !== id);
    newSets = newSets.filter(s => s.id !== id);
    saveSets();
  }
  function markSetAsStudied(setId) {
    setId = parseInt(setId);
    const setIndexInOldList = newSets.findIndex(s => s.id === setId);
    const firstValidIndex = 0;
    if (setIndexInOldList < firstValidIndex) {
      return;
    }
    const set = newSets[setIndexInOldList];
    set.isStudied = true;
    studiedSets.push(set);
    newSets.splice(setIndexInOldList, 1);
    saveSets();
  }
  // -----------------------------

  return {
    insertSet, updateSet, deleteSet, getAllSets, getSetById, markSetAsStudied
  };
})();

function createTermInputBlock(name = '', definition = '') {
  const div = document.createElement('div');
  div.setAttribute('class', 'term-input');
  div.innerHTML =
    `Name:
    <input type="text" value="${name}" name="term-name" required />
    Definition:
    <input type="text" value="${definition}" name="term-definition" required />
    <button type="button" class="removeBtn" onclick="onRemove(event)">Remove</button>`;
  return div;
}


setForm.onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const id = parseInt(form.getAttribute('action'));
  const setName = document.querySelector('#set-form input[name="name"]').value;
  const terms = [];
  const elements = setForm.elements;
  for (let i = 0; i < elements.length; i++) {
    const item = elements.item(i);
    if (item.name === 'term-name') {
      const termName = item.value;
      const nextItem = elements.item(i + 1);
      const termDefinition = nextItem.value;
      terms.push({ name: termName, definition: termDefinition });
    }
  }
  const editedValues = { name: setName, terms: terms };
  const set = getSetById(id);
  if (set) {
    set.id = id;
    set.name = editedValues.name;
    set.terms = editedValues.terms;
    updateSet(set);
  } else {
    insertSet(editedValues);
  }
  form.reset();
  resetToMain();
}

function getRenderedSets() {
  function getRenderedSet(set) {
    const table = htmlToElement(`<table border="1px" data-id="${set.id}" onclick="onTableClick(event)"></table>`);
    if (set.isStudied) {
      table.style.background = 'grey';
    }
    const nameRow = document.createElement('tr');
    nameRow.appendChild(htmlToElement(`<th colspan="2">${set.name}</th>`));
    table.appendChild(nameRow);

    const terms = set.terms;
    for (const t of terms) {
      const termRow = htmlToElement(`<tr>
                                              <td>${t.name}</td>
                                              <td>${t.definition}</td>
                                          </tr>`);
      table.appendChild(termRow);
    }
    table.appendChild(htmlToElement(`<button id="delete-${set.id}" onclick="onDeleteClicked(event)">Delete</button>`));
    table.appendChild(htmlToElement(`<button id="edit-${set.id}" onclick="onEditClicked(event)">Edit</button>`));
    return table;
  }


  const sets = getAllSets();

  const container = document.createElement('div');
  for (const s of sets) {
    container.appendChild(getRenderedSet(s));
  }
  return container;
}


function onDeleteClicked(event) {
  const target = event.target;
  const btnMethod = event.target.getAttribute('id');
  const id = parseInt(btnMethod.split('-')[1]);
  deleteSet(id);
  target.parentNode.parentNode.removeChild(target.parentNode);
}

function onEditClicked(event) {
  const btnMethod = event.target.getAttribute('id');
  const id = parseInt(btnMethod.split('-')[1]);
  window.location.hash = '/modify/' + id;
}

function onTableClick(event) {
  if (event.target.tagName === 'BUTTON') {
    return;
  }
  const targetTable = (() => {
    let target = event.target;
    while (target.tagName !== 'TABLE') {
      target = target.parentNode;
    }
    return target;
  })();

  const setId = targetTable.dataset.id;
  markSetAsStudied(setId);
  handleMain();
}



document.getElementById('addBtn').onclick = (e) => {
  e.preventDefault();
  const termBlockInput = createTermInputBlock();
  termsForm.appendChild(termBlockInput);
}

function onRemove(e) {
  e.preventDefault();
  const termInputElement = e.target.parentNode;
  termsForm.removeChild(termInputElement);
}

function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
}


function handleAdd() {
  mainElement.style.display = 'none';
  addOrUpdateElement.style.display = 'block';
  setForm.setAttribute('action', '#');
  document.querySelector('#add-or-update h1').innerText = 'New set';
  resetForm();
}

function handleMain() {
  addOrUpdateElement.style.display = 'none';
  mainElement.innerHTML = ' ';
  mainElement.style.display = 'block';
  mainElement.appendChild(getRenderedSets());
  resetToMain();
}


function getEventHandler(newHash) {
  const route = newHash.split('/').slice(1).filter(s => s);


  const handleEdit = (() => {
    const invalidId = -1;
    const id = parseInt(route[1]) || invalidId;
    document.querySelector('#add-or-update h1').innerText = 'Editing set';
    return function () {
      resetForm();
      mainElement.style.display = 'none';
      addOrUpdateElement.style.display = 'block';
      const set = getSetById(id);
      for (const t of set.terms) {
        const elem = createTermInputBlock(t.name, t.definition);
        termsForm.appendChild(elem);
      }
      setForm.setAttribute('action', id);
      termsForm.previousSibling.previousSibling.value = set.name;
    }
  })();


  const routes = {
    'add': handleAdd,
    'modify': handleEdit,
    'main': handleMain
  };

  // eslint-disable-next-line no-magic-numbers
  const handler = routes[route[0]] || routes['main'];
  return handler;
}

window.onhashchange = (event) => {
  const newHash = event.newURL.split('#')[1] || '';
  const handler = getEventHandler(newHash);
  handler();
}
getEventHandler(window.location.hash)();