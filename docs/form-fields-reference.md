# Form Generator - Word Document Field Reference

This document provides a complete reference of all form fields available for Word document mail merge extraction. Fields are organized by form type, with shared ClientData appearing in every form type.

## ClientData (Common to All Form Types)

All form types share these client information fields.

### Practitioner & Date

| Dutch Name   | Example    | Word Code           |
| ------------ | ---------- | ------------------- |
| Aanmeetdatum | 2025-01-07 | `${date}`           |
| Praktijk ID  | PRAK001    | `${practitionerId}` |

### Intake Form Type

| Dutch Name  | Example | Word Code       |
| ----------- | ------- | --------------- |
| Intake Type | VLOS    | `${intakeType}` |

### Location

| Dutch Name | Example | Word Code     |
| ---------- | ------- | ------------- |
| Locatie    | FZ      | `${location}` |

### Personal Information

| Dutch Name    | Example    | Word Code       | Required |
| ------------- | ---------- | --------------- | -------- |
| Aanhef        | Dhr.       | `${salutation}` | Optional |
| Voorletters   | J.A.       | `${initials}`   | Yes      |
| Achternaam    | Jansen     | `${clientName}` | Yes      |
| Geboortedatum | 1965-03-15 | `${birthDate}`  | Yes      |

### Address Information

| Dutch Name | Example     | Word Code        | Required |
| ---------- | ----------- | ---------------- | -------- |
| Postcode   | 1234AB      | `${postalCode}`  | Yes      |
| Huisnummer | 123-A       | `${houseNumber}` | Yes      |
| Stad       | Amsterdam   | `${city}`        | Yes      |
| Straatnaam | Hoofdstraat | `${address}`     | Yes      |

### Contact Information

| Dutch Name  | Example            | Word Code     | Required |
| ----------- | ------------------ | ------------- | -------- |
| Telefoon 1  | 06-12345678        | `${phoneOne}` | Yes      |
| Telefoon 2  | 020-1234567        | `${phoneTwo}` | Optional |
| E-mailadres | client@example.com | `${email}`    | Yes      |

### Medical Information

| Dutch Name          | Example          | Word Code              | Required |
| ------------------- | ---------------- | ---------------------- | -------- |
| Medische Indicatie  | Plantarfasciitis | `${medicalIndication}` | Optional |
| Verzekeraar         | Achmea           | `${insurance}`         | Yes      |
| Specialist/Huisarts | Dr. de Vries     | `${specialist}`        | Optional |

---

## VLOS - Vormgegeven Laarzen Orthopedische Schoeiing

### ClientData

_(See ClientData section above)_

### Generated Medical Codes

The following medical codes are generated based on selected VLOS options:

| Code              | Description                        |
| ----------------- | ---------------------------------- |
| `${code01}`       | VLOS - Eerste paar                 |
| `${code02}`       | VLOS - Herhaling/Reservepaar       |
| `${code09Links}`  | Proefschoen Links                  |
| `${code09Rechts}` | Proefschoen Rechts                 |
| `${code15Links}`  | Zoolverstijving Links              |
| `${code15Rechts}` | Zoolverstijving Rechts             |
| `${code16Links}`  | Ezelsoor (mediaal/lateraal) Links  |
| `${code16Rechts}` | Ezelsoor (mediaal/lateraal) Rechts |
| `${code17Links}`  | Koker tussen voering Links         |
| `${code17Rechts}` | Koker tussen voering Rechts        |
| `${code50Links}`  | Diverse Amputaties Links           |
| `${code50Rechts}` | Diverse Amputaties Rechts          |

### Form-Specific Fields

#### Functieonderzoek (Function Examination)

| Dutch Name                 | Example                 | Word Code                     | Required | Type                    |
| -------------------------- | ----------------------- | ----------------------------- | -------- | ----------------------- |
| Pathologieën               | Ja/Nee (per pathologie) | `${pathologies}`              | Optional | Record<string, boolean> |
| Loophulpmiddelen           | Ja/Nee (per type)       | `${walkingDistanceAids}`      | Optional | Record<string, boolean> |
| Pijnperceptie              | Matig                   | `${painPerception}`           | Optional | Text                    |
| Inspectie voeten           | Ja/Nee (per aspect)     | `${footInspection}`           | Optional | Record<string, boolean> |
| Beenlengte verschil links  | 1.5                     | `${legLengthDifferenceLeft}`  | Optional | cm                      |
| Beenlengte verschil rechts | 1.5                     | `${legLengthDifferenceRight}` | Optional | cm                      |

#### Basic Information

| Dutch Name         | Example                | Word Code              | Required | Type |
| ------------------ | ---------------------- | ---------------------- | -------- | ---- |
| Paartype           | Eerste paar            | `${whichPair}`         | Optional | Text |
| Medische Indicatie | Diabetische voet       | `${medicalIndication}` | Optional | Text |
| Zijde              | Links / Rechts / Beide | `${side}`              | Yes      | Side |

#### Shaft (Schaft)

| Dutch Name           | Example | Word Code             | Required | Type |
| -------------------- | ------- | --------------------- | -------- | ---- |
| Schachthoogte links  | 18      | `${shaftHeightLeft}`  | Optional | cm   |
| Schachthoogte rechts | 18      | `${shaftHeightRight}` | Optional | cm   |

#### Enclosure/Padding (Omsluiting)

| Dutch Name             | Example           | Word Code             | Required | Type                    |
| ---------------------- | ----------------- | --------------------- | -------- | ----------------------- |
| Omsluiting links       | Ja/Nee (per type) | `${enclosureLeft}`    | Yes      | Record<string, boolean> |
| Omsluiting rechts      | Ja/Nee (per type) | `${enclosureRight}`   | Yes      | Record<string, boolean> |
| Omsluiting links (mm)  | 5                 | `${enclosureLeftMm}`  | Optional | Record<string, string>  |
| Omsluiting rechts (mm) | 5                 | `${enclosureRightMm}` | Optional | Record<string, string>  |

