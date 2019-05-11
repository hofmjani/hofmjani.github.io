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
//karte.setView(
// [47.2, 11.2], 9
//)

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


//Auswahlmenue hinzufügen
const layerControl = L.control.layers({
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


karte.setView([
    47.267222, 11.392778
], 15);


//console.log(AWS);

async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            //console.log("Layer",layer);
            const date = new Date(layer.feature.properties.date);
            console.log("Datum:", date);
            return `<h4>${layer.feature.properties.name}</h4>
            Höhe [m] : ${layer.feature.geometry.coordinates[2]} <br>
            Temperatur: ${layer.feature.properties.LT} °C <br>
            Datum: ${date.toLocaleDateString("de-AT")}
            ${date.toLocaleTimeString("de-AT")} <br>
            Windgeschwindigkeit [km/h]: 
            ${layer.feature.properties.WG ? layer.feature.properties.WG : `keine Daten `}
            <hr>
            <footer> Quelle: Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at </a>
            </footer> 
            `;
        })
        .addTo(awsTirol);

    karte.fitBounds(awsTirol.getBounds())
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");
    //awsTirol.addTo(karte)

    //Windgeschwindigkeit mit Symbolen auf Karte anzeigen
    const windLayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = 'black';
                if (feature.properties.WG > 20) {
                    color = 'red';
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style=" color:${color};transform: rotate(${feature.properties.WR}deg)"class="fas fa-arrow-alt-circle-up fa-2x"></i>`
                    })
                });

            }

        }

    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    //windLayer.addTo(karte)



    //Temperatur mit Symbolen auf Karte anzeigen
    const temperaturLayer = L.featureGroup();
    const farbPalette = [

        [-28, "#646664"],
        [-26, "#8c8a8c"],
        [-24, "#b4b2b4"],
        [-22, "#cccecc"],
        [-20, "#e4e6e4"],
        [-18, "#772d76"],
        [-16, "#b123b0"],
        [-14, "#d219d1"],
        [-12, "#f0f"],
        [-10, "#ff94ff"],
        [-8, "#3800d1"],
        [-6, "#325afe"],
        [-4, "#2695ff"],
        [-2, "#00cdff"],
        [0, "#007800"],
        [2, "#009d00"],
        [4, "#00bc02"],
        [6, "#00e200"],
        [8, "#0f0"],
        [10, "#fcff00"],
        [12, "#fdf200"],
        [14, "#fde100"],
        [16, "#ffd100"],
        [18, "#ffbd00"],
        [20, "#ffad00"],
        [22, "#ff9c00"],
        [24, "#ff7800"],
        [26, "red"],
        [28, "#f30102"],
        [30, "#d20000"],
        [32, "#c10000"],
        [34, "#b10000"],
        [36, "#a10000"],
        [38, "#900000"],
        [40, "#770100"],
        [42, "#5f0100"],
        [44, "#460101"],
        [46, "#2e0203"],
    ];
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                // Farbe des letzten Eintrags der Farbpalette als Standardfarbe setzen 
                let color = farbPalette[farbPalette.length - 1][1];

                // jeden Temperaturwert mit den Schwellen der Farbpalette vergleichen
                for (let i = 0; i < farbPalette.length; i++) {
                    //console.log(farbPalette[i],feature.properties.LT);
                    if (feature.properties.LT < farbPalette[i][0]) {
                        // der Temperaturwert ist kleiner als die Schwelle -> die entsprechende Farbe zuweisen
                        color = farbPalette[i][1];

                        // Überprüfung beenden, weil die Farbe bereits ermittelt ist
                        break;
                    } else {
                        // weiter zum nächsten Schwellenwert
                    }
                }
                // Marker mit Temperaturwert und Hintergrundfarbe zurückgeben
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(temperaturLayer);
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    temperaturLayer.addTo(karte)







}

loadStations();