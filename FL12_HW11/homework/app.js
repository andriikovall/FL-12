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

const folderHtml = '<i class="material-icons folder-colour" style="">folder</i>';
const openedFolderHtml = '<i class="material-icons folder-colour" style="">folder_open</i>';
const fileHtml = '<i class="material-icons file-colour">insert_drive_file</i>';

function caclPaddingLeftInEms(level) {
  const proportionalKoef = 0.9;
  return level * proportionalKoef;
}

function createFileNameElement(name, onclick) {
  const nameEl = document.createElement('p');
  nameEl.setAttribute('class', 'file-name');
  nameEl.innerText = name;
  nameEl.onclick = onclick;
  return nameEl;
}

function createFolderElement(name, level, isOpened, onclick) {
  const innerHTML = isOpened ? openedFolderHtml : folderHtml;
  const el = createTreeElement(name, level, innerHTML, onclick);
  return el;
}

function createTreeElement(name, level, htmlForIcon, onclick) {
  const el = document.createElement('div');
  el.setAttribute('class', 'file');
  el.innerHTML = htmlForIcon;
  el.appendChild(createFileNameElement(name, onclick));

  const paddingLeft = caclPaddingLeftInEms(level);
  el.style.marginLeft = `${paddingLeft}em`;

  return el;
}

function createFileElement(name, level) {
  const el = createTreeElement(name, level, fileHtml);
  return el;
}

function creteFolderIsEmptyElement(level) {
  const el = createTreeElement('Folder is empty', level, '');
  el.firstChild.setAttribute('class', 'file-name no-hover-bg');
  el.style.fontStyle = 'italic';
  return el;
}

function buildTree() {
  for (const file of structure) { 
    const el = createElementFromFileStructure(file, 0);
    rootNode.appendChild(el);
  }
}

const fileNodesToDOM = new Map();

function createElementFromFileStructure(currFileNode, level) {
  const cachedNode = fileNodesToDOM.get(currFileNode);
  if (cachedNode) {
    return cachedNode;
  }
  if (currFileNode.folder) {
    const onFolderClick = bindElementToFileNode(currFileNode);
    const folderEl = createFolderElement(currFileNode.title, level, true, onFolderClick);
    if (!currFileNode.children) {
      const folderIsEmptyElement = creteFolderIsEmptyElement(level - 1);
      folderEl.appendChild(folderIsEmptyElement);
      fileNodesToDOM.set(currFileNode, folderEl);
      return folderEl;
    }
    for (const child of currFileNode.children) {
      const childEl = createElementFromFileStructure(child, level + 1); 
      folderEl.appendChild(childEl);
    }
    fileNodesToDOM.set(currFileNode, folderEl);
    return folderEl;
  } else {
    const fileEl = createFileElement(currFileNode.title, level);
    fileNodesToDOM.set(currFileNode, fileEl);
    return fileEl;
  }
}


function bindElementToFileNode(file) {
  const isFolder = !!file.folder;
  let isOpened = true;
  return function(event) {
    const target = event.target;
    event.preventDefault();
    if (isFolder) {
      if (isOpened) {
          let nextEl = target.nextSibling;
          while(nextEl) {
            if (nextEl.getAttribute('class') === 'file') {
              nextEl.style.display = 'none';
              nextEl = nextEl.nextSibling;
            }
          }
      } else {
        let nextEl = target.nextSibling
        while(nextEl) {
          if (nextEl.getAttribute('class') === 'file') {
            nextEl.style.display = 'block';
            nextEl = nextEl.nextSibling;
          }
        }
      }
      isOpened = !isOpened;
    }
  }
}

buildTree()