#### Supplement Shoring (Supplement Schoring)

| Dutch Name                              | Example  | Word Code                            | Required | Type             |
| --------------------------------------- | -------- | ------------------------------------ | -------- | ---------------- |
| Supplement schoring links ingeschakeld  | Ja       | `${customInsoleShoringLeftEnabled}`  | Yes      | Boolean          |
| Supplement schoring rechts ingeschakeld | Ja       | `${customInsoleShoringRightEnabled}` | Yes      | Boolean          |
| Supplement schoring links type          | Mediaal  | `${customInsoleShoringLeftType}`     | Optional | Mediaal/Lateraal |
| Supplement schoring rechts type         | Lateraal | `${customInsoleShoringRightType}`    | Optional | Mediaal/Lateraal |

#### Sole Stiffening (Zoolverstijving)

| Dutch Name                   | Example | Word Code                     | Required | Type    |
| ---------------------------- | ------- | ----------------------------- | -------- | ------- |
| Zoolverstijving ingeschakeld | Ja      | `${soleReinforcementEnabled}` | Yes      | Boolean |
| Zoolverstijving links        | Ja      | `${soleReinforcementLeft}`    | Optional | Boolean |
| Zoolverstijving rechts       | Nee     | `${soleReinforcementRight}`   | Optional | Boolean |

#### Closure & Tongue (Sluiting & Tong)

| Dutch Name               | Example      | Word Code                 | Required | Type                     |
| ------------------------ | ------------ | ------------------------- | -------- | ------------------------ |
| Sluitingstype            | Haken/Ringen | `${closureType}`          | Optional | Haken/Ringen/Klittenband |
| Inschotpunt              | 12           | `${entryPoint}`           | Optional | cm                       |
| Openstand schacht        | 8            | `${shaftOpeningWidth}`    | Optional | cm                       |
| Tongpolster ingeschakeld | Ja           | `${tonguePaddingEnabled}` | Yes      | Boolean                  |
| Vaste tong ingeschakeld  | Nee          | `${fixedTongueEnabled}`   | Yes      | Boolean                  |

#### Heel (Hak)

| Dutch Name       | Example  | Word Code            | Required | Type |
| ---------------- | -------- | -------------------- | -------- | ---- |
| Haksoort links   | Steunhak | `${heelTypeLeft}`    | Optional | Text |
| Haksoort rechts  | Steunhak | `${heelTypeRight}`   | Optional | Text |
| Hakhoogte links  | 3.5      | `${heelHeightLeft}`  | Optional | cm   |
| Hakhoogte rechts | 3.5      | `${heelHeightRight}` | Optional | cm   |

#### Heel Shoring/Wedge (Hak Schoring)

| Dutch Name                       | Example | Word Code                  | Required | Type             |
| -------------------------------- | ------- | -------------------------- | -------- | ---------------- |
| Hak schoring links ingeschakeld  | Ja      | `${heelWedgeLeftEnabled}`  | Yes      | Boolean          |
| Hak schoring rechts ingeschakeld | Nee     | `${heelWedgeRightEnabled}` | Yes      | Boolean          |
| Hak schoring links type          | Mediaal | `${heelWedgeLeftType}`     | Optional | Mediaal/Lateraal |
| Hak schoring rechts type         | Mediaal | `${heelWedgeRightType}`    | Optional | Mediaal/Lateraal |

#### Heel Rounding (Hakafrondingen)

| Dutch Name                         | Example | Word Code                     | Required | Type    |
| ---------------------------------- | ------- | ----------------------------- | -------- | ------- |
| Hakafrondingen links ingeschakeld  | Ja      | `${heelRoundingLeftEnabled}`  | Yes      | Boolean |
| Hakafrondingen rechts ingeschakeld | Ja      | `${heelRoundingRightEnabled}` | Yes      | Boolean |
| Hakafrondingen links hoogte        | 3       | `${heelRoundingLeftHeight}`   | Optional | mm      |
| Hakafrondingen links lengte        | 5       | `${heelRoundingLeftLength}`   | Optional | mm      |
| Hakafrondingen rechts hoogte       | 3       | `${heelRoundingRightHeight}`  | Optional | mm      |
| Hakafrondingen rechts lengte       | 5       | `${heelRoundingRightLength}`  | Optional | mm      |

#### Donkey Ear (Ezelsoor)

| Dutch Name                   | Example | Word Code                  | Required | Type             |
| ---------------------------- | ------- | -------------------------- | -------- | ---------------- |
| Ezelsoor links ingeschakeld  | Ja      | `${donkeyEarLeftEnabled}`  | Yes      | Boolean          |
| Ezelsoor rechts ingeschakeld | Nee     | `${donkeyEarRightEnabled}` | Yes      | Boolean          |
| Ezelsoor links type          | Mediaal | `${donkeyEarLeftType}`     | Optional | Mediaal/Lateraal |
| Ezelsoor rechts type         | Mediaal | `${donkeyEarRightType}`    | Optional | Mediaal/Lateraal |

#### Amputation (Amputatie)

| Dutch Name                    | Example | Word Code                   | Required | Type    |
| ----------------------------- | ------- | --------------------------- | -------- | ------- |
| Amputatie links ingeschakeld  | Nee     | `${amputationLeftEnabled}`  | Yes      | Boolean |
| Amputatie rechts ingeschakeld | Nee     | `${amputationRightEnabled}` | Yes      | Boolean |

#### Other VLOS Fields

| Dutch Name             | Example                 | Word Code            | Required | Type |
| ---------------------- | ----------------------- | -------------------- | -------- | ---- |
| Loopzooltype           | Rocker                  | `${rockerSoleType}`  | Optional | Text |
| Gegenereerde basiscode | 01                      | `${generalBaseCode}` | Optional | 1-8  |
| Bijzonderheden         | Patiënt draagt orthesen | `${specialNotes}`    | Optional | Text |

