import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
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
  LINING_OPTIONS,
  SOLE_EDGE_POLISH_TYPE_OPTIONS,
  MODEL_TYPE_OPTIONS,
  TONGUE_PADDING_MM_OPTIONS,
  TONGUE_TYPE_OPTIONS,
  PADDING_COLLAR_MM_OPTIONS,
  CLOSURE_TYPE_OPTIONS,
  ZIPPER_PLACEMENT_OPTIONS,
  MEDIAL_LATERAL_OPTIONS,
  ZIPPER_TYPE_OPTIONS,
  TOE_TYPE_OPTIONS,
  COUNTERFORT_TYPE_OPTIONS,
  CONSTRUCTION_METHOD_TYPE_OPTIONS,
  HEEL_MODEL_TYPE_OPTIONS,
  HEEL_BUILDUP_MATERIAL_OPTIONS,
  SHORING_TYPE_OPTIONS,
  ZOOL_RANDEN,
  ONDERWERKEN,
  CHECK_FOLIEPAS_INSOLE_TYPE_OPTIONS,
} from '@/domain/form/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {setShoeDesignData} from '@/domain/store/slices/formData';
import {ChevronRight, Info} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form} from '@/components/ui/form';
import {scrollToFirstError} from '@/utils/formHelpers';
import {Textarea} from '@/components/ui/textarea';
import {useFormPersistence} from '@/hooks/useFormPersistence';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';

const FormCreateShoeDesignPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);
  const shoeDesignData = useAppSelector(state => state.formData.shoeDesign);

  const formSchema = z.object({
    // Model
    modelType: z.string().optional(),
    modelText: z.string().optional(),

    // Colors
    colorOptions: z.array(z.string()).optional(),

    // Tongue Padding and Collar (mm)
    tonguePaddingMm: z.string().optional(),
    tongueType: z.string().optional(),
    paddingCollarMm: z.string().optional(),

    // Closure Type
    closureType: z.string().optional(),
    ringsNumber: z.string().optional(),
    ringsAmount: z.string().optional(),
    hooksNumber: z.string().optional(),
    hooksAmount: z.string().optional(),

    // Zipper
    zipperType: z.string().optional(),
    zipperColor: z.string().optional(),
    zipperPlacement: z.string().optional(),
    zipperSide: z.string().optional(),

    // Special Features (Bijzonderheden)
    specialVelcroTongue: z.string().optional(),
    specialLaceLoop: z.boolean().optional(),
    specialExtraLeather: z.boolean().optional(),
    specialOther: z.string().optional(),

    // Edge Type (Randtype)
    edgeTypeMain: z.string().optional(),
    edgeTypeModel: z.string().optional(),
    edgeTypeColor: z.string().optional(),
    edgeTypeColorCode: z.string().optional(),

    // Sole Type (Zooltype)
    soleTypeMain: z.string().optional(),
    soleTypeModel: z.string().optional(),
    soleTypeColor: z.string().optional(),
    soleTypeOther: z.string().optional(),

    // Carbon Stiffening Shoe
    carbonStiffeningShoeLeft: z.boolean().optional(),
    carbonStiffeningShoeRight: z.boolean().optional(),

    // Toe Options (Neusopties)
    toeType: z.string().optional(),

    // Lining (Voering)
    liningType: z.string().optional(),

    // Counterfort (Stijfsel)
    counterfortType: z.string().optional(),
    counterfortOther: z.string().optional(),

    // Insole (Binnenzool)
    insoleType: z.string().optional(),

    // Sole Edge Polish (Zoolrandafwerking)
    soleEdgePolishType: z.string().optional(),
    soleEdgePolishOther: z.string().optional(),

    // Construction Method (Constructie Methode)
    constructionMethodType: z.string().optional(),
    constructionMethodOther: z.string().optional(),

    // Heel Model (Hielmodel)
    heelModelType: z.string().optional(),
    heelBuildUpMaterial: z.string().optional(),
    heelWedgeType: z.string().optional(),
    heelBlockCoreCoating: z.boolean().optional(),
    heelHeightLeft: z.string().optional(),
    heelHeightRight: z.string().optional(),
    heelRoundingLeftEnabled: z.boolean().optional(),
    heelRoundingRightEnabled: z.boolean().optional(),

    // Shoring (Schoring)
    shoringLeftType: z.string().optional(),
    shoringLeftMm: z.string().optional(),
    shoringRightType: z.string().optional(),
    shoringRightMm: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      // Tongue Padding and Collar (mm)
      tonguePaddingMm: TONGUE_PADDING_MM_OPTIONS[0]?.value || 'no',
      tongueType: TONGUE_TYPE_OPTIONS[0]?.value || '',
      paddingCollarMm: PADDING_COLLAR_MM_OPTIONS[0]?.value || 'no',

      // Closure Type
      closureType: CLOSURE_TYPE_OPTIONS[0]?.value || '',
      ringsNumber: '',
      ringsAmount: '',
      hooksNumber: '',
      hooksAmount: '',

      // Zipper
      zipperType: ZIPPER_TYPE_OPTIONS[0]?.value || '',
      zipperColor: '',
      zipperPlacement: ZIPPER_PLACEMENT_OPTIONS[0]?.value || '',
      zipperSide: MEDIAL_LATERAL_OPTIONS[0]?.value || '',

      // Special Features (Bijzonderheden)
      specialVelcroTongue: 'none',
      specialLaceLoop: false,
      specialExtraLeather: false,
      specialOther: '',

      // Edge Type (Randtype)
      edgeTypeMain: '',
      edgeTypeModel: '',
      edgeTypeColor: '',
      edgeTypeColorCode: '',

      // Sole Type (Zooltype)
      soleTypeMain: '',
      soleTypeModel: '',
      soleTypeColor: '',
      soleTypeOther: '',

      // Carbon Stiffening Shoe
      carbonStiffeningShoeLeft: false,
      carbonStiffeningShoeRight: false,

      // Toe Options (Neusopties)
      toeType: TOE_TYPE_OPTIONS[0]?.value || '',

      // Lining (Voering)
      liningType: LINING_OPTIONS[0]?.value || '',

      // Counterfort (Stijfsel)
      counterfortType: COUNTERFORT_TYPE_OPTIONS[0]?.value || '',
      counterfortOther: '',

      // Insole (Binnenzool)
      insoleType: LINING_OPTIONS[0]?.value || '',

      // Sole Edge Polish (Zoolrandafwerking)
      soleEdgePolishType: SOLE_EDGE_POLISH_TYPE_OPTIONS[0]?.value || '',
      soleEdgePolishOther: '',

      // Construction Method (Constructie Methode)
      constructionMethodType: CONSTRUCTION_METHOD_TYPE_OPTIONS[0]?.value || '',
      constructionMethodOther: '',

      // Heel Model (Hielmodel)
      heelModelType: HEEL_MODEL_TYPE_OPTIONS[0]?.value || '',
      heelBuildUpMaterial: HEEL_BUILDUP_MATERIAL_OPTIONS[0]?.value || '',
      heelWedgeType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',
      heelBlockCoreCoating: false,
      heelHeightLeft: '2',
      heelHeightRight: '2',
      heelRoundingLeftEnabled: false,
      heelRoundingRightEnabled: false,

      // Shoring (Schoring)
      shoringLeftType: SHORING_TYPE_OPTIONS[0]?.value || '',
      shoringLeftMm: '',
      shoringRightType: SHORING_TYPE_OPTIONS[0]?.value || '',
      shoringRightMm: '',
    },
  });

  const modelType = form.watch('modelType');
  const colorOptions = form.watch('colorOptions') || [''];
  const closureType = form.watch('closureType');
  const zipperType = form.watch('zipperType');
  const counterfortType = form.watch('counterfortType');
  const insoleType = form.watch('insoleType');
  const soleEdgePolishType = form.watch('soleEdgePolishType');
  const constructionMethodType = form.watch('constructionMethodType');
  const heelModelType = form.watch('heelModelType');

  const {clearStorage} = useFormPersistence(
    'shoeDesign',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    form.reset();
    clearStorage();
  };

  const onSubmit = (data: FormData) => {
    const specialFeaturesList = [
      data.specialVelcroTongue && data.specialVelcroTongue !== 'none'
        ? `${t('specialVelcroTongue')}: ${t(data.specialVelcroTongue)}`
        : '',
      data.specialLaceLoop ? t('laceLoopOnTongue') : '',
      data.specialExtraLeather ? t('specialExtraLeather') : '',
      data.specialOther?.trim() ? data.specialOther.trim() : '',
    ].filter(Boolean);
    const specialFeatures = specialFeaturesList.join('\n');

    dispatch(setShoeDesignData({...data, specialFeatures}));

    void router.push(Routes.form_results);
  };

  // If no client data exists, redirect to new client page
  React.useEffect(() => {
    if (!clientData) {
      void router.push(Routes.form_new_client);
    }
  }, [clientData, router]);

  if (!clientData) {
    return null;
  }

  return (
    <BaseLayout
      title={t('createShoeDesign')}
      showBackButton
      onBackButtonClicked={() => router.back()}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FormSection>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              {/* Kleur en Model - Refactored with FormCard, FormBlock, FormItemWrapper */}
              <FormCard title={t('colorAndModel')}>
                {/* Model & Colors */}
                <FormBlock columns={2} dividers>
                  {/* Model */}
                  <FormItemWrapper label={t('finalModel')}>
                    <Select
                      value={modelType ?? 'model'}
                      onValueChange={v => {
                        form.setValue('modelType', v);
                        if (v !== 'model') {
                          form.setValue('modelText', '');
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('finalModel')} />
                      </SelectTrigger>
                      <SelectContent>
                        {MODEL_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
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

                {/* Tongue Padding, Type & Padding Collar */}
                <FormBlock columns={3} dividers>
                  {/* Tongue Padding */}
                  <FormItemWrapper label={t('tonguePadding')}>
                    <Select
                      value={form.watch('tonguePaddingMm') || ''}
                      onValueChange={v => form.setValue('tonguePaddingMm', v)}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('tonguePadding')} />
                      </SelectTrigger>
                      <SelectContent>
                        {TONGUE_PADDING_MM_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Tongue Type */}
                  <FormItemWrapper label={t('tongueType')}>
                    <Select
                      value={form.watch('tongueType') || ''}
                      onValueChange={v => form.setValue('tongueType', v)}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('tongueType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {TONGUE_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Padding Collar */}
                  <FormItemWrapper label={t('paddingCollar')}>
                    <Select
                      value={form.watch('paddingCollarMm') || ''}
                      onValueChange={v => form.setValue('paddingCollarMm', v)}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('paddingCollar')} />
                      </SelectTrigger>
                      <SelectContent>
                        {PADDING_COLLAR_MM_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>

                {/* Closure and Zipper */}
                <FormBlock columns={2} dividers={true} alignItems="stretch">
                  {/* Closure */}
                  <FormItemWrapper
                    label={t('closure')}
                    className="h-full justify-center"
                  >
                    <Select
                      value={closureType || 'velcroClosure'}
                      onValueChange={v => {
                        form.setValue('closureType', v);
                        if (v !== 'ringsAndHooksClosure') {
                          form.setValue('ringsNumber', '');
                          form.setValue('ringsAmount', '');
                          form.setValue('hooksNumber', '');
                          form.setValue('hooksAmount', '');
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('closure')} />
                      </SelectTrigger>
                      <SelectContent>
                        {CLOSURE_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* If closureType is 'ringsAndHooksClosure' */}
                    {closureType === 'ringsAndHooksClosure' && (
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

                  {/* Zipper */}
                  <FormItemWrapper label={t('zipper')}>
                    <Select
                      value={zipperType || 'none'}
                      onValueChange={v => {
                        form.setValue('zipperType', v);
                        if (v === 'none') {
                          form.setValue('zipperColor', '');
                          form.setValue('zipperPlacement', '');
                          form.setValue('zipperSide', '');
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('zipper')} />
                      </SelectTrigger>
                      <SelectContent>
                        {ZIPPER_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.value === 'none'
                              ? t('noZipper')
                              : t(option.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {zipperType && zipperType !== 'none' && (
                      <div className="space-y-4 pt-4 justify-center">
                        {/* Color and Placement side by side */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mx-auto">
                          {/* Color input (optional) */}
                          <div>
                            <Label htmlFor="zipper-color" className="text-sm">
                              {t('colorOptional')}
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
                              {t('zipperPlacement')}
                            </Label>
                            <Select
                              value={
                                form.watch('zipperPlacement') ||
                                ZIPPER_PLACEMENT_OPTIONS[0]?.value
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
                        {/* Medial/Lateral Select */}
                        <div className="pt-2 flex flex-col items-center">
                          <Label htmlFor="zipper-side" className="text-sm mb-2">
                            {t('zipperPlacement')} (Mediaal/Lateraal)
                          </Label>
                          <Select
                            value={form.watch('zipperSide') || 'none'}
                            onValueChange={v => form.setValue('zipperSide', v)}
                          >
                            <SelectTrigger
                              id="zipper-side"
                              className="bg-background! w-2/3"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {MEDIAL_LATERAL_OPTIONS.map(option => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {t(option.value)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </FormItemWrapper>
                </FormBlock>

                {/* Special Features (Bijzonderheden) */}
                <FormBlock
                  columns={3}
                  dividers={true}
                  title={t('specialDetails')}
                  centerTitle={true}
                >
                  {/* Medial Velcro Tongue */}
                  <FormItemWrapper label={t('specialVelcroTongue')}>
                    <Select
                      value={form.watch('specialVelcroTongue') || 'none'}
                      onValueChange={v =>
                        form.setValue('specialVelcroTongue', v)
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('specialVelcroTongue')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t('none')}</SelectItem>
                        {MEDIAL_LATERAL_OPTIONS.filter(
                          opt => opt.value !== 'none',
                        ).map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Other Special Features */}
                  <FormItemWrapper
                    label={t('specialOtherFeatures')}
                    centerItems={false}
                  >
                    {/* Lace Loop */}
                    <div className="flex items-center gap-2 pt-2">
                      <Switch
                        id="special-lace-loop"
                        checked={form.watch('specialLaceLoop') || false}
                        onCheckedChange={checked =>
                          form.setValue('specialLaceLoop', !!checked)
                        }
                      />
                      <Label
                        htmlFor="special-lace-loop"
                        className="font-normal cursor-pointer"
                      >
                        {t('laceLoopOnTongue')}
                      </Label>
                    </div>

                    {/* Extra Leather */}
                    <div className="flex items-center gap-2 pt-2">
                      <Switch
                        id="special-extra-leather"
                        checked={form.watch('specialExtraLeather') || false}
                        onCheckedChange={checked =>
                          form.setValue('specialExtraLeather', !!checked)
                        }
                      />
                      <Label
                        htmlFor="special-extra-leather"
                        className="font-normal cursor-pointer"
                      >
                        {t('specialExtraLeather')}
                      </Label>
                    </div>
                  </FormItemWrapper>

                  {/* Other Special Features */}
                  <FormItemWrapper label={t('other')}>
                    <Textarea
                      placeholder={t('otherPlaceholder')}
                      value={form.watch('specialOther') || ''}
                      onChange={e =>
                        form.setValue('specialOther', e.target.value)
                      }
                      rows={3}
                      className="w-full"
                    />
                  </FormItemWrapper>
                </FormBlock>

                {/* Edge Type - Cascading Selection */}
                <FormBlock columns={3} dividers={false} title={t('edgeType')}>
                  {/* type */}
                  <FormItemWrapper label={t('type')}>
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
                        <SelectValue placeholder={t('selectType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {ZOOL_RANDEN.map(c => (
                          <SelectItem key={c.naam} value={c.naam}>
                            {c.naam}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Model Selection */}
                  <FormItemWrapper label={t('model')}>
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
                        <SelectValue placeholder={t('selectModel')} />
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
                  <FormItemWrapper label={t('color')}>
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
                        <SelectValue placeholder={t('selectColor')} />
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
                <FormBlock columns={3} dividers={false} title={t('soleType')}>
                  {/* type Selection */}
                  <FormItemWrapper label={t('type')}>
                    <Select
                      value={form.watch('soleTypeMain') || ''}
                      onValueChange={v => {
                        form.setValue('soleTypeMain', v);
                        // Reset dependent fields
                        form.setValue('soleTypeModel', '');
                        form.setValue('soleTypeColor', '');
                        form.setValue('soleTypeOther', '');
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('selectType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {ONDERWERKEN.map(c => (
                          <SelectItem key={c.naam} value={c.naam}>
                            {c.naam}
                          </SelectItem>
                        ))}
                        <SelectItem value="Anders">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Model Selection */}
                  <FormItemWrapper label={t('model')}>
                    {form.watch('soleTypeMain') === 'Anders' ? (
                      <Input
                        placeholder={t('description')}
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
                        disabled={!form.watch('soleTypeMain')}
                      >
                        <SelectTrigger className="bg-background! w-2/3">
                          <SelectValue placeholder={t('selectModel')} />
                        </SelectTrigger>
                        <SelectContent>
                          {ONDERWERKEN.find(
                            c => c.naam === form.watch('soleTypeMain'),
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
                  <FormItemWrapper label={t('color')}>
                    <Select
                      value={form.watch('soleTypeColor') || ''}
                      onValueChange={v => form.setValue('soleTypeColor', v)}
                      disabled={
                        !form.watch('soleTypeModel') ||
                        form.watch('soleTypeMain') === 'Anders'
                      }
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('selectColor')} />
                      </SelectTrigger>
                      <SelectContent>
                        {ONDERWERKEN.find(
                          c => c.naam === form.watch('soleTypeMain'),
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
                          c => c.naam === form.watch('soleTypeMain'),
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
                        />
                      </div>
                    </div>
                  </FormItemWrapper>

                  <FormItemWrapper label={t('toeType')}>
                    <Select
                      value={form.watch('toeType') || 'none'}
                      onValueChange={v => form.setValue('toeType', v)}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('toeType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {TOE_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
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
                            {t(option.value)}
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
                      onValueChange={v => {
                        form.setValue('counterfortType', v);
                        if (v !== 'other') {
                          form.setValue('counterfortOther', '');
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('counterfort')} />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTERFORT_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
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

                  {/* Binnenzool opties */}
                  <FormItemWrapper label={t('insole')}>
                    <Select
                      value={insoleType || 'leather'}
                      onValueChange={v => form.setValue('insoleType', v)}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('insole')} />
                      </SelectTrigger>
                      <SelectContent>
                        {LINING_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>

                {/* Sole Edge Polish & Construction Method */}
                <FormBlock columns={2} dividers>
                  <FormItemWrapper label={t('soleEdgePolish')}>
                    <Select
                      value={soleEdgePolishType || 'none'}
                      onValueChange={v => {
                        form.setValue('soleEdgePolishType', v);
                        if (v !== 'other') {
                          form.setValue('soleEdgePolishOther', '');
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('soleEdgePolish')} />
                      </SelectTrigger>
                      <SelectContent>
                        {SOLE_EDGE_POLISH_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
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
                      onValueChange={v => {
                        form.setValue('constructionMethodType', v);
                        if (v !== 'other') {
                          form.setValue('constructionMethodOther', '');
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('constructionMethod')} />
                      </SelectTrigger>
                      <SelectContent>
                        {CONSTRUCTION_METHOD_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
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
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper label={t('heelModel')}>
                    <Select
                      value={heelModelType || 'buildUpHeel'}
                      onValueChange={v => {
                        form.setValue('heelModelType', v);
                        if (v !== 'buildUpHeel') {
                          form.setValue('heelBuildUpMaterial', '');
                        }
                        if (v !== 'wedgeHeel') {
                          form.setValue('heelWedgeType', '');
                        }
                        if (v !== 'blockHeel') {
                          form.setValue('heelBlockCoreCoating', false);
                        }
                        // Set default heights based on heel type
                        let defaultHeight = '2';
                        if (v === 'wedgeHeel') {
                          defaultHeight = '1.5';
                        } else if (v === 'blockHeel') {
                          defaultHeight = '2.5';
                        }

                        form.setValue('heelHeightLeft', defaultHeight);
                        form.setValue('heelHeightRight', defaultHeight);
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('heelModel')} />
                      </SelectTrigger>
                      <SelectContent>
                        {HEEL_MODEL_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {heelModelType === 'buildUpHeel' && (
                      <div className="mt-2 w-full flex justify-center">
                        <RadioGroup
                          value={form.watch('heelBuildUpMaterial') || 'poro'}
                          onValueChange={v =>
                            form.setValue('heelBuildUpMaterial', v)
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
                              <RadioGroupItem value="eva" id="heel-eva" />
                              <Label
                                htmlFor="heel-eva"
                                className="font-normal cursor-pointer"
                              >
                                {t('eva')}
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {heelModelType === 'wedgeHeel' && (
                      <div className="mt-2 space-y-2 w-2/3">
                        <Label htmlFor="heel-wedge-type" className="text-sm">
                          {t('wedgeType')}
                        </Label>
                        <Select
                          value={form.watch('heelWedgeType') || 'full'}
                          onValueChange={v => form.setValue('heelWedgeType', v)}
                        >
                          <SelectTrigger className="bg-background!">
                            <SelectValue placeholder={t('selectWedgeType')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">{t('full')}</SelectItem>
                            <SelectItem value="half">{t('half')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {heelModelType === 'blockHeel' && (
                      <div className="mt-2 flex items-center space-x-4">
                        <Label
                          htmlFor="heel-block-core-coating"
                          className="font-normal cursor-pointer"
                        >
                          {t('heelBlockCoreCoating')}
                        </Label>
                        <Switch
                          id="heel-block-core-coating"
                          checked={form.watch('heelBlockCoreCoating') || false}
                          onCheckedChange={checked =>
                            form.setValue('heelBlockCoreCoating', !!checked)
                          }
                        />
                      </div>
                    )}
                  </FormItemWrapper>

                  {/* Heel Rounding */}
                  <FormItemWrapper label={t('heelRounding')}>
                    <div className="flex items-center gap-8 pt-2">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="heel-rounding-left"
                          className="font-normal cursor-pointer"
                        >
                          {t('left')}
                        </Label>
                        <Switch
                          id="heel-rounding-left"
                          checked={
                            form.watch('heelRoundingLeftEnabled') || false
                          }
                          onCheckedChange={checked =>
                            form.setValue('heelRoundingLeftEnabled', !!checked)
                          }
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="heel-rounding-right"
                          className="font-normal cursor-pointer"
                        >
                          {t('right')}
                        </Label>
                        <Switch
                          id="heel-rounding-right"
                          checked={
                            form.watch('heelRoundingRightEnabled') || false
                          }
                          onCheckedChange={checked =>
                            form.setValue('heelRoundingRightEnabled', !!checked)
                          }
                        />
                      </div>
                    </div>
                  </FormItemWrapper>
                </FormBlock>

                {/* Heel Height */}
                <FormBlock columns={2} dividers>
                  <FormItemWrapper label={t('heelHeightLeft')}>
                    <Input
                      type="number"
                      step="0.5"
                      min="0"
                      value={form.watch('heelHeightLeft') || ''}
                      onChange={e =>
                        form.setValue('heelHeightLeft', e.target.value)
                      }
                      placeholder={t('heelHeightPlaceholderCm')}
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                  <FormItemWrapper label={t('heelHeightRight')}>
                    <Input
                      type="number"
                      step="0.5"
                      min="0"
                      value={form.watch('heelHeightRight') || ''}
                      onChange={e =>
                        form.setValue('heelHeightRight', e.target.value)
                      }
                      placeholder={t('heelHeightPlaceholderCm')}
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>

                {/* Shoring */}
                <FormBlock columns={2} dividers>
                  <FormItemWrapper label={t('shoringLeft')}>
                    <Select
                      value={form.watch('shoringLeftType') || 'none'}
                      onValueChange={v => {
                        form.setValue('shoringLeftType', v);
                        if (v === 'none') {
                          form.setValue('shoringLeftMm', '');
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('shoringType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {SHORING_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
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
                      onValueChange={v => {
                        form.setValue('shoringRightType', v);
                        if (v === 'none') {
                          form.setValue('shoringRightMm', '');
                        }
                      }}
                    >
                      <SelectTrigger className="bg-background! w-2/3">
                        <SelectValue placeholder={t('shoringType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {SHORING_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.value)}
                          </SelectItem>
                        ))}
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

export default FormCreateShoeDesignPage;
