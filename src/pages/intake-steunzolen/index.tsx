// import React from 'react';
// import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Separator } from '@/components/ui/separator';
// import useTranslation from 'next-translate/useTranslation';
// import { useRouter } from 'next/router';
// import { Routes } from '@/lib/routes';
// import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
// import {
//   setIntakeSteunzolenData,
//   setClientData,
// } from '@/domain/store/slices/formData';
// import {
//   PAARTYPE_OPTIES,
//   STEUNZOOL_TYPE_OPTIES,
//   CORRECTIE_MIDDENVOET_OPTIES,
//   CORRECTIE_VOORVOET_OPTIES,
//   PELLOTE_OPTIES,
//   STEUNZOLEN_PRIJS_OPTIES,
// } from '@/lib/constants/formConstants';
// import { ChevronRight } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { scrollToFirstError } from '@/utils/formHelpers';
// import { useFormPersistence } from '@/hooks/useFormPersistence';

// const FormIntakeSteunzolenPage = () => {
//   const router = useRouter();
//   const { t } = useTranslation('form');
//   const dispatch = useAppDispatch();
//   const clientData = useAppSelector(state => state.formData.client);

//   const formSchema = z
//     .object({
//       welkPaar: z.string(),
//       medischeIndicatie: z.string().optional(),
//       schoenmaat: z
//         .string()
//         .min(1, t('shoeSizeRequired') || 'Shoe size is required'),
//       steunzoolTypeGeneral: z.string().optional(),
//       steunzoolAndersText: z.string().optional(),
//       steunzoolCorrectieMiddenvoet: z.string().optional(),
//       steunzoolCorrectieVoorvoet: z.string().optional(),
//       steunzoolVvPellote: z.string().optional(),
//       steunzoolHakVerhogingLinks: z.string().optional(),
//       steunzoolHakVerhogingRechts: z.string().optional(),
//       prijs: z.number(),
//       prijsNaam: z.string(),
//       bijzonderheden: z.string().optional(),
//     })
//     .refine(
//       data => {
//         const talonetteOption = STEUNZOLEN_PRIJS_OPTIES.find(
//           opt => opt.label === 'prijsTalonette',
//         );
//         const isTalonette =
//           talonetteOption && data.prijs === talonetteOption.value;

//         if (!isTalonette && !data.steunzoolTypeGeneral) {
//           return false;
//         }

//         if (
//           data.steunzoolTypeGeneral === 'Anders' &&
//           !data.steunzoolAndersText
//         ) {
//           return false;
//         }

//         if (
//           isTalonette &&
//           !data.steunzoolHakVerhogingLinks &&
//           !data.steunzoolHakVerhogingRechts
//         ) {
//           return false;
//         }

//         return true;
//       },
//       {
//         message: 'Please fill in all required fields',
//         path: ['steunzoolTypeGeneral'],
//       },
//     );

//   type FormData = z.infer<typeof formSchema>;

//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     shouldFocusError: true,
//     defaultValues: {
//       welkPaar: 'Eerste paar',
//       medischeIndicatie: '',
//       schoenmaat: '',
//       steunzoolTypeGeneral: '',
//       steunzoolAndersText: '',
//       steunzoolCorrectieMiddenvoet: '',
//       steunzoolCorrectieVoorvoet: '',
//       steunzoolVvPellote: '',
//       steunzoolHakVerhogingLinks: '',
//       steunzoolHakVerhogingRechts: '',
//       prijs: 225,
//       prijsNaam: t('insolesPrice225'),
//       bijzonderheden: '',
//     },
//   });

//   const { clearStorage } = useFormPersistence('intakeSteunzolen', form.watch, form.setValue);

//   const prijs = form.watch('prijs');
//   const steunzoolTypeGeneral = form.watch('steunzoolTypeGeneral');

//   const talonetteOption = STEUNZOLEN_PRIJS_OPTIES.find(
//     opt => opt.label === 'prijsTalonette',
//   );
//   const isTalonette = talonetteOption && prijs === talonetteOption.value;

//   const onSubmit = (data: FormData) => {
//     if (clientData) {
//       dispatch(setClientData({ ...clientData, intakeType: 'Steunzolen' }));
//     }