---

## OSA - Orthopedische Schoeiing met Aftrap

### ClientData

_(See ClientData section above)_

### Generated Medical Codes

The following medical codes are generated based on selected OSA options:

| Code              | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `${code03}`       | Laag OSA (<12cm schachthoogte) - Eerste paar                  |
| `${code04}`       | Laag OSA (<12cm schachthoogte) - Herhaling/Reservepaar        |
| `${code05}`       | Half-hoog OSA (12-18cm schachthoogte) - Eerste paar           |
| `${code06}`       | Half-hoog OSA (12-18cm schachthoogte) - Herhaling/Reservepaar |
| `${code07}`       | Hoog OSA (>18cm schachthoogte) - Eerste paar                  |
| `${code08}`       | Hoog OSA (>18cm schachthoogte) - Herhaling/Reservepaar        |
| `${code09Links}`  | Proefschoen Links                                             |
| `${code09Rechts}` | Proefschoen Rechts                                            |
| `${code15Links}`  | Zoolverstijving Links                                         |
| `${code15Rechts}` | Zoolverstijving Rechts                                        |
| `${code16Links}`  | Ezelsoor (mediaal/lateraal) Links                             |
| `${code16Rechts}` | Ezelsoor (mediaal/lateraal) Rechts                            |
| `${code17Links}`  | Koker tussen voering Links                                    |
| `${code17Rechts}` | Koker tussen voering Rechts                                   |
| `${code50Links}`  | Diverse Amputaties Links                                      |
| `${code50Rechts}` | Diverse Amputaties Rechts                                     |

### Form-Specific Fields

All VLOS fields apply (see VLOS section above), plus the following OSA-specific fields:

#### Functieonderzoek (Function Examination)

_(Same as VLOS - see VLOS section)_

#### Digitaal Section

| Dutch Name                | Example                  | Word Code                | Required | Type        |
| ------------------------- | ------------------------ | ------------------------ | -------- | ----------- |
| Digitaal ingeschakeld     | Ja                       | `${digitalEnabled}`      | Optional | Boolean     |
| Hakheffing links          | 2                        | `${heelLiftLeft}`        | Optional | cm          |
| Hakheffing rechts         | 2                        | `${heelLiftRight}`       | Optional | cm          |
| Leesthoogte               | 20                       | `${lastHeight}`          | Optional | 15/20/25 cm |
| MTP1 diepte links         | 4                        | `${mtp1DeepLeft}`        | Optional | 4/8 cm      |
| MTP1 diepte rechts        | 4                        | `${mtp1DeepRight}`       | Optional | 4/8 cm      |
| Klawteentjes ingeschakeld | Nee                      | `${clawToesEnabled}`     | Optional | Boolean     |
| Gescand met folie         | Ja                       | `${scannedWithFoil}`     | Optional | Boolean     |
| Digitale instructies      | Voet plat tegen het glas | `${digitalInstructions}` | Optional | Text        |

---

## OSB - Orthopedische Schoeiing met Bijzondere Zolen

### ClientData

_(See ClientData section above)_

### Generated Medical Codes

The following medical codes are generated based on selected OSB options:

| Code              | Description                             |
| ----------------- | --------------------------------------- |
| `${code42}`       | OSB Cluster (Basis code)                |
| `${code43Links}`  | Supplement Individueel Links            |
| `${code43Rechts}` | Supplement Individueel Rechts           |
| `${code46Links}`  | Afwikkelrol Eenvoudig (<1cm) Links      |
| `${code46Rechts}` | Afwikkelrol Eenvoudig (<1cm) Rechts     |
| `${code47Links}`  | Afwikkelrol Gecompliceerd (≥1cm) Links  |
| `${code47Rechts}` | Afwikkelrol Gecompliceerd (≥1cm) Rechts |
| `${code57Links}`  | Zoolverstijving Links                   |
| `${code57Rechts}` | Zoolverstijving Rechts                  |

### Form-Specific Fields

#### Basic Information

| Dutch Name         | Example                | Word Code              | Required | Type            |
| ------------------ | ---------------------- | ---------------------- | -------- | --------------- |
| Paartype           | Eerste paar            | `${whichPair}`         | Optional | Text            |
| Medische Indicatie | Reumatoïde artritis    | `${medicalIndication}` | Optional | Text            |
| Zijde              | Links / Rechts / Beide | `${side}`              | Optional | left/right/both |

#### Functieonderzoek (Function Examination)

| Dutch Name            | Example            | Word Code                      | Required | Type                    |
| --------------------- | ------------------ | ------------------------------ | -------- | ----------------------- |
| Doel                  | Ja/Nee (per doel)  | `${goal}`                      | Optional | Record<string, boolean> |
| Loopfunctie indicatie | Evenwichtsstoornis | `${walkingFunctionIndication}` | Optional | Text                    |
| Loopfunctie anders    | Aangepast lopen    | `${walkingFunctionOtherText}`  | Optional | Text                    |

#### Supplier and Product

| Dutch Name  | Example     | Word Code                              | Required | Type |
| ----------- | ----------- | -------------------------------------- | -------- | ---- |
| Leverancier | Bauerfeind  | `${supplierName}`                      | Optional | Text |
| Besteldatum | 2025-01-07  | `${orderDate}`                         | Optional | Date |
| Artikelcode | 55235       | `${productSpecifications.articleCode}` | Optional | Text |
| Lengtemaat  | M           | `${productSpecifications.lengthSize}`  | Optional | Text |
| Breedte     | Normaal     | `${productSpecifications.width}`       | Optional | Text |
| Kleur       | Zwart       | `${productSpecifications.color}`       | Optional | Text |
| Sluiting    | Klittenband | `${productSpecifications.closure}`     | Optional | Text |

#### Steunzolen/Talonette Section

