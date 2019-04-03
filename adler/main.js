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

//L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
   // subdomains: ["a","b","c"], 
   // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
//}).addTo(karte); 



L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",{
    subdomains : ["maps", "maps1","maps2", "maps3", "maps4"],
    attribution : 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
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

karte.fitBounds(markerGruppe.getBounds())


//für jedes der variable blick des elements adlerblicks abarbeiten! Vorschleife ist wichtig, dass der marker erstellt wird und dann das popop geöffnet werden 