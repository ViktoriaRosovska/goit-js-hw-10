import { BASE_URL, API_KEY, SEARCH_CAT_URL } from './constants';
import { pError } from './index';

// виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту
function fetchBreeds() {
  const  params = new URLSearchParams({
        'x-api-key': API_KEY,
    });

    return fetch(`${BASE_URL}?${params}`)
        .then((responce) => {
            console.log(responce);
            if (!responce.ok) {
                throw new Error(responce.status);  
            }
            return responce.json();
        })
        .catch(error => {
            console.log(error);
            pError.classList.remove('invisible')});
}

function fetchCatImage(breedId) {
    const  params = new URLSearchParams({
        'x-api-key': API_KEY,
        breed_ids: breedId,
    });
    return fetch(`${SEARCH_CAT_URL}?${params}`)
        .then((responce) => {
            console.log(responce);
            if (!responce.ok) {
                throw new Error(responce.status);  
            }
            return responce.json();
        })
        .catch(error => {
            console.log(error);
            pError.classList.remove('invisible');
        });
}

export { fetchBreeds, fetchCatImage };