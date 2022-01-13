const APIKEY = "bb8d68b5c13e0349f5f129c878f2eb3b"; //PUBLIC KEY
const HASH = "f424d57bc55fd89db75fa1e4ee8ebd35"; //HASH
const TS = "1";
const URL = "http://gateway.marvel.com/v1/public/";
//const URL ="/data/";
async function sendRequest(path) {
    // 1. Hacer Peticion
    const response = await fetch(
      URL +
        path +
        "?ts=" +
        TS +
        "&apikey=" +
        APIKEY +
        "&hash=" +
        HASH
    );
    // Validar la respuesta
    if (!response.ok) throw Error(response.statusText);
    // Extraer la información
    const json = await response.json();
    return json.data.results;
  }
  
  // Crear la funcion main para consumir el recurso...
  async function main() {
    const comics = await sendRequest("comics");
    console.log(comics);
    //PROCESAR INFORMACION
  
    const container = document.getElementById(
      "card_container"
    );
  
    comics.forEach((comic) => {
        const template = document.querySelector(
          "#card_template"
        );
        const clone = template.cloneNode(true);
        clone.removeAttribute("style"); // removiendo el diplay:none
        // console.log(clone.children[0].children[1].children[0]);// H5
        // IMAGEN
        clone
          .querySelector(".comic_img")
          .setAttribute(
            "src",
            `${comic.thumbnail.path}.${comic.thumbnail.extension}`
          );
        // TITULO
        clone.querySelector(".comic_name").textContent =
          comic.title;
    
        container.appendChild(clone);
      });
    }
main();

