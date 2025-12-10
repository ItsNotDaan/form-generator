# Apple Shortcuts Integration Scripts

Deze scripts maken het mogelijk om formulierdata te extraheren en te vullen via Apple Shortcuts met Apple Intelligence.

## Overzicht

Dit pakket bevat twee JavaScript bestanden voor gebruik met Apple Shortcuts:

1. **extract-form-data.js** - Haalt alle formuliergegevens op
2. **populate-form-data.js** - Vult het formulier met gegevens

## Workflow

### Stap 1: Data Extractie

1. Open Safari en navigeer naar de New Client formulier pagina
2. Maak een Apple Shortcut met de volgende acties:
   - **Get Current URL** - Krijg de huidige URL
   - **Run JavaScript on Web Page** - Voer JavaScript uit
     - Kopieer de inhoud van `extract-form-data.js`
   - **Get Text from Input** - Bewaar het resultaat
   - **Set Variable** "FormData" - Sla de data op

### Stap 2: Foto Analyse (Apple Intelligence)

1. Voeg deze acties toe aan je Shortcut:
   - **Take Photo** - Maak een foto van het papieren formulier
   - **Encode [Photo] as Text** met Apple Intelligence - Gebruik een prompt zoals:
     ```
     Extract the following information from this form image:
     - Voorletters (Initials)
     - Achternaam (Last Name)
     - Postcode (Postal Code)
     - Huisnummer (House Number)
     - Straatnaam (Street Name)
     - Stad (City)
     - Telefoon 1 (Phone 1)
     - Email
     - Verzekeringsmaatschappij (Insurance Company)
     - Specialist/Huisarts
     
     Return as JSON with keys matching the field names.
     ```
   - **Get Dictionary from Input** - Converteer naar dictionary

### Stap 3: Data Populatie

1. Open Safari en navigeer terug naar de New Client formulier pagina (als je deze hebt verlaten)
2. Voeg deze acties toe:
   - **Get Text from Dictionary** - Converteer dictionary naar JSON tekst
   - **Run JavaScript on Web Page**
     - Kopieer de inhoud van `populate-form-data.js`
     - Voeg "formData" toe als parameter met de JSON van vorige stap
   - **Show Result** - Laat het resultaat zien

## Gebruik van de Scripts

### Extract Form Data

```javascript
// Dit script kan direct worden uitgevoerd in Safari
// Het retourneert een JSON array met alle velden:
[
  {
    "tag": "input",
    "type": "text",
    "name": "initials",
    "id": "input-voorletters",
    "fieldContainerId": "field-voorletters",
    "placeholder": "Bijv. J.A.",
    "label": "Voorletters",
    "value": "",
    "required": true,
    "readonly": false,
    "disabled": false
  },
  ...
]
```

### Populate Form Data

```javascript
// Dit script accepteert een JSON object als argument:
{
  "input-voorletters": "J.A.",
  "input-achternaam": "van der Berg",
  "input-postcode": "1234AB",
  "input-huisnummer": "123",
  "input-straatnaam": "Hoofdstraat",
  "input-stad": "Amsterdam",
  "input-telefoon1": "06-12345678",
  "input-emailadres": "naam@voorbeeld.nl",
  "input-specialisthuisarts": "Dr. Jansen"
}

// Of gebruik field names in plaats van IDs:
{
  "initials": "J.A.",
  "lastName": "van der Berg",
  "postalCode": "1234AB",
  ...
}
```

## Veld Mapping

Hier is een overzicht van de belangrijkste velden:

| Label (Nederlands) | Field ID | Field Name |
|-------------------|----------|------------|
| Voorletters | input-voorletters | initials |
| Achternaam | input-achternaam | lastName |
| Postcode | input-postcode | postalCode |
| Huisnummer | input-huisnummer | houseNumber |
| Straatnaam | input-straatnaam | streetName |
| Stad | input-stad | city |
| Telefoon 1 | input-telefoon1 | phone1 |
| Telefoon 2 | input-telefoon2 | phone2 |
| Emailadres | input-emailadres | email |
| Verzekeringsmaatschappij | input-verzekeringsmaatschappij | - |
| Specialist/Huisarts | input-specialisthuisarts | specialist |
| Medische Indicatie | input-medischeindicatie | medicalIndication |

## Tips voor Apple Intelligence Prompts

Voor beste resultaten met foto analyse, gebruik deze prompt structuur:

```
Analyze this form and extract the following fields. 
Return ONLY a valid JSON object without markdown formatting.

Fields to extract:
- initials (Voorletters): The person's initials
- lastName (Achternaam): The last name
- postalCode (Postcode): Dutch postal code format (1234AB)
- houseNumber (Huisnummer): House number
- streetName (Straatnaam): Street name
- city (Stad): City name
- phone1 (Telefoon): Primary phone number
- email: Email address
- specialist: Name of specialist or GP

Return format:
{
  "initials": "...",
  "lastName": "...",
  ...
}
```

## Troubleshooting

### Script werkt niet
- Zorg dat JavaScript is ingeschakeld in Safari
- Controleer of je op de juiste pagina bent (/new-client)
- Ververs de pagina en probeer opnieuw

### Velden worden niet gevuld
- Check of de field IDs of names correct zijn
- Kijk naar het resultaat van extract-form-data.js voor de juiste IDs
- Gebruik het "details" veld in de response om te zien welke velden wel/niet gevuld zijn

### Apple Intelligence geeft geen JSON
- Vraag expliciet om "valid JSON without markdown"
- Geef voorbeelden in je prompt
- Gebruik "Get Dictionary from Input" om de text naar JSON te converteren

## Voorbeeld Shortcut Flow

```
1. [Input] Ask for: "Maak foto van formulier of kies actie"
2. [If] Input is "Extract Current Form"
   → Run extract-form-data.js
   → Show Result
3. [Otherwise] If Input is "Fill from Photo"
   → Take Photo
   → Encode with Apple Intelligence (zie prompt hierboven)
   → Get Dictionary
   → Run populate-form-data.js with Dictionary
   → Show Result
4. [End]
```

## Beveiliging

Deze scripts:
- Lezen alleen zichtbare formuliervelden
- Sturen geen data naar externe servers
- Werken volledig lokaal in Safari
- Vereisen geen extra permissies buiten Safari JavaScript toegang
