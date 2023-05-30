import { BASE_URL, API_KEY, SEARCH_CAT_URL } from './constants';


function fetchBreeds() {
    const params = new URLSearchParams({
        'x-api-key': API_KEY,
    });

    return fetch(`${BASE_URL}?${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}

function fetchCatImageUrl(breedId) {
    const  params = new URLSearchParams({
        'x-api-key': API_KEY,
        breed_ids: breedId,
    });
    return fetch(`${SEARCH_CAT_URL}?${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).then((data) => {
            return data[0].url;
        });
}

export { fetchBreeds, fetchCatImageUrl };