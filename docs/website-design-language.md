# Check-Foliepas Design Language

Shared patterns taken from the current Check-Foliepas page. Use this as a reference when adjusting or creating new sections.

## Core Principles
- Keep layouts card-based: `Card` + `CardHeader` + `CardContent`.
- Use `bg-secondary/2` as the base surface for grouped blocks; add a subtle border and `hover:border-primary!` for interactive emphasis.
- Prefer balanced grids (`grid grid-cols-1 md:grid-cols-2` or responsive variants) for left/right or multi-option layouts.
- Use concise labels and keep helper text in `CardDescription`.
- Switches for boolean toggles (modern slider feel); radios for single-choice enumerations; inputs are minimal with clear placeholders.

## Card Templates
**Standard card**
```tsx
<Card>
  <CardHeader>
    <CardTitle>{t('titleKey')}</CardTitle>
    <CardDescription>{t('subtitleKey')}</CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    {/* body */}
  </CardContent>
</Card>
```

**Interactive section block (inside a card)**
```tsx
<div className="space-y-3 rounded-xl border bg-secondary/2 p-4 hover:border-primary!">
  <Label className="text-base font-semibold">{t('sectionTitle')}</Label>
  {/* content */}
</div>
```

**Left/Right column panels (per-column framing, as in Foliepas/OSA L/R fields)**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="space-y-2 rounded-lg border bg-background p-3 shadow-sm">
    <Label>{t('left')}</Label>
    {/* controls */}
  </div>
  <div className="space-y-2 rounded-lg border bg-background p-3 shadow-sm">
    <Label>{t('right')}</Label>
    {/* controls */}
  </div>
</div>
```

## Controls & States
- **Switch for toggles**: `Switch` replaces yes/no radios for simple enable/disable (e.g., color/model toggle, enclosure L/R options).
- **Radio groups**: use `RadioGroup` with labeled wrappers and tight gaps; grid for multiple options.
- **Checkboxes**: avoid where Switch better communicates on/off; keep checkboxes for multi-select lists if needed.
- **Inputs with units**: 
  - Height of enclosure uses `cm` placeholder.
  - Other enclosure measurements and similar specs use `mm` placeholders.
- **Spacing**: add a small top padding (`pt-2`) between section titles/labels and the controls beneath for breathing room.

## Layout Patterns
- **Left/Right columns**: `grid grid-cols-1 md:grid-cols-2 gap-4` with individual bordered panels (`rounded-lg border bg-background p-3 shadow-sm`).
- **Responsive option grids**: for dense choices, use `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2` with labeled radio items (`rounded-md border bg-background px-3 py-2`).
- **Content padding**: `p-3`–`p-4` on inner blocks; `space-y-3` or `space-y-6` for vertical rhythm.
- **Avoid double borders**: when a card holds a single simple choice (e.g., Which Pair, Side), don’t wrap the contents in an extra bordered block—let the card body stand alone. Nested `bg-secondary/2` blocks are reserved for grouped/compound sections (e.g., Functieonderzoek, Digital sub-blocks).
- **Per-column framing**: for L/R data entry (shaft height, heel lift, MTP1, enclosure-style fields), wrap each column in `rounded-lg border bg-background p-3 shadow-sm` inside a responsive grid to visually separate sides.
- **Digital triple-grid (Leesthoogte / Klauwtenen / Gescand met folie)**: wrap the trio in `grid grid-cols-1 lg:grid-cols-3 justify-items-stretch border rounded-lg p-2 gap-y-2 lg:gap-x-4 bg-secondary/2 hover:border-primary!`; each column uses `flex flex-col space-y-2 p-3 items-center rounded-lg border bg-background` with centered labels and radio groups.
- **Digital L/R selects with shadow only**: for MTP1 and similar selects, keep the outer `border bg-secondary/2 hover:border-primary!` wrapper; inner L/R panels use `rounded-lg border bg-background p-3 shadow-sm pt-2` (no hover border on the inner panels).

## Color & Emphasis
- Base surfaces: `bg-secondary/2` for grouped sections, `bg-background` for nested panels.
- Hover: `hover:border-primary!` on interactive section wrappers to mirror Kleur/Model styling.
- Muted accents: `bg-muted/50` for option rows; text-muted for helper hints.

## Typography
- Titles: `CardTitle` (default font weight bold, size set by component).
- Section labels: `Label` with `text-base font-semibold`.
- Option labels: `text-sm` with normal weight unless emphasis is needed.

## Example: Enclosure Block
```tsx
<div className="space-y-3 rounded-xl border bg-secondary/2 p-4 hover:border-primary!">
  <div className="flex items-center justify-between">
    <Label className="text-base font-semibold">{t('enclosure')}</Label>
    <span className="text-xs text-muted-foreground">{t('left')} / {t('right')}</span>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Left panel */}
    <div className="space-y-3 rounded-lg border bg-background p-3 shadow-sm">
      <span className="text-sm font-semibold text-foreground">{t('left')}</span>
      <div className="space-y-2">
        {options.map(opt => (
          <div key={opt.key} className="flex items-center gap-3 rounded-md border bg-muted/50 px-3 py-2">
            <div className="flex items-center space-x-2 flex-1">
              <Switch /* on/off */ />
              <Label className="font-normal cursor-pointer text-sm">{opt.label}</Label>
            </div>
            {opt.needsMm && (
              <Input
                type="number"
                placeholder={opt.key === 'hoge' ? 'cm' : 'mm'}
                className="w-20"
              />
            )}
          </div>
        ))}
      </div>
    </div>
    {/* Right panel mirrors left */}
  </div>
