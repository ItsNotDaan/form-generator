import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import {Switch} from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {
  ENCLOSURE_OPTIONS,
  EnclosureOption,
  SHAFT_OPENING_OPTIONS,
  DONKEY_EAR_TYPE_OPTIONS,
  Side,
  LAST_CORRECTION_OPTIONS,
  ZOOL_RANDEN,
  ONDERWERKEN,
  ZIPPER_PLACEMENT_OPTIONS,
  LINING_OPTIONS,
} from '@/domain/form/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {
  setCheckFoliepasData,
  setClientData,
} from '@/domain/store/slices/formData';

import {ChevronRight, Info} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form} from '@/components/ui/form';
import {scrollToFirstError} from '@/utils/formHelpers';
import {Textarea} from '@/components/ui/textarea';
import {useFormPersistence} from '@/hooks/useFormPersistence';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';

const FormCheckFoliepasPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    // Side Selection
    side: z.enum(['left', 'right', 'both'] as const),

    // Reading Corrections
    readingCorrectionAfterFoilFit: z.string().optional(),
    readingCorrectionAfterLiningShoe: z.string().optional(),

    // Foliepas Aanmerkingen - Shaft Heights
    shaftHeightLeft: z.string().optional(),
    shaftHeightRight: z.string().optional(),

    // Foliepas Aanmerkingen - Leg Length Difference
    legLengthDifferenceLeft: z.string().optional(),
    legLengthDifferenceRight: z.string().optional(),

    // Foliepas Aanmerkingen - Shaft Opening
    shaftOpeningWidth: z.string().optional(),

    // Voeringschoen Opties - Enclosure (Omsluiting)
    enclosureLeft: z.record(z.string(), z.boolean()),
    enclosureRight: z.record(z.string(), z.boolean()),
    enclosureLeftMm: z.record(z.string(), z.string()),
    enclosureRightMm: z.record(z.string(), z.string()),

    // Voeringschoen Opties - Donkey Ear (Ezelsoor)
    donkeyEarLeftEnabled: z.boolean(),
    donkeyEarRightEnabled: z.boolean(),
    donkeyEarLeftType: z.string().optional(),
    donkeyEarRightType: z.string().optional(),

    // Voeringschoen Opties - Carbon Stiffening Lining Shoe
    carbonStiffeningLiningShoeLeft: z.boolean().optional(),
    carbonStiffeningLiningShoeRight: z.boolean().optional(),

    // Kleur en Model Section
    showColorAndModel: z.boolean(),

    // Model
    modelType: z.enum(['asPhoto', 'model'] as const).optional(),
    modelText: z.string().optional(),

    // Colors
    colorOptions: z.array(z.string()).optional(),

    // Tongue Padding and Collar (mm)
    tonguePaddingMm: z.enum(['no', '3', '5'] as const).optional(),
    paddingCollarMm: z.enum(['no', '5', '10'] as const).optional(),

    // Closure Type
    closureType: z.enum(['velcro', 'ringsHooks'] as const).optional(),
    ringsNumber: z.string().optional(),
    ringsAmount: z.string().optional(),
    hooksNumber: z.string().optional(),
    hooksAmount: z.string().optional(),

    // Zipper
    zipperType: z
      .enum(['none', 'functionalNylon', 'decorativeNylon'] as const)
      .optional(),
    zipperColor: z.string().optional(),
    zipperPlacement: z.string().optional(),
    zipperMedial: z.boolean().optional(),
    zipperLateral: z.boolean().optional(),

    // Special Features (Bijzonderheden)
    specialMedialVelcro: z.boolean().optional(),
    specialLaceLoop: z.boolean().optional(),
    specialExtraLeather: z.boolean().optional(),
    specialOther: z.string().optional(),

    // Edge Type (Randtype)
    edgeTypeMain: z.string().optional(),
    edgeTypeModel: z.string().optional(),
    edgeTypeColor: z.string().optional(),
    edgeTypeColorCode: z.string().optional(),

    // Sole Type (Zooltype)
    soleTypeCategory: z.string().optional(),
    soleTypeModel: z.string().optional(),
    soleTypeColor: z.string().optional(),
    soleTypeOther: z.string().optional(),

    // Carbon Stiffening Shoe
    carbonStiffeningShoeLeft: z.boolean().optional(),
    carbonStiffeningShoeRight: z.boolean().optional(),

    // Toe Options (Neusopties)
    toeOptionsType: z
      .enum(['none', 'carbon', 'rubberCrawl'] as const)
      .optional(),

    // Lining (Voering)
    liningType: z.string().optional(),

    // Counterfort (Stijfsel)
    counterfortType: z.enum(['formo', 'leather', 'other'] as const).optional(),
    counterfortOther: z.string().optional(),

    // Insole (Binnenzool)
    insoleType: z.enum(['leather', 'other'] as const).optional(),
    insoleOther: z.string().optional(),

    // Sole Edge Polish (Zoolrandafwerking)
    soleEdgePolishType: z
      .enum(['none', 'black', 'brown', 'mahogany', 'ridges', 'other'] as const)
      .optional(),
    soleEdgePolishOther: z.string().optional(),

    // Construction Method (Constructie Methode)
    constructionMethodType: z
      .enum(['glued', 'flexible', 'other'] as const)
      .optional(),
    constructionMethodOther: z.string().optional(),

    // Heel Model (Hielmodel)
    heelModelType: z.enum(['buildUp', 'wedge', 'block'] as const).optional(),
    heelBuildUpMaterial: z.enum(['poro', 'leather'] as const).optional(),
    heelWedgeType: z.enum(['hollow', 'flat'] as const).optional(),
    heelBlockCoreCoating: z.boolean().optional(),

    // Shoring (Schoring)
    shoringLeftType: z
      .enum(['lateral', 'medial', 'lateralAndMedial', 'none'] as const)
      .optional(),
    shoringLeftMm: z.string().optional(),
    shoringRightType: z
      .enum(['lateral', 'medial', 'lateralAndMedial', 'none'] as const)
      .optional(),
    shoringRightMm: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      // Side Selection
      side: 'both',

      // Reading Corrections
      readingCorrectionAfterFoilFit: '',
      readingCorrectionAfterLiningShoe: '',

      // Foliepas Aanmerkingen - Shaft Heights
      shaftHeightLeft: '12.5',
      shaftHeightRight: '12.5',

      // Foliepas Aanmerkingen - Leg Length Difference
      legLengthDifferenceLeft: '',
      legLengthDifferenceRight: '',

      // Foliepas Aanmerkingen - Shaft Opening
      shaftOpeningWidth: SHAFT_OPENING_OPTIONS[3]?.value || '',

      // Voeringschoen Opties - Enclosure (Omsluiting)
      enclosureLeft: {},
      enclosureRight: {},
      enclosureLeftMm: {},
      enclosureRightMm: {},

      // Voeringschoen Opties - Donkey Ear (Ezelsoor)
      donkeyEarLeftEnabled: false,
      donkeyEarRightEnabled: false,
      donkeyEarLeftType: 'Lateraal',
      donkeyEarRightType: 'Lateraal',

      // Voeringschoen Opties - Carbon Stiffening Lining Shoe
      carbonStiffeningLiningShoeLeft: false,
      carbonStiffeningLiningShoeRight: false,

      // Kleur en Model Section
      showColorAndModel: false,

      // Model
      modelType: 'model',
      modelText: '',

      // Colors
      colorOptions: [''],

      // Tongue Padding and Collar (mm)
      tonguePaddingMm: 'no',
      paddingCollarMm: 'no',

      // Closure Type
      closureType: 'ringsHooks',
      ringsNumber: '',
      ringsAmount: '',
      hooksNumber: '',
      hooksAmount: '',

      // Zipper
      zipperType: 'none',
      zipperColor: '',
      zipperPlacement: 'Langs Ringbies',
      zipperMedial: false,
      zipperLateral: false,

      // Special Features (Bijzonderheden)
      specialMedialVelcro: false,
      specialLaceLoop: false,
      specialExtraLeather: false,
      specialOther: '',

      // Edge Type (Randtype)
      edgeTypeMain: '',
      edgeTypeModel: '',
      edgeTypeColor: '',
      edgeTypeColorCode: '',

      // Sole Type (Zooltype)
      soleTypeCategory: '',
      soleTypeModel: '',
      soleTypeColor: '',
      soleTypeOther: '',

      // Carbon Stiffening Shoe
      carbonStiffeningShoeLeft: false,
      carbonStiffeningShoeRight: false,

      // Toe Options (Neusopties)
      toeOptionsType: 'none',

      // Lining (Voering)
      liningType: LINING_OPTIONS[0]?.value || '',

      // Counterfort (Stijfsel)
      counterfortType: 'formo',
      counterfortOther: '',

      // Insole (Binnenzool)
      insoleType: 'leather',
      insoleOther: '',

      // Sole Edge Polish (Zoolrandafwerking)
      soleEdgePolishType: 'none',
      soleEdgePolishOther: '',

      // Construction Method (Constructie Methode)
      constructionMethodType: 'glued',
      constructionMethodOther: '',

      // Heel Model (Hielmodel)
      heelModelType: 'buildUp',
      heelBuildUpMaterial: 'poro',
      heelWedgeType: 'flat',
      heelBlockCoreCoating: false,

      // Shoring (Schoring)
      shoringLeftType: 'none',
      shoringLeftMm: '',
      shoringRightType: 'none',
      shoringRightMm: '',
    },
  });

  const {clearStorage} = useFormPersistence(
    'checkFoliepas',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const side = form.watch('side');
  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  // Watch for conditional visibility
  const showColorAndModel = form.watch('showColorAndModel');
  const modelType = form.watch('modelType');
  const colorOptions = form.watch('colorOptions') || [''];
  const closureType = form.watch('closureType');
  const zipperType = form.watch('zipperType');
  const carbonStiffeningLiningShoeLeft = form.watch(
    'carbonStiffeningLiningShoeLeft',
  );
  const carbonStiffeningLiningShoeRight = form.watch(
    'carbonStiffeningLiningShoeRight',
  );
  const counterfortType = form.watch('counterfortType');
  const insoleType = form.watch('insoleType');
  const soleEdgePolishType = form.watch('soleEdgePolishType');
  const constructionMethodType = form.watch('constructionMethodType');
  const heelModelType = form.watch('heelModelType');

  const onSubmit = (data: FormData) => {
    dispatch(
      setCheckFoliepasData({
        // Side Selection
        side: data.side,

        // Reading Corrections
        readingCorrectionAfterFoilFit: data.readingCorrectionAfterFoilFit || '',
        readingCorrectionAfterLiningShoe:
          data.readingCorrectionAfterLiningShoe || '',

        // Foliepas Aanmerkingen - Shaft Heights
        shaftHeightLeft: data.shaftHeightLeft || '',
        shaftHeightRight: data.shaftHeightRight || '',

        // Foliepas Aanmerkingen - Leg Length Difference
        legLengthDifferenceLeft: data.legLengthDifferenceLeft || '',
        legLengthDifferenceRight: data.legLengthDifferenceRight || '',

        // Foliepas Aanmerkingen - Shaft Opening
        shaftOpeningWidth: data.shaftOpeningWidth || '',

        // Voeringschoen Opties - Enclosure (Omsluiting)
        enclosureLeft: data.enclosureLeft as Record<string, boolean>,
        enclosureRight: data.enclosureRight as Record<string, boolean>,
        enclosureLeftMm: data.enclosureLeftMm as Record<string, string>,
        enclosureRightMm: data.enclosureRightMm as Record<string, string>,

        // Voeringschoen Opties - Donkey Ear (Ezelsoor)
        donkeyEarLeftEnabled: data.donkeyEarLeftEnabled,
        donkeyEarRightEnabled: data.donkeyEarRightEnabled,
        donkeyEarLeftType: data.donkeyEarLeftType || '',
        donkeyEarRightType: data.donkeyEarRightType || '',

        // Voeringschoen Opties - Carbon Stiffening Lining Shoe
        carbonStiffeningLiningShoeLeft:
          data.carbonStiffeningLiningShoeLeft || false,
        carbonStiffeningLiningShoeRight:
          data.carbonStiffeningLiningShoeRight || false,

        // Kleur en Model Section
        showColorAndModel: data.showColorAndModel,

        // Model
        modelType: data.modelType || '',
        modelText: data.modelText || '',

        // Colors
        colorOptions: data.colorOptions || [],

        // Tongue Padding and Collar (mm)
        tonguePaddingMm: data.tonguePaddingMm || '',
        paddingCollarMm: data.paddingCollarMm || '',

        // Closure Type
        closureType: data.closureType || '',
        ringsNumber: data.ringsNumber || '',
        ringsAmount: data.ringsAmount || '',
        hooksNumber: data.hooksNumber || '',
        hooksAmount: data.hooksAmount || '',

        // Zipper
        zipperType: data.zipperType || '',
        zipperColor: data.zipperColor || '',
        zipperPlacement: data.zipperPlacement || '',
        zipperMedial: data.zipperMedial || false,
        zipperLateral: data.zipperLateral || false,

        // Special Features (Bijzonderheden)
        specialMedialVelcro: data.specialMedialVelcro || false,
        specialLaceLoop: data.specialLaceLoop || false,
        specialExtraLeather: data.specialExtraLeather || false,
        specialOther: data.specialOther || '',

        // Edge Type (Randtype)
        edgeTypeMain: data.edgeTypeMain || '',
        edgeTypeModel: data.edgeTypeModel || '',
        edgeTypeColor: data.edgeTypeColor || '',
        edgeTypeColorCode: data.edgeTypeColorCode || '',

        // Sole Type (Zooltype)
        soleTypeCategory: data.soleTypeCategory || '',
        soleTypeModel: data.soleTypeModel || '',
        soleTypeColor: data.soleTypeColor || '',
        soleTypeOther: data.soleTypeOther || '',

        // Carbon Stiffening Shoe
        carbonStiffeningShoeLeft: data.carbonStiffeningShoeLeft || false,
        carbonStiffeningShoeRight: data.carbonStiffeningShoeRight || false,

        // Toe Options (Neusopties)
        toeOptionsType: data.toeOptionsType || '',

        // Lining (Voering)
        liningType: data.liningType || '',

        // Counterfort (Stijfsel)
        counterfortType: data.counterfortType || '',
        counterfortOther: data.counterfortOther || '',

        // Insole (Binnenzool)
        insoleType: data.insoleType || '',
        insoleOther: data.insoleOther || '',

        // Sole Edge Polish (Zoolrandafwerking)
        soleEdgePolishType: data.soleEdgePolishType || '',
        soleEdgePolishOther: data.soleEdgePolishOther || '',

        // Construction Method (Constructie Methode)
        constructionMethodType: data.constructionMethodType || '',
        constructionMethodOther: data.constructionMethodOther || '',

        // Heel Model (Hielmodel)
        heelModelType: data.heelModelType || '',
        heelBuildUpMaterial: data.heelBuildUpMaterial || '',
        heelWedgeType: data.heelWedgeType || '',
        heelBlockCoreCoating: data.heelBlockCoreCoating || false,

        // Shoring (Schoring)
        shoringLeftType: data.shoringLeftType || 'none',
        shoringLeftMm: data.shoringLeftMm || '',
        shoringRightType: data.shoringRightType || 'none',
        shoringRightMm: data.shoringRightMm || '',
      }),
    );

    void router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('checkFoliepas')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('checkFoliepas')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('checkFoliepasDescription')}
          </p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* Side Selection */}
              <FormCard title={t('side')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormItemWrapper>
                    <RadioGroup
                      value={side}
                      onValueChange={v => form.setValue('side', v as Side)}
                    >
                      <div className="flex flex-row justify-center gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="side-both" />
                          <Label
                            htmlFor="side-both"
                            className="font-normal cursor-pointer"
                          >
                            {t('both')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="left" id="side-left" />
                          <Label
                            htmlFor="side-left"
                            className="font-normal cursor-pointer"
                          >
                            {t('left')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="right" id="side-right" />
                          <Label
                            htmlFor="side-right"
                            className="font-normal cursor-pointer"
                          >
                            {t('right')}
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Reading Corrections after Foil Fit */}
              <FormCard title={t('readingCorrectionAfterFoilFit')}>
                {/* Pressable Labels Section */}
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {LAST_CORRECTION_OPTIONS.map(optie => (
                    <Label
                      key={optie.value}
                      onClick={() => {
                        // Get current value
                        const currentText =
                          form.getValues('readingCorrectionAfterFoilFit') || '';

                        // Construct new line: "- Translation: Links: Rechts:"
                        const textToAdd = '- ' + t(optie.translationKey);

                        // Append with newline if text exists
                        const newText = currentText
                          ? `${currentText}\n${textToAdd}`
                          : textToAdd;

                        // Update form
                        form.setValue(
                          'readingCorrectionAfterFoilFit',
                          newText,
                          {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          },
                        );
                        clearStorage();
                      }}
                      className="flex cursor-pointer items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 transition-colors hover:bg-accent/30"
                    >
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm font-medium leading-none">
                          {optie.label}
                        </p>
                      </div>
                    </Label>
                  ))}
                </div>

                {/* Textarea */}
                <Textarea
                  id="reading-correction-foil-fit"
                  placeholder={t('readingCorrectionAfterFoilFit')}
                  // Using watch/setValue pattern ensures the textarea updates when buttons are clicked
                  value={form.watch('readingCorrectionAfterFoilFit') || ''}
                  onChange={e =>
                    form.setValue(
                      'readingCorrectionAfterFoilFit',
                      e.target.value,
                      {
                        shouldDirty: true,
                        shouldTouch: true,
                      },
                    )
                  }
                />
              </FormCard>

              {/* Reading Corrections after Lining Shoe */}
              <FormCard title={t('readingCorrectionAfterLiningShoe')}>
                {/* Pressable Labels Section */}
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {LAST_CORRECTION_OPTIONS.map(optie => (
                    <Label
                      key={optie.value}
                      onClick={() => {
                        // Get current value
                        const currentText =
                          form.getValues('readingCorrectionAfterLiningShoe') ||
                          '';

                        // Construct new line: "- Translation: Links: Rechts:"
                        const textToAdd = '- ' + t(optie.translationKey);

                        // Append with newline if text exists
                        const newText = currentText
                          ? `${currentText}\n${textToAdd}`
                          : textToAdd;

                        // Update form
                        form.setValue(
                          'readingCorrectionAfterLiningShoe',
                          newText,
                          {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          },
                        );
                      }}
                      className="flex cursor-pointer items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 transition-colors hover:bg-accent/30"
                    >
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm font-medium leading-none">
                          {optie.label}
                        </p>
                      </div>
                    </Label>
                  ))}
                </div>
                {/* Textarea */}
                <Textarea
                  id="reading-correction-lining-shoe"
                  placeholder={t('readingCorrectionAfterLiningShoe')}
                  value={form.watch('readingCorrectionAfterLiningShoe') || ''}
                  onChange={e =>
                    form.setValue(
                      'readingCorrectionAfterLiningShoe',
                      e.target.value,
                      {
                        shouldDirty: true,
                        shouldTouch: true,
                      },
                    )
                  }
                />
              </FormCard>

              {/* Enclosure + Beenlengte + Openstand */}
              <FormCard
                title="Foliepas aanmerkingen"
                description={`${t('shaftHeight')} • ${t('legLengthDifference')} • ${t('shaftOpening')}`}
              >
                {/* Shaft Height (Schacht Hoogte) */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('shaftHeightCm')}
                >
                  {showLinks && (
                    <FormItemWrapper
                      label={t('leftCm')}
                      className="items-center"
                    >
                      <Input
                        id="shaft-left"
                        type="number"
                        placeholder={t('cmPlaceholder')}
                        value={form.watch('shaftHeightLeft')}
                        onChange={e =>
                          form.setValue('shaftHeightLeft', e.target.value)
                        }
                        className="w-2/3 text-center"
                      />
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper
                      className="items-center"
                      label={t('rightCm')}
                    >
                      <Input
                        id="shaft-right"
                        type="number"
                        placeholder={t('cmPlaceholder')}
                        value={form.watch('shaftHeightRight')}
                        onChange={e =>
                          form.setValue('shaftHeightRight', e.target.value)
                        }
                        className="w-2/3 text-center"
                      />
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Beenlengte verschil */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('legLengthDifference')}
                >
                  <FormItemWrapper label={t('leftCm')}>
                    <Input
                      id="leg-length-left"
                      type="text"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('legLengthDifferenceLeft')}
                      onChange={e =>
                        form.setValue('legLengthDifferenceLeft', e.target.value)
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('rightCm')}>
                    <Input
                      id="leg-length-right"
                      type="text"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('legLengthDifferenceRight')}
                      onChange={e =>
                        form.setValue(
                          'legLengthDifferenceRight',
                          e.target.value,
                        )
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>

                {/* Openstand schacht */}
                <FormBlock
                  title={t('shaftOpening')}
                  columns={1}
                  dividers={false}
                  hoverEffect={false}
                >
                  <FormItemWrapper>
                    <RadioGroup
                      value={form.watch('shaftOpeningWidth') || ''}
                      onValueChange={v => form.setValue('shaftOpeningWidth', v)}
                      className="justify-center"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-2">
                        {SHAFT_OPENING_OPTIONS.map(opt => (
                          <Label
                            key={opt.value}
                            htmlFor={`opening-${opt.value}`}
                            className="flex justify-center items-center gap-2 rounded-md border bg-background px-3 py-2 cursor-pointer max-w-fit"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`opening-${opt.value}`}
                            />
                            <span className="text-sm text-foreground">
                              {opt.label.replace('.', ',')} cm
                            </span>
                          </Label>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Voeringsschoen: Omsluiting, Ezelsoor, Koolstofverstijving */}
              <FormCard
                title="Voeringschoen opties"
                description={`${t('enclosure')} • ${t('donkeyEar')} • ${t('carbonStiffeningLiningShoe')}`}
              >
                {/* Enclosure (Omsluiting) */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('enclosure')}
                >
                  {showLinks && (
                    <FormItemWrapper label={t('left')}>
                      <div className="space-y-3 w-full lg:w-3/4">
                        {' '}
                        {/* Full on mobile, 3/4 on desktop */}
                        {ENCLOSURE_OPTIONS.map((optie: EnclosureOption) => (
                          <Label
                            key={optie.key}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
                          >
                            <Switch
                              id={`encl-left-${optie.key}`}
                              checked={
                                (form.watch('enclosureLeft')[
                                  optie.fullKeyLinks
                                ] as boolean) || false
                              }
                              onCheckedChange={checked => {
                                if (window.navigator?.vibrate) {
                                  window.navigator.vibrate(10);
                                }

                                form.setValue('enclosureLeft', {
                                  ...form.getValues('enclosureLeft'),
                                  [optie.fullKeyLinks]: !!checked,
                                });
                                if (
                                  checked &&
                                  optie.needsMm &&
                                  optie.defaultMm
                                ) {
                                  form.setValue('enclosureLeftMm', {
                                    ...form.getValues('enclosureLeftMm'),
                                    [optie.mmKeyLinks]: optie.defaultMm,
                                  });
                                } else if (!checked) {
                                  const next = {
                                    ...form.getValues('enclosureLeftMm'),
                                  };
                                  delete next[optie.mmKeyLinks];
                                  form.setValue('enclosureLeftMm', next);
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="font-normal text-base sm:text-sm leading-tight flex-1">
                              {optie.label}
                            </span>
                            {optie.needsMm &&
                              (form.watch('enclosureLeft')[
                                optie.fullKeyLinks
                              ] as boolean) && (
                                <Input
                                  type="number"
                                  inputMode={
                                    optie.key === 'hoge' ? 'decimal' : 'numeric'
                                  }
                                  pattern="[0-9]*"
                                  placeholder={
                                    optie.key === 'hoge' ? 'cm' : 'mm'
                                  }
                                  value={
                                    (form.watch('enclosureLeftMm')[
                                      optie.mmKeyLinks
                                    ] as string) || ''
                                  }
                                  onChange={e =>
                                    form.setValue('enclosureLeftMm', {
                                      ...form.getValues('enclosureLeftMm'),
                                      [optie.mmKeyLinks]: e.target.value,
                                    })
                                  }
                                  className="w-full sm:w-20 h-12 sm:h-auto text-base sm:text-sm"
                                  autoComplete="off"
                                />
                              )}
                          </Label>
                        ))}
                      </div>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper label={t('right')}>
                      <div className="space-y-3 w-full lg:w-3/4">
                        {ENCLOSURE_OPTIONS.map((optie: EnclosureOption) => (
                          <Label
                            key={optie.key}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
                          >
                            <Switch
                              id={`encl-right-${optie.key}`}
                              checked={
                                (form.watch('enclosureRight')[
                                  optie.fullKeyRechts
                                ] as boolean) || false
                              }
                              onCheckedChange={checked => {
                                if (window.navigator?.vibrate) {
                                  window.navigator.vibrate(10);
                                }

                                form.setValue('enclosureRight', {
                                  ...form.getValues('enclosureRight'),
                                  [optie.fullKeyRechts]: !!checked,
                                });
                                if (
                                  checked &&
                                  optie.needsMm &&
                                  optie.defaultMm
                                ) {
                                  form.setValue('enclosureRightMm', {
                                    ...form.getValues('enclosureRightMm'),
                                    [optie.mmKeyRechts]: optie.defaultMm,
                                  });
                                } else if (!checked) {
                                  const next = {
                                    ...form.getValues('enclosureRightMm'),
                                  };
                                  delete next[optie.mmKeyRechts];
                                  form.setValue('enclosureRightMm', next);
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="font-normal text-base sm:text-sm leading-tight flex-1">
                              {optie.label}
                            </span>
                            {optie.needsMm &&
                              (form.watch('enclosureRight')[
                                optie.fullKeyRechts
                              ] as boolean) && (
                                <Input
                                  type="number"
                                  inputMode={
                                    optie.key === 'hoge' ? 'decimal' : 'numeric'
                                  }
                                  pattern="[0-9]*"
                                  placeholder={
                                    optie.key === 'hoge' ? 'cm' : 'mm'
                                  }
                                  value={
                                    (form.watch('enclosureRightMm')[
                                      optie.mmKeyRechts
                                    ] as string) || ''
                                  }
                                  onChange={e =>
                                    form.setValue('enclosureRightMm', {
                                      ...form.getValues('enclosureRightMm'),
                                      [optie.mmKeyRechts]: e.target.value,
                                    })
                                  }
                                  className="w-full sm:w-20 h-12 sm:h-auto text-base sm:text-sm"
                                  autoComplete="off"
                                />
                              )}
                          </Label>
                        ))}
                      </div>
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Ezelsoor (Donkey Ear) */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('donkeyEar')}
                >
                  {/* Ezelsoor Left */}
                  {showLinks && (
                    <FormItemWrapper>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="ezelsoor-links-switch"
                          className="font-normal cursor-pointer"
                        >
                          {t('left')}
                        </Label>
                        <Switch
                          id="ezelsoor-links-switch"
                          checked={form.watch('donkeyEarLeftEnabled') || false}
                          onCheckedChange={checked =>
                            form.setValue('donkeyEarLeftEnabled', !!checked)
                          }
                        />
                      </div>
                      {form.watch('donkeyEarLeftEnabled') && (
                        <Select
                          value={form.watch('donkeyEarLeftType')}
                          onValueChange={v =>
                            form.setValue('donkeyEarLeftType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                DONKEY_EAR_TYPE_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('donkeyEarLeftType'),
                                )?.label || '',
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {DONKEY_EAR_TYPE_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {t(opt.label)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormItemWrapper>
                  )}

                  {/* Ezelsoor Right */}
                  {showRechts && (
                    <FormItemWrapper>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="ezelsoor-rechts-switch"
                          className="font-normal cursor-pointer"
                        >
                          {t('right')}
                        </Label>
                        <Switch
                          id="ezelsoor-rechts-switch"
                          checked={form.watch('donkeyEarRightEnabled') || false}
                          onCheckedChange={checked =>
                            form.setValue('donkeyEarRightEnabled', !!checked)
                          }
                        />
                      </div>

                      {form.watch('donkeyEarRightEnabled') && (
                        <Select
                          value={form.watch('donkeyEarRightType')}
                          onValueChange={v =>
                            form.setValue('donkeyEarRightType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                DONKEY_EAR_TYPE_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('donkeyEarRightType'),
                                )?.label || '',
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {DONKEY_EAR_TYPE_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {t(opt.label)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Zoolverstijving Voeringschoen (Carbon Stiffening Lining Shoe) */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('carbonStiffeningLiningShoe')}
                >
                  {showLinks && (
                    <FormItemWrapper>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="carbon-lining-left"
                          className="font-normal cursor-pointer"
                        >
                          {t('left')}
                        </Label>
                        <Switch
                          id="carbon-lining-left"
                          checked={
                            form.watch('carbonStiffeningLiningShoeLeft') ||
                            false
                          }
                          onCheckedChange={checked =>
                            form.setValue(
                              'carbonStiffeningLiningShoeLeft',
                              !!checked,
                            )
                          }
                        />
                      </div>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="carbon-lining-right"
                          className="font-normal cursor-pointer"
                        >
                          {t('right')}
                        </Label>
                        <Switch
                          id="carbon-lining-right"
                          checked={
                            form.watch('carbonStiffeningLiningShoeRight') ||
                            false
                          }
                          onCheckedChange={checked =>
                            form.setValue(
                              'carbonStiffeningLiningShoeRight',
                              !!checked,
                            )
                          }
                        />
                      </div>
                    </FormItemWrapper>
                  )}
                </FormBlock>
              </FormCard>

              {/* ----------------------------------------------- */}

              {/* Alles hieronder is een Card met de translated naam: Kleur en Model:
              LAAT ALLE COMMENTS STAAN VOOR CONTROLE.
              Kleur/Model (Ja/Nee) (Radio)
              Als ja laat hieronder alles zien
              als nee verberg alles hieronder.

              */}

              {/* Kleur en Model - Refactored with FormCard, FormBlock, FormItemWrapper */}
              <FormCard
                title={t('colorAndModel')}
                description={t('colors')}
                toggleAble={true}
                toggleLabel={t('colorAndModel')}
                defaultOpen={form.watch('showColorAndModel')} // Optional: Sync initial state if needed
              >
                {/* Model & Colors */}
                <FormBlock columns={2} dividers>
                  {/* Model */}
                  <FormItemWrapper label={t('finalModel')}>
                    <Select
                      value={modelType ?? 'model'}
                      onValueChange={v =>
                        form.setValue('modelType', v as 'asPhoto' | 'model')
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('finalModel')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asPhoto">{t('asPhoto')}</SelectItem>
                        <SelectItem value="model">{t('model')}</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* If modelType is 'model', show a textarea */}
                    {modelType === 'model' && (
                      <Input
                        placeholder={t('modelPlaceholder')}
                        value={form.watch('modelText') || ''}
                        onChange={e =>
                          form.setValue('modelText', e.target.value)
                        }
                        className="w-2/3"
                      />
                    )}
                  </FormItemWrapper>

                  {/* Colors */}
                  <FormItemWrapper label={t('colors')}>
                    <div className="grid gap-3 w-2/3">
                      {colorOptions.map((color, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[auto_1fr_auto] gap-2 items-center"
                        >
                          <span className="text-sm font-medium text-muted-foreground">
                            {index + 1}.
                          </span>
                          <Input
                            placeholder={`${t('colorOption')} ${index + 1}`}
                            value={color}
                            onChange={e => {
                              const colors = [...colorOptions];
                              colors[index] = e.target.value;
                              form.setValue('colorOptions', colors);
                            }}
                          />
                          {colorOptions.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const colors = [...colorOptions];
                                colors.splice(index, 1);
                                form.setValue('colorOptions', colors);
                              }}
                              className="ml-2 bg-background!"
                            >
                              {t('removeColorOption')}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const colors = [...colorOptions, ''];
                        form.setValue('colorOptions', colors);
                      }}
                      className="w-2/3 bg-background!"
                    >
                      + {t('addColorOption')}
                    </Button>
                  </FormItemWrapper>
                </FormBlock>

                {/* Tongue Padding, Zipper & Padding Collar */}
                <FormBlock columns={3} dividers>
                  {/* Tongue Padding */}
                  <FormItemWrapper label={t('tonguePadding')}>
                    <Select
                      value={form.watch('tonguePaddingMm') || ''}
                      onValueChange={v =>
                        form.setValue('tonguePaddingMm', v as 'no' | '3' | '5')
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('tonguePadding')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">{t('no')}</SelectItem>
                        <SelectItem value="3">{t('mm3')}</SelectItem>
                        <SelectItem value="5">{t('mm5')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Padding Collar */}
                  <FormItemWrapper label={t('paddingCollar')}>
                    <Select
                      value={form.watch('paddingCollarMm') || ''}
                      onValueChange={v =>
                        form.setValue('paddingCollarMm', v as 'no' | '5' | '10')
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('paddingCollar')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">{t('no')}</SelectItem>
                        <SelectItem value="6">{t('mm6')}</SelectItem>
                        <SelectItem value="10">{t('mm10')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Zipper */}
                  <FormItemWrapper label={t('zipper')}>
                    <Select
                      value={zipperType || 'none'}
                      onValueChange={v =>
                        form.setValue(
                          'zipperType',
                          v as 'none' | 'functionalNylon' | 'decorativeNylon',
                        )
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('zipper')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t('noZipper')}</SelectItem>
                        <SelectItem value="functionalNylon">
                          Rits Functioneel
                        </SelectItem>
                        <SelectItem value="decorativeNylon">
                          Rits Decoratief
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {zipperType && zipperType !== 'none' && (
                      <div className="space-y-4 pt-4">
                        {/* Color and Placement side by side */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Color input (optional) */}
                          <div>
                            <Label htmlFor="zipper-color" className="text-sm">
                              Kleur (optioneel)
                            </Label>
                            <Input
                              id="zipper-color"
                              placeholder="Kleur"
                              value={form.watch('zipperColor') || ''}
                              onChange={e =>
                                form.setValue('zipperColor', e.target.value)
                              }
                              className="mt-2"
                            />
                          </div>
                          {/* Placement select */}
                          <div>
                            <Label
                              htmlFor="zipper-placement"
                              className="text-sm"
                            >
                              Plaatsing
                            </Label>
                            <Select
                              value={
                                form.watch('zipperPlacement') ||
                                'Langs Ringbies'
                              }
                              onValueChange={v =>
                                form.setValue('zipperPlacement', v)
                              }
                            >
                              <SelectTrigger className="bg-background! mt-2">
                                <SelectValue placeholder="Plaatsing" />
                              </SelectTrigger>
                              <SelectContent>
                                {ZIPPER_PLACEMENT_OPTIONS.map(option => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {/* Medial/Lateral checkboxes */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="zipper-medial"
                              checked={form.watch('zipperMedial') || false}
                              onCheckedChange={checked =>
                                form.setValue('zipperMedial', !!checked)
                              }
                            />
                            <Label
                              htmlFor="zipper-medial"
                              className="font-normal cursor-pointer"
                            >
                              {t('medial')}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="zipper-lateral"
                              checked={form.watch('zipperLateral') || false}
                              onCheckedChange={checked =>
                                form.setValue('zipperLateral', !!checked)
                              }
                            />
                            <Label
                              htmlFor="zipper-lateral"
                              className="font-normal cursor-pointer"
                            >
                              {t('lateral')}
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </FormItemWrapper>
                </FormBlock>

                {/* Closure & Special Features */}
                <FormBlock columns={2} dividers={true} alignItems="stretch">
                  {/* Closure */}
                  <FormItemWrapper
                    label={t('closure')}
                    className="h-full justify-center"
                  >
                    <Select
                      value={closureType || 'velcro'}
                      onValueChange={v =>
                        form.setValue(
                          'closureType',
                          v as 'velcro' | 'ringsHooks',
                        )
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('closure')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="velcro">
                          {t('velcroWithExtraLongRolPassant')}
                        </SelectItem>
                        <SelectItem value="ringsHooks">
                          {t('ringsAndHooks')}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {/* If closureType is 'ringsHooks' */}
                    {closureType === 'ringsHooks' && (
                      <div className="grid grid-cols-2 gap-3 pt-2 w-full">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="rings-nr">{t('ringsNumber')}</Label>
                          <Input
                            id="rings-nr"
                            type="text"
                            placeholder={t('ringsNumberPlaceholder')}
                            value={form.watch('ringsNumber') || ''}
                            onChange={e =>
                              form.setValue('ringsNumber', e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="rings-amount">
                            {t('ringsAmount')}
                          </Label>
                          <Input
                            id="rings-amount"
                            type="text"
                            placeholder={t('ringsAmountPlaceholder')}
                            value={form.watch('ringsAmount') || ''}
                            onChange={e =>
                              form.setValue('ringsAmount', e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="hooks-nr">{t('hooksNumber')}</Label>
                          <Input
                            id="hooks-nr"
                            type="text"
                            placeholder={t('hooksNumberPlaceholder')}
                            value={form.watch('hooksNumber') || ''}
                            onChange={e =>
                              form.setValue('hooksNumber', e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="hooks-amount">
                            {t('hooksAmount')}
                          </Label>
                          <Input
                            id="hooks-amount"
                            type="text"
                            placeholder={t('hooksAmountPlaceholder')}
                            value={form.watch('hooksAmount') || ''}
                            onChange={e =>
                              form.setValue('hooksAmount', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </FormItemWrapper>

                  {/* Special Features */}
                  <FormItemWrapper label={t('specialDetails')}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="special-medial-velcro"
                          checked={form.watch('specialMedialVelcro') || false}
                          onCheckedChange={checked =>
                            form.setValue('specialMedialVelcro', !!checked)
                          }
                        />
                        <Label
                          htmlFor="special-medial-velcro"
                          className="font-normal cursor-pointer text-sm"
                        >
                          {t('medialVelcroTongue')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="special-lace-loop"
                          checked={form.watch('specialLaceLoop') || false}
                          onCheckedChange={checked =>
                            form.setValue('specialLaceLoop', !!checked)
                          }
                        />
                        <Label
                          htmlFor="special-lace-loop"
                          className="font-normal cursor-pointer text-sm"
                        >
                          {t('laceLoopOnTongue')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="special-extra-leather"
                          checked={form.watch('specialExtraLeather') || false}
                          onCheckedChange={checked =>
                            form.setValue('specialExtraLeather', !!checked)
                          }
                        />
                        <Label
                          htmlFor="special-extra-leather"
                          className="font-normal cursor-pointer text-sm"
                        >
                          {t('extraLeatherForSupplements')}
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2 pt-1 w-2/3">
                      <Label htmlFor="special-other">{t('other')}</Label>
                      <Textarea
                        id="special-other"
                        placeholder={t('otherPlaceholder')}
                        value={form.watch('specialOther') || ''}
                        onChange={e =>
                          form.setValue('specialOther', e.target.value)
                        }
                        rows={1}
                      />
                    </div>
                  </FormItemWrapper>
                </FormBlock>

                {/* Edge Type / RandType - Cascading Selection */}
                <FormBlock columns={3} dividers={false} title="Randtype">
                  {/* Main Edge Type */}
                  <FormItemWrapper label="Type">
                    <Select
                      value={form.watch('edgeTypeMain') || ''}
                      onValueChange={v => {
                        form.setValue('edgeTypeMain', v);
                        // Reset dependent fields
                        form.setValue('edgeTypeModel', '');
                        form.setValue('edgeTypeColor', '');
                        form.setValue('edgeTypeColorCode', '');
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder="Selecteer type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ZOOL_RANDEN.map(type => (
                          <SelectItem key={type.naam} value={type.naam}>
                            {type.naam}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Model Selection */}
                  <FormItemWrapper label="Model">
                    <Select
                      value={form.watch('edgeTypeModel') || ''}
                      onValueChange={v => {
                        form.setValue('edgeTypeModel', v);
                        // Reset color when model changes
                        form.setValue('edgeTypeColor', '');
                        form.setValue('edgeTypeColorCode', '');
                      }}
                      disabled={!form.watch('edgeTypeMain')}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder="Selecteer model" />
                      </SelectTrigger>
                      <SelectContent>
                        {ZOOL_RANDEN.find(
                          t => t.naam === form.watch('edgeTypeMain'),
                        )?.modellen.map(model => (
                          <SelectItem key={model.model} value={model.model}>
                            {model.model}
                            {model.gegevens?.notitie &&
                              ` (${model.gegevens.notitie})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Color Selection */}
                  <FormItemWrapper label="Kleur">
                    <Select
                      value={form.watch('edgeTypeColor') || ''}
                      onValueChange={v => {
                        form.setValue('edgeTypeColor', v);
                        // Find and set the color code
                        const selectedType = ZOOL_RANDEN.find(
                          t => t.naam === form.watch('edgeTypeMain'),
                        );
                        const selectedModel = selectedType?.modellen.find(
                          m => m.model === form.watch('edgeTypeModel'),
                        );
                        const selectedColor = selectedModel?.kleuren.find(
                          k => k.kleur === v,
                        );
                        form.setValue(
                          'edgeTypeColorCode',
                          selectedColor?.code || '',
                        );
                      }}
                      disabled={!form.watch('edgeTypeModel')}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder="Selecteer kleur" />
                      </SelectTrigger>
                      <SelectContent>
                        {ZOOL_RANDEN.find(
                          t => t.naam === form.watch('edgeTypeMain'),
                        )
                          ?.modellen.find(
                            m => m.model === form.watch('edgeTypeModel'),
                          )
                          ?.kleuren.map(kleur => (
                            <SelectItem key={kleur.kleur} value={kleur.kleur}>
                              {kleur.kleur}
                              {kleur.code && ` (${kleur.code})`}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>

                {/* Sole Type - Cascading Selection */}
                <FormBlock columns={3} dividers={false} title="Zooltype">
                  {/* Category Selection */}
                  <FormItemWrapper label="Categorie">
                    <Select
                      value={form.watch('soleTypeCategory') || ''}
                      onValueChange={v => {
                        form.setValue('soleTypeCategory', v);
                        // Reset dependent fields
                        form.setValue('soleTypeModel', '');
                        form.setValue('soleTypeColor', '');
                        form.setValue('soleTypeOther', '');
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder="Selecteer categorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {ONDERWERKEN.map(c => (
                          <SelectItem key={c.naam} value={c.naam}>
                            {c.naam}
                          </SelectItem>
                        ))}
                        <SelectItem value="Anders">Anders</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Model Selection */}
                  <FormItemWrapper label="Model">
                    {form.watch('soleTypeCategory') === 'Anders' ? (
                      <Input
                        placeholder="Beschrijving"
                        value={form.watch('soleTypeOther') || ''}
                        onChange={e =>
                          form.setValue('soleTypeOther', e.target.value)
                        }
                        className="w-2/3"
                      />
                    ) : (
                      <Select
                        value={form.watch('soleTypeModel') || ''}
                        onValueChange={v => {
                          form.setValue('soleTypeModel', v);
                          // Reset color when model changes
                          form.setValue('soleTypeColor', '');
                        }}
                        disabled={!form.watch('soleTypeCategory')}
                      >
                        <SelectTrigger className="bg-background! w-2/3">
                          <SelectValue placeholder="Selecteer model" />
                        </SelectTrigger>
                        <SelectContent>
                          {ONDERWERKEN.find(
                            c => c.naam === form.watch('soleTypeCategory'),
                          )?.zolen.map(zool => (
                            <SelectItem key={zool.model} value={zool.model}>
                              {zool.model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormItemWrapper>

                  {/* Color Selection */}
                  <FormItemWrapper label="Kleur">
                    <Select
                      value={form.watch('soleTypeColor') || ''}
                      onValueChange={v => form.setValue('soleTypeColor', v)}
                      disabled={
                        !form.watch('soleTypeModel') ||
                        form.watch('soleTypeCategory') === 'Anders'
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder="Selecteer kleur" />
                      </SelectTrigger>
                      <SelectContent>
                        {ONDERWERKEN.find(
                          c => c.naam === form.watch('soleTypeCategory'),
                        )
                          ?.zolen.find(
                            z => z.model === form.watch('soleTypeModel'),
                          )
                          ?.kleuren.map(kleur => (
                            <SelectItem key={kleur.kleur} value={kleur.kleur}>
                              {kleur.kleur}
                              {kleur.code && ` (${kleur.code})`}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* This should be filling the whole bottom */}
                  <div className="col-span-3 items-center justify-center flex mt-2">
                    {/* Display metadata if available */}
                    {form.watch('soleTypeModel') &&
                      (() => {
                        const selectedCat = ONDERWERKEN.find(
                          c => c.naam === form.watch('soleTypeCategory'),
                        );
                        const selectedZool = selectedCat?.zolen.find(
                          z => z.model === form.watch('soleTypeModel'),
                        );
                        if (selectedZool?.gegevens) {
                          const gegevens = selectedZool.gegevens;
                          const infoItems = [
                            gegevens.notitie && `Notities: ${gegevens.notitie}`,
                            gegevens.zwaarte && `Gewicht: ${gegevens.zwaarte}`,
                            gegevens.zool_dikte &&
                              `Zool: ${gegevens.zool_dikte}`,
                            gegevens.hak_dikte &&
                              `Hak dikte: ${gegevens.hak_dikte}`,
                            gegevens.dikte && `Dikte dikte: ${gegevens.dikte}`,
                          ].filter(Boolean);
                          return (
                            <div className="flex flex-row items-center rounded-md p-2 gap-2 bg-primary/10 w-2/3">
                              <Info className="h-5 w-5 text-primary" />
                              <p className="text-sm text-foreground whitespace-pre-wrap">
                                {infoItems.join('\n')}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      })()}
                  </div>
                </FormBlock>

                {/* Carbon Stiffening & Toe Options */}
                <FormBlock columns={2} dividers>
                  <FormItemWrapper label={t('carbonStiffeningShoe')}>
                    {/* Show notification if lining shoe carbon stiffening is enabled */}
                    {(carbonStiffeningLiningShoeLeft ||
                      carbonStiffeningLiningShoeRight) && (
                      <div className="flex flex-row items-center rounded-md p-2 gap-2 bg-primary/10 w-2/3 mb-2">
                        <Info className="h-5 w-5 text-primary" />
                        <p className="text-sm text-foreground">
                          {t('carbonStiffeningLiningShoeAlreadyAdded')}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-8 pt-2">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="carbon-shoe-left"
                          className="font-normal cursor-pointer"
                        >
                          {t('left')}
                        </Label>
                        <Switch
                          id="carbon-shoe-left"
                          checked={
                            form.watch('carbonStiffeningShoeLeft') || false
                          }
                          onCheckedChange={checked =>
                            form.setValue('carbonStiffeningShoeLeft', !!checked)
                          }
                          disabled={carbonStiffeningLiningShoeLeft}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="carbon-shoe-right"
                          className="font-normal cursor-pointer"
                        >
                          {t('right')}
                        </Label>
                        <Switch
                          id="carbon-shoe-right"
                          checked={
                            form.watch('carbonStiffeningShoeRight') || false
                          }
                          onCheckedChange={checked =>
                            form.setValue(
                              'carbonStiffeningShoeRight',
                              !!checked,
                            )
                          }
                          disabled={carbonStiffeningLiningShoeRight}
                        />
                      </div>
                    </div>
                  </FormItemWrapper>

                  <FormItemWrapper label={t('toeOptions')}>
                    <Select
                      value={form.watch('toeOptionsType') || 'none'}
                      onValueChange={v =>
                        form.setValue(
                          'toeOptionsType',
                          v as 'none' | 'carbon' | 'rubberCrawl',
                        )
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('toeOptions')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t('none')}</SelectItem>
                        <SelectItem value="carbon">
                          {t('carbonToes')}
                        </SelectItem>
                        <SelectItem value="rubberCrawl">
                          {t('rubberCrawlToes')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>

                {/* Lining Options / Voeringsoptie */}
                <FormBlock
                  title={t('liningOptions')}
                  columns={1}
                  dividers={false}
                >
                  <FormItemWrapper>
                    <Select
                      value={form.watch('liningType') || ''}
                      onValueChange={v => form.setValue('liningType', v)}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('lining')} />
                      </SelectTrigger>
                      <SelectContent>
                        {LINING_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.translationKey)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>

                {/* Counterfort & Insole */}
                <FormBlock columns={2} dividers>
                  <FormItemWrapper label={t('counterfort')}>
                    <Select
                      value={counterfortType || 'formo'}
                      onValueChange={v =>
                        form.setValue('counterfortType', v as 'formo' | 'other')
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('counterfort')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formo">{t('formo')}</SelectItem>
                        <SelectItem value="leather">{t('leather')}</SelectItem>
                        <SelectItem value="other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {counterfortType === 'other' && (
                      <Textarea
                        placeholder={t('otherPlaceholder')}
                        value={form.watch('counterfortOther') || ''}
                        onChange={e =>
                          form.setValue('counterfortOther', e.target.value)
                        }
                        rows={2}
                        className="mt-2 w-2/3"
                      />
                    )}
                  </FormItemWrapper>

                  <FormItemWrapper label={t('insole')}>
                    <Select
                      value={insoleType || 'leather'}
                      onValueChange={v =>
                        form.setValue('insoleType', v as 'leather' | 'other')
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('insole')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leather">{t('leather')}</SelectItem>
                        <SelectItem value="other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {insoleType === 'other' && (
                      <Textarea
                        placeholder={t('otherPlaceholder')}
                        value={form.watch('insoleOther') || ''}
                        onChange={e =>
                          form.setValue('insoleOther', e.target.value)
                        }
                        rows={2}
                        className="mt-2 w-2/3"
                      />
                    )}
                  </FormItemWrapper>
                </FormBlock>

                {/* Sole Edge Polish & Construction Method */}
                <FormBlock columns={2} dividers>
                  <FormItemWrapper label={t('soleEdgePolish')}>
                    <Select
                      value={soleEdgePolishType || 'none'}
                      onValueChange={v =>
                        form.setValue(
                          'soleEdgePolishType',
                          v as
                            | 'none'
                            | 'black'
                            | 'brown'
                            | 'mahogany'
                            | 'ridges'
                            | 'other',
                        )
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('soleEdgePolish')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t('none')}</SelectItem>
                        <SelectItem value="black">{t('black')}</SelectItem>
                        <SelectItem value="brown">{t('brown')}</SelectItem>
                        <SelectItem value="mahogany">
                          {t('mahogany')}
                        </SelectItem>
                        <SelectItem value="ridges">
                          {t('soleEdgeRidgesMilling')}
                        </SelectItem>
                        <SelectItem value="other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {soleEdgePolishType === 'other' && (
                      <Textarea
                        placeholder={t('otherPlaceholder')}
                        value={form.watch('soleEdgePolishOther') || ''}
                        onChange={e =>
                          form.setValue('soleEdgePolishOther', e.target.value)
                        }
                        rows={2}
                        className="mt-2 w-2/3"
                      />
                    )}
                  </FormItemWrapper>

                  <FormItemWrapper label={t('constructionMethod')}>
                    <Select
                      value={constructionMethodType || 'glued'}
                      onValueChange={v =>
                        form.setValue(
                          'constructionMethodType',
                          v as 'glued' | 'flexible' | 'other',
                        )
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('constructionMethod')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="glued">{t('glued')}</SelectItem>
                        <SelectItem value="flexible">
                          {t('flexible')}
                        </SelectItem>
                        <SelectItem value="other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    {constructionMethodType === 'other' && (
                      <Textarea
                        placeholder={t('otherPlaceholder')}
                        value={form.watch('constructionMethodOther') || ''}
                        onChange={e =>
                          form.setValue(
                            'constructionMethodOther',
                            e.target.value,
                          )
                        }
                        rows={2}
                        className="mt-2 w-2/3"
                      />
                    )}
                  </FormItemWrapper>
                </FormBlock>

                {/* Heel Model */}
                <FormBlock columns={1} dividers={false}>
                  <FormItemWrapper label={t('heelModel')}>
                    <Select
                      value={heelModelType || 'buildUp'}
                      onValueChange={v =>
                        form.setValue(
                          'heelModelType',
                          v as 'buildUp' | 'wedge' | 'block',
                        )
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('heelModel')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buildUp">
                          {t('buildUpHeel')}
                        </SelectItem>
                        <SelectItem value="wedge">{t('wedgeHeel')}</SelectItem>
                        <SelectItem value="block">{t('blockHeel')}</SelectItem>
                      </SelectContent>
                    </Select>

                    {heelModelType === 'buildUp' && (
                      <div className="mt-2 w-full flex justify-center">
                        <RadioGroup
                          value={form.watch('heelBuildUpMaterial') || 'poro'}
                          onValueChange={v =>
                            form.setValue(
                              'heelBuildUpMaterial',
                              v as 'poro' | 'leather',
                            )
                          }
                        >
                          <div className="flex gap-6 justify-center">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="poro" id="heel-poro" />
                              <Label
                                htmlFor="heel-poro"
                                className="font-normal cursor-pointer"
                              >
                                {t('poro')}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="leather"
                                id="heel-leather"
                              />
                              <Label
                                htmlFor="heel-leather"
                                className="font-normal cursor-pointer"
                              >
                                {t('leather')}
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {heelModelType === 'wedge' && (
                      <div className="mt-2 w-full flex justify-center">
                        <RadioGroup
                          value={form.watch('heelWedgeType') || 'flat'}
                          onValueChange={v =>
                            form.setValue(
                              'heelWedgeType',
                              v as 'hollow' | 'flat',
                            )
                          }
                        >
                          <div className="flex gap-6 justify-center">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="flat" id="wedge-flat" />
                              <Label
                                htmlFor="wedge-flat"
                                className="font-normal cursor-pointer"
                              >
                                {t('flat')}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="hollow"
                                id="wedge-hollow"
                              />
                              <Label
                                htmlFor="wedge-hollow"
                                className="font-normal cursor-pointer"
                              >
                                {t('hollow')}
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {heelModelType === 'block' && (
                      <div className="mt-2 w-full flex justify-center">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="heel-core-coating"
                            checked={
                              form.watch('heelBlockCoreCoating') || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('heelBlockCoreCoating', !!checked)
                            }
                          />
                          <Label
                            htmlFor="heel-core-coating"
                            className="font-normal cursor-pointer"
                          >
                            {t('coreCoating')}
                          </Label>
                        </div>
                      </div>
                    )}
                  </FormItemWrapper>
                </FormBlock>

                {/* Shoring */}
                <FormBlock columns={2} dividers>
                  <FormItemWrapper label={t('shoringLeft')}>
                    <Select
                      value={form.watch('shoringLeftType') || 'none'}
                      onValueChange={v =>
                        form.setValue(
                          'shoringLeftType',
                          v as
                            | 'lateral'
                            | 'medial'
                            | 'lateralAndMedial'
                            | 'none',
                        )
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('shoringType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t('none')}</SelectItem>
                        <SelectItem value="lateral">{t('lateral')}</SelectItem>
                        <SelectItem value="medial">{t('medial')}</SelectItem>
                        <SelectItem value="lateralAndMedial">
                          {t('lateralAndMedial')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {form.watch('shoringLeftType') &&
                      form.watch('shoringLeftType') !== 'none' && (
                        <div className="space-y-1 pt-2 w-2/3">
                          <Label htmlFor="shoring-left-mm" className="text-sm">
                            {t('shoringMm')}
                          </Label>
                          <Input
                            id="shoring-left-mm"
                            type="number"
                            placeholder={t('shoringMm')}
                            value={form.watch('shoringLeftMm') || ''}
                            onChange={e =>
                              form.setValue('shoringLeftMm', e.target.value)
                            }
                          />
                        </div>
                      )}
                  </FormItemWrapper>

                  <FormItemWrapper label={t('shoringRight')}>
                    <Select
                      value={form.watch('shoringRightType') || 'none'}
                      onValueChange={v =>
                        form.setValue(
                          'shoringRightType',
                          v as
                            | 'lateral'
                            | 'medial'
                            | 'lateralAndMedial'
                            | 'none',
                        )
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('shoringType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t('none')}</SelectItem>
                        <SelectItem value="lateral">{t('lateral')}</SelectItem>
                        <SelectItem value="medial">{t('medial')}</SelectItem>
                        <SelectItem value="lateralAndMedial">
                          {t('lateralAndMedial')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {form.watch('shoringRightType') &&
                      form.watch('shoringRightType') !== 'none' && (
                        <div className="space-y-1 pt-2 w-2/3">
                          <Label htmlFor="shoring-right-mm" className="text-sm">
                            {t('shoringMm')}
                          </Label>
                          <Input
                            id="shoring-right-mm"
                            type="number"
                            placeholder={t('shoringMm')}
                            value={form.watch('shoringRightMm') || ''}
                            onChange={e =>
                              form.setValue('shoringRightMm', e.target.value)
                            }
                          />
                        </div>
                      )}
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Submit Section */}
              <FormFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetDraft}
                >
                  {t('reset')}
                </Button>
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

export default FormCheckFoliepasPage;
