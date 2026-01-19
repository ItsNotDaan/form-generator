## ✅ IMPLEMENTATION COMPLETE

All scripts and documentation have been created and tested. See the following files:

### 📄 Core Files

- **extract-form-data.js** - Extracts form field metadata for AI
- **populate-form-data.js** - Populates form with AI-extracted data
- **ai-prompt-template.txt** - Complete prompt for local AI model

### 📚 Documentation

- **README.md** - Quick start guide and workflow overview
- **SHORTCUTS-SETUP.md** - Detailed Apple Shortcuts configuration
- **TEST-RESULTS.md** - Complete testing documentation and technical details

### 🚀 Quick Start

1. Run `extract-form-data.js` in Safari on form page
2. Copy output and use with `ai-prompt-template.txt`
3. Process OCR text through local AI
4. Run `populate-form-data.js` with AI output

See **README.md** for complete workflow.

---

# Original Requirements

In deze map wil ik twee scripts maken en in dit bestand heb ik enkele prompts nodig.

Ik gebruik een iPad die toegang heeft tot een lokaal taalmodel en Apple Private Cloud Compute.

Ik wil een foto maken van een 'doktersverwijzing' die aan ons wordt gegeven. Die verwijzing zal worden getypt door de doktoren.

Mijn doel is om:

1. De new-client page te scannen op dingen die ingevuld kunnen worden. Doormiddel van een js script.
2. deze verwijzing te scannen met OCR, deze output door de local AI te halen en te vragen of hij de gevonden invulpunten kan invullen, zodat je een tekst krijgt zoals: "initials: "Daan", clientname: "Heetkamp", birthdate: "15-09-2001" etc
3. Een script moet dan gaan kijken naar de invulnamen en zoeken in de tekst naar bijvoorbeeld clientname -> : "Deze gegevens pakken". Snap je?

Probeer dit zo duidelijk en makkelijk mogelijk te maken. Het is niet een ingewikkelde opgave. Denk goed na naar de prompts en wellicht meerdere mogelijkheden geven waar die kan zoeken eg: clientname kan staan onder: achternaam, last name.

Een voorbeeld van OCR van een verwijzing van een klant is:
"
MEDISCH CENTRUM UTRECHT
UMC Utrecht
"IE
Dhr. J.P. van Dijk
Kerkstraat 42 b
1234 AB UTRECHT
Patiëntgegevens
Patiëntnummer:
Naam:
Adres:
Telefoonnummer:
Geboortedatum:
BSN:
Verzekering:
Polisnummer:
98765432
van Dijk, J.P.
Kerkstraat 42 b
1234 AB Utrecht
+31612345678
15-3-1975
123456789
Behandelaar (specialisme):
Dr. M. Jansen (POD)
Centrale Verwerkingseenheid VGZ: VGZ, AGB: 04028369
VGZ Zorgverzekeraar
987654321
Utrecht, 15 januari 2026
Kenmerk: 150126.8421
Geachte heer J.P. van Dijk,
Schoenrecept
Diagnose: hallux valgus
Toelichting op diagnose: hallux valgus bilateraal, Simm's 2, status na operatieve correctie rechts. Voorvoetproblemen, niet veilig te beschoeien in confectie of OSB Functies en anatomische eigenschappen: sensibiliteitsstoornis, huidafwijking/kwetsbare huid, voetvormafwijking
Doel schoenvoorziening: ontlasten, ondersteunen, beschermen, adequate pasvorm
Soort schoenvoorziening: OSA (OSA zonder proefschoenfase)
Voorziening aan contrefort / schacht / tong
Schachthoogte: halfhoog
Sluiting: veters
Zowel rechter en linker zijde
Voorziening aan de zool
Zoolverstijving: stijf
Met vriendelijke groet,
Medisch Centrum Utrecht Postbus 8500 1234 AB Utrecht T: 030-123 45 67 www.umcutrecht.nl
"

De URL van de pagina die uitgelezen/geschreven moet worden:
https://itsnotdaan.github.io/form-generator/new-client/

agent stappenplan:

1. form a plan. Structured and rethink if it is the best plan..
2. Make testscripts that start small my gathering the page info and filling in prefilled data that you made. Make a separate markdown file where you show the steps and results. Note that you should run these scrips and really test them.
3. Create a prompt that will clearly define the input and output that is needed. This I will test on my iPad since you cannot do this. Together with the first and last js script.
   Note: Stay inside the Apple Shortcuts folder. The only time you can go out of this is to check new/old-client pages and to add html/type clarification for the scripts on buttons, selects or input fields in those two pages.

infomation about using js on apple shortcuts:
https://support.apple.com/nl-nl/guide/shortcuts/apdb71a01d93/ios
