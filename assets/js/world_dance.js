const DEFAULT_RATING = 50;

// document.addEventListener('click', setFullScreen);
document.addEventListener('DOMContentLoaded', () => {

    const ratingsElems = document.querySelectorAll('.ability-rating');
    const likeButtons = document.querySelectorAll('.dancer-liked > i');
    const dances = document.querySelectorAll('.dance');
    const decreaseBtn = document.querySelectorAll('.btn-decrease');
    const increaseBtn = document.querySelectorAll('.btn-increase');

    setRatings(ratingsElems);
    initLikedDancers(likeButtons);
    initSelectedDances(dances);

    decreaseBtn.forEach((btn) => {
        btn.addEventListener('click', decreaseQuantity);
    });

    increaseBtn.forEach((btn) => {
        btn.addEventListener('click', increaseQuantity);
    });
});

function setRatings(elems) {
    elems.forEach((elem) => {
        const rating = getRating(elem);
        elem.style.width = `${rating}%`;
    });
}

function getRating(elem) {
    if (elem.dataset.abilityRating) {
        let rating = elem.dataset.abilityRating;
        rating = parseFloat(rating.trim());

        return isNaN(rating) ?  DEFAULT_RATING : rating;
    }

    return DEFAULT_RATING;
}

function initLikedDancers(elems) {
    elems.forEach((elem) => {
        const isLiked = elem.classList.contains('isLiked');

        elem.innerHTML = isLiked ? 'favorite' : 'favorite_border';
        elem.addEventListener('click', likeDancer);
    });
}

function likeDancer(e) {
    const isLiked = e.target.classList.contains('isLiked');

    e.target.classList.toggle('isLiked');
    e.target.innerHTML = isLiked ? 'favorite_border' : 'favorite';
}

function initSelectedDances(elems) {
    elems.forEach((elem) => {
        elem.addEventListener('click', selectDance);
    });
}

function selectDance(e) {

    e.currentTarget.classList.toggle('selected');
    e.currentTarget.classList.toggle('bg-light');

    e.currentTarget.childNodes.forEach((child) => {
        if (child.tagName === 'P') {
            child.classList.toggle('text-white');
        }

        if (child.tagName === 'BUTTON') {
            const isAdded = child.childNodes[0].innerHTML === 'add';
            isAdded ? child.childNodes[0].innerHTML = 'done' : child.childNodes[0].innerHTML = 'add';
        }
    });
}

function setFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

function decreaseQuantity(e) {
    let currentQuantity = parseInt(e.target.nextElementSibling.innerHTML);
    currentQuantity = currentQuantity == 0 ? 0 : currentQuantity - 1;

    e.target.nextElementSibling.innerHTML = currentQuantity;
}

function increaseQuantity(e) {
    let currentQuantity = parseInt(e.target.previousElementSibling.innerHTML);
    e.target.previousElementSibling.innerHTML = currentQuantity + 1;
    updateTotal();
}

function updateTotal() {
    const total = document.querySelectorAll('#total');
    const choices = document.querySelectorAll('.choice-quantity');

    choices.forEach((choice) => {
        choice.childNodes.forEach((child) => {
            if (child.tagName === 'P') {
                console.log(child.innerHTML);
            }
        });
    });
}