| Dutch Name           | Example           | Word Code                     | Required | Type |
| -------------------- | ----------------- | ----------------------------- | -------- | ---- |
| Hakheffing links     | 2.5               | `${heelRaiseLeft}`            | Optional | cm   |
| Hakheffing rechts    | 2.5               | `${heelRaiseRight}`           | Optional | cm   |
| Steunzooltype        | Volledige breedte | `${insoleTypeGeneral}`        | Optional | Text |
| Steunzool anders     | Aangepast type    | `${insoleOtherText}`          | Optional | Text |
| Middenvoet correctie | Mediaal           | `${insoleMidfootCorrection}`  | Optional | Text |
| Voorvoet correctie   | Lateraal          | `${insoleForefootCorrection}` | Optional | Text |
| Voorvoet pad         | Metatarsaal pad   | `${insoleForefootPad}`        | Optional | Text |

#### Supplement (Supplement van Leest)

| Dutch Name                           | Example | Word Code                        | Required | Type    |
| ------------------------------------ | ------- | -------------------------------- | -------- | ------- |
| Aangepaste insole individueel links  | Ja      | `${customInsoleIndividualLeft}`  | Optional | Boolean |
| Aangepaste insole individueel rechts | Nee     | `${customInsoleIndividualRight}` | Optional | Boolean |

#### Zoolverstijving

| Dutch Name             | Example | Word Code                   | Required | Type    |
| ---------------------- | ------- | --------------------------- | -------- | ------- |
| Zoolverstijving links  | Ja      | `${soleReinforcementLeft}`  | Optional | Boolean |
| Zoolverstijving rechts | Ja      | `${soleReinforcementRight}` | Optional | Boolean |

#### Afwikkelrol (Rocker Roll Under Shoe)

| Dutch Name              | Example | Word Code              | Required | Type |
| ----------------------- | ------- | ---------------------- | -------- | ---- |
| Afwikkelrol links (cm)  | 0.8     | `${rockerRollCmLeft}`  | Optional | cm   |
| Afwikkelrol rechts (cm) | 0.8     | `${rockerRollCmRight}` | Optional | cm   |

#### Other OSB Fields

| Dutch Name     | Example                | Word Code         | Required | Type |
| -------------- | ---------------------- | ----------------- | -------- | ---- |
| Bijzonderheden | Voorzichtig aantrekken | `${specialNotes}` | Optional | Text |

---

## OVAC - Overige Voorzieningen Aangepaste Voetkleding

### ClientData

_(See ClientData section above)_

### Generated Medical Codes

The following medical codes are generated based on selected OVAC options:

| Code                      | Description                              |
| ------------------------- | ---------------------------------------- |
| `${code70}`               | OVAC Cluster (Main code)                 |
| `${code70Links}`          | OVAC Links (insurer-specific)            |
| `${code70Rechts}`         | OVAC Rechts (insurer-specific)           |
| `${code71Links}`          | Supplement Individueel Links             |
| `${code71Rechts}`         | Supplement Individueel Rechts            |
| `${code74Links}`          | Eenvoudige Afwikkelrol (<1cm) Links      |
| `${code74Rechts}`         | Eenvoudige Afwikkelrol (<1cm) Rechts     |
| `${code75Links}`          | Gecompliceerde Afwikkelrol (≥1cm) Links  |
| `${code75Rechts}`         | Gecompliceerde Afwikkelrol (≥1cm) Rechts |
| `${code76Links}`          | Hak Aanpassing t/m 2cm Links             |
| `${code76Rechts}`         | Hak Aanpassing t/m 2cm Rechts            |
| `${code77Links}`          | Hak Zool Verhoging t/m 3cm Links         |
| `${code77Rechts}`         | Hak Zool Verhoging t/m 3cm Rechts        |
| `${code78Links}`          | Hak Zool Verhoging t/m 7cm Links         |
| `${code78Rechts}`         | Hak Zool Verhoging t/m 7cm Rechts        |
| `${code84Links}`          | Aangepaste Hakken Links                  |
| `${code84Rechts}`         | Aangepaste Hakken Rechts                 |
| `${code85Links}`          | Zoolverstijving Links                    |
| `${code85Rechts}`         | Zoolverstijving Rechts                   |
| `${code88Links}`          | Nieuwe Wreefsluiting Links               |
| `${code88Rechts}`         | Nieuwe Wreefsluiting Rechts              |
| `${codeVerkortingLinks}`  | Verkorting Links                         |
| `${codeVerkortingRechts}` | Verkorting Rechts                        |

### Form-Specific Fields

#### Basic Information

| Dutch Name         | Example           | Word Code              | Required | Type |
| ------------------ | ----------------- | ---------------------- | -------- | ---- |
| Paartype           | Eerste paar       | `${whichPair}`         | Optional | Text |
| Medische Indicatie | Spastische parese | `${medicalIndication}` | Optional | Text |

#### Omschrijving Items (9 items × 2 sides)