//     dispatch(
//       setIntakeSteunzolenData({
//         welkPaar: data.welkPaar,
//         medischeIndicatie: data.medischeIndicatie || '',
//         schoenmaat: data.schoenmaat,
//         steunzoolTypeGeneral:
//           data.steunzoolTypeGeneral === 'Anders'
//             ? data.steunzoolAndersText || ''
//             : data.steunzoolTypeGeneral || '',
//         steunzoolCorrectieMiddenvoet: data.steunzoolCorrectieMiddenvoet || '',
//         steunzoolCorrectieVoorvoet: data.steunzoolCorrectieVoorvoet || '',
//         steunzoolVvPellote: data.steunzoolVvPellote || '',
//         steunzoolHakVerhogingLinks: data.steunzoolHakVerhogingLinks || '',
//         steunzoolHakVerhogingRechts: data.steunzoolHakVerhogingRechts || '',
//         prijs: data.prijs,
//         prijsNaam: data.prijsNaam,
//         bijzonderheden: data.bijzonderheden || '',
//       }),
//     );

//     router.push(Routes.form_results);
//   };

//   return (
//     <BaseLayout title={t('intakeInsoles')} currentStep={2}>
//       <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col items-center justify-center gap-3 mb-12">
//           <h1 className="text-4xl font-bold text-foreground">
//             {t('intakeInsoles')}
//           </h1>
//           <p className="text-lg text-muted-foreground">
//             {t('insolesDescription')}
//           </p>
//         </div>

