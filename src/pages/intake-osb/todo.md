## Changes in intake-osb.tsx:

Opbouw van deze pagina gaat veranderd worden.
Deze page gebruikt form-block componenten. FormCard, FormBlock en FormItemWrapper. (IntakeOVAC laat zien hoe dit kan worden laten zien)
Gebruik intakeOVAC, hier worden veel van deze dingen van gebruikt dus hergebruik die.

0,1. omschijving met welk paar.

0,2. Optie voor Beide/L/R (zie intake vlos met zijde.)

1. Een card met "Functieonderzoek" - Haal dit uit intake-vlos (LET OP, andere blocks erin.)

- Block met doel, gebruik zoals ziektebeelden checkboxen. Maar nu met de doelen. zie: DOEL_OPTIES
- Block met Loopfuctie, Select met de opties: LOOPFUNCTIE_INDICATIE_OPTIES

2. Hier komt een formcard met de gegevens over de supplierAndOrderDate en Product Specificaties

3. Een Card (switch) met de steunzolen/talonette (open). (Dit is een stuk dat gepakt kan worden uit intake-ovac)

- Eerst talonette
- Steunzolen part

4. Card (switch) met "Supplement (van leest)" (description zegt: Dit suplement wordt gemaakt met een gipsmodel dmv een schuimdoos.)

- Hierin L/R optie.

5. Card (switch) Zoolverstijving

- Hierin L/R optie.

6. Card (switch) met "Afwikkelrol (onder schoen)"

- L en R een input box. Met Cm.

 <!-- Notes voor OSB codeGenerator: -->

- Steunzolen nog niet zeker welke code erbij hoort.
- "Supplement (van leest) -> Code 43
- Zoolverstijving -> Code 57
- Afwikkelrol (onder schoen) -> Onder 1cm? 46 anders is het 47.

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