| Dutch Name                           | Example | Word Code                        | Required | Type    |
| ------------------------------------ | ------- | -------------------------------- | -------- | ------- |
| Aangepaste insole individueel links  | Ja      | `${customInsoleIndividualLeft}`  | Optional | Boolean |
| Aangepaste insole individueel rechts | Ja      | `${customInsoleIndividualRight}` | Optional | Boolean |
| Eenvoudige afwikkelrol links         | Nee     | `${simpleRockerLeft}`            | Optional | Boolean |
| Eenvoudige afwikkelrol rechts        | Nee     | `${simpleRockerRight}`           | Optional | Boolean |
| Gecompliceerde afwikkelrol links     | Ja      | `${complicatedRockerLeft}`       | Optional | Boolean |
| Gecompliceerde afwikkelrol rechts    | Ja      | `${complicatedRockerRight}`      | Optional | Boolean |
| Hak aanpassing t/m 2cm links         | Nee     | `${heelAdjustment2cmLeft}`       | Optional | Boolean |
| Hak aanpassing t/m 2cm rechts        | Nee     | `${heelAdjustment2cmRight}`      | Optional | Boolean |
| Hak zool verhoging t/m 3cm links     | Ja      | `${heelSoleElevation3cmLeft}`    | Optional | Boolean |
| Hak zool verhoging t/m 3cm rechts    | Ja      | `${heelSoleElevation3cmRight}`   | Optional | Boolean |
| Hak zool verhoging t/m 7cm links     | Nee     | `${heelSoleElevation7cmLeft}`    | Optional | Boolean |
| Hak zool verhoging t/m 7cm rechts    | Nee     | `${heelSoleElevation7cmRight}`   | Optional | Boolean |
| Aangepaste hakken links              | Ja      | `${adjustedHeelsLeft}`           | Optional | Boolean |
| Aangepaste hakken rechts             | Ja      | `${adjustedHeelsRight}`          | Optional | Boolean |
| Zoolverstijving links                | Ja      | `${soleReinforcementLeft}`       | Optional | Boolean |
| Zoolverstijving rechts               | Ja      | `${soleReinforcementRight}`      | Optional | Boolean |
| Nieuwe wreefsluiting links           | Nee     | `${newInstepClosureLeft}`        | Optional | Boolean |
| Nieuwe wreefsluiting rechts          | Nee     | `${newInstepClosureRight}`       | Optional | Boolean |

#### Verkorting (Shortening)

| Dutch Name                 | Example | Word Code            | Required | Type    |
| -------------------------- | ------- | -------------------- | -------- | ------- |
| Verkorting links           | Ja      | `${shorteningLeft}`  | Optional | Boolean |
| Verkorting rechts          | Nee     | `${shorteningRight}` | Optional | Boolean |
| Voorvoet verkorting links  | 1.5     | `${forefootCmLeft}`  | Optional | cm      |
| Voorvoet verkorting rechts | 1.5     | `${forefootCmRight}` | Optional | cm      |
| Hakvoet verkorting links   | 2.0     | `${heelCmLeft}`      | Optional | cm      |
| Hakvoet verkorting rechts  | 2.0     | `${heelCmRight}`     | Optional | cm      |

#### Afwikkelrol & Hakzool Verhoging

| Dutch Name                    | Example | Word Code                     | Required | Type |
| ----------------------------- | ------- | ----------------------------- | -------- | ---- |
| Afwikkelrol links (cm)        | 0.8     | `${rockerRollCmLeft}`         | Optional | cm   |
| Afwikkelrol rechts (cm)       | 0.8     | `${rockerRollCmRight}`        | Optional | cm   |
| Hakzool verhoging links (cm)  | 2.5     | `${heelSoleElevationCmLeft}`  | Optional | cm   |
| Hakzool verhoging rechts (cm) | 2.5     | `${heelSoleElevationCmRight}` | Optional | cm   |

#### Steunzolen (Optional)

| Dutch Name           | Example           | Word Code                     | Required | Type   |
| -------------------- | ----------------- | ----------------------------- | -------- | ------ |
| Steunzooltype        | Volledige breedte | `${insoleTypeGeneral}`        | Optional | Text   |
| Steunzool anders     | Aangepast type    | `${insoleOtherText}`          | Optional | Text   |
| Middenvoet correctie | Mediaal           | `${insoleMidfootCorrection}`  | Optional | Text   |
| Voorvoet correctie   | Lateraal          | `${insoleForefootCorrection}` | Optional | Text   |
| Voorvoet pad         | Metatarsaal pad   | `${insoleForefootPad}`        | Optional | Text   |
| Hakheffing links     | 2.0               | `${heelRaiseLeft}`            | Optional | cm     |
| Hakheffing rechts    | 2.0               | `${heelRaiseRight}`           | Optional | cm     |
| Steunzoolprijs       | 125.00            | `${insolePrice}`              | Optional | Number |
| Steunzoolprijs naam  | Standaard         | `${insolePriceName}`          | Optional | Text   |

#### Other OVAC Fields

| Dutch Name     | Example                | Word Code         | Required | Type |
| -------------- | ---------------------- | ----------------- | -------- | ---- |
| Bijzonderheden | Patiënt is zeer mobiel | `${specialNotes}` | Optional | Text |

---

## Pulman - Intakeformulier Pulman

### ClientData

_(See ClientData section above)_

### Generated Medical Codes

Pulman forms do not generate medical codes.

### Form-Specific Fields

#### Basic Information

| Dutch Name         | Example                | Word Code              | Required | Type |
| ------------------ | ---------------------- | ---------------------- | -------- | ---- |
| Paartype           | Eerste paar            | `${whichPair}`         | Optional | Text |
| Zijde              | Links / Rechts / Beide | `${side}`              | Yes      | Side |
| Medische Indicatie | Diabetische voet       | `${medicalIndication}` | Optional | Text |

#### Special Information

| Dutch Name   | Example    | Word Code         | Required | Type                      |
| ------------ | ---------- | ----------------- | -------- | ------------------------- |
| Verband voet | Nee        | `${bandagedFoot}` | Optional | Boolean                   |
| Pulman type  | New Harlem | `${pulmanType}`   | Optional | New Harlem / Harlem Extra |

#### Shoe Size

| Dutch Name          | Example | Word Code         | Required | Type  |
| ------------------- | ------- | ----------------- | -------- | ----- |
| Schoenenmaat cliënt | 42      | `${shoeSize}`     | Optional | 37-48 |
| Verstrekte maat     | 43      | `${providedSize}` | Optional | 37-48 |

#### Other Fields

| Dutch Name     | Example     | Word Code         | Required | Type |
| -------------- | ----------- | ----------------- | -------- | ---- |
| Bijzonderheden | Sterke voet | `${specialNotes}` | Optional | Text |

---

## Rebacare - Intakeformulier Rebacare

### ClientData

_(See ClientData section above)_

### Generated Medical Codes

Rebacare forms do not generate medical codes.

### Form-Specific Fields

