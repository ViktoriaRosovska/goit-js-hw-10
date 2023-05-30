import { fetchBreeds, fetchCatImageUrl } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
// const pError = document.querySelector('.error');

const loaderCSS = document.querySelector('.loaderCSS');
const selectContainer = document.querySelector('.container');

let failed = false;

Notify.init({
    width: '300px',
    position: 'center-center',
    closeButton: false
});

let breads;

function selectFromCatBreeds(data) {
    data.map(({ id, name }) => {
        return select.add(new Option(name, id));
    }); 
}

function getCatDescription(breedId) {
    const data = breads;
    // console.log(data);
    const dataIdx = data.findIndex(({id}) => id === breedId);
    catInfo.insertAdjacentHTML("beforeend", `
        <a href=${catInfoPageUrl(data[dataIdx])} target='_blanc'>
           <div class="findCatInfo">
            <div>
                <h2>${data[dataIdx].name}</h2>
                <h3>Description:</h3>
                <p>${data[dataIdx].description}</p>
                <h3>Temperament:</h3>
                <p>${data[dataIdx].temperament}</p>
            </div>
            <img class="findCat" src="" >
            </div>
        </a>`)
};

function catInfoPageUrl(cat)
{
    return cat.cfa_url ??
        cat.vcahospitals_url ??
        cat.vetstreet_url ??
        cat.wikipedia_url;
}
        
showLoader();
fetchBreeds().
    then(response => {
        breads = response;
        selectFromCatBreeds(breads);
        new NiceSelect.bind(select);
        selectContainer.classList.remove('invisible');
    }).
    catch(fatal).
    finally(hideLoader);

select.addEventListener('change', onChangeSelectForChoiceBreed);
function onChangeSelectForChoiceBreed() {
    showLoader();
    catInfo.innerHTML = '';
    getCatDescription(select.value);
    fetchCatImageUrl(select.value).
        then(insertCatImage).
        catch(fatal).
        finally(hideLoader);
}

function insertCatImage(url) {
    const image = document.querySelector('.findCat');
    image.src = url;
    image.style.width = '300px';
    image.style.height = '300px';
    image.style.objectFit = "scale-down";
    // catInfo.append(image);
}

function showLoader() {
    loaderCSS.classList.remove('invisible');
    selectContainer.classList.add('invisible');
}

function hideLoader() {
    loaderCSS.classList.add('invisible');
    if (!failed)
        selectContainer.classList.remove('invisible');
}

function fatal(error) {
    failed = true;
    // console.log(error);
    Notify.failure('Oops! Something went wrong! Try to reload the page!');
}