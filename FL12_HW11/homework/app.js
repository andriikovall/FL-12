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
  const proportionalKoef = 1.3;
  return level * proportionalKoef;
}

function createFileNameElement(name) {
  const nameEl = document.createElement('p');
  nameEl.setAttribute('class', 'file-name');
  nameEl.innerHTML = escape(name);
  return nameEl;
}

function createFolderElement(name, level) {
  const el = document.createElement('span');
  const paddingLeft = caclPaddingLeftInEms(level);
  el.innerHTML = folderHtml;
  el.appendChild(createFileNameElement(name));
  el.style.paddingLeft = `${paddingLeft}em`;
  return el;
}
rootNode.appendChild(createFolderElement('someName', 0));



