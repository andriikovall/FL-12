const rootElement = document.getElementById('root');

function resetToMain() {
  window.location.hash = '/main';
  document.getElementById('terms').innerHTML = '';
}

const { insertSet, updateSet, deleteSet, getAllSets, getSetById } = (() => {
  let nextId = JSON.parse(localStorage['nextId'] || '1');
  let studiedSets = JSON.parse(localStorage['studiedSets'] || '[]');
  let newSets = JSON.parse(localStorage['newSets'] || '[]');


  // -----------------------------
  function saveSets() {
    localStorage['studiedSets'] = JSON.stringify(studiedSets);
    localStorage['newSets'] = JSON.stringify(newSets);
  }

  function getListOfSetsForSet(set) {
    return set.isStudied ? studiedSets : newSets;
  }
  // -----------------------------

  // -----------------------------
  function getSetById(id) {
    return getAllSets().filter(s => s.id === id)[0] || null;
  }
  function getAllSets() {
    return newSets.concat(studiedSets);
  }
  function updateSet(set) {
    console.log('studiedSets:', studiedSets)
    studiedSets = studiedSets.map(s => s.id === set.id ? set : s);
    console.log('studiedSets:', studiedSets)
    console.log('newSets:', newSets)
    newSets = newSets.map(s => s.id === set.id ? set : s);
    console.log('newSets:', newSets)
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
  // -----------------------------

  return {
    insertSet, updateSet, deleteSet, getAllSets, getSetById
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


document.getElementById('set-form').onsubmit = (e) => {
  e.preventDefault();
  const heading = document.querySelector('#add-or-update h1');
  heading.innerHTML = isEditing ? 'Editing set' : 'New set';
  const form = e.target;
  const setName = document.querySelector('#set-form input[name="name"]').value;
  const terms = [];
  const elements = document.getElementById('set-form').elements;
  for (let i = 0; i < elements.length; i++) {
    const item = elements.item(i);
    if (item.name === 'term-name') {
      const termName = item.value;
      const nextItem = elements.item(i + 1);
      const termDefinition = nextItem.value;
      terms.push({ name: termName, definition: termDefinition });
    }
  }
  const set = {
    name: setName,
    terms: terms
  };
  const id = parseInt(form.getAttribute('action'));
  if (id) {
    set.id = id;
    console.log(set);
    updateSet(set);
  } else {
    insertSet(set);
  }
  form.reset();
  resetToMain();
}

function getRenderedSets() {
  function getRenderedSet(set) {
    const table = htmlToElement('<table border="1px"></table>');
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


// document.getElementById('submitBtn').onclick = (e) => {
//     e.preventDefault();
//     console.log(e.target.form);
// }

























document.getElementById('addBtn').onclick = (e) => {
  e.preventDefault();
  const termBlockInput = createTermInputBlock();
  document.getElementById('terms').appendChild(termBlockInput);
}

function onRemove(e) {
  e.preventDefault();
  const termInputElement = e.target.parentNode;
  document.getElementById('terms').removeChild(termInputElement);
}

















function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

let isEditing = false;
function getEventHandler(newHash) {
  const route = newHash.split('/').slice(1).filter(s => s);
  const addOrUpdateElement = document.getElementById('add-or-update');
  const mainElement = document.getElementById('main');

  function handleAdd() {
    mainElement.style.display = 'none';
    addOrUpdateElement.style.display = 'block';
    isEditing = false;
    document.getElementById('set-form').setAttribute('action', '#');
  }

  const handleEdit = (() => {
    const invalidId = -1;
    const id = parseInt(route[1]) || invalidId;
    return function () {
      mainElement.style.display = 'none';
      addOrUpdateElement.style.display = 'block';
      isEditing = true;
      const set = getSetById(id);
      const termsForm = document.getElementById('terms');
      for (const t of set.terms) {
        const elem = createTermInputBlock(t.name, t.definition);
        termsForm.appendChild(elem);
      }
      document.getElementById('set-form').setAttribute('action', id);
      termsForm.previousSibling.previousSibling.value = set.name;
    }
  })();

  function handleMain() {
    addOrUpdateElement.style.display = 'none';
    mainElement.innerHTML = ' ';
    mainElement.style.display = 'block';
    mainElement.appendChild(getRenderedSets());
    isEditing = false;
    resetToMain();
  }

  const routes = {
    'add': handleAdd,
    'modify': handleEdit,
    'main': handleMain
  };

  // eslint-disable-next-line no-magic-numbers
  const handler = routes[route[0]] || routes['main'];
  console.log(route);
  return handler;
}

window.onhashchange = (event) => {
  const newHash = event.newURL.split('#')[1] || '';
  const handler = getEventHandler(newHash);
  handler();
}
getEventHandler(window.location.hash)();