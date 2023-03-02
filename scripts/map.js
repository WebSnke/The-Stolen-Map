var map = L.map('map').setView([30, 0], 3);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    noWrap: true,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var blackIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export function createMarkerAndPopup(item, museum) {
    let iconColor;
    let borderColor;
    let licenseLink;
    let attributionLink;
    museum = Object.assign({}, museum);

    if (item.hasOwnProperty('artifacts')) {
        iconColor = blackIcon;
        borderColor = '#3D3D3D';
    } else {
        iconColor = redIcon;
        borderColor = '#CB2B3E';
    }

    if (item.image.license.slice(0, 2) === 'CC') {
        licenseLink = `https://creativecommons.org/licenses/${item.image.license.split(' ')[1].toLowerCase()}/${item.image.license.split(' ')[2]}`;
    } else if (item.image.license === 'Public Domain') {
        licenseLink = `https://creativecommons.org/share-your-work/public-domain/`;
    } else {
        licenseLink = `https://en.wikipedia.org/wiki/${item.image.license}`;
    }

    if (item.image.attribution.hasOwnProperty('link')) {
        attributionLink = `<a href="${item.image.attribution.link}">${item.image.attribution.name}</a>`;
    } else {
        attributionLink = `${item.image.attribution.name}`;
    }

    L.marker([item.coordinates.latitude, item.coordinates.longitude], { icon: iconColor, alt: item.name, title: item.name })
        .bindPopup(
            `<h2>${item.name}</h2>
            <div class="museum">${museum.name}</div>
            <figure>
                <img class="image" src="${item.image.link}" style="border: 2px solid ${borderColor}">
                <figcaption>By ${attributionLink}, licensed under <a href="${licenseLink}">${item.image.license}</a></figcaption>
            </figure>
            <p>${item.description.general}</p>
            <p>${item.description.dispute}<br> — <a href="${item.description.source}">Source</a></p>`
        )
        .openPopup()
        .addTo(map);
}