#### Basic Information

| Dutch Name         | Example                | Word Code              | Required | Type |
| ------------------ | ---------------------- | ---------------------- | -------- | ---- |
| Paartype           | Eerste paar            | `${whichPair}`         | Optional | Text |
| Zijde              | Links / Rechts / Beide | `${side}`              | Yes      | Side |
| Medische Indicatie | Reumatoïde voet        | `${medicalIndication}` | Optional | Text |

#### Special Information

| Dutch Name   | Example | Word Code         | Required | Type    |
| ------------ | ------- | ----------------- | -------- | ------- |
| Verband voet | Ja      | `${bandagedFoot}` | Optional | Boolean |

#### Shoe Size

| Dutch Name          | Example | Word Code         | Required | Type  |
| ------------------- | ------- | ----------------- | -------- | ----- |
| Schoenenmaat cliënt | 40      | `${shoeSize}`     | Optional | 37-48 |
| Verstrekte maat     | 41      | `${providedSize}` | Optional | 37-48 |

#### Other Fields

| Dutch Name     | Example        | Word Code         | Required | Type |
| -------------- | -------------- | ----------------- | -------- | ---- |
| Bijzonderheden | Gevoelige voet | `${specialNotes}` | Optional | Text |

---

## Steunzolen / Insoles - Steunzolen

### ClientData

_(See ClientData section above)_

### Generated Medical Codes

Insole forms do not generate medical codes.

### Form-Specific Fields

#### Basic Information

| Dutch Name         | Example          | Word Code              | Required | Type |
| ------------------ | ---------------- | ---------------------- | -------- | ---- |
| Paartype           | Eerste paar      | `${whichPair}`         | Optional | Text |
| Medische Indicatie | Plantarfasciitis | `${medicalIndication}` | Optional | Text |
| Schoenenmaat       | 39               | `${shoeSize}`          | Optional | Text |

#### Talonette Logic

| Dutch Name              | Example | Word Code             | Required | Type    |
| ----------------------- | ------- | --------------------- | -------- | ------- |
| Hakheffing ingeschakeld | Ja      | `${heelRaiseEnabled}` | Optional | Boolean |
| Hakheffing links        | 1.5     | `${heelRaiseLeft}`    | Optional | cm      |
| Hakheffing rechts       | 1.5     | `${heelRaiseRight}`   | Optional | cm      |

#### Steunzool Fields

| Dutch Name           | Example           | Word Code                     | Required | Type   |
| -------------------- | ----------------- | ----------------------------- | -------- | ------ |
| Steunzooltype        | Volledige breedte | `${insoleTypeGeneral}`        | Optional | Text   |
| Steunzool anders     | Aangepast type    | `${insoleOtherText}`          | Optional | Text   |
| Middenvoet correctie | Mediaal           | `${insoleMidfootCorrection}`  | Optional | Text   |
| Voorvoet correctie   | Lateraal          | `${insoleForefootCorrection}` | Optional | Text   |
| Voorvoet pad         | Metatarsaal pad   | `${insoleForefootPad}`        | Optional | Text   |
| Steunzoolprijs       | 150.00            | `${insolePrice}`              | Optional | Number |
| Steunzoolprijs naam  | Premium           | `${insolePriceName}`          | Optional | Text   |
| Eindprijs            | 150.00            | `${finalPrice}`               | Optional | Number |

#### Other Fields

| Dutch Name     | Example                           | Word Code         | Required | Type |
| -------------- | --------------------------------- | ----------------- | -------- | ---- |
| Bijzonderheden | Allergie voor bepaalde materialen | `${specialNotes}` | Optional | Text |

---

## Check Foliepas - Controle Foliepas

### ClientData

_(See ClientData section above)_

### Generated Medical Codes

Check Foliepas forms do not generate medical codes directly. Uses the same code structure as VLOS for reference.

### Form-Specific Fields

#### Basic Information

| Dutch Name | Example                | Word Code | Required | Type |
| ---------- | ---------------------- | --------- | -------- | ---- |
| Zijde      | Links / Rechts / Beide | `${side}` | Optional | Side |

#### Reading Corrections

| Dutch Name                      | Example | Word Code                             | Required | Type |
| ------------------------------- | ------- | ------------------------------------- | -------- | ---- |
| Leescorrectie na foliepassing   | +0.50   | `${readingCorrectionAfterFoilFit}`    | Optional | Text |
| Leescorrectie na voering schoen | +0.25   | `${readingCorrectionAfterLiningShoe}` | Optional | Text |

#### Enclosure/Padding (Omsluiting)

| Dutch Name             | Example           | Word Code             | Required | Type                    |
| ---------------------- | ----------------- | --------------------- | -------- | ----------------------- |
| Omsluiting links       | Ja/Nee (per type) | `${enclosureLeft}`    | Optional | Record<string, boolean> |
| Omsluiting rechts      | Ja/Nee (per type) | `${enclosureRight}`   | Optional | Record<string, boolean> |
| Omsluiting links (mm)  | 5                 | `${enclosureLeftMm}`  | Optional | Record<string, string>  |
| Omsluiting rechts (mm) | 5                 | `${enclosureRightMm}` | Optional | Record<string, string>  |

#### Beenlengte Verschil (Function Examination)

| Dutch Name                 | Example | Word Code                     | Required | Type |
| -------------------------- | ------- | ----------------------------- | -------- | ---- |
| Beenlengte verschil links  | 1.5     | `${legLengthDifferenceLeft}`  | Optional | cm   |
| Beenlengte verschil rechts | 1.5     | `${legLengthDifferenceRight}` | Optional | cm   |

#### Shaft (Schaft)

| Dutch Name           | Example | Word Code              | Required | Type |
| -------------------- | ------- | ---------------------- | -------- | ---- |
| Schachthoogte links  | 18      | `${shaftHeightLeft}`   | Optional | cm   |
| Schachthoogte rechts | 18      | `${shaftHeightRight}`  | Optional | cm   |
| Openstand schacht    | 8       | `${shaftOpeningWidth}` | Optional | cm   |

