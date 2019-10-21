//API 

const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
const myHeaders = {
	'X-Client-Id': 4090,
	'X-Auth-Token': '10bf9e853a8a89f211da9458ef1df413'
};

fetch(baseUrl + '/board', {method: 'GET', headers: myHeaders})
    .then(function (resp) {
        return resp.json();
    })
    .then(function (resp) {
        setUpColumns(resp.columns);
    });

//TEMPLATE
		
function generateTemplate(name, data, basicElement) {
	const template = document.getElementById(name).innerHTML;
	const element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
}

// ADD COLUMN
function setUpColumns(columns) {
	columns.forEach(function (column) {
		const col = new Column(column.id, column.name);
		board.addColumn(col);
		setUpCards(col, column.cards);
	});
}

// ADD CARD
function setUpCards(col, cards) {
	cards.forEach(function (card) {
		const cardObj = new Card(card.id, card.name);
		col.addCard(cardObj);
	})
}