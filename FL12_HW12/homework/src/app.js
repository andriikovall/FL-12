const rootElement = document.getElementById('root');

const { insertSet, updateSet, deleteSet } = (() => {
    let nextId = JSON.parse(localStorage['nextId'] || '1');
    const studiedSets = JSON.parse(localStorage['studiedSets'] || '[]');
    const newSets = JSON.parse(localStorage['newSets'] || '[]');


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
    function updateSet(set) {
        const listOfSets = getListOfSetsForSet(set);
        listOfSets.map(s => s.id === set.id ? set : s);
        saveSets();
    }
    function insertSet(set) {
        set.id = nextId++;
        newSets.push(set);
        saveSets();
    }
    function deleteSet(set) {
        const listOfSets = getListOfSetsForSet(set);
        listOfSets.filter(s => s.id !== set.id);
        saveSets();
    }
    // -----------------------------

    return {
        insertSet, updateSet, deleteSet
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
        mainElement.style.display = 'block';
        addOrUpdateElement.style.display = 'none';
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