#### Supplement Schoring

| Dutch Name                              | Example  | Word Code                            | Required | Type             |
| --------------------------------------- | -------- | ------------------------------------ | -------- | ---------------- |
| Supplement schoring links ingeschakeld  | Ja       | `${customInsoleShoringLeftEnabled}`  | Optional | Boolean          |
| Supplement schoring rechts ingeschakeld | Ja       | `${customInsoleShoringRightEnabled}` | Optional | Boolean          |
| Supplement schoring links type          | Mediaal  | `${customInsoleShoringLeftType}`     | Optional | Mediaal/Lateraal |
| Supplement schoring rechts type         | Lateraal | `${customInsoleShoringRightType}`    | Optional | Mediaal/Lateraal |

#### Zoolverstijving

| Dutch Name                   | Example | Word Code                     | Required | Type    |
| ---------------------------- | ------- | ----------------------------- | -------- | ------- |
| Zoolverstijving ingeschakeld | Ja      | `${soleReinforcementEnabled}` | Optional | Boolean |
| Zoolverstijving links        | Ja      | `${soleReinforcementLeft}`    | Optional | Boolean |
| Zoolverstijving rechts       | Nee     | `${soleReinforcementRight}`   | Optional | Boolean |

#### Sluiting & Tong

| Dutch Name               | Example      | Word Code                 | Required | Type                     |
| ------------------------ | ------------ | ------------------------- | -------- | ------------------------ |
| Sluitingstype            | Haken/Ringen | `${closureType}`          | Optional | Haken/Ringen/Klittenband |
| Inschotpunt              | 12           | `${entryPoint}`           | Optional | cm                       |
| Tongpolster ingeschakeld | Ja           | `${tonguePaddingEnabled}` | Optional | Boolean                  |
| Vaste tong ingeschakeld  | Nee          | `${fixedTongueEnabled}`   | Optional | Boolean                  |

#### Haksoort & Hakhoogte

| Dutch Name       | Example  | Word Code            | Required | Type |
| ---------------- | -------- | -------------------- | -------- | ---- |
| Haksoort links   | Steunhak | `${heelTypeLeft}`    | Optional | Text |
| Haksoort rechts  | Steunhak | `${heelTypeRight}`   | Optional | Text |
| Hakhoogte links  | 3.5      | `${heelHeightLeft}`  | Optional | cm   |
| Hakhoogte rechts | 3.5      | `${heelHeightRight}` | Optional | cm   |

#### Hak Aanpassingen (Schoring) & Ezelsoor

| Dutch Name                       | Example | Word Code                  | Required | Type             |
| -------------------------------- | ------- | -------------------------- | -------- | ---------------- |
| Hak schoring links ingeschakeld  | Ja      | `${heelWedgeLeftEnabled}`  | Optional | Boolean          |
| Hak schoring rechts ingeschakeld | Nee     | `${heelWedgeRightEnabled}` | Optional | Boolean          |
| Hak schoring links type          | Mediaal | `${heelWedgeLeftType}`     | Optional | Mediaal/Lateraal |
| Hak schoring rechts type         | Mediaal | `${heelWedgeRightType}`    | Optional | Mediaal/Lateraal |
| Ezelsoor links ingeschakeld      | Ja      | `${donkeyEarLeftEnabled}`  | Optional | Boolean          |
| Ezelsoor rechts ingeschakeld     | Nee     | `${donkeyEarRightEnabled}` | Optional | Boolean          |
| Ezelsoor links type              | Mediaal | `${donkeyEarLeftType}`     | Optional | Mediaal/Lateraal |
| Ezelsoor rechts type             | Mediaal | `${donkeyEarRightType}`    | Optional | Mediaal/Lateraal |

#### Hakafrondingen

| Dutch Name                         | Example | Word Code                     | Required | Type    |
| ---------------------------------- | ------- | ----------------------------- | -------- | ------- |
| Hakafrondingen links ingeschakeld  | Ja      | `${heelRoundingLeftEnabled}`  | Optional | Boolean |
| Hakafrondingen rechts ingeschakeld | Ja      | `${heelRoundingRightEnabled}` | Optional | Boolean |
| Hakafrondingen links hoogte        | 3       | `${heelRoundingLeftHeight}`   | Optional | mm      |
| Hakafrondingen links lengte        | 5       | `${heelRoundingLeftLength}`   | Optional | mm      |
| Hakafrondingen rechts hoogte       | 3       | `${heelRoundingRightHeight}`  | Optional | mm      |
| Hakafrondingen rechts lengte       | 5       | `${heelRoundingRightLength}`  | Optional | mm      |

#### Loopzool

| Dutch Name   | Example | Word Code           | Required | Type |
| ------------ | ------- | ------------------- | -------- | ---- |
| Loopzooltype | Rocker  | `${rockerSoleType}` | Optional | Text |

#### Kleur en Model

| Dutch Name          | Example               | Word Code              | Required | Type          |
| ------------------- | --------------------- | ---------------------- | -------- | ------------- |
| Toon kleur en model | Ja                    | `${showColorAndModel}` | Optional | Boolean       |
| Modeltype           | Standaard             | `${modelType}`         | Optional | Text          |
| Modeltekst          | Aangepast model       | `${modelText}`         | Optional | Text          |
| Kleuropties         | Zwart / Bruin / Beige | `${colorOptions}`      | Optional | Array<string> |

#### Tong Polsteren & Polsterkraag

| Dutch Name          | Example | Word Code            | Required | Type |
| ------------------- | ------- | -------------------- | -------- | ---- |
| Tong polsteren (mm) | 5       | `${tonguePaddingMm}` | Optional | mm   |
| Polsterkraag (mm)   | 10      | `${paddingCollarMm}` | Optional | mm   |

#### Closure Details

