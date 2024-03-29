const board = {
  name: 'Tablica Kanban',
  addColumn: function (column) {
    this.element.appendChild(column.element);
    initSortable(column.id);
  },
  element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function () {
  const name = prompt('Enter a column name');
  const data = new FormData();

  data.append('name', name);

  fetch(baseUrl + '/column', {
    method: 'POST',
    headers: myHeaders,
    body: data,
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (resp) {
      const column = new Column(resp.id, name);
      board.addColumn(column);
    });
});

function initSortable(id) {
  const el = document.getElementById(id);
  const sortable = Sortable.create(el, {
    group: 'kanban',
    sort: true
  });
}