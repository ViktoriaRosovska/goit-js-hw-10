function e(){const e=new URLSearchParams({"x-api-key":"live_QsYCCrIuTzATlnLUejzzmT6tB3R4y5lDYCC3dsXctIGp0MgH716kJxF97KxoW4oD"});return fetch(`https://api.thecatapi.com/v1/breeds?${e}`).then((e=>{if(console.log(e),!e.ok)throw new Error(e.status);return e.json()})).catch((e=>{console.log(e),i.classList.remove("invisible")}))}function t(e){const t=new URLSearchParams({"x-api-key":"live_QsYCCrIuTzATlnLUejzzmT6tB3R4y5lDYCC3dsXctIGp0MgH716kJxF97KxoW4oD",breed_ids:e});return fetch(`https://api.thecatapi.com/v1/images/search?${t}`).then((e=>{if(console.log(e),!e.ok)throw new Error(e.status);return e.json()})).catch((e=>{console.log(e),i.classList.remove("invisible")}))}const n=document.querySelector(".breed-select"),o=document.querySelector(".cat-info"),s=document.querySelector(".loader"),i=document.querySelector(".error");function c(e){t(e).then((e=>{console.log(e);const t=document.createElement("img");t.src=e[0].url,t.style.width="300px",t.style.height="250px",t.style.objectFit="contain",o.prepend(t),s.classList.add("invisible")}))}i.classList.add("invisible"),s.classList.add("invisible"),e().then((e=>{console.log(e),function(e){e.map((({id:e,name:t})=>n.add(new Option(t,e))))}(e)})),n.addEventListener("change",(function(){s.classList.remove("invisible"),o.innerHTML="",c(n.value),t=n.value,e().then((e=>{const n=e.findIndex((({id:e})=>e===t));o.insertAdjacentHTML("beforeend",`<h2>${e[n].name}</h2><h3>Description:</h3><p>${e[n].description}</p><h3>Temperament:</h3><p>${e[n].temperament}</p>`)}));var t}));
//# sourceMappingURL=index.1b8f578b.js.map
