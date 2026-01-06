## Changes in intake-ovac.tsx:

Opbouw van deze pagina gaat veranderd worden. De codes L/R gaan weg. Die worden wel gebruikt in de codeGenerator.ts.
Deze page gebruikt form-block componenten. FormCard, FormBlock en FormItemWrapper. (Intake VLOS laat zien hoe dit kan worden laten zien)

0,1. omschijving met welk paar.

0,2. Optie voor Beide/L/R (zie intake vlos met zijde.)

1. Een Card (switch) met de steunzolen/talonette (open). (Dit is een stuk dat gepakt kan worden uit intake-steunzolen)

- Eerst talonette (uit steunzolen page)
- Steunzolen part
  (Geen prijs dus!)

2. Card (switch) met "Supplement (van leest)" (info zegt: Dit suplement wordt gemaakt met een gipsmodel dmv een schuimdoos.)

- Hierin L/R optie.

3. Card (switch) Zoolverstijving

- Hierin L/R optie.

4. Card (switch) met "Afwikkelrol (onder schoen)"

- L en R een input box. Met Cm.

5. Card (switch) met "Hakzool verhoging"

- L en R een input box. Met Cm.

6. Card (switch) met "Nieuwe wreefsluiting"

- Hierin L/R optie.

 <!-- Notes voor OVAC codeGenerator: -->
 <!-- Maak dit voor nu alleen als comments onder elkaar bij het OVAC gedeelte in codeGenerator.ts -->

- Steunzolen nog niet zeker welke code erbij hoort.
- "Supplement (van leest) -> Code 71
- Zoolverstijving -> Code 85
- Afwikkelrol (onder schoen) -> Onder 1cm? 74 anders is het 75.
- "Hakzool verhoging" -> Code 76, 77 of 78. Onder 2 is 76, tussen 2 en 3 is 77, tussen 3 en 7 is 78.
- "Nieuwe wreefsluiting" -> code 88

## Changes in codeGenerator.ts:

### OSB:

The following codes should be shown in the generalCode. So always 42 exept when insurance is DSW, then it should be 42 with a text.
Always keep the subcodes, this only adds the generalBasisCode
Cluster means that one subcode means there is an clusterprice.
// ASR: OSB Cluster (Hoofdcode: 42)
// Caresq: OSB Cluster (Hoofdcode: 42)
// CZ: OSB Cluster (Hoofdcode: 42)
// DSW: OSB Opbouw (Hoofdcode: 42, met tekst ("Administratie zelf opbouwen!"))
// Menzis: OSB Cluster (Hoofdcode: 42)
// ONVZ: OSB Cluster (Hoofdcode: 42)
// Salland: OSB Cluster (Hoofdcode: 42)
// VGZ: OSB Cluster (Hoofdcode: 42)
// ZK: OSB Cluster (Hoofdcode: 42)
// Zorg en Zekerheid: OSB Cluster (Hoofdcode: 42)

### OVAC:

The following codes should be shown in the generalCode. There are edgecases.
When L, R, and Both are shown it means there is an clusterprice but depending on Left or Right
Carseq only uses the subcodes. (just like is being used right now.)
The other option is Cluster with only 70.
Cluster means that one subcode means there is an cluster (with the exeption of a L/R cluster)

// ASR: OVAC Cluster (hoofdcode: 70 L of 70 R of 70 Both)
// Caresq: OVAC Cluster per stuk (Geen hoofdcode, wel subcodes)
// CZ: OVAC Cluster (Hoofdcode: Hoofdcode: 70)
// DSW: OVAC Opbouw (Hoofdcode: 70, met tekst ("Administratie zelf opbouwen!"))
// Menzis: OVAC Cluster (Hoofdcode: 70 L of 70 R of 70 Both)
// ONVZ: OVAC Cluster (Hoofdcode: 70 L of 70 R or 70 Both)
// Salland: OVAC Cluster (Hoofdcode: 70 L of 70 R or 70 Both)
// VGZ: OVAC Cluster (Hoofdcode: 70)
// ZK: OVAC Cluster (Hoofdcode: 70)
// Zorg en Zekerheid: OVAC Cluster (Hoofdcode: 70)
