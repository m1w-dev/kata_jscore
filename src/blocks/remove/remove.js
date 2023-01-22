let removeWrapper = document.querySelector('.remove');
let removeItems = removeWrapper.children;

removeWrapper.addEventListener('mouseover', function(e) {
	if (e.target.classList.contains('remove__button')) 
		e.target.parentNode.classList.add('remove__item--hovered');
});

removeWrapper.addEventListener('mouseout', function(e) {
	if (e.target.classList.contains('remove__button')) 
		e.target.parentNode.classList.remove('remove__item--hovered');
});