</div>
```

## Example: Toggle Card (Kleur & Model)
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between">
    <div>
      <CardTitle>{t('colorAndModel')}</CardTitle>
      <CardDescription>{t('colors')}</CardDescription>
    </div>
    <div className="flex items-center gap-3">
      <Label htmlFor="color-model-toggle" className="text-sm text-muted-foreground">
        {t('colorAndModel')}
      </Label>
      <Switch id="color-model-toggle" checked={showColorAndModel} onCheckedChange={setShow} />
    </div>
  </CardHeader>
  {showColorAndModel && (
    <CardContent className="pt-0 space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-stretch border rounded-lg p-3 bg-secondary/2 hover:border-primary! divide-y-2 divide-primary! lg:divide-x-2 lg:divide-y-0">
        {/* model selector / colors list */}
      </div>
      {/* additional grouped grids follow same pattern */}
    </CardContent>
  )}
</Card>
```

## Example: Digital Toggle Pattern
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between">
    <div>
      <CardTitle>{t('digital')}</CardTitle>
      <CardDescription>{t('digitalDescription')}</CardDescription>
    </div>
    <div className="flex items-center gap-3">
      <Label htmlFor="digital-toggle" className="text-sm text-muted-foreground">
        {t('digital')}
      </Label>
      <Switch id="digital-toggle" checked={digitalEnabled} onCheckedChange={setDigital} />
    </div>
  </CardHeader>
  {digitalEnabled && (
    <CardContent className="space-y-4">
      {/* Heel lift with L/R framed panels */}
      <div className="space-y-3 rounded-xl border bg-secondary/2 p-4 hover:border-primary!">
        <Label className="text-base font-semibold">{t('heelLift')}</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 rounded-lg border bg-background p-3 shadow-sm pt-2">
            <Label>{t('left')} (mm)</Label>
            <Input placeholder="mm" />
          </div>
          <div className="space-y-2 rounded-lg border bg-background p-3 shadow-sm pt-2">
            <Label>{t('right')} (mm)</Label>
            <Input placeholder="mm" />
          </div>
        </div>
      </div>

      {/* Triple grid: reading height, claw toes, scanned with foil */}
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-stretch border rounded-lg p-2 gap-y-2 lg:gap-x-4 bg-secondary/2 hover:border-primary!">
        <div className="flex flex-col space-y-2 p-3 items-center rounded-lg border bg-background">
          <Label className="text-base font-semibold">{t('lastHeight')}</Label>
          <RadioGroup value="" onValueChange={() => {}}>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="opt" id="reading-height-opt" />
                <Label htmlFor="reading-height-opt" className="font-normal cursor-pointer">
                  Option
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col space-y-2 p-3 items-center rounded-lg border bg-background">
          <Label className="text-base font-semibold">{t('clawToes')}</Label>
          <RadioGroup value="" onValueChange={() => {}}>
            <div className="flex flex-wrap gap-3">
              {/* yes/no */}
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col space-y-2 p-3 items-center rounded-lg border bg-background">
          <Label className="text-base font-semibold">{t('scannedWithFoil')}</Label>
          <RadioGroup value="" onValueChange={() => {}}>
            <div className="flex flex-wrap gap-3">
              {/* yes/no */}
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* MTP1 L/R selects (shadowed inner panels, no inner hover) */}
      <div className="space-y-3 rounded-xl border bg-secondary/2 p-4 hover:border-primary!">
        <Label className="text-base font-semibold">{t('mtp1Deep')}</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-3 shadow-sm pt-2">
            <Label>{t('left')}</Label>
            <Select>
              <SelectTrigger className="w-2/3">
                <SelectValue />
              </SelectTrigger>
            </Select>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-3 shadow-sm pt-2">
            <Label>{t('right')}</Label>
            <Select>
              <SelectTrigger className="w-2/3">
                <SelectValue />
              </SelectTrigger>
            </Select>
          </div>
        </div>
      </div>

      {/* Additional digital notes/instructions follow the same outer wrapper pattern */}
    </CardContent>
  )}
</Card>
```

## Usage Checklist
- Use `bg-secondary/2` + `hover:border-primary!` for any grouped interactive block.
- Skip extra inner borders for single simple cards (e.g., Which Pair, Side); reserve nested blocks for compound sections.
- Keep grids responsive; default to 1 col on mobile, 2+ on desktop.
- Apply `space-y-*` for vertical rhythm; avoid ad-hoc margins.
- Add `pt-2` between headings/labels and their control groups for consistent breathing room.
- Use `Switch` for binary toggles; `RadioGroup` for exclusive choices; `Input` placeholders should show units (cm/mm) where applicable.
- Separate major subsections with `Separator` when multiple logical groups share a card.
- For L/R inputs, add the per-column framed panels (`rounded-lg border bg-background p-3 shadow-sm`) within a responsive grid.
