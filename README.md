# PRAKTIP
 
**PRAKTIP** ikasenpresaren webgunea. 1.1 Erronkaren (2MSS2, 2026-2027) barruan garatu da. Webguneak enpresaren negozio-eredua sustatzen du, eta HTML5 eta CSS3 erabiliz idatzi da eskuz, euskaraz.
 
## Taldea
 
| Izena | Rola |
|---|---|
| Unai | Koordinatzailea |
| Riyad | Idazkaria |
| Aimar | Bozeramailea eta kontrolatzailea |
 
## Webgunearen edukia
 
Webguneak scroll bidezko nabigazioa du eta atal hauek ditu:
 
- **Erreserba**: egutegia, erreserba egiteko aukera eta eskuragarritasuna.
- **Iritziak**: bezeroen iritziak.
- **Kontaktua**: harremanetarako datuak.
- **Zerbitzuak**: enpresaren zerbitzuak edo produktuak.
- **Informazio orokorra**: enpresari buruzko informazio orokorra.
- Bi urteko salmenten azterketa (Excel-eko grafikoak eta taulak).
- Jasangarritasun-plana.
Bannerra, nabigazio-menua, botoiak, irudiak eta estekak ditu.
 
## Biltegiaren egitura
 
```
.
├── index.html
├── css/
│   └── style.css
├── img/
├── docs/
└── README.md
```
 
Karpeten benetako egitura aldatzen bada, egokitu zuhaitz hau.
 
## Teknologiak
 
- HTML5
- CSS3
- Frameworkik gabe: kodea eskuz idatzi da.
## Inplementazioa
 
Webgunea Ubuntu Server batean argitaratzen da, taldearen sarean (192.168.10.160/27), ISARD ingurunean.
 
1. Biltegiaren edukia web-zerbitzariaren erro-karpetara kopiatu.
2. Igotako fitxategiak osorik daudela egiaztatu.
3. Sareko edozein gailutatik sartu IP helbidearen edo izenaren bidez: `http://[DNS-IZENA]` edo `http://[ZERBITZARIAREN-IP]`.
Beste zerbitzari batean segurtasun-kopia automatikoa dago.
 
## Nola probatu lokalean
 
1. Biltegia klonatu:
```
   git clone [BILTEGIAREN-URLA]
```
2. `index.html` fitxategia nabigatzailean ireki.
## Bateragarritasuna
 
Proba egin den nabigatzaileak: [Firefox, Chrome, Edge: probak egin ondoren bete].
 
## Lan-fluxua
 
- Adar nagusia: `main`.
- Aldaketa garrantzitsu bakoitzaren ondoren commit bat, mezu labur eta argiekin.
- Entregatu aurretik, taldeko beste kide batek aldaketak berrikusten ditu.
## Dokumentazioa
 
Txosten osoa eta gainerako entregagaiak Driveko `TALDE5_ERRONKA1` karpetan daude.
 