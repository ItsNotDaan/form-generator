# Form Generator (Next.js)

Een eenvoudige Next.js app voor intake- en formulierpagina's voor Eemland Schoentechniek. De site wordt als static export gedeployed naar GitHub Pages.

## Navigatie (pagina's)

- `/` – overzicht/landing
- `/form-selection` – kies welk formulier je wilt invullen
- `/new-client` & `/old-client` – klantgegevens (nieuw/bestaand)
- `/form-results` – overzicht van ingevoerde gegevens
- `/help` – hulppagina
- Intakeformulieren:
  - `/intake-vlos`
  - `/intake-osa`
  - `/intake-pulman`
  - `/intake-rebacare`
  - `/intake-osb`
  - `/intake-ovac`
  - `/intake-steunzolen`

## JSON output (templates)

- Op `/form-results` kun je alle ingevulde data + medische codes als JSON kopiëren
- Deze JSON wordt gebruikt om document/templates automatisch te vullen (mail-merge)
- Waarden worden genormaliseerd (lege/"nee" waarden gefilterd, codes toegevoegd, timestamp `generatedAt`)

## Automatische code generatie

- **Single source of truth**: Alle form types zijn gedefinieerd in `src/components/form/types/formData.ts`
- **Automatische sync**: Wanneer je een nieuw veld toevoegt aan een type, worden de empty templates automatisch gegenereerd
- Het build-time script `scripts/generate-empty-data.ts` gebruikt de TypeScript Compiler API om:
  - Alle interface definities te lezen (inclusief inheritance)
  - Automatisch empty object templates te genereren in `src/utils/formDataTemplates.generated.ts`
  - Alle 9 form types te synchroniseren (ClientData, IntakeVLOSData, IntakeOSAData, etc.)
- **Handmatig uitvoeren**: `npm run generate:empty-data`
- **Automatisch bij build**: Wordt uitgevoerd bij `npm run build:prod`, `build:acc` en `build:develop`
- ⚠️ **Belangrijk**: Bewerk NOOIT `formDataTemplates.generated.ts` handmatig - deze wordt automatisch gegenereerd!

## Tech

- Next.js (static export, `output: 'export'`)
- TypeScript, Chakra UI, Redux Toolkit, redux-persist
- next-translate (i18n), gh-pages voor deploy

## Voorbereiding

- Node 22+ en npm 10+
- Installeer dependencies: `npm install`

## Ontwikkelen

- Start dev server: `npm run dev`
  - draait op `http://localhost:3000`

## Bouwen

- Productiebouw: `npm run build`
  - Output in `/out`

## Deploy naar GitHub Pages

- Run: `npm run deploy`
  - bouwt en pusht `/out` naar de `gh-pages` branch
- De site draait onder het base path `/form-generator` (zie `next.config.js`).

## Structuur

- `src/pages` – Next.js pages (routes)
- `src/presentation` – UI componenten en pagina-inhoud
- `public/images` – statische assets (gebruik `getAssetPath()` voor correcte URLs met basePath)
