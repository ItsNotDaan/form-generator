import React, { useState } from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import {
  OMSLUITING_OPTIES,
  OmsluitingKey,
  OmsluitingOptie,
  OPENSTAND_OPTIES,
  SUPPLEMENT_TYPE_OPTIES,
  HAKSOORT_OPTIES,
  LOOPZOOL_OPTIES,
  SLUITING_OPTIES,
  HAKSCHORING_TYPE_OPTIES,
  EZELSOOR_TYPE_OPTIES,
  JA_NEE_OPTIES,
  PAARTYPE_OPTIES,
  Zijde,
} from '@/lib/constants/formConstants';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setIntakeVLOSData, setClientData } from '@/domain/store/slices/formData';
import { focusAndHighlightInvalidFields } from '@/utils/warningNavigationMap';
import { ChevronRight } from 'lucide-react';

const FormIntakeVLOSPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // State voor omschrijving/paartype
  const [omschrijving, setOmschrijving] = useState<string>('Eerste paar');

  // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<Zijde>('both');

  // State voor schachthoogte
  const [schachthoogteLinks, setSchachthoogteLinks] = useState('14');
  const [schachthoogteRechts, setSchachthoogteRechts] = useState('14');

  // State voor omsluiting (multi-select) - Multivorm standaard geselecteerd
  const [omsluitingLinks, setOmsluitingLinks] = useState<Record<string, boolean>>({
    omsluitingLinksMultivorm: true,
  });
  const [omsluitingRechts, setOmsluitingRechts] = useState<Record<string, boolean>>({
    omsluitingRechtsMultivorm: true,
  });

  // State voor omsluiting mm waardes
  const [omsluitingLinksMm, setOmsluitingLinksMm] = useState<Record<string, string>>({
    omsluitingMmLinksMultivorm: '3',
  });
  const [omsluitingRechtsMm, setOmsluitingRechtsMm] = useState<Record<string, string>>({
    omsluitingMmRechtsMultivorm: '3',
  });

  // State voor supplementschoring
  const [supplementschoringLinksEnabled, setSupplementschoringLinksEnabled] = useState<boolean>(false);
  const [supplementschoringRechtsEnabled, setSupplementschoringRechtsEnabled] = useState<boolean>(false);
  const [supplementschoringLinksType, setSupplementschoringLinksType] = useState('Lateraal');
  const [supplementschoringRechtsType, setSupplementschoringRechtsType] = useState('Lateraal');

  // State voor zoolverstijving
  const [zoolverstijvingEnabled, setZoolverstijvingEnabled] = useState<boolean>(false);
  const [zoolverstijvingLinks, setZoolverstijvingLinks] = useState(false);
  const [zoolverstijvingRechts, setZoolverstijvingRechts] = useState(false);

  // State voor sluiting
  const [sluitingType, setSluitingType] = useState<string>(SLUITING_OPTIES[0].value);

  // State voor inschotpunt
  const [inschotpunt, setInschotpunt] = useState('');

  // State voor openstand schacht
  const [openstandSchacht, setOpenstandSchacht] = useState<string>(OPENSTAND_OPTIES[2].value);

  // State voor tongpolster
  const [tongpolsterEnabled, setTongpolsterEnabled] = useState<boolean>(false);

  // State voor tong vaststikken
  const [tongVaststikkenEnabled, setTongVaststikkenEnabled] = useState<boolean>(false);

  // State voor haksoort
  const [haksoortLinks, setHaksoortLinks] = useState<string>(HAKSOORT_OPTIES[0].value);
  const [haksoortRechts, setHaksoortRechts] = useState<string>(HAKSOORT_OPTIES[0].value);

  // State voor hakhoogte
  const [hakhoogteLinks, setHakhoogteLinks] = useState('2');
  const [hakhoogteRechts, setHakhoogteRechts] = useState('2');

  // State voor hakschoring
  const [hakschoringLinksEnabled, setHakschoringLinksEnabled] = useState<boolean>(false);
  const [hakschoringRechtsEnabled, setHakschoringRechtsEnabled] = useState<boolean>(false);
  const [hakschoringLinksType, setHakschoringLinksType] = useState('Lateraal');
  const [hakschoringRechtsType, setHakschoringRechtsType] = useState('Lateraal');

  // State voor ezelsoor
  const [ezelsoorLinksEnabled, setEzelsoorLinksEnabled] = useState<boolean>(false);
  const [ezelsoorRechtsEnabled, setEzelsoorRechtsEnabled] = useState<boolean>(false);
  const [ezelsoorLinksType, setEzelsoorLinksType] = useState('Lateraal');
  const [ezelsoorRechtsType, setEzelsoorRechtsType] = useState('Lateraal');

  // State voor amputatie (code 50)
  const [amputatieLinksEnabled, setAmputatieLinksEnabled] = useState<boolean>(false);
  const [amputatieRechtsEnabled, setAmputatieRechtsEnabled] = useState<boolean>(false);

  // State voor hakafronding
  const [hakafrondingLinksEnabled, setHakafrondingLinksEnabled] = useState<boolean>(true);
  const [hakafrondingRechtsEnabled, setHakafrondingRechtsEnabled] = useState<boolean>(true);
  const [hakafrondingLinksHoogte, setHakafrondingLinksHoogte] = useState('10');
  const [hakafrondingLinksLengte, setHakafrondingLinksLengte] = useState('50');
  const [hakafrondingRechtsHoogte, setHakafrondingRechtsHoogte] = useState('10');
  const [hakafrondingRechtsLengte, setHakafrondingRechtsLengte] = useState('50');

  // State voor loopzool
  const [loopzoolType, setLoopzoolType] = useState<string>(LOOPZOOL_OPTIES[0].value);

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  // Helper functions
  const boolToString = (value: boolean): string => (value ? 'yes' : 'no');
  const stringToBool = (value: string): boolean => value === 'yes';

  const getMissingFields = (): Array<{ fieldName: string; fieldId: string }> => {
    return []; // No required fields for VLOS
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      focusAndHighlightInvalidFields(missingFields.map(f => f.fieldId));
      return;
    }

    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'VLOS' }));
    }

    dispatch(
      setIntakeVLOSData({
        welkPaar: omschrijving,
        side,
        schachthoogteLinks,
        schachthoogteRechts,
        omsluitingLinks,
        omsluitingRechts,
        omsluitingLinksMm,
        omsluitingRechtsMm,
        supplementschoringLinksEnabled,
        supplementschoringRechtsEnabled,
        supplementschoringLinksType,
        supplementschoringRechtsType,
        zoolverstijvingEnabled,
        zoolverstijvingLinks,
        zoolverstijvingRechts,
        sluitingType,
        inschotpunt,
        openstandSchacht,
        tongpolsterEnabled,
        tongVaststikkenEnabled,
        haksoortLinks,
        haksoortRechts,
        hakhoogteLinks,
        hakhoogteRechts,
        hakschoringLinksEnabled,
        hakschoringRechtsEnabled,
        hakschoringLinksType,
        hakschoringRechtsType,
        ezelsoorLinksEnabled,
        ezelsoorRechtsEnabled,
        ezelsoorLinksType,
        ezelsoorRechtsType,
        amputatieLinksEnabled,
        amputatieRechtsEnabled,
        hakafrondingLinksEnabled,
        hakafrondingRechtsEnabled,
        hakafrondingLinksHoogte,
        hakafrondingLinksLengte,
        hakafrondingRechtsHoogte,
        hakafrondingRechtsLengte,
        loopzoolType,
        bijzonderheden,
      })
    );

    router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeVlos')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">{t('intakeVlos')}</h1>
          <p className="text-lg text-muted-foreground">{t('vlosDescription')}</p>
        </div>

        <FormSection>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Which Pair */}
            <Card>
              <CardHeader>
                <CardTitle>{t('whichPair')}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={omschrijving} onValueChange={setOmschrijving}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PAARTYPE_OPTIES.map(option => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`paar-${option.value}`} />
                        <Label htmlFor={`paar-${option.value}`} className="font-normal cursor-pointer">
                          {t(option.value.toLowerCase().replace(/ /g, ''))}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Side Selection */}
            <Card>
              <CardHeader>
                <CardTitle>{t('side')}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={side} onValueChange={(v) => setSide(v as Zijde)}>
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="side-both" />
                      <Label htmlFor="side-both" className="font-normal cursor-pointer">{t('both')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="left" id="side-left" />
                      <Label htmlFor="side-left" className="font-normal cursor-pointer">{t('left')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="right" id="side-right" />
                      <Label htmlFor="side-right" className="font-normal cursor-pointer">{t('right')}</Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Shaft Height */}
            <Card>
              <CardHeader>
                <CardTitle>{t('shaftHeight')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {showLinks && (
                    <div className="space-y-2">
                      <Label htmlFor="shaft-left">{t('left')}</Label>
                      <Input
                        id="shaft-left"
                        type="number"
                        placeholder="cm"
                        value={schachthoogteLinks}
                        onChange={(e) => setSchachthoogteLinks(e.target.value)}
                      />
                    </div>
                  )}
                  {showRechts && (
                    <div className="space-y-2">
                      <Label htmlFor="shaft-right">{t('right')}</Label>
                      <Input
                        id="shaft-right"
                        type="number"
                        placeholder="cm"
                        value={schachthoogteRechts}
                        onChange={(e) => setSchachthoogteRechts(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shaft Opening */}
            <Card>
              <CardHeader>
                <CardTitle>{t('shaftOpening')}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={openstandSchacht} onValueChange={setOpenstandSchacht}>
                  <div className="flex flex-wrap gap-4">
                    {OPENSTAND_OPTIES.map(opt => (
                      <div key={opt.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.value} id={`opening-${opt.value}`} />
                        <Label htmlFor={`opening-${opt.value}`} className="font-normal cursor-pointer">
                          {opt.label.replace('.', ',')} cm
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Enclosure (Omsluiting) - Complex multi-select with mm values */}
            <Card>
              <CardHeader>
                <CardTitle>{t('enclosure')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-6 ${showLinks && showRechts ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {showLinks && (
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">{t('left')}</Label>
                      {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                        <div key={optie.key} className="flex items-center gap-3">
                          <div className="flex items-center space-x-2 flex-1">
                            <Checkbox
                              id={`encl-left-${optie.key}`}
                              checked={omsluitingLinks[optie.fullKeyLinks] || false}
                              onCheckedChange={(checked) => {
                                setOmsluitingLinks({
                                  ...omsluitingLinks,
                                  [optie.fullKeyLinks]: !!checked,
                                });
                                if (checked && optie.needsMm && optie.defaultMm) {
                                  setOmsluitingLinksMm({
                                    ...omsluitingLinksMm,
                                    [optie.mmKeyLinks]: optie.defaultMm,
                                  });
                                } else if (!checked) {
                                  const next = { ...omsluitingLinksMm };
                                  delete next[optie.mmKeyLinks];
                                  setOmsluitingLinksMm(next);
                                }
                              }}
                            />
                            <Label htmlFor={`encl-left-${optie.key}`} className="font-normal cursor-pointer text-sm">
                              {optie.label}
                            </Label>
                          </div>
                          {optie.needsMm && omsluitingLinks[optie.fullKeyLinks] && (
                            <Input
                              type="number"
                              placeholder="mm"
                              value={omsluitingLinksMm[optie.mmKeyLinks] || ''}
                              onChange={(e) =>
                                setOmsluitingLinksMm({
                                  ...omsluitingLinksMm,
                                  [optie.mmKeyLinks]: e.target.value,
                                })
                              }
                              className="w-20"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {showRechts && (
                    <div className={`space-y-3 ${showLinks ? 'md:border-l md:pl-6' : ''}`}>
                      <Label className="text-sm font-semibold">{t('right')}</Label>
                      {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                        <div key={optie.key} className="flex items-center gap-3">
                          <div className="flex items-center space-x-2 flex-1">
                            <Checkbox
                              id={`encl-right-${optie.key}`}
                              checked={omsluitingRechts[optie.fullKeyRechts] || false}
                              onCheckedChange={(checked) => {
                                setOmsluitingRechts({
                                  ...omsluitingRechts,
                                  [optie.fullKeyRechts]: !!checked,
                                });
                                if (checked && optie.needsMm && optie.defaultMm) {
                                  setOmsluitingRechtsMm({
                                    ...omsluitingRechtsMm,
                                    [optie.mmKeyRechts]: optie.defaultMm,
                                  });
                                } else if (!checked) {
                                  const next = { ...omsluitingRechtsMm };
                                  delete next[optie.mmKeyRechts];
                                  setOmsluitingRechtsMm(next);
                                }
                              }}
                            />
                            <Label htmlFor={`encl-right-${optie.key}`} className="font-normal cursor-pointer text-sm">
                              {optie.label}
                            </Label>
                          </div>
                          {optie.needsMm && omsluitingRechts[optie.fullKeyRechts] && (
                            <Input
                              type="number"
                              placeholder="mm"
                              value={omsluitingRechtsMm[optie.mmKeyRechts] || ''}
                              onChange={(e) =>
                                setOmsluitingRechtsMm({
                                  ...omsluitingRechtsMm,
                                  [optie.mmKeyRechts]: e.target.value,
                                })
                              }
                              className="w-20"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Supplement Support / Ezelsoor / Amputatie sections */}
            <Card>
              <CardHeader>
                <CardTitle>{t('supplementSupport')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-6 ${showLinks && showRechts ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {showLinks && (
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">{t('left')}</Label>
                      <RadioGroup
                        value={boolToString(supplementschoringLinksEnabled)}
                        onValueChange={(v) => setSupplementschoringLinksEnabled(stringToBool(v))}
                      >
                        <div className="flex gap-4 mb-3">
                          {JA_NEE_OPTIES.map(opt => (
                            <div key={opt.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt.value} id={`supp-left-${opt.value}`} />
                              <Label htmlFor={`supp-left-${opt.value}`} className="font-normal cursor-pointer">
                                {t(opt.value)}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                      {supplementschoringLinksEnabled && (
                        <Select value={supplementschoringLinksType} onValueChange={setSupplementschoringLinksType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPLEMENT_TYPE_OPTIES.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )}
                  {showRechts && (
                    <div className={`space-y-3 ${showLinks ? 'md:border-l md:pl-6' : ''}`}>
                      <Label className="text-sm font-semibold">{t('right')}</Label>
                      <RadioGroup
                        value={boolToString(supplementschoringRechtsEnabled)}
                        onValueChange={(v) => setSupplementschoringRechtsEnabled(stringToBool(v))}
                      >
                        <div className="flex gap-4 mb-3">
                          {JA_NEE_OPTIES.map(opt => (
                            <div key={opt.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt.value} id={`supp-right-${opt.value}`} />
                              <Label htmlFor={`supp-right-${opt.value}`} className="font-normal cursor-pointer">
                                {t(opt.value)}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                      {supplementschoringRechtsEnabled && (
                        <Select value={supplementschoringRechtsType} onValueChange={setSupplementschoringRechtsType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPLEMENT_TYPE_OPTIES.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sole Stiffening */}
            <Card>
              <CardHeader>
                <CardTitle>{t('soleStiffening')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={boolToString(zoolverstijvingEnabled)}
                  onValueChange={(v) => setZoolverstijvingEnabled(stringToBool(v))}
                >
                  <div className="flex gap-6">
                    {JA_NEE_OPTIES.map(opt => (
                      <div key={opt.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.value} id={`stiff-${opt.value}`} />
                        <Label htmlFor={`stiff-${opt.value}`} className="font-normal cursor-pointer">
                          {t(opt.value)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {zoolverstijvingEnabled && (
                  <div className="flex gap-6">
                    {showLinks && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="stiff-left"
                          checked={zoolverstijvingLinks}
                          onCheckedChange={(checked) => setZoolverstijvingLinks(!!checked)}
                        />
                        <Label htmlFor="stiff-left" className="font-normal cursor-pointer">{t('left')}</Label>
                      </div>
                    )}
                    {showRechts && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="stiff-right"
                          checked={zoolverstijvingRechts}
                          onCheckedChange={(checked) => setZoolverstijvingRechts(!!checked)}
                        />
                        <Label htmlFor="stiff-right" className="font-normal cursor-pointer">{t('right')}</Label>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Closure Type, Insert Point, Tongue Padding, Tongue Stitching */}
            <Card>
              <CardHeader>
                <CardTitle>{t('closureAndTongue')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{t('closureType')}</Label>
                  <RadioGroup value={sluitingType} onValueChange={setSluitingType}>
                    <div className="grid grid-cols-2 gap-3">
                      {SLUITING_OPTIES.map(opt => (
                        <div key={opt.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt.value} id={`closure-${opt.value}`} />
                          <Label htmlFor={`closure-${opt.value}`} className="font-normal cursor-pointer text-sm">
                            {opt.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="insert-point">{t('insertPoint')}</Label>
                  <Input
                    id="insert-point"
                    value={inschotpunt}
                    onChange={(e) => setInschotpunt(e.target.value)}
                    placeholder={t('insertPointPlaceholder')}
                  />
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tongue-pad"
                      checked={tongpolsterEnabled}
                      onCheckedChange={(checked) => setTongpolsterEnabled(!!checked)}
                    />
                    <Label htmlFor="tongue-pad" className="font-normal cursor-pointer">{t('tonguePadding')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tongue-stitch"
                      checked={tongVaststikkenEnabled}
                      onCheckedChange={(checked) => setTongVaststikkenEnabled(!!checked)}
                    />
                    <Label htmlFor="tongue-stitch" className="font-normal cursor-pointer">{t('tongueStitching')}</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Heel Type and Height */}
            <Card>
              <CardHeader>
                <CardTitle>{t('heelTypeAndHeight')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-6 ${showLinks && showRechts ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {showLinks && (
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold">{t('left')}</Label>
                      <div className="space-y-2">
                        <Label className="text-sm">{t('heelType')}</Label>
                        <RadioGroup value={haksoortLinks} onValueChange={setHaksoortLinks}>
                          <div className="space-y-2">
                            {HAKSOORT_OPTIES.map(opt => (
                              <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`heel-type-left-${opt.value}`} />
                                <Label htmlFor={`heel-type-left-${opt.value}`} className="font-normal cursor-pointer text-sm">
                                  {opt.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heel-height-left" className="text-sm">{t('heelHeight')}</Label>
                        <Input
                          id="heel-height-left"
                          type="number"
                          value={hakhoogteLinks}
                          onChange={(e) => setHakhoogteLinks(e.target.value)}
                          placeholder="cm"
                        />
                      </div>
                    </div>
                  )}
                  {showRechts && (
                    <div className={`space-y-4 ${showLinks ? 'md:border-l md:pl-6' : ''}`}>
                      <Label className="text-sm font-semibold">{t('right')}</Label>
                      <div className="space-y-2">
                        <Label className="text-sm">{t('heelType')}</Label>
                        <RadioGroup value={haksoortRechts} onValueChange={setHaksoortRechts}>
                          <div className="space-y-2">
                            {HAKSOORT_OPTIES.map(opt => (
                              <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`heel-type-right-${opt.value}`} />
                                <Label htmlFor={`heel-type-right-${opt.value}`} className="font-normal cursor-pointer text-sm">
                                  {opt.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heel-height-right" className="text-sm">{t('heelHeight')}</Label>
                        <Input
                          id="heel-height-right"
                          type="number"
                          value={hakhoogteRechts}
                          onChange={(e) => setHakhoogteRechts(e.target.value)}
                          placeholder="cm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Heel Slant, Donkey Ear, Amputation - Consolidated */}
            <Card>
              <CardHeader>
                <CardTitle>{t('heelModifications')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Heel Slant */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">{t('heelSlant')}</Label>
                  <div className={`grid gap-6 ${showLinks && showRechts ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                    {showLinks && (
                      <div className="space-y-3">
                        <Label className="text-sm">{t('left')}</Label>
                        <RadioGroup
                          value={boolToString(hakschoringLinksEnabled)}
                          onValueChange={(v) => setHakschoringLinksEnabled(stringToBool(v))}
                        >
                          <div className="flex gap-4">
                            {JA_NEE_OPTIES.map(opt => (
                              <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`slant-left-${opt.value}`} />
                                <Label htmlFor={`slant-left-${opt.value}`} className="font-normal cursor-pointer">
                                  {t(opt.value)}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {hakschoringLinksEnabled && (
                          <Select value={hakschoringLinksType} onValueChange={setHakschoringLinksType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {HAKSCHORING_TYPE_OPTIES.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )}
                    {showRechts && (
                      <div className={`space-y-3 ${showLinks ? 'md:border-l md:pl-6' : ''}`}>
                        <Label className="text-sm">{t('right')}</Label>
                        <RadioGroup
                          value={boolToString(hakschoringRechtsEnabled)}
                          onValueChange={(v) => setHakschoringRechtsEnabled(stringToBool(v))}
                        >
                          <div className="flex gap-4">
                            {JA_NEE_OPTIES.map(opt => (
                              <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`slant-right-${opt.value}`} />
                                <Label htmlFor={`slant-right-${opt.value}`} className="font-normal cursor-pointer">
                                  {t(opt.value)}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {hakschoringRechtsEnabled && (
                          <Select value={hakschoringRechtsType} onValueChange={setHakschoringRechtsType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {HAKSCHORING_TYPE_OPTIES.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Donkey Ear */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">{t('donkeyEar')}</Label>
                  <div className={`grid gap-6 ${showLinks && showRechts ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                    {showLinks && (
                      <div className="space-y-3">
                        <Label className="text-sm">{t('left')}</Label>
                        <RadioGroup
                          value={boolToString(ezelsoorLinksEnabled)}
                          onValueChange={(v) => setEzelsoorLinksEnabled(stringToBool(v))}
                        >
                          <div className="flex gap-4">
                            {JA_NEE_OPTIES.map(opt => (
                              <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`donkey-left-${opt.value}`} />
                                <Label htmlFor={`donkey-left-${opt.value}`} className="font-normal cursor-pointer">
                                  {t(opt.value)}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {ezelsoorLinksEnabled && (
                          <Select value={ezelsoorLinksType} onValueChange={setEzelsoorLinksType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {EZELSOOR_TYPE_OPTIES.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )}
                    {showRechts && (
                      <div className={`space-y-3 ${showLinks ? 'md:border-l md:pl-6' : ''}`}>
                        <Label className="text-sm">{t('right')}</Label>
                        <RadioGroup
                          value={boolToString(ezelsoorRechtsEnabled)}
                          onValueChange={(v) => setEzelsoorRechtsEnabled(stringToBool(v))}
                        >
                          <div className="flex gap-4">
                            {JA_NEE_OPTIES.map(opt => (
                              <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`donkey-right-${opt.value}`} />
                                <Label htmlFor={`donkey-right-${opt.value}`} className="font-normal cursor-pointer">
                                  {t(opt.value)}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {ezelsoorRechtsEnabled && (
                          <Select value={ezelsoorRechtsType} onValueChange={setEzelsoorRechtsType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {EZELSOOR_TYPE_OPTIES.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Amputation */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">{t('amputation')}</Label>
                  <div className="flex gap-6">
                    {showLinks && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="amp-left"
                          checked={amputatieLinksEnabled}
                          onCheckedChange={(checked) => setAmputatieLinksEnabled(!!checked)}
                        />
                        <Label htmlFor="amp-left" className="font-normal cursor-pointer">{t('left')}</Label>
                      </div>
                    )}
                    {showRechts && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="amp-right"
                          checked={amputatieRechtsEnabled}
                          onCheckedChange={(checked) => setAmputatieRechtsEnabled(!!checked)}
                        />
                        <Label htmlFor="amp-right" className="font-normal cursor-pointer">{t('right')}</Label>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Heel Rounding */}
            <Card>
              <CardHeader>
                <CardTitle>{t('heelRounding')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-6 ${showLinks && showRechts ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {showLinks && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="round-left"
                          checked={hakafrondingLinksEnabled}
                          onCheckedChange={(checked) => setHakafrondingLinksEnabled(!!checked)}
                        />
                        <Label htmlFor="round-left" className="font-normal cursor-pointer">{t('left')}</Label>
                      </div>
                      {hakafrondingLinksEnabled && (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="round-left-height" className="text-sm">{t('height')} (mm)</Label>
                            <Input
                              id="round-left-height"
                              type="number"
                              value={hakafrondingLinksHoogte}
                              onChange={(e) => setHakafrondingLinksHoogte(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="round-left-length" className="text-sm">{t('length')} (mm)</Label>
                            <Input
                              id="round-left-length"
                              type="number"
                              value={hakafrondingLinksLengte}
                              onChange={(e) => setHakafrondingLinksLengte(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {showRechts && (
                    <div className={`space-y-4 ${showLinks ? 'md:border-l md:pl-6' : ''}`}>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="round-right"
                          checked={hakafrondingRechtsEnabled}
                          onCheckedChange={(checked) => setHakafrondingRechtsEnabled(!!checked)}
                        />
                        <Label htmlFor="round-right" className="font-normal cursor-pointer">{t('right')}</Label>
                      </div>
                      {hakafrondingRechtsEnabled && (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="round-right-height" className="text-sm">{t('height')} (mm)</Label>
                            <Input
                              id="round-right-height"
                              type="number"
                              value={hakafrondingRechtsHoogte}
                              onChange={(e) => setHakafrondingRechtsHoogte(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="round-right-length" className="text-sm">{t('length')} (mm)</Label>
                            <Input
                              id="round-right-length"
                              type="number"
                              value={hakafrondingRechtsLengte}
                              onChange={(e) => setHakafrondingRechtsLengte(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Walking Sole */}
            <Card>
              <CardHeader>
                <CardTitle>{t('walkingSole')}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={loopzoolType} onValueChange={setLoopzoolType}>
                  <div className="grid grid-cols-2 gap-3">
                    {LOOPZOOL_OPTIES.map(opt => (
                      <div key={opt.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.value} id={`sole-${opt.value}`} />
                        <Label htmlFor={`sole-${opt.value}`} className="font-normal cursor-pointer text-sm">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
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
                  value={bijzonderheden}
                  onChange={(e) => setBijzonderheden(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            {/* Submit Section */}
            <FormFooter>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                {t('cancel')}
              </Button>
              <Button type="submit" size="lg" className="min-w-[200px]">
                <span className="mr-2">{t('saveAndContinue')}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </FormFooter>
          </form>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormIntakeVLOSPage;
