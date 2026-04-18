import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Checkbox} from '@/components/ui/checkbox';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  PATHOLOGIES_OPTIONS,
  WALKING_DISTANCE_AIDS_OPTIONS,
  FOOT_INSPECTION_OPTIONS,
  WALKING_DISTANCE_OPTIONS,
  PAIN_DURATION_OPTIONS,
  TOE_AREA_OPTIONS,
  MIDFOOT_OPTIONS,
  ANKLE_JOINT_OPTIONS,
  KNEES_OPTIONS,
} from '@/backend/constants/formConstants';

interface FunctieonderzoekBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
}

/**
 * FunctieonderzoekBlock - Functional Research Section
 *
 * This component encapsulates the entire "Functieonderzoek" (Functional Research)
 * section including pathologies, walking distance, pain perception, foot inspection,
 * muscle strength, and joint assessments.
 *
 * @example
 * ```tsx
 * <FunctieonderzoekBlock form={form} t={t} />
 * ```
 */
export const FunctieonderzoekBlock: React.FC<FunctieonderzoekBlockProps> = ({
  form,
  t,
}) => {
  return (
    <FormCard
      title={t('functionalResearch')}
      description={t('functionalResearchDescription')}
    >
      {/* Ziektebeelden */}
      <FormBlock
        title={t('medicalConditions')}
        columns={3}
        dividers={false}
        centerTitle={true}
      >
        {PATHOLOGIES_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`ziektebeeld-${optie.key}`}
              checked={
                (form.watch('pathologies')[optie.key] as boolean) || false
              }
              onCheckedChange={checked =>
                form.setValue('pathologies', {
                  ...form.getValues('pathologies'),
                  [optie.key]: !!checked,
                })
              }
              className=""
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">
                {t(optie.value)}
              </p>
            </div>
          </Label>
        ))}
      </FormBlock>

      {/* Loopafstand hulpmiddelen */}
      <FormBlock
        title={t('walkingDistanceAids')}
        columns={3}
        dividers={false}
        centerTitle={true}
      >
        {WALKING_DISTANCE_AIDS_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`loopafstand-${optie.key}`}
              checked={
                (form.watch('walkingDistanceAids')[optie.key] as boolean) ||
                false
              }
              onCheckedChange={checked =>
                form.setValue('walkingDistanceAids', {
                  ...form.getValues('walkingDistanceAids'),
                  [optie.key]: !!checked,
                })
              }
              className=""
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">
                {t(optie.value)}
              </p>
            </div>
          </Label>
        ))}
      </FormBlock>

      {/* Pijnbeleving */}
      <FormBlock title={t('painPerception')} centerTitle={true}>
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-6 gap-4 items-center">
            <div className="text-sm leading-none font-medium text-center">
              {t('noPain')} (0)
            </div>
            <Input
              id="pain-perception"
              type="range"
              min="0"
              max="10"
              step="1"
              value={form.watch('painPerception') || '0'}
              onChange={e => form.setValue('painPerception', e.target.value)}
              className="col-span-4 accent-primary"
            />
            <div className="text-sm leading-none font-medium text-center">
              {t('maximumPain')} (10)
            </div>
          </div>
          <div className="text-center text-2xl font-bold">
            {form.watch('painPerception') || '0'}
          </div>
        </div>
      </FormBlock>

      {/* Inspectie voeten */}
      <FormBlock
        title={t('footInspection')}
        centerTitle={true}
        columns={3}
        dividers={false}
      >
        {FOOT_INSPECTION_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`foot-inspection-${optie.key}`}
              checked={
                (form.watch('footInspection')[optie.key] as boolean) || false
              }
              onCheckedChange={checked =>
                form.setValue('footInspection', {
                  ...form.getValues('footInspection'),
                  [optie.key]: !!checked,
                })
              }
              className=""
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">
                {t(optie.value)}
              </p>
            </div>
          </Label>
        ))}
      </FormBlock>

      {/* Loopafstand */}
      <FormBlock
        title={t('walkingDistance')}
        centerTitle={true}
        columns={4}
        dividers={false}
      >
        {WALKING_DISTANCE_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`walking-distance-${optie.key}`}
              checked={
                (form.watch('walkingDistance')[optie.key] as boolean) || false
              }
              onCheckedChange={checked =>
                form.setValue('walkingDistance', {
                  ...form.getValues('walkingDistance'),
                  [optie.key]: !!checked,
                })
              }
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{optie.label}</p>
            </div>
          </Label>
        ))}
      </FormBlock>

      {/* Tijdsduur pijn */}
      <FormBlock
        title={t('painDuration')}
        centerTitle={true}
        columns={3}
        dividers={false}
      >
        {PAIN_DURATION_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`pain-duration-${optie.key}`}
              checked={
                (form.watch('painDuration')[optie.key] as boolean) || false
              }
              onCheckedChange={checked =>
                form.setValue('painDuration', {
                  ...form.getValues('painDuration'),
                  [optie.key]: !!checked,
                })
              }
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{optie.label}</p>
            </div>
          </Label>
        ))}
      </FormBlock>

      {/* Spierkracht */}
      <FormBlock
        title={t('muscleStrength')}
        centerTitle={true}
        columns={2}
        dividers={true}
      >
        <FormItemWrapper className="flex flex-col items-center space-y-2">
          <Label className="text-base font-semibold">{t('dorsalFlexi')}</Label>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t('littleStrength')}
            </span>
            <Input
              type="range"
              min="1"
              max="5"
              value={form.watch('muscleStrengthDorsalFlexi')}
              onChange={e =>
                form.setValue(
                  'muscleStrengthDorsalFlexi',
                  parseInt(e.target.value),
                )
              }
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t('muchStrength')}
            </span>
          </div>
          <span className="text-lg font-semibold">
            {form.watch('muscleStrengthDorsalFlexi') || 3}
          </span>
        </FormItemWrapper>
        <FormItemWrapper className="flex flex-col items-center space-y-2">
          <Label className="text-base font-semibold">{t('plantarFlexi')}</Label>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t('littleStrength')}
            </span>
            <Input
              type="range"
              min="1"
              max="5"
              value={form.watch('muscleStrengthPlantarFlexi')}
              onChange={e =>
                form.setValue(
                  'muscleStrengthPlantarFlexi',
                  parseInt(e.target.value),
                )
              }
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t('muchStrength')}
            </span>
          </div>
          <span className="text-lg font-semibold">
            {form.watch('muscleStrengthPlantarFlexi') || 3}
          </span>
        </FormItemWrapper>
      </FormBlock>

      {/* Teenpartij */}
      <FormBlock
        title={t('toeArea')}
        centerTitle={true}
        columns={4}
        dividers={false}
      >
        {TOE_AREA_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`toe-area-${optie.key}`}
              checked={(form.watch('toeArea')[optie.key] as boolean) || false}
              onCheckedChange={checked =>
                form.setValue('toeArea', {
                  ...form.getValues('toeArea'),
                  [optie.key]: !!checked,
                })
              }
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{optie.label}</p>
            </div>
          </Label>
        ))}
      </FormBlock>

      {/* Midvoet */}
      <FormBlock
        title={t('midfoot')}
        centerTitle={true}
        columns={2}
        dividers={false}
      >
        {MIDFOOT_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`midfoot-${optie.key}`}
              checked={(form.watch('midfoot')[optie.key] as boolean) || false}
              onCheckedChange={checked =>
                form.setValue('midfoot', {
                  ...form.getValues('midfoot'),
                  [optie.key]: !!checked,
                })
              }
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{optie.label}</p>
            </div>
          </Label>
        ))}
      </FormBlock>

      {/* Enkelgewricht */}
      <FormBlock
        title={t('ankleJoint')}
        centerTitle={true}
        columns={2}
        dividers={false}
      >
        {ANKLE_JOINT_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`ankle-joint-${optie.key}`}
              checked={
                (form.watch('ankleJoint')[optie.key] as boolean) || false
              }
              onCheckedChange={checked =>
                form.setValue('ankleJoint', {
                  ...form.getValues('ankleJoint'),
                  [optie.key]: !!checked,
                })
              }
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{optie.label}</p>
            </div>
          </Label>
        ))}
      </FormBlock>

      {/* Knieën */}
      <FormBlock
        title={t('knees')}
        centerTitle={true}
        columns={4}
        dividers={false}
      >
        {KNEES_OPTIONS.map(optie => (
          <Label
            key={optie.key}
            className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
          >
            <Checkbox
              id={`knees-${optie.key}`}
              checked={(form.watch('knees')[optie.key] as boolean) || false}
              onCheckedChange={checked =>
                form.setValue('knees', {
                  ...form.getValues('knees'),
                  [optie.key]: !!checked,
                })
              }
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{optie.label}</p>
            </div>
          </Label>
        ))}
      </FormBlock>
    </FormCard>
  );
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-osa/index.tsx)
// ---------------------------------------------------------------------------

