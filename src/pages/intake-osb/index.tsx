import React from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import {
  PAARTYPE_OPTIES,
  DOEL_OPTIES,
  LOOPFUNCTIE_INDICATIE_OPTIES,
  LEVERANCIER_OPTIES,
  BASISCODE_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
} from '@/lib/constants/formConstants';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setIntakeOSBData, setClientData } from '@/domain/store/slices/formData';

import { ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { scrollToFirstError } from '@/utils/formHelpers';
import { useFormPersistence } from '@/hooks/useFormPersistence';

const FormIntakeOSBPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    ordernummer: z.string().optional(),
    welkPaar: z.string(),
    medischeIndicatie: z.string().optional(),
    doel: z.record(z.string(), z.boolean()),
    loopfunctieIndicatie: z.string().optional(),
    loopfunctieAndersText: z.string().optional(),
    leverancierNaam: z.string().optional(),
    bestelDatum: z.string().optional(),
    productSpecificaties: z.object({
      artCode: z.string().optional(),
      lengteMaat: z.string().optional(),
      wijdte: z.string().optional(),
      kleur: z.string().optional(),
      sluiting: z.string().optional(),
    }),
    basiscode: z.string().optional(),
    generalBasiscode: z.string().optional(),
    aanpassingen: z.object({
      zoolverstijvingLinks: z.boolean().optional(),
      zoolverstijvingRechts: z.boolean().optional(),
      halluxValgusLinks: z.boolean().optional(),
      halluxValgusRechts: z.boolean().optional(),
      verdiepingVoorvoetLinks: z.boolean().optional(),
      verdiepingVoorvoetRechts: z.boolean().optional(),
      supplementIndividueelLinks: z.boolean().optional(),
      supplementIndividueelRechts: z.boolean().optional(),
      afwikkelrolEenvoudigLinks: z.boolean().optional(),
      afwikkelrolEenvoudigRechts: z.boolean().optional(),
      afwikkelrolGecompliceerdLinks: z.boolean().optional(),
      afwikkelrolGecompliceerdRechts: z.boolean().optional(),
    }),
    steunzoolTypeGeneral: z.string().optional(),
    steunzoolAndersText: z.string().optional(),
    steunzoolCorrectieMiddenvoet: z.string().optional(),
    steunzoolCorrectieVoorvoet: z.string().optional(),
    steunzoolVvPellote: z.string().optional(),
    steunzoolHakVerhogingLinks: z.string().optional(),
    steunzoolHakVerhogingRechts: z.string().optional(),
    steunzoolPrijs: z.number().optional(),
    steunzoolPrijsNaam: z.string().optional(),
    bijzonderheden: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      ordernummer: '',
      welkPaar: 'Eerste paar',
      medischeIndicatie: '',
      doel: {},
      loopfunctieIndicatie: LOOPFUNCTIE_INDICATIE_OPTIES[0]?.value || '',
      loopfunctieAndersText: '',
      leverancierNaam: '',
      bestelDatum: '',
      productSpecificaties: {
        artCode: '',
        lengteMaat: '',
        wijdte: '',
        kleur: '',
        sluiting: '',
      },
      basiscode: '',
      generalBasiscode: BASISCODE_OPTIES[0]?.value || '',
      aanpassingen: {
        zoolverstijvingLinks: false,
        zoolverstijvingRechts: false,
        halluxValgusLinks: false,
        halluxValgusRechts: false,
        verdiepingVoorvoetLinks: false,
        verdiepingVoorvoetRechts: false,
        supplementIndividueelLinks: false,
        supplementIndividueelRechts: false,
        afwikkelrolEenvoudigLinks: false,
        afwikkelrolEenvoudigRechts: false,
        afwikkelrolGecompliceerdLinks: false,
        afwikkelrolGecompliceerdRechts: false,
      },
      steunzoolTypeGeneral: STEUNZOOL_TYPE_OPTIES[0]?.value || '',
      steunzoolAndersText: '',
      steunzoolCorrectieMiddenvoet: '',
      steunzoolCorrectieVoorvoet: '',
      steunzoolVvPellote: '',
      steunzoolHakVerhogingLinks: '',
      steunzoolHakVerhogingRechts: '',
      steunzoolPrijs: undefined,
      steunzoolPrijsNaam: '',
      bijzonderheden: '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'OSB' }));
    }

    dispatch(
      setIntakeOSBData({
        ordernummer: data.ordernummer || '',
        welkPaar: data.welkPaar,
        medischeIndicatie: data.medischeIndicatie || '',
        doel: data.doel as Record<string, boolean>,
        loopfunctieIndicatie: data.loopfunctieIndicatie || '',
        loopfunctieAndersText: data.loopfunctieAndersText || '',
        leverancierNaam: data.leverancierNaam || '',
        bestelDatum: data.bestelDatum || '',
        productSpecificaties: {
          artCode: data.productSpecificaties?.artCode || '',
          lengteMaat: data.productSpecificaties?.lengteMaat || '',
          wijdte: data.productSpecificaties?.wijdte || '',
          kleur: data.productSpecificaties?.kleur || '',
          sluiting: data.productSpecificaties?.sluiting || '',
        },
        basiscode: data.basiscode || '',
        generalBasiscode: data.generalBasiscode || '',
        aanpassingen: {
          zoolverstijvingLinks: data.aanpassingen?.zoolverstijvingLinks || false,
          zoolverstijvingRechts: data.aanpassingen?.zoolverstijvingRechts || false,
          halluxValgusLinks: data.aanpassingen?.halluxValgusLinks || false,
          halluxValgusRechts: data.aanpassingen?.halluxValgusRechts || false,
          verdiepingVoorvoetLinks: data.aanpassingen?.verdiepingVoorvoetLinks || false,
          verdiepingVoorvoetRechts: data.aanpassingen?.verdiepingVoorvoetRechts || false,
          supplementIndividueelLinks: data.aanpassingen?.supplementIndividueelLinks || false,
          supplementIndividueelRechts: data.aanpassingen?.supplementIndividueelRechts || false,
          afwikkelrolEenvoudigLinks: data.aanpassingen?.afwikkelrolEenvoudigLinks || false,
          afwikkelrolEenvoudigRechts: data.aanpassingen?.afwikkelrolEenvoudigRechts || false,
          afwikkelrolGecompliceerdLinks: data.aanpassingen?.afwikkelrolGecompliceerdLinks || false,
          afwikkelrolGecompliceerdRechts: data.aanpassingen?.afwikkelrolGecompliceerdRechts || false,
        },
        steunzoolTypeGeneral: data.steunzoolTypeGeneral || '',
        steunzoolAndersText: data.steunzoolAndersText || '',
        steunzoolCorrectieMiddenvoet: data.steunzoolCorrectieMiddenvoet || '',
        steunzoolCorrectieVoorvoet: data.steunzoolCorrectieVoorvoet || '',
        steunzoolVvPellote: data.steunzoolVvPellote || '',
        steunzoolHakVerhogingLinks: data.steunzoolHakVerhogingLinks || '',
        steunzoolHakVerhogingRechts: data.steunzoolHakVerhogingRechts || '',
        steunzoolPrijs: data.steunzoolPrijs,
        steunzoolPrijsNaam: data.steunzoolPrijsNaam || '',
        bijzonderheden: data.bijzonderheden || '',
      }),
    );

    router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeOsb')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakeOsb')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('osbDescription')}
          </p>
        </div>

        <FormSection className="max-w-6xl mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* Order Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('orderInformation')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ordernummer">{t('orderNumber')}</Label>
                      <Input
                        id="ordernummer"
                        placeholder={t('orderNumber')}
                        value={form.watch('ordernummer')}
                        onChange={e =>
                          form.setValue('ordernummer', e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="welk-paar">{t('whichPair')}</Label>
                      <RadioGroup
                        value={form.watch('welkPaar')}
                        onValueChange={v => form.setValue('welkPaar', v)}
                      >
                        <div className="grid gap-3">
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Indication */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('medicalIndication')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={t('medicalIndicationPlaceholder')}
                    value={form.watch('medischeIndicatie')}
                    onChange={e =>
                      form.setValue('medischeIndicatie', e.target.value)
                    }
                    rows={3}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              {/* Goals/Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('goals')}</CardTitle>
                  <CardDescription>{t('goalsDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {DOEL_OPTIES.map(optie => (
                      <div
                        key={optie.fullKey}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`doel-${optie.fullKey}`}
                          checked={
                            (form.watch('doel')[optie.fullKey] as boolean) ||
                            false
                          }
                          onCheckedChange={checked =>
                            form.setValue('doel', {
                              ...form.getValues('doel'),
                              [optie.fullKey]: !!checked,
                            })
                          }
                        />
                        <Label
                          htmlFor={`doel-${optie.fullKey}`}
                          className="font-normal cursor-pointer"
                        >
                          {optie.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Walking Function */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('walkingFunction')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t('walkingFunctionIndication')}</Label>
                      <Select
                        value={form.watch('loopfunctieIndicatie') || ''}
                        onValueChange={v =>
                          form.setValue('loopfunctieIndicatie', v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('walkingFunctionIndication')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {LOOPFUNCTIE_INDICATIE_OPTIES.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loopfunctie-anders">
                        {t('otherWalkingFunction')}
                      </Label>
                      <Textarea
                        id="loopfunctie-anders"
                        placeholder={t('otherWalkingFunctionPlaceholder')}
                        value={form.watch('loopfunctieAndersText')}
                        onChange={e =>
                          form.setValue('loopfunctieAndersText', e.target.value)
                        }
                        rows={2}
                        className="resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Supplier and Order Date */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('supplierAndOrderDate')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>{t('supplier')}</Label>
                      <Select
                        value={form.watch('leverancierNaam') || ''}
                        onValueChange={v => form.setValue('leverancierNaam', v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('supplier')} />
                        </SelectTrigger>
                        <SelectContent>
                          {LEVERANCIER_OPTIES.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bestel-datum">{t('orderDate')}</Label>
                      <Input
                        id="bestel-datum"
                        type="date"
                        value={form.watch('bestelDatum')}
                        onChange={e =>
                          form.setValue('bestelDatum', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('productSpecifications')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="art-code">{t('articleCode')}</Label>
                      <Input
                        id="art-code"
                        placeholder={t('articleCode')}
                        value={
                          form.watch('productSpecificaties')?.artCode || ''
                        }
                        onChange={e =>
                          form.setValue('productSpecificaties', {
                            ...form.getValues('productSpecificaties'),
                            artCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lengte-maat">{t('lengthSize')}</Label>
                      <Input
                        id="lengte-maat"
                        placeholder={t('lengthSize')}
                        value={
                          form.watch('productSpecificaties')?.lengteMaat || ''
                        }
                        onChange={e =>
                          form.setValue('productSpecificaties', {
                            ...form.getValues('productSpecificaties'),
                            lengteMaat: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wijdte">{t('width')}</Label>
                      <Input
                        id="wijdte"
                        placeholder={t('width')}
                        value={form.watch('productSpecificaties')?.wijdte || ''}
                        onChange={e =>
                          form.setValue('productSpecificaties', {
                            ...form.getValues('productSpecificaties'),
                            wijdte: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kleur-osb">{t('color')}</Label>
                      <Input
                        id="kleur-osb"
                        placeholder={t('color')}
                        value={form.watch('productSpecificaties')?.kleur || ''}
                        onChange={e =>
                          form.setValue('productSpecificaties', {
                            ...form.getValues('productSpecificaties'),
                            kleur: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="sluiting-osb">{t('closure')}</Label>
                      <Input
                        id="sluiting-osb"
                        placeholder={t('closure')}
                        value={
                          form.watch('productSpecificaties')?.sluiting || ''
                        }
                        onChange={e =>
                          form.setValue('productSpecificaties', {
                            ...form.getValues('productSpecificaties'),
                            sluiting: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Basiscode */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('baseCode')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t('generalBaseCode')}</Label>
                      <Select
                        value={form.watch('generalBasiscode') || ''}
                        onValueChange={v =>
                          form.setValue('generalBasiscode', v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('generalBaseCode')} />
                        </SelectTrigger>
                        <SelectContent>
                          {BASISCODE_OPTIES.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="basiscode">{t('baseCodeDetails')}</Label>
                      <Input
                        id="basiscode"
                        placeholder={t('baseCodeDetails')}
                        value={form.watch('basiscode')}
                        onChange={e => form.setValue('basiscode', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Aanpassingen (Modifications) */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('modifications')}</CardTitle>
                  <CardDescription>
                    {t('modificationsDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Zoolverstijving */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t('soleStiffening')}
                      </Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="zoolverstijving-links"
                            checked={
                              form.watch('aanpassingen')?.zoolverstijvingLinks ||
                              false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                zoolverstijvingLinks: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="zoolverstijving-links"
                            className="font-normal cursor-pointer"
                          >
                            {t('left')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="zoolverstijving-rechts"
                            checked={
                              form.watch('aanpassingen')
                                ?.zoolverstijvingRechts || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                zoolverstijvingRechts: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="zoolverstijving-rechts"
                            className="font-normal cursor-pointer"
                          >
                            {t('right')}
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Hallux Valgus */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t('halluxValgus')}
                      </Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hallux-links"
                            checked={
                              form.watch('aanpassingen')?.halluxValgusLinks ||
                              false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                halluxValgusLinks: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="hallux-links"
                            className="font-normal cursor-pointer"
                          >
                            {t('left')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hallux-rechts"
                            checked={
                              form.watch('aanpassingen')?.halluxValgusRechts ||
                              false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                halluxValgusRechts: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="hallux-rechts"
                            className="font-normal cursor-pointer"
                          >
                            {t('right')}
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Verdieping Voorvoet */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t('forefootDeepening')}
                      </Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="verdieping-links"
                            checked={
                              form.watch('aanpassingen')
                                ?.verdiepingVoorvoetLinks || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                verdiepingVoorvoetLinks: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="verdieping-links"
                            className="font-normal cursor-pointer"
                          >
                            {t('left')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="verdieping-rechts"
                            checked={
                              form.watch('aanpassingen')
                                ?.verdiepingVoorvoetRechts || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                verdiepingVoorvoetRechts: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="verdieping-rechts"
                            className="font-normal cursor-pointer"
                          >
                            {t('right')}
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Supplement Individueel */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t('individualSupplement')}
                      </Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="supplement-links"
                            checked={
                              form.watch('aanpassingen')
                                ?.supplementIndividueelLinks || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                supplementIndividueelLinks: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="supplement-links"
                            className="font-normal cursor-pointer"
                          >
                            {t('left')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="supplement-rechts"
                            checked={
                              form.watch('aanpassingen')
                                ?.supplementIndividueelRechts || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                supplementIndividueelRechts: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="supplement-rechts"
                            className="font-normal cursor-pointer"
                          >
                            {t('right')}
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Afwikkelrol Eenvoudig */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t('simpleRockerBar')}
                      </Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="afwikkelrol-eenvoudig-links"
                            checked={
                              form.watch('aanpassingen')
                                ?.afwikkelrolEenvoudigLinks || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                afwikkelrolEenvoudigLinks: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="afwikkelrol-eenvoudig-links"
                            className="font-normal cursor-pointer"
                          >
                            {t('left')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="afwikkelrol-eenvoudig-rechts"
                            checked={
                              form.watch('aanpassingen')
                                ?.afwikkelrolEenvoudigRechts || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                afwikkelrolEenvoudigRechts: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="afwikkelrol-eenvoudig-rechts"
                            className="font-normal cursor-pointer"
                          >
                            {t('right')}
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Afwikkelrol Gecompliceerd */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t('complexRockerBar')}
                      </Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="afwikkelrol-gecompliceerd-links"
                            checked={
                              form.watch('aanpassingen')
                                ?.afwikkelrolGecompliceerdLinks || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                afwikkelrolGecompliceerdLinks: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="afwikkelrol-gecompliceerd-links"
                            className="font-normal cursor-pointer"
                          >
                            {t('left')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="afwikkelrol-gecompliceerd-rechts"
                            checked={
                              form.watch('aanpassingen')
                                ?.afwikkelrolGecompliceerdRechts || false
                            }
                            onCheckedChange={checked =>
                              form.setValue('aanpassingen', {
                                ...form.getValues('aanpassingen'),
                                afwikkelrolGecompliceerdRechts: !!checked,
                              })
                            }
                          />
                          <Label
                            htmlFor="afwikkelrol-gecompliceerd-rechts"
                            className="font-normal cursor-pointer"
                          >
                            {t('right')}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Steunzool (Insole) */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('supportInsole')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>{t('insoleType')}</Label>
                      <Select
                        value={form.watch('steunzoolTypeGeneral') || ''}
                        onValueChange={v =>
                          form.setValue('steunzoolTypeGeneral', v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('insoleType')} />
                        </SelectTrigger>
                        <SelectContent>
                          {STEUNZOOL_TYPE_OPTIES.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {form.watch('steunzoolTypeGeneral') === 'Anders' && (
                      <div className="space-y-2">
                        <Label htmlFor="steunzool-anders">
                          {t('otherInsoleType')}
                        </Label>
                        <Textarea
                          id="steunzool-anders"
                          placeholder={t('otherInsoleTypePlaceholder')}
                          value={form.watch('steunzoolAndersText')}
                          onChange={e =>
                            form.setValue('steunzoolAndersText', e.target.value)
                          }
                          rows={2}
                          className="resize-none"
                        />
                      </div>
                    )}

                    <Separator />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="correctie-middenvoet">
                          {t('midfootCorrection')}
                        </Label>
                        <Input
                          id="correctie-middenvoet"
                          placeholder={t('midfootCorrection')}
                          value={form.watch('steunzoolCorrectieMiddenvoet')}
                          onChange={e =>
                            form.setValue(
                              'steunzoolCorrectieMiddenvoet',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="correctie-voorvoet">
                          {t('forefootCorrection')}
                        </Label>
                        <Input
                          id="correctie-voorvoet"
                          placeholder={t('forefootCorrection')}
                          value={form.watch('steunzoolCorrectieVoorvoet')}
                          onChange={e =>
                            form.setValue(
                              'steunzoolCorrectieVoorvoet',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vv-pellote">{t('forefootPad')}</Label>
                      <Input
                        id="vv-pellote"
                        placeholder={t('forefootPad')}
                        value={form.watch('steunzoolVvPellote')}
                        onChange={e =>
                          form.setValue('steunzoolVvPellote', e.target.value)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        {t('heelRaise')}
                      </Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="hak-verhoging-links">
                            {t('left')} (cm)
                          </Label>
                          <Input
                            id="hak-verhoging-links"
                            type="number"
                            step="0.1"
                            placeholder={t('heelRaise')}
                            value={form.watch('steunzoolHakVerhogingLinks')}
                            onChange={e =>
                              form.setValue(
                                'steunzoolHakVerhogingLinks',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hak-verhoging-rechts">
                            {t('right')} (cm)
                          </Label>
                          <Input
                            id="hak-verhoging-rechts"
                            type="number"
                            step="0.1"
                            placeholder={t('heelRaise')}
                            value={form.watch('steunzoolHakVerhogingRechts')}
                            onChange={e =>
                              form.setValue(
                                'steunzoolHakVerhogingRechts',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="steunzool-prijs">{t('insolePrice')}</Label>
                        <Input
                          id="steunzool-prijs"
                          type="number"
                          step="0.01"
                          placeholder={t('insolePrice')}
                          value={form.watch('steunzoolPrijs') || ''}
                          onChange={e => {
                            const value = e.target.value ? parseFloat(e.target.value) : undefined;
                            form.setValue(
                              'steunzoolPrijs',
                              value !== undefined && !isNaN(value) ? value : undefined,
                            );
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="steunzool-prijs-naam">
                          {t('insolePriceName')}
                        </Label>
                        <Input
                          id="steunzool-prijs-naam"
                          placeholder={t('insolePriceName')}
                          value={form.watch('steunzoolPrijsNaam')}
                          onChange={e =>
                            form.setValue('steunzoolPrijsNaam', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('specialNotes')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={t('specialNotesPlaceholder')}
                    value={form.watch('bijzonderheden')}
                    onChange={e =>
                      form.setValue('bijzonderheden', e.target.value)
                    }
                    rows={5}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

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

export default FormIntakeOSBPage;
