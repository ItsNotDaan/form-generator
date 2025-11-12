export type OmsluitingKey =
  | 'hoge'
  | 'lavero'
  | 'multivorm'
  | 'plastazote'
  | 'orca';

export type OmsluitingOption = {
  key: OmsluitingKey;
  label: string; // Keep plain labels for now to avoid i18n key mismatch
  needsMm: boolean;
  defaultMm?: string; // default when selected
};

export const OMSLUITING_OPTIONS: OmsluitingOption[] = [
  {key: 'hoge', label: 'Hoge omsluiting', needsMm: true},
  {key: 'lavero', label: 'Lavero omsluiting', needsMm: true, defaultMm: '4'},
  {
    key: 'multivorm',
    label: 'Multivorm omsluiting',
    needsMm: true,
    defaultMm: '3',
  },
  {key: 'plastazote', label: 'Plastazote', needsMm: true, defaultMm: '3'},
  {key: 'orca', label: 'Orca omsluiting', needsMm: false},
];