{
  /* Functieonderzoek*/
}
// <FormCard
//   title={t('functionalResearch')}
//   description={t('functionalResearchDescription')}
// >
//   {/* Ziektebeelden */}
//   <FormBlock
//     title={t('medicalConditions')}
//     columns={3}
//     dividers={false}
//     centerTitle={true}
//   >
//     {PATHOLOGIES_OPTIONS.map(optie => (
//       <Label
//         key={optie.key}
//         className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
//       >
//         <Checkbox
//           id={`ziektebeeld-${optie.key}`}
//           checked={
//             (form.watch('pathologies')[optie.key] as boolean) ||
//             false
//           }
//           onCheckedChange={checked =>
//             form.setValue('pathologies', {
//               ...form.getValues('pathologies'),
//               [optie.key]: !!checked,
//             })
//           }
//           className=""
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {t(optie.value)}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>

//   {/* Loopafstand hulpmiddelen */}
//   <FormBlock
//     title={t('walkingDistanceAids')}
//     columns={3}
//     dividers={false}
//     centerTitle={true}
//   >
//     {WALKING_DISTANCE_AIDS_OPTIONS.map(optie => (
//       <Label
//         key={optie.key}
//         className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
//       >
//         <Checkbox
//           id={`loopafstand-${optie.key}`}
//           checked={
//             (form.watch('walkingDistanceAids')[
//               optie.key
//             ] as boolean) || false
//           }
//           onCheckedChange={checked =>
//             form.setValue('walkingDistanceAids', {
//               ...form.getValues('walkingDistanceAids'),
//               [optie.key]: !!checked,
//             })
//           }
//           className=""
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {t(optie.value)}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>

