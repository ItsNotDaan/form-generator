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

## Changes in intake-ovac.tsx:
