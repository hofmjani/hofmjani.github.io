// alert("hello world!");
//hier: deutsche variablen verwenden (in html englische variablen)

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");
const ausmaßlaenge = div.getAttribute("extent-lng");
const ausmaßbreite = div.getAttribute("extent-lat")


//console.log("Breite=",breite,"Länge=",länge,"Titel=",titel);

//Karte initialisieren 

let karte = L.map("map");
//console.log(karte);


//auf ausschnitt zoomen: 
karte.setView(
    [47.2, 11.2], 9
)

//open street map einbinden


const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
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
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Desxign</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),
};


//Kartenlayer hinzufügen! 
kartenLayer.osm.addTo(karte);
//kartenLayer.geolandbasemap.addTo(karte); 
//kartenLayer.bmapoverlay.addTo(karte);
//kartenLayer.bmapgrau.addTo(karte);
//kartenLayer.bbmaphidpi.addTo(karte);
//kartenLayer.bmaporthofoto30cm.addTo(karte);
//kartenLayer.bmapgelaende.addTo(karte);
//kartenLayer.bmapoberflaeche.addTo(karte);



//Auswahlmenue hinzufügen
L.control.layers({
    "OpenStreetMap": kartenLayer.osm,
    "Geoloand Basemap": kartenLayer.geolandbasemap,
    "Geoland Besmap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);



//Positionsmarker hinzufügen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);

let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

//Popup zum Pin hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();



//Schleife vereinfacht das vorgehen! man muss nicht mehr so viel Copy paste machen


let markerGruppe = L.featureGroup().addTo(karte);


for (let blick of adlerblicke) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(markerGruppe);
    blickpin.bindPopup(
        `<h1>Standort: ${blick.standort}</h1>
        <p>Höhe: ${blick.seehoehe}m</p>
        <em>Kunde: ${blick.kunde}</em>
        `
    )
}
//für jedes der variable blick des elements adlerblicks abarbeiten! Vorschleife ist wichtig, dass der marker erstellt wird und dann das popop geöffnet werden 

//karten elemente einbauen: 

karte.fitBounds(markerGruppe.getBounds());
karte.addControl(new L.Control.Fullscreen());
var hash = new L.Hash(karte);
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function (e) {
    coords.setCoordinates(e);
});

//gpx track laden

new L.GPX("AdlerwegEtappe05.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {
    karte.fitBounds(e.target.getBounds());

    // die unsaubere Variante mit den backticks im js ( hier muss  <!--<div id=stats></div>--> im html verlinkt werden! )
    /*const statsDiv=document.getElementById("stats");
    const maxHeight= e.target.get_elevation_max();
    const minHeight=e.target.get_elevation_min();
    const verticalMeters= Math.round(e.target.get_elevation_gain());
    statsDiv.innerHTML= `Routen Statistik: <br> niedrigster Punkt: ${minHeight} m, höchster Punkt: ${maxHeight} m, Höhenunterschied: ${verticalMeters} m`
*/

    // saubere Variante mit dem Text und den Ankern im html doc div inkl span... 
    const minSpan = document.getElementById("min");
    const maxSpan = document.getElementById("max");
    const diffSpan = document.getElementById("diff");
    minSpan.innerHTML = e.target.get_elevation_min();
    maxSpan.innerHTML = e.target.get_elevation_max();
    diffSpan.innerHTML = Math.round(e.target.get_elevation_gain());

}).on('addline', function (e) {
    console.log('linie geladen');
    const controlElevation = L.control.elevation({
        detachedView: true,
        elevationDiv: "#elevation-div",
    });
    controlElevation.addTo(karte);
    controlElevation.addData(e.line);
    const gpxLinie = e.line.getLatLngs();
    console.log(gpxLinie);
    for (let i = 1; i < gpxLinie.length; i += 1) {
        console.log(gpxLinie[i]);
        let p1 = gpxLinie[i - 1];
        let p2 = gpxLinie[i];
        let dist = karte.distance(
            [p1.lat, p1.lng],
            [p2.lat, p2.lng]
        );
        let delta = (p2.meta.ele - p1.meta.ele);
        let proz = (dist != 0 ? delta / dist * 100.0 : 0).toFixed(1);
        //console.log('Distanz: ', dist, 'Höhendiff:', delta, 'Steigung:', proz); -> nur fürs Entwickeln wichtig
        let farbe =
            proz >= 10 ? "#d73027" :
            proz >= 6 ? "#fc8d59" :
            proz >= 2 ? "#fee08b" :
            proz >= 0 ? "#ffffbf" :
            proz >= -6 ? "#d9ef8b" :
            proz >= -10 ? "#91cf60" :
            "#1a9850";
        L.polyline(
            [
                [p1.lat, p1.lng],
                [p2.lat, p2.lng],
            ], {
                color: farbe,
            }
        ).addTo(karte);
    }


});