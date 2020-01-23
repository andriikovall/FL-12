  
const structure = [
  {
    'folder': true,
    'title': 'Films',
    'children': [
      {
        'title': 'Iron Man.avi'
      },
      {
        'folder': true,
        'title': 'Fantasy',
        'children': [
          {
            'title': 'The Lord of the Rings.avi'
          },
          {
            'folder': true,
            'title': 'New folder 1',
            'children': false
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Documents',
    'children': [
      {
        'folder': true,
        'title': 'EPAM Homework answers',
        'children': null
      }
    ]
  }
];

const rootNode = document.getElementById('root');


const folderImage = {
  text: 'folder', 
  html:  `<i class="material-icons folder-colour" style="">folder</i>`
};

const openedFolderImage = {
  text: 'folder_open', 
  html: `<i class="material-icons folder-colour" style="">folder_open</i>`
}

const fileImage = {
  text: 'insert_drive_file', 
  html: `<i class="material-icons file-colour" style="">insert_drive_file</i>`
}; 

const paddingLeftImEms = 0.8;

function createFileNameElement(name, onclick) {
  const nameEl = document.createElement('p');
  nameEl.setAttribute('class', 'file-name');
  nameEl.innerText = name;
  nameEl.onclick = onclick;
  return nameEl;
}

function createFolderElement(name, isOpened, onclick) {
  const innerHTML = isOpened ? openedFolderImage.html : folderImage.html;
  const el = createTreeElement(name, innerHTML, onclick);
  el.classList.add('folder')
  return el;
}

function createTreeElement(name, htmlForIcon, onclick) {
  const el = document.createElement('div');

  el.setAttribute('class', 'file');
  el.innerHTML = htmlForIcon;
  el.appendChild(createFileNameElement(name, onclick));
  el.style.paddingLeft = `${paddingLeftImEms}em`;

  return el;
}

function createFileElement(name) {
  const el = createTreeElement(name, fileImage.html);
  return el;
}

function creteFolderIsEmptyElement() {
  const el = createTreeElement('Folder is empty', '');
  el.firstChild.setAttribute('class', 'file-name no-hover-bg');
  el.style.fontStyle = 'italic';
  return el;
}

function buildTree() {
  for (const file of structure) {
    const el = createElementFromFileStructure(file);
    rootNode.appendChild(el);
  }
}

function createElementFromFileStructure(currFileNode) {
  if (currFileNode.folder) {

    const onFolderClick = getEventHandler(currFileNode);
    const folderEl = createFolderElement(currFileNode.title, false, onFolderClick);

    if (!currFileNode.children || currFileNode.children.length === 0) {

      const folderIsEmptyElement = creteFolderIsEmptyElement();
      folderEl.appendChild(folderIsEmptyElement);
      return folderEl;

    }
    for (const child of currFileNode.children) {
      const childEl = createElementFromFileStructure(child); 
      folderEl.appendChild(childEl);
    }
    return folderEl;
  } else {
    const fileEl = createFileElement(currFileNode.title);
    return fileEl;
  }
}


function getEventHandler(file) {
  const isFolder = !!file.folder;
  let isOpened = false;
  return function (event) {
    const target = event.target;
    event.preventDefault();
    if (!isFolder) {
      return;
    }
    if (isOpened) {
      let nextEl = target.nextSibling;
      target.previousSibling.innerText = folderImage.text;
      while (nextEl) {
        if (nextEl.classList.contains('file')) {
          nextEl.style.display = 'none';
        }
        nextEl = nextEl.nextSibling;
      }
    } else {
      let nextEl = target.nextSibling
      target.previousSibling.innerText = openedFolderImage.text;
      while (nextEl) {
        if (nextEl.classList.contains('file')) {
          nextEl.style.display = 'block';
        }
        nextEl = nextEl.nextSibling;
      }
    }
    isOpened = !isOpened;
  }
}

function closeTree() {
  const folderEls = document.querySelectorAll('#root .folder > .file');
  for (const el of folderEls) {
    el.style.display = 'none';
  }
}

buildTree()
closeTree()



