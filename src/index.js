import { fetchBreeds, fetchCatImage } from "./cat-api";

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const pLoader = document.querySelector('.loader');
export const pError = document.querySelector('.error');
pError.classList.add('invisible');
pLoader.classList.add('invisible');

function getBreeds() {
    fetchBreeds().then((data) => {
        console.log(data);
        selectFromCatBreeds(data);
    });
}

function selectFromCatBreeds(data) {
    data.map(({ id, name }) => {
        return select.add(new Option(name, id));
    });
    
}

function fetchCatByBreed(breedId) {
    fetchCatImage(breedId).then(data => {
        console.log(data);
        const image = document.createElement('img');
        image.src = data[0].url;
        image.style.width = '300px';
        image.style.height = '250px';
        image.style.objectFit = "contain";
        catInfo.prepend(image);
        pLoader.classList.add('invisible');
    });  
}

function getCatDescription(breedId) {
    
    fetchBreeds().then((data) => {
        const dataIdx = data.findIndex(({id}) => id === breedId);
        catInfo.insertAdjacentHTML("beforeend", `<h2>${data[dataIdx].name}</h2><h3>Description:</h3><p>${data[dataIdx].description}</p><h3>Temperament:</h3><p>${data[dataIdx].temperament}</p>`)
} )};
        
getBreeds();

select.addEventListener('change', onChangeSelectForChoiceBreed);

function onChangeSelectForChoiceBreed() {
    pLoader.classList.remove('invisible');
    catInfo.innerHTML = '';
    // console.log(select.value);
    fetchCatByBreed(select.value);
    getCatDescription(select.value);
}