import { createMarkerAndPopup } from "./map.js";

fetch('https://raw.githubusercontent.com/WebSnke/The-Stolen-Map/main/museums.json')
    .then(response => response.json())
    .then(museums => {
        for (let museum of museums) {
            createMarkerAndPopup(museum);
        }
    });
