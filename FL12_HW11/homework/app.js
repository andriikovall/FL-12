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

function createFileNameElement(name) {
  const nameEl = document.createElement('p');
  nameEl.setAttribute('class', 'file-name');
  nameEl.innerText = name;
  return nameEl;
}

function createFolderElement(name, level, isOpened) {
  const innerHTML = isOpened ? openedFolderHtml : folderHtml;
  const el = createTreeElement(name, level, innerHTML);
  return el;
}

function createTreeElement(name, level, htmlForIcon) {
  const el = document.createElement('div');
  el.setAttribute('class', 'file');
  el.innerHTML = htmlForIcon;
  el.appendChild(createFileNameElement(name));

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
    const el = createElementFromFileStructure(rootNode, file, 0);
    rootNode.appendChild(el);
  }
}

function createElementFromFileStructure(currFileDOMNode, currFileNode, level) {
  if (currFileNode.folder) {
    const folderEl = createFolderElement(currFileNode.title, level, false);
    folderEl.onclick = bindElementAndLevelToFileNode(currFileNode, level);
    if (!currFileNode.children) {
      const folderIsEmptyElement = creteFolderIsEmptyElement(level - 1);
      folderEl.appendChild(folderIsEmptyElement);
      return folderEl;
    }
    for (const child of currFileNode.children) {
      const childEl = createElementFromFileStructure(folderEl, child, level + 1); 
      folderEl.appendChild(childEl);
    }
    return folderEl;
  } else {
    const fileEl = createFileElement(currFileNode.title, level);
    return fileEl;
  }
}


function bindElementAndLevelToFileNode(file, level) {
  const isFolder = !!file.folder;
  let isOpened = true;
  return function(event) {
    const targetEl = event.target.tagName === 'DIV' ? event.target : event.target.parentNode;
    event.preventDefault();
    if (isFolder) {
      if (isOpened) {
        for (const child of targetEl.children) {
          if (child.getAttribute('class') === 'file') {
            child.innerHTML = '';
          }
        }
      } else {
        if (Array.isArray(file.children)) {
          for (const fileChild of file.children) {
            targetEl.appendChild(createElementFromFileStructure(targetEl, fileChild, level + 1));
          } 
        }
      }
      isOpened = !isOpened;
    }
  }
}

buildTree()



