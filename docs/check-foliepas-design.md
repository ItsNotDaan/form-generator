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

## Controls & States
- **Switch for toggles**: `Switch` replaces yes/no radios for simple enable/disable (e.g., color/model toggle, enclosure L/R options).
- **Radio groups**: use `RadioGroup` with labeled wrappers and tight gaps; grid for multiple options.
- **Checkboxes**: avoid where Switch better communicates on/off; keep checkboxes for multi-select lists if needed.
- **Inputs with units**: 
  - Height of enclosure uses `cm` placeholder.
  - Other enclosure measurements and similar specs use `mm` placeholders.

## Layout Patterns
- **Left/Right columns**: `grid grid-cols-1 md:grid-cols-2 gap-4` with individual bordered panels (`rounded-lg border bg-background p-3 shadow-sm`).
- **Responsive option grids**: for dense choices, use `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2` with labeled radio items (`rounded-md border bg-background px-3 py-2`).
- **Content padding**: `p-3`–`p-4` on inner blocks; `space-y-3` or `space-y-6` for vertical rhythm.

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

## Usage Checklist
- Use `bg-secondary/2` + `hover:border-primary!` for any grouped interactive block.
- Keep grids responsive; default to 1 col on mobile, 2+ on desktop.
- Apply `space-y-*` for vertical rhythm; avoid ad-hoc margins.
- Use `Switch` for binary toggles; `RadioGroup` for exclusive choices; `Input` placeholders should show units (cm/mm) where applicable.
- Separate major subsections with `Separator` when multiple logical groups share a card.
