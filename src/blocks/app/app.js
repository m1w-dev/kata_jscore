const debounce = (fn, debounceTime) => {
    let timer;
 
    return function() {
      if (timer) clearTimeout(timer);
 
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, debounceTime);
    }
};

const input = document.querySelector('.autocomplete__input');
const resList = document.querySelector('.autocomplete__result');
const savesList = document.querySelector('.app__saves');

const clearResList = (resList) => {
	resList.innerHTML = '';
}

const clearInput = (el) => {
	el.value = '';
}

const getItems = (searchString) => {

	const url = new URL('https://api.github.com/search/repositories');
	url.searchParams.append("q", searchString);
	url.searchParams.append("per_page", 5);

	return fetch(url)
		.then(res => res.json())
		.then(res => res.items)
		.catch(err => { alert('Произошла ошибка, попробуйте еще раз'); });
}

const checkSavedItems = (savesList, id) => savesList.querySelector(`[data-id="${id}"]`) ? true : false; 

const createResItem = (savesList, id, full_name, name, owner, stars) => {
	let el = document.createElement('li');

	el.setAttribute('data-id', id);
	el.setAttribute('data-name', name);
	el.setAttribute('data-owner', owner);
	el.setAttribute('data-stars', stars);
	el.classList.add('result__item');

	checkSavedItems(savesList, id) ? 
		el.classList.add('result__item--exists') : false;

	el.innerHTML = full_name;

	return el;
}

const createSavesItem = (id, name, owner, stars) => {
	let el = document.createElement('li');

	el.setAttribute('data-id', id);
	el.classList.add('saves__item', 'remove__item');

	el.innerHTML = `<div>Название: ${name}</div><div>Владелец: ${owner}</div><div>Звёзды: ${stars}</div><div class="remove__button"></div>`;

	return el;
}

const inputHandler = (inputText, resList, savesList) => {
	clearResList(resList);
	if (inputText) {
		getItems(inputText).then(res => {
			res.forEach(item => {
				let el = createResItem(savesList, item.id, item.full_name, item.name, item.owner.login, item.stargazers_count);
				resList.append(el);
			});

		}).catch(e => {});
	}
} 
const inputHandlerDebounced = debounce(inputHandler, 400);

const savesCreator = (input, resList, savesList, data) => {
	clearInput(input);
	clearResList(resList);
	let el = createSavesItem(data.id, data.name, data.owner, data.stars);
	savesList.prepend(el);
}

input.addEventListener('input', function () {
	inputHandlerDebounced(this.value, resList, savesList);
});

resList.addEventListener('click', function (ev) {
	if (!ev.target.classList.contains('result__item--exists')) {
		savesCreator(input, resList, savesList, ev.target.dataset);
	}
});

savesList.addEventListener('click', function(ev) {
	if (ev.target.classList.contains('remove__button'))
		ev.target.parentNode.remove();
})