//   {/* Pijnbeleving */}
//   <FormBlock title={t('painPerception')} centerTitle={true}>
//     <div className="space-y-2 pt-2">
//       <div className="grid grid-cols-6 gap-4 items-center">
//         <div className="text-sm leading-none font-medium text-center">
//           {t('noPain')} (0)
//         </div>
//         <Input
//           id="pain-perception"
//           type="range"
//           min="0"
//           max="10"
//           step="1"
//           value={form.watch('painPerception') || '0'}
//           onChange={e =>
//             form.setValue('painPerception', e.target.value)
//           }
//           className="col-span-4 accent-primary"
//         />
//         <div className="text-sm leading-none font-medium text-center">
//           {t('maximumPain')} (10)
//         </div>
//       </div>
//       <div className="text-center text-2xl font-bold">
//         {form.watch('painPerception') || '0'}
//       </div>
//     </div>
//   </FormBlock>

//   {/* Inspectie voeten */}
//   <FormBlock
//     title={t('footInspection')}
//     centerTitle={true}
//     columns={3}
//     dividers={false}
//   >
//     {FOOT_INSPECTION_OPTIONS.map(optie => (
//       <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30">
//         <Checkbox
//           id={`foot-inspection-${optie.key}`}
//           checked={
//             (form.watch('footInspection')[
//               optie.key
//             ] as boolean) || false
//           }
//           onCheckedChange={checked =>
//             form.setValue('footInspection', {
//               ...form.getValues('footInspection'),
//               [optie.key]: !!checked,
//             })
//           }
//           className=""
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {t(optie.value)}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>

//   {/* Loopafstand */}
//   <FormBlock
//     title={t('walkingDistance')}
//     centerTitle={true}
//     columns={4}
//     dividers={false}
//   >
//     {WALKING_DISTANCE_OPTIONS.map(optie => (
//       <Label
//         key={optie.key}
//         className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
//       >
//         <Checkbox
//           id={`walking-distance-${optie.key}`}
//           checked={
//             (form.watch('walkingDistance')[
//               optie.key
//             ] as boolean) || false
//           }
//           onCheckedChange={checked =>
//             form.setValue('walkingDistance', {
//               ...form.getValues('walkingDistance'),
//               [optie.key]: !!checked,
//             })
//           }
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {optie.label}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>

//   {/* Tijdsduur pijn */}
//   <FormBlock
//     title={t('painDuration')}
//     centerTitle={true}
//     columns={3}
//     dividers={false}
//   >
//     {PAIN_DURATION_OPTIONS.map(optie => (
//       <Label
//         key={optie.key}
//         className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
//       >
//         <Checkbox
//           id={`pain-duration-${optie.key}`}
//           checked={
//             (form.watch('painDuration')[optie.key] as boolean) ||
//             false
//           }
//           onCheckedChange={checked =>
//             form.setValue('painDuration', {
//               ...form.getValues('painDuration'),
//               [optie.key]: !!checked,
//             })
//           }
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {optie.label}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>

