const rootElement = document.getElementById('root');

const { insertSet, updateSet, deleteSet, getAllSets } = (() => {
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
    function getAllSets() {
        return newSets.concat(studiedSets);
    }
    function updateSet(set) {
        const listOfSets = getListOfSetsForSet(set);
        listOfSets.map(s => s.id === set.id ? set : s);
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
        insertSet, updateSet, deleteSet, getAllSets
    };
})();

function createTermInputBlock() {
    const div = document.createElement('div');
    div.setAttribute('class', 'term-input');
    div.innerHTML = 
    `Name:
    <input type="text" name="term-name" required />
    Definition:
    <input type="text" name="term-definition" required />
    <button type="button" class="removeBtn" onclick="onRemove(event)">Remove</button>`;
    return div;
}


document.getElementById('set-form').onsubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const setName = document.querySelector('#set-form input[name="name"]').value;
    const terms = [];
    const elements = document.getElementById('set-form').elements;
    for(let i = 0 ; i < elements.length ; i++ ){
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
    insertSet(set);
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
        table.appendChild(htmlToElement(`<button id="delete-${set.id}" onclick="onDelete(event)">Delete</button>`));
        table.appendChild(htmlToElement(`<button id="edit-${set.id}" onclick="onEdit(event)">Edit</button>`));
        return table;
    } 

    
    const sets = getAllSets();
    const container = document.createElement('div');
    for (const s of sets) {
        container.appendChild(getRenderedSet(s));
    }
    return container;
}


function onDelete(event) {
    const target = event.target;
    const btnMethod = event.target.getAttribute('id');
    const id = parseInt(btnMethod.split('-')[1]);
    deleteSet(id);
    target.parentNode.parentNode.removeChild(target.parentNode);
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


function getEventHandler(newHash) {
    const route = newHash.split('/').slice(1).filter(s => s);
    const addOrUpdateElement = document.getElementById('add-or-update');
    const mainElement = document.getElementById('main');

    function handleAdd() {
        mainElement.style.display = 'none';
        addOrUpdateElement.style.display = 'block';
    }

    const handleEdit = (() => {
        const invalidId = -1;
        const id = parseInt(route[1]) || invalidId;
        return function() {
            mainElement.style.display = 'none';
            addOrUpdateElement.style.display = 'block';
        }
    })();

    function handleMain() {
        addOrUpdateElement.style.display = 'none';
        mainElement.innerHTML = ' ';
        mainElement.style.display = 'block';
        mainElement.appendChild(getRenderedSets());
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