---
name: extract-form-block
description: 'Extract a section from an intake page into a reusable block component and update block docs.'
argument-hint: 'Page path, section name, and target block filename'
agent: agent
---

You are extracting one form section from an existing page into a reusable block component.

## Inputs

Use the provided arguments to identify:

- source page file (for example `src/pages/intake-osa/index.tsx`)
- section to extract (for example `Side & Amputation`)
- target block filename (for example `SideSelectionBlock.tsx`)

## Required workflow

1. Read `src/components/forms/blocks/README.md` first and follow its conventions.
2. Inspect the source page section for required imports, field names, and behavior.
3. Check whether the source section uses `FormField`, `FormControl`, `FormItem`, `FormLabel`, `FormMessage`, `Controller`, or page-only concerns (routing, page navigation, submit-only handlers).
4. Build or update the block file in `src/components/forms/blocks/`.
5. Keep the original extracted page code at the bottom of the block file as commented reference code (mandatory for every block extraction/update pass).
6. Add clear section comments for major parts (schema-independent UI groups, helper logic, render sections).
7. Introduce logic variables for conditional rendering and behavior (prefer names like `includeX` such as `includeExample`, `showX`, `hasX` instead of inline conditions).
8. Update `src/components/forms/blocks/index.ts` if a new block is created.
9. Update `src/components/forms/blocks/README.md` if new import rules, caveats, or patterns were discovered.

## Implementation rules

- Preserve existing behavior exactly unless asked to refactor behavior.
- Keep block props explicit and reusable:
  - `form: UseFormReturn<any>` (or specific type when obvious)
  - `t: (key: string) => string`
  - optional configuration flags like `includeAmputation?: boolean`
- Prefer constants from `@/domain/form/constants` where available.
- Keep page-only logic in the page component unless explicitly requested in the block.
- Use `FormField` only when it is truly needed (for example: controlled custom inputs that require `Controller` semantics, field-level validation rendering with `FormMessage`, or explicit `FormControl`/a11y wiring). If not needed, prefer simpler `watch`/`setValue` or `register` bindings.
- Automatically prefer `Switch` over `Checkbox` for 1-2 boolean options. Use `Checkbox` for larger multi-select groups (3+ options).

## Output format

Return:

1. Files changed and why.
2. Import changes required in the source page.
3. Any `FormField`-related decisions and why they were needed or removed.
4. Follow-up checks (compile/lint/tests) and result status.