//         <FormSection>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
//               className="space-y-6"
//             >
//               {/* Which Pair */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>{t('whichPair')}</CardTitle>
//                   <CardDescription>
//                     Select which pair this intake is for
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <FormField
//                     control={form.control}
//                     name="welkPaar"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <RadioGroup
//                             onValueChange={field.onChange}
//                             value={field.value}
//                           >
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               {PAARTYPE_OPTIES.map(option => (
//                                 <div
//                                   key={option.value}
//                                   className="flex items-center space-x-2"
//                                 >
//                                   <RadioGroupItem
//                                     value={option.value}
//                                     id={`paar-${option.value}`}
//                                   />
//                                   <Label
//                                     htmlFor={`paar-${option.value}`}
//                                     className="font-normal cursor-pointer"
//                                   >
//                                     {t(
//                                       option.value
//                                         .toLowerCase()
//                                         .replace(/ /g, ''),
//                                     )}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </div>
//                           </RadioGroup>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>

//               {/* Medical Indication */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>{t('medicalIndication')}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <FormField
//                     control={form.control}
//                     name="medischeIndicatie"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Textarea
//                             placeholder={t('medicalIndicationPlaceholder')}
//                             rows={4}
//                             className="resize-none"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>

//               {/* Shoe Size */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     {t('shoeSize')} <span className="text-destructive">*</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <FormField
//                     control={form.control}
//                     name="schoenmaat"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             placeholder={t('shoeSizePlaceholder')}
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>

//               {/* Price */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     {t('insolePrice')}{' '}
//                     <span className="text-destructive">*</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <FormField
//                     control={form.control}
//                     name="prijs"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <RadioGroup
//                             onValueChange={val => {
//                               field.onChange(Number(val));
//                               const selectedOption =
//                                 STEUNZOLEN_PRIJS_OPTIES.find(
//                                   opt => opt.value === Number(val),
//                                 );
//                               if (selectedOption) {
//                                 form.setValue(
//                                   'prijsNaam',
//                                   t(selectedOption.label),
//                                 );
//                               }
//                             }}
//                             value={field.value.toString()}
//                           >
//                             <div className="space-y-3">
//                               {STEUNZOLEN_PRIJS_OPTIES.map(option => (
//                                 <div
//                                   key={option.value}
//                                   className="flex items-center space-x-2"
//                                 >
//                                   <RadioGroupItem
//                                     value={option.value.toString()}
//                                     id={`price-${option.value}`}
//                                   />
//                                   <Label
//                                     htmlFor={`price-${option.value}`}
//                                     className="font-normal cursor-pointer"
//                                   >
//                                     {t(option.label)}
//                                   </Label>
//                                 </div>
//                               ))}
//                             </div>
//                           </RadioGroup>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>

//               {/* Insoles Details - Only if NOT Talonette */}
//               {!isTalonette && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>
//                       {t('insoles')} <span className="text-destructive">*</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Insole Type */}
//                     <FormField
//                       control={form.control}
//                       name="steunzoolTypeGeneral"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-semibold">
//                             {t('insoleTypeGeneral')}
//                           </FormLabel>
//                           <FormControl>
//                             <RadioGroup
//                               onValueChange={field.onChange}
//                               value={field.value}
//                             >
//                               <div className="space-y-2">
//                                 {STEUNZOOL_TYPE_OPTIES.map(option => (
//                                   <div
//                                     key={option.value}
//                                     className="flex items-center space-x-2"
//                                   >
//                                     <RadioGroupItem
//                                       value={option.value}
//                                       id={`type-${option.value}`}
//                                     />
//                                     <Label
//                                       htmlFor={`type-${option.value}`}
//                                       className="font-normal cursor-pointer"
//                                     >
//                                       {option.label}
//                                     </Label>
//                                   </div>
//                                 ))}
//                               </div>
//                             </RadioGroup>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     {steunzoolTypeGeneral === 'Anders' && (
//                       <FormField
//                         control={form.control}
//                         name="steunzoolAndersText"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 placeholder={t('insoleOtherTextPlaceholder')}
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     )}

//                     <Separator />

//                     {/* Midfoot Correction */}
//                     <FormField
//                       control={form.control}
//                       name="steunzoolCorrectieMiddenvoet"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-semibold">
//                             {t('insoleMiddfootCorrection')}
//                           </FormLabel>
//                           <FormControl>
//                             <RadioGroup
//                               onValueChange={field.onChange}
//                               value={field.value}
//                             >
//                               <div className="space-y-2">
//                                 {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
//                                   <div
//                                     key={option.value}
//                                     className="flex items-center space-x-2"
//                                   >
//                                     <RadioGroupItem
//                                       value={option.value}
//                                       id={`midfoot-${option.value}`}
//                                     />
//                                     <Label
//                                       htmlFor={`midfoot-${option.value}`}
//                                       className="font-normal cursor-pointer"
//                                     >
//                                       {option.label}
//                                     </Label>
//                                   </div>
//                                 ))}
//                               </div>
//                             </RadioGroup>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <Separator />

//                     {/* Forefoot Correction */}
//                     <FormField
//                       control={form.control}
//                       name="steunzoolCorrectieVoorvoet"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-semibold">
//                             {t('insoleForefootCorrection')}
//                           </FormLabel>
//                           <FormControl>
//                             <RadioGroup
//                               onValueChange={field.onChange}
//                               value={field.value}
//                             >
//                               <div className="space-y-2">
//                                 {CORRECTIE_VOORVOET_OPTIES.map(option => (
//                                   <div
//                                     key={option.value}
//                                     className="flex items-center space-x-2"
//                                   >
//                                     <RadioGroupItem
//                                       value={option.value}
//                                       id={`forefoot-${option.value}`}
//                                     />
//                                     <Label
//                                       htmlFor={`forefoot-${option.value}`}
//                                       className="font-normal cursor-pointer"
//                                     >
//                                       {option.label}
//                                     </Label>
//                                   </div>
//                                 ))}
//                               </div>
//                             </RadioGroup>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <Separator />

//                     {/* Forefoot Pad */}
//                     <FormField
//                       control={form.control}
//                       name="steunzoolVvPellote"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-semibold">
//                             {t('insoleForefootPad')}
//                           </FormLabel>
//                           <FormControl>
//                             <RadioGroup
//                               onValueChange={field.onChange}
//                               value={field.value}
//                             >
//                               <div className="space-y-2">
//                                 {PELLOTE_OPTIES.map(option => (
//                                   <div
//                                     key={option.value}
//                                     className="flex items-center space-x-2"
//                                   >
//                                     <RadioGroupItem
//                                       value={option.value}
//                                       id={`pad-${option.value}`}
//                                     />
//                                     <Label
//                                       htmlFor={`pad-${option.value}`}
//                                       className="font-normal cursor-pointer"
//                                     >
//                                       {option.label}
//                                     </Label>
//                                   </div>
//                                 ))}
//                               </div>
//                             </RadioGroup>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <Separator />

//                     {/* Heel Raise */}
//                     <div className="space-y-3">
//                       <FormLabel className="text-sm font-semibold">
//                         {t('insoleHeelRaiseCm')}
//                       </FormLabel>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <FormField
//                           control={form.control}
//                           name="steunzoolHakVerhogingLinks"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel
//                                 htmlFor="heel-left"
//                                 className="text-sm"
//                               >
//                                 {t('left')}
//                               </FormLabel>
//                               <FormControl>
//                                 <Input
//                                   id="heel-left"
//                                   type="number"
//                                   placeholder={t('heelRaisePlaceholder')}
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name="steunzoolHakVerhogingRechts"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel
//                                 htmlFor="heel-right"
//                                 className="text-sm"
//                               >
//                                 {t('right')}
//                               </FormLabel>
//                               <FormControl>
//                                 <Input
//                                   id="heel-right"
//                                   type="number"
//                                   placeholder={t('heelRaisePlaceholder')}
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Talonette Heel Raise - Only if Talonette */}
//               {isTalonette && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>{t('insoleHeelRaiseCm')}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <FormField
//                         control={form.control}
//                         name="steunzoolHakVerhogingLinks"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel
//                               htmlFor="talonette-left"
//                               className="text-sm"
//                             >
//                               {t('left')}
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 id="talonette-left"
//                                 type="number"
//                                 placeholder={t('heelRaisePlaceholder')}
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="steunzoolHakVerhogingRechts"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel
//                               htmlFor="talonette-right"
//                               className="text-sm"
//                             >
//                               {t('right')}
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 id="talonette-right"
//                                 type="number"
//                                 placeholder={t('heelRaisePlaceholder')}
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Special Notes */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>{t('specialNotes')}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <FormField
//                     control={form.control}
//                     name="bijzonderheden"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Textarea
//                             placeholder={t('specialNotesPlaceholder')}
//                             rows={5}
//                             className="resize-none"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>

