/* Wien OGD Beispiele */

let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

karte.addControl(new L.Control.Fullscreen());


//Wikipedia Artikel laden

const wikipediaGruppe = L.featureGroup().addTo(karte);
layerControl.addOverlay(wikipediaGruppe, "Wikipedia Artikel")


async function wikipediaArtikelLaden(url) {
    wikipediaGruppe.clearLayers();

    console.log("Lade", url);

    const antwort = await fetch(url);
    const jsonDaten = await antwort.json();

    console.log(jsonDaten);
    for (let artikel of jsonDaten.geonames) {
        const wikipediaMarker = L.marker([artikel.lat, artikel.lng], {
            icon: L.icon({
                iconUrl: "icons/Wikipedia-logo-de.png",
                iconSize: [30, 30]
            })
        }).addTo(wikipediaGruppe);

        wikipediaMarker.bindPopup(
            `<h3>${artikel.title}</h3>
            <p>${artikel.summary}</p>
            <footer> <a target="_blank" href="https://${artikel.wikipediaUrl}">Weblink</ a> </footer>`
        );
    }
}
//
let letzteGeonamesUrl = null;

karte.on("load zoomend moveend", function () {
    console.log("Karte geladen", karte.getBounds());

    let ausschnitt = {
        n: karte.getBounds().getNorth(),
        s: karte.getBounds().getSouth(),
        o: karte.getBounds().getEast(),
        w: karte.getBounds().getWest(),
    }
    console.log(ausschnitt);
    const geonamesUrl = `http://api.geonames.org/wikipediaBoundingBoxJSON?formatted=true&north=${ausschnitt.n}&south=${ausschnitt.s}&east=${ausschnitt.o}&west=${ausschnitt.w}&username=hofmjani&style=full&maxRows=5&lang=de`;
    console.log(geonamesUrl);
// Sicherstellen dass man nur dann was abholt wenn sich die URL geändert hat 
    if (geonamesUrl != letzteGeonamesUrl) {
        wikipediaArtikelLaden(geonamesUrl);
        letzteGeonamesUrl=geonamesUrl;
    }
    //Json-Artikel laden

});



karte.setView([48.208333, 16.373056], 11);

// https://github.com/Norkart/Leaflet-MiniMap
new L.Control.MiniMap(
    L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    }), {
        zoomLevelOffset: -4,
        toggleDisplay: true
    }
).addTo(karte);

// die Implementierung der Karte startet hier


//Datengrundlage von data.gv laden
const url = ' https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WLANWIENATOGD&srsName=EPSG:4326&outputFormat=json'



function makeMarker(feature, latlng) { //Marker definieren 
    const fotoIcon = L.icon({ //Icon definieren
        iconUrl: 'http://www.data.wien.gv.at/icons/wlanwienatogd.svg',
        iconSize: [16, 16]
    });
    const wlanMarker = L.marker(latlng, { //marker setzen und icon verwenden 
        icon: fotoIcon
    });
    //Popup definieren: mit den Properties Namen und Bemerkung
    wlanMarker.bindPopup(` 
         <h3>${feature.properties.NAME}</h3>
         <p>Adresse: ${feature.properties.ADRESSE}</p>
         <footer> <a target="blank", href="${feature.properties.WEITERE_INFORMATIONEN}">Weblink</a></footer>
  `);
    return wlanMarker; //Marker ausgeben 
}


async function loadWlan(url) { //Vorbereitung wie beim letzten mal
    const wlanClusterGruppe = L.markerClusterGroup(); // Cluster von Leaflet einfügen (Diese stylsheet und css müssen im html verlinkt werden im header)
    const response = await fetch(url); //Hol die daten vom Url
    const wlanData = await response.json(); //Warte drauf und wandel in das json format um 
    const geoJson = L.geoJson(wlanData, { //Leaflet: soll die Daten aufrufen 
        pointToLayer: makeMarker //wird in eigener Funktion definiert 
    });
    wlanClusterGruppe.addLayer(geoJson);
    karte.addLayer(wlanClusterGruppe);
    layerControl.addOverlay(wlanClusterGruppe, "WLAN Hotspots")
    //Suchfeld einfügen
    const suchFeld = new L.Control.Search({
        layer: wlanClusterGruppe,
        propertyName: "NAME",
        zoom: 17,
        initial: false,
    });
    karte.addControl(suchFeld);

}

loadWlan(url);