| Dutch Name         | Example   | Word Code        | Required | Type |
| ------------------ | --------- | ---------------- | -------- | ---- |
| Ringen aantal      | 3         | `${ringsNumber}` | Optional | Text |
| Ringen hoeveelheid | Standaard | `${ringsAmount}` | Optional | Text |
| Haken aantal       | 4         | `${hooksNumber}` | Optional | Text |
| Haken hoeveelheid  | Zwaar     | `${hooksAmount}` | Optional | Text |

#### Rits

| Dutch Name        | Example | Word Code          | Required | Type    |
| ----------------- | ------- | ------------------ | -------- | ------- |
| Ritssluiting type | YKK     | `${zipperType}`    | Optional | Text    |
| Rits mediaal      | Ja      | `${zipperMedial}`  | Optional | Boolean |
| Rits lateraal     | Nee     | `${zipperLateral}` | Optional | Boolean |

#### Bijzonderheden

| Dutch Name                    | Example            | Word Code                | Required | Type    |
| ----------------------------- | ------------------ | ------------------------ | -------- | ------- |
| Bijzonder mediaal klittenband | Ja                 | `${specialMedialVelcro}` | Optional | Boolean |
| Bijzonder veters lus          | Nee                | `${specialLaceLoop}`     | Optional | Boolean |
| Bijzonder extra leer          | Ja                 | `${specialExtraLeather}` | Optional | Boolean |
| Bijzonder anders              | Speciale afwerking | `${specialOther}`        | Optional | Text    |

#### Randtype

| Dutch Name | Example   | Word Code      | Required | Type |
| ---------- | --------- | -------------- | -------- | ---- |
| Randtype   | Standaard | `${edgeType}`  | Optional | Text |
| Randkleur  | Zwart     | `${edgeColor}` | Optional | Text |

#### Zooltype

| Dutch Name     | Example | Word Code          | Required | Type |
| -------------- | ------- | ------------------ | -------- | ---- |
| Zooltype       | Gumlite | `${soleType}`      | Optional | Text |
| Gumlite nummer | GL2000  | `${gumliteNumber}` | Optional | Text |
| Gumlite kleur  | Zwart   | `${gumliteColor}`  | Optional | Text |

#### Koolstofverstijving

| Dutch Name                 | Example      | Word Code                  | Required | Type    |
| -------------------------- | ------------ | -------------------------- | -------- | ------- |
| Koolstofverstijving type   | Carbon plate | `${carbonStiffeningType}`  | Optional | Text    |
| Koolstofverstijving links  | Ja           | `${carbonStiffeningLeft}`  | Optional | Boolean |
| Koolstofverstijving rechts | Ja           | `${carbonStiffeningRight}` | Optional | Boolean |

#### Neusopties

| Dutch Name      | Example   | Word Code           | Required | Type |
| --------------- | --------- | ------------------- | -------- | ---- |
| Neusopties type | Versterkt | `${toeOptionsType}` | Optional | Text |

#### Contrefort

| Dutch Name        | Example   | Word Code             | Required | Type |
| ----------------- | --------- | --------------------- | -------- | ---- |
| Contrefort type   | Standaard | `${counterfortType}`  | Optional | Text |
| Contrefort anders | Aangepast | `${counterfortOther}` | Optional | Text |

#### Binnenzool

| Dutch Name        | Example | Word Code        | Required | Type |
| ----------------- | ------- | ---------------- | -------- | ---- |
| Binnenzooltype    | Leer    | `${insoleType}`  | Optional | Text |
| Binnenzool anders | Voetbed | `${insoleOther}` | Optional | Text |

#### Zoolkantuitpoetsen

| Dutch Name                | Example | Word Code                | Required | Type |
| ------------------------- | ------- | ------------------------ | -------- | ---- |
| Zoolkantuitpoetsen type   | Zwart   | `${soleEdgePolishType}`  | Optional | Text |
| Zoolkantuitpoetsen anders | Bruin   | `${soleEdgePolishOther}` | Optional | Text |

#### Maakwijze

| Dutch Name       | Example   | Word Code                    | Required | Type |
| ---------------- | --------- | ---------------------------- | -------- | ---- |
| Maakwijze type   | Standaard | `${constructionMethodType}`  | Optional | Text |
| Maakwijze anders | Handwerk  | `${constructionMethodOther}` | Optional | Text |

#### Hakmodel

| Dutch Name            | Example     | Word Code                 | Required | Type    |
| --------------------- | ----------- | ------------------------- | -------- | ------- |
| Hakmodel type         | Rechthoekig | `${heelModelType}`        | Optional | Text    |
| Hak opbouw materiaal  | Leer/rubber | `${heelBuildUpMaterial}`  | Optional | Text    |
| Hak wedge type        | Mediaal     | `${heelWedgeType}`        | Optional | Text    |
| Hak blok kern coating | Ja          | `${heelBlockCoreCoating}` | Optional | Boolean |

#### Schoring

| Dutch Name           | Example  | Word Code             | Required | Type |
| -------------------- | -------- | --------------------- | -------- | ---- |
| Schoring links type  | Mediaal  | `${shoringLeftType}`  | Optional | Text |
| Schoring links (mm)  | 8        | `${shoringLeftMm}`    | Optional | mm   |
| Schoring rechts type | Lateraal | `${shoringRightType}` | Optional | Text |
| Schoring rechts (mm) | 8        | `${shoringRightMm}`   | Optional | mm   |

---

## Notes

- **Optional fields**: Marked as "Optional" in the "Required" column
- **Boolean fields**: Display as "Ja" (Yes) or "Nee" (No) in Word documents
- **Record<string, boolean> fields**: Store multiple yes/no values per subtype (e.g., different pathology types)
- **Side-specific codes**: Links = Left, Rechts = Right
- **Code format**: All codes are prefixed with `${code` and wrapped in `${}`
- **Field format**: All direct fields are prefixed with `${` and wrapped in `}`
