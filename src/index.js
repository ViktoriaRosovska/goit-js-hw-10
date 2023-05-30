import { fetchBreeds, fetchCatImageUrl } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import markupTpl from './templates/markup.hbs';
import Handlebars from "handlebars";
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

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

Handlebars.registerHelper('catInfoPageUrl', catInfoPageUrl);

function getCatDescription(breedId, imageUrl) {
    const dataIdx = breads.findIndex(({ id }) => id === breedId);
    const cat = breads[dataIdx];
    catInfo.insertAdjacentHTML("beforeend", markupTpl({ cat, imageUrl }))
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
    const breadId = select.value;
    fetchCatImageUrl(breadId).
        then(url => getCatDescription(breadId, url)).
        catch(fatal).
        finally(hideLoader);
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