//   {/* Spierkracht */}
//   <FormBlock
//     title={t('muscleStrength')}
//     centerTitle={true}
//     columns={2}
//     dividers={true}
//   >
//     <FormItemWrapper className="flex flex-col items-center space-y-2">
//       <Label className="text-base font-semibold">
//         {t('dorsalFlexi')}
//       </Label>
//       <div className="flex items-center gap-2 w-full">
//         <span className="text-xs text-muted-foreground whitespace-nowrap">
//           {t('littleStrength')}
//         </span>
//         <Input
//           type="range"
//           min="1"
//           max="5"
//           value={form.watch('muscleStrengthDorsalFlexi')}
//           onChange={e =>
//             form.setValue(
//               'muscleStrengthDorsalFlexi',
//               parseInt(e.target.value),
//             )
//           }
//           className="flex-1"
//         />
//         <span className="text-xs text-muted-foreground whitespace-nowrap">
//           {t('muchStrength')}
//         </span>
//       </div>
//       <span className="text-lg font-semibold">
//         {form.watch('muscleStrengthDorsalFlexi') || 3}
//       </span>
//     </FormItemWrapper>
//     <FormItemWrapper className="flex flex-col items-center space-y-2">
//       <Label className="text-base font-semibold">
//         {t('plantarFlexi')}
//       </Label>
//       <div className="flex items-center gap-2 w-full">
//         <span className="text-xs text-muted-foreground whitespace-nowrap">
//           {t('littleStrength')}
//         </span>
//         <Input
//           type="range"
//           min="1"
//           max="5"
//           value={form.watch('muscleStrengthPlantarFlexi')}
//           onChange={e =>
//             form.setValue(
//               'muscleStrengthPlantarFlexi',
//               parseInt(e.target.value),
//             )
//           }
//           className="flex-1"
//         />
//         <span className="text-xs text-muted-foreground whitespace-nowrap">
//           {t('muchStrength')}
//         </span>
//       </div>
//       <span className="text-lg font-semibold">
//         {form.watch('muscleStrengthPlantarFlexi') || 3}
//       </span>
//     </FormItemWrapper>
//   </FormBlock>

//   {/* Teenpartij */}
//   <FormBlock
//     title={t('toeArea')}
//     centerTitle={true}
//     columns={4}
//     dividers={false}
//   >
//     {TOE_AREA_OPTIONS.map(optie => (
//       <Label
//         key={optie.key}
//         className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
//       >
//         <Checkbox
//           id={`toe-area-${optie.key}`}
//           checked={
//             (form.watch('toeArea')[optie.key] as boolean) || false
//           }
//           onCheckedChange={checked =>
//             form.setValue('toeArea', {
//               ...form.getValues('toeArea'),
//               [optie.key]: !!checked,
//             })
//           }
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {optie.label}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>

//   {/* Midvoet */}
//   <FormBlock
//     title={t('midfoot')}
//     centerTitle={true}
//     columns={2}
//     dividers={false}
//   >
//     {MIDFOOT_OPTIONS.map(optie => (
//       <Label
//         key={optie.key}
//         className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
//       >
//         <Checkbox
//           id={`midfoot-${optie.key}`}
//           checked={
//             (form.watch('midfoot')[optie.key] as boolean) || false
//           }
//           onCheckedChange={checked =>
//             form.setValue('midfoot', {
//               ...form.getValues('midfoot'),
//               [optie.key]: !!checked,
//             })
//           }
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {optie.label}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>

//   {/* Enkelgewricht */}
//   <FormBlock
//     title={t('ankleJoint')}
//     centerTitle={true}
//     columns={2}
//     dividers={false}
//   >
//     {ANKLE_JOINT_OPTIONS.map(optie => (
//       <Label
//         key={optie.key}
//         className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
//       >
//         <Checkbox
//           id={`ankle-joint-${optie.key}`}
//           checked={
//             (form.watch('ankleJoint')[optie.key] as boolean) ||
//             false
//           }
//           onCheckedChange={checked =>
//             form.setValue('ankleJoint', {
//               ...form.getValues('ankleJoint'),
//               [optie.key]: !!checked,
//             })
//           }
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {optie.label}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>

//   {/* Knieën */}
//   <FormBlock
//     title={t('knees')}
//     centerTitle={true}
//     columns={4}
//     dividers={false}
//   >
//     {KNEES_OPTIONS.map(optie => (
//       <Label
//         key={optie.key}
//         className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
//       >
//         <Checkbox
//           id={`knees-${optie.key}`}
//           checked={
//             (form.watch('knees')[optie.key] as boolean) || false
//           }
//           onCheckedChange={checked =>
//             form.setValue('knees', {
//               ...form.getValues('knees'),
//               [optie.key]: !!checked,
//             })
//           }
//         />
//         <div className="grid gap-1.5 font-normal">
//           <p className="text-sm leading-none font-medium">
//             {optie.label}
//           </p>
//         </div>
//       </Label>
//     ))}
//   </FormBlock>
// </FormCard>
