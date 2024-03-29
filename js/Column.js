function Column(id, name) {
	const self = this;
	this.id = id;
	this.name = name || 'No name given';

	this.element = generateTemplate('column-template', { name: this.name, id: this.id });
	this.element.querySelector('.column').addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-delete')) {
			self.removeColumn();
		}

		if (event.target.classList.contains('add-card')) {
			const cardName = prompt('Enter the name of the card');
			event.preventDefault();

			const data = new FormData();
			data.append('name', cardName);
			data.append('bootcamp_kanban_column_id', self.id);

			fetch(baseUrl + '/card', {
				method: 'POST',
				headers: myHeaders,
				body: data,
			})
				.then(function (res) {
					return res.json();
				})
				.then(function (resp) {
					const card = new Card(resp.id, cardName);
					self.addCard(card);
				});
		}
	})
}

Column.prototype = {
	addCard: function (card) {
		this.element.querySelector('ul').appendChild(card.element);
	},
	removeColumn: function () {
		const self = this;
		fetch(baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				self.element.parentNode.removeChild(self.element);
			});
	}
}