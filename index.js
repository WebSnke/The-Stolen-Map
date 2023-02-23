import { createMarkerAndPopup } from "./map.js";
import museums from '../museums.json' assert {type: 'json'};

for (let museum of museums) {
    createMarkerAndPopup(museum);

    for (let artifact of museum.artifacts) {
        createMarkerAndPopup(artifact);
    }
}