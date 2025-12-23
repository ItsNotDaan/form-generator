# FormDisplay component

Het `FormDisplay` component maakt het mogelijk om snel en flexibel een formulier of formdata te tonen in verschillende layouts. Je kunt eenvoudig het aantal kolommen, titels, subtitels en nested (slider) secties instellen.

## Props
- `title` *(string)*: Hoofdtitel van het formulier.
- `subtitle` *(string, optioneel)*: Subtitel of toelichting.
- `columns` *(1 | 2 | 3)*: Aantal kolommen (responsive vanaf md).
- `sections` *(array)*: Lijst van secties/velden. Elke sectie heeft:
  - `type`: `'basic'` of `'nested'`
  - `label`: Label/titel van het veld of groep
  - `value`: Waarde (alleen bij `basic`)
  - `items`: Array van `{ label, value }` (alleen bij `nested`)
  - `slider`: Boolean, toon slider badge (alleen bij `nested`)

## Voorbeeld

```
<FormDisplay
  title="Test Form"
  subtitle="Voorbeeld van een dynamisch formulier"
  columns={2}
  sections={[
    { type: 'basic', label: 'Naam', value: 'Jan Jansen' },
    { type: 'nested', label: 'Voetinspectie', slider: true, items: [
      { label: 'Links', value: 'Normaal' },
      { label: 'Rechts', value: 'Afwijkend' },
    ]},
  ]}
/>
```

## Gebruik
- Voeg het component toe aan een pagina, bijvoorbeeld `test.tsx`.
- Pas de props aan voor jouw gewenste layout.
- Snel wisselen tussen 1, 2 of 3 kolommen via de `columns` prop.
- Gebruik `type: 'nested'` voor groepen met slider of sub-items.

## Styling
- Gebruikt Tailwind utility classes en volgt het bestaande design.
- Responsive vanaf md breakpoint.

---

Voor meer voorbeelden, zie de testpagina of pas de props aan naar wens.
