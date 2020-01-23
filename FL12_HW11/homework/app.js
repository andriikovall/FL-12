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
      }, 
      {
        folder: true, 
        title: 'test<h1>djnfdsjf</h1>',
        children: [
          {
            'folder': true,
            'title': 'EPAM Homework answers',
            'children': null
          }
        ]
      }
    ]
  }
];

const rootNode = document.getElementById('root');

const folderTextForMaterialIcons = 'folder'
const folderHtml = `<i class="material-icons folder-colour" style="">${folderTextForMaterialIcons}</i>`;

const openedFolderTextForMaterialIcons = 'folder_open'
const openedFolderHtml = `<i class="material-icons folder-colour" style="">${openedFolderTextForMaterialIcons}</i>`;

const fileTextForMaterialIcons = 'insert_drive_file';
const fileHtml = `<i class="material-icons file-colour">${fileTextForMaterialIcons}</i>`;

function caclPaddingLeftInEms(level) {
  const proportionalKoef = 1;
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
  el.classList.add('folder')
  return el;
}

function createTreeElement(name, level, htmlForIcon, onclick) {
  const el = document.createElement('div');
  el.setAttribute('class', 'file');
  el.innerHTML = htmlForIcon;
  el.appendChild(createFileNameElement(name, onclick));

  const paddingLeft = caclPaddingLeftInEms(level);
  el.style.paddingLeft = `${paddingLeft}em`;

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
    const el = createElementFromFileStructure(file, 1);
    rootNode.appendChild(el);
  }
}

function createElementFromFileStructure(currFileNode, level) {
  if (currFileNode.folder) {

    const onFolderClick = bindElementToFileNode(currFileNode);
    const folderEl = createFolderElement(currFileNode.title, level, false, onFolderClick);

    if (!currFileNode.children || currFileNode.children.length === 0) {

      const folderIsEmptyElement = creteFolderIsEmptyElement(level);
      folderEl.appendChild(folderIsEmptyElement);
      return folderEl;

    }
    for (const child of currFileNode.children) {
      const childEl = createElementFromFileStructure(child, level); 
      folderEl.appendChild(childEl);
    }
    return folderEl;
  } else {
    const fileEl = createFileElement(currFileNode.title, level);
    return fileEl;
  }
}


function bindElementToFileNode(file) {
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
      target.previousSibling.innerText = folderTextForMaterialIcons;
      while (nextEl) {
        if (nextEl.classList.contains('file')) {
          nextEl.style.display = 'none';
        }
        nextEl = nextEl.nextSibling;
      }
    } else {
      let nextEl = target.nextSibling
      target.previousSibling.innerText = openedFolderTextForMaterialIcons;
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