//               {/* Submit Section */}
//               <FormFooter>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => router.back()}
//                 >
//                   {t('cancel')}
//                 </Button>
//                 <Button type="submit" size="lg" className="min-w-50">
//                   <span className="mr-2">{t('saveAndContinue')}</span>
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </FormFooter>
//             </form>
//           </Form>
//         </FormSection>
//       </div>
//     </BaseLayout>
//   );
// };

// export default FormIntakeSteunzolenPage;


import React from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormCard, FormBlock, FormItemWrapper } from '@/components/ui/form-block'; // IMPORT DE NIEUWE COMPONENTS
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import {
  setIntakeSteunzolenData,
  setClientData,
} from '@/domain/store/slices/formData';
import {
  PAARTYPE_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  PELLOTE_OPTIES,
  STEUNZOLEN_PRIJS_OPTIES,
} from '@/lib/constants/formConstants';
import { ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { scrollToFirstError } from '@/utils/formHelpers';
import { useFormPersistence } from '@/hooks/useFormPersistence';

const FormIntakeSteunzolenPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z
    .object({
      welkPaar: z.string(),
      medischeIndicatie: z.string().optional(),
      schoenmaat: z
        .string()
        .min(1, t('shoeSizeRequired') || 'Shoe size is required'),
      steunzoolTypeGeneral: z.string().optional(),
      steunzoolAndersText: z.string().optional(),
      steunzoolCorrectieMiddenvoet: z.string().optional(),
      steunzoolCorrectieVoorvoet: z.string().optional(),
      steunzoolVvPellote: z.string().optional(),
      steunzoolHakVerhogingLinks: z.string().optional(),
      steunzoolHakVerhogingRechts: z.string().optional(),
      prijs: z.number(),
      prijsNaam: z.string(),
      bijzonderheden: z.string().optional(),
    })
    .refine(
      data => {
        const talonetteOption = STEUNZOLEN_PRIJS_OPTIES.find(
          opt => opt.label === 'prijsTalonette',
        );
        const isTalonette =
          talonetteOption && data.prijs === talonetteOption.value;

        if (!isTalonette && !data.steunzoolTypeGeneral) {
          return false;
        }

        if (
          data.steunzoolTypeGeneral === 'Anders' &&
          !data.steunzoolAndersText
        ) {
          return false;
        }

        if (
          isTalonette &&
          !data.steunzoolHakVerhogingLinks &&
          !data.steunzoolHakVerhogingRechts
        ) {
          return false;
        }

        return true;
      },
      {
        message: 'Please fill in all required fields',
        path: ['steunzoolTypeGeneral'],
      },
    );

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      welkPaar: 'Eerste paar',
      medischeIndicatie: '',
      schoenmaat: '',
      steunzoolTypeGeneral: '',
      steunzoolAndersText: '',
      steunzoolCorrectieMiddenvoet: '',
      steunzoolCorrectieVoorvoet: '',
      steunzoolVvPellote: '',
      steunzoolHakVerhogingLinks: '',
      steunzoolHakVerhogingRechts: '',
      prijs: 225,
      prijsNaam: t('insolesPrice225'),
      bijzonderheden: '',
    },
  });

  const { clearStorage } = useFormPersistence('intakeSteunzolen', form.watch, form.setValue);

  const prijs = form.watch('prijs');
  const steunzoolTypeGeneral = form.watch('steunzoolTypeGeneral');

  const talonetteOption = STEUNZOLEN_PRIJS_OPTIES.find(
    opt => opt.label === 'prijsTalonette',
  );
  const isTalonette = talonetteOption && prijs === talonetteOption.value;

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'Steunzolen' }));
    }

    dispatch(
      setIntakeSteunzolenData({
        welkPaar: data.welkPaar,
        medischeIndicatie: data.medischeIndicatie || '',
        schoenmaat: data.schoenmaat,
        steunzoolTypeGeneral:
          data.steunzoolTypeGeneral === 'Anders'
            ? data.steunzoolAndersText || ''
            : data.steunzoolTypeGeneral || '',
        steunzoolCorrectieMiddenvoet: data.steunzoolCorrectieMiddenvoet || '',
        steunzoolCorrectieVoorvoet: data.steunzoolCorrectieVoorvoet || '',
        steunzoolVvPellote: data.steunzoolVvPellote || '',
        steunzoolHakVerhogingLinks: data.steunzoolHakVerhogingLinks || '',
        steunzoolHakVerhogingRechts: data.steunzoolHakVerhogingRechts || '',
        prijs: data.prijs,
        prijsNaam: data.prijsNaam,
        bijzonderheden: data.bijzonderheden || '',
      }),
    );

    router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeInsoles')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakeInsoles')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('insolesDescription')}
          </p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* Which Pair */}
              <FormCard
                title={t('whichPair')}
                description="Select which pair this intake is for"
              >
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormField
                    control={form.control}
                    name="welkPaar"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {PAARTYPE_OPTIES.map(option => (
                                <div
                                  key={option.value}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={option.value}
                                    id={`paar-${option.value}`}
                                  />
                                  <Label
                                    htmlFor={`paar-${option.value}`}
                                    className="font-normal cursor-pointer"
                                  >
                                    {t(option.label)}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormBlock>
              </FormCard>

              {/* Medical Indication */}
              <FormCard title={t('medicalIndication')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormField
                    control={form.control}
                    name="medischeIndicatie"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={t('medicalIndicationPlaceholder')}
                            rows={4}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormBlock>
              </FormCard>

              {/* Shoe Size */}
              <FormCard title={t('shoeSize')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormField
                    control={form.control}
                    name="schoenmaat"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={t('shoeSizePlaceholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormBlock>
              </FormCard>

              {/* Price */}
              <FormCard title={t('insolePrice')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormField
                    control={form.control}
                    name="prijs"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={val => {
                              field.onChange(Number(val));
                              const selectedOption =
                                STEUNZOLEN_PRIJS_OPTIES.find(
                                  opt => opt.value === Number(val),
                                );
                              if (selectedOption) {
                                form.setValue(
                                  'prijsNaam',
                                  t(selectedOption.label),
                                );
                              }
                            }}
                            value={field.value.toString()}
                          >
                            <div className="space-y-3">
                              {STEUNZOLEN_PRIJS_OPTIES.map(option => (
                                <div
                                  key={option.value}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={option.value.toString()}
                                    id={`price-${option.value}`}
                                  />
                                  <Label
                                    htmlFor={`price-${option.value}`}
                                    className="font-normal cursor-pointer"
                                  >
                                    {t(option.label)}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormBlock>
              </FormCard>

              {/* Insoles Details - Only if NOT Talonette */}
              {!isTalonette && (
                <FormCard title={t('insoles')}>

                  {/* Insole Type */}
                  <FormBlock columns={1} dividers={false} hoverEffect={false}>
                    <FormField
                      control={form.control}
                      name="steunzoolTypeGeneral"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            {t('insoleTypeGeneral')}
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <div className="space-y-2">
                                {STEUNZOOL_TYPE_OPTIES.map(option => (
                                  <div
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={`type-${option.value}`}
                                    />
                                    <Label
                                      htmlFor={`type-${option.value}`}
                                      className="font-normal cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {steunzoolTypeGeneral === 'Anders' && (
                      <FormField
                        control={form.control}
                        name="steunzoolAndersText"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={t('insoleOtherTextPlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </FormBlock>

                  {/* Midfoot Correction */}
                  <FormBlock columns={1} dividers={false} hoverEffect={false}>
                    <FormField
                      control={form.control}
                      name="steunzoolCorrectieMiddenvoet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            {t('insoleMiddfootCorrection')}
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <div className="space-y-2">
                                {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
                                  <div
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={`midfoot-${option.value}`}
                                    />
                                    <Label
                                      htmlFor={`midfoot-${option.value}`}
                                      className="font-normal cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormBlock>

                  {/* Forefoot Correction */}
                  <FormBlock columns={1} dividers={false} hoverEffect={false}>
                    <FormField
                      control={form.control}
                      name="steunzoolCorrectieVoorvoet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            {t('insoleForefootCorrection')}
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <div className="space-y-2">
                                {CORRECTIE_VOORVOET_OPTIES.map(option => (
                                  <div
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={`forefoot-${option.value}`}
                                    />
                                    <Label
                                      htmlFor={`forefoot-${option.value}`}
                                      className="font-normal cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormBlock>

                  {/* Forefoot Pad */}
                  <FormBlock columns={1} dividers={false} hoverEffect={false}>
                    <FormField
                      control={form.control}
                      name="steunzoolVvPellote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            {t('insoleForefootPad')}
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <div className="space-y-2">
                                {PELLOTE_OPTIES.map(option => (
                                  <div
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={`pad-${option.value}`}
                                    />
                                    <Label
                                      htmlFor={`pad-${option.value}`}
                                      className="font-normal cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormBlock>

                  {/* Heel Raise */}
                  <FormBlock title={t('insoleHeelRaiseCm')} columns={2} dividers={true}>
                    <FormItemWrapper>
                      <FormField
                        control={form.control}
                        name="steunzoolHakVerhogingLinks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              htmlFor="heel-left"
                              className="text-sm"
                            >
                              {t('left')}
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="heel-left"
                                type="number"
                                placeholder={t('heelRaisePlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>

                    <FormItemWrapper>
                      <FormField
                        control={form.control}
                        name="steunzoolHakVerhogingRechts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              htmlFor="heel-right"
                              className="text-sm"
                            >
                              {t('right')}
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="heel-right"
                                type="number"
                                placeholder={t('heelRaisePlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>
                  </FormBlock>
                </FormCard>
              )}

              {/* Talonette Heel Raise - Only if Talonette */}
              {isTalonette && (
                <FormCard title={t('insoleHeelRaiseCm')}>
                  <FormBlock columns={2} dividers={true}>
                    <FormItemWrapper>
                      <FormField
                        control={form.control}
                        name="steunzoolHakVerhogingLinks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              htmlFor="talonette-left"
                              className="text-sm"
                            >
                              {t('left')}
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="talonette-left"
                                type="number"
                                placeholder={t('heelRaisePlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>

                    <FormItemWrapper>
                      <FormField
                        control={form.control}
                        name="steunzoolHakVerhogingRechts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              htmlFor="talonette-right"
                              className="text-sm"
                            >
                              {t('right')}
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="talonette-right"
                                type="number"
                                placeholder={t('heelRaisePlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>
                  </FormBlock>
                </FormCard>
              )}

              {/* Special Notes */}
              <FormCard title={t('specialNotes')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormField
                    control={form.control}
                    name="bijzonderheden"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={t('specialNotesPlaceholder')}
                            rows={5}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormBlock>
              </FormCard>

              {/* Submit Section */}
              <FormFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  {t('cancel')}
                </Button>
                <Button type="submit" size="lg" className="min-w-50">
                  <span className="mr-2">{t('saveAndContinue')}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </FormFooter>
            </form>
          </Form>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormIntakeSteunzolenPage;
