// ============================================================================
// SHOE DESIGN / FOLIEPAS CONSTANTS
// Constants used in the shoe design (Foliepas / Check Foliepas) forms.
// ============================================================================

// Voeringopties (lining options)
export type LiningOption = 'leatherLining' | 'onSteamLining' | 'diabeticLining';
export const LINING_OPTIONS = [
  {
    label: 'Leather lining',
    value: 'leatherLining',
  },
  {
    label: 'Diabetic lining',
    value: 'diabeticLining',
  },
];

/** Zoolranden - Structured data for sole edges with types, models, and colors */
export interface ZoolRandKleur {
  kleur: string;
  code?: string;
}

export interface ZoolRandModel {
  model: string;
  gegevens?: {
    notitie?: string;
  };
  kleuren: ZoolRandKleur[];
}

export interface ZoolRandType {
  naam: string;
  modellen: ZoolRandModel[];
}

export const ZOOL_RANDEN: ZoolRandType[] = [
  {
    naam: 'E.V.A.',
    modellen: [
      {
        model: 'Rand 3 met kant',
        kleuren: [
          {kleur: 'Zand', code: '05'},
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Middelbruin', code: '35'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Moreno', code: '46'},
          {kleur: 'Grijs', code: '56'},
          {kleur: 'Lichtgrijs', code: '60'},
          {kleur: 'Donkerblauw', code: '78'},
          {kleur: 'Antraciet', code: '80'},
          {kleur: 'Zwart', code: '81'},
        ],
      },
      {
        model: 'Rand 12x11',
        kleuren: [
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Moreno', code: '46'},
          {kleur: 'Grijs', code: '56'},
          {kleur: 'Donkerblauw', code: '78'},
          {kleur: 'Antraciet', code: '80'},
          {kleur: 'Zwart', code: '81'},
        ],
      },
      {
        model: 'Rand 13',
        kleuren: [
          {kleur: 'Moreno met grijze stik'},
          {kleur: 'Zwart met grijze stik'},
          {kleur: 'Wit met witte stik'},
        ],
      },
    ],
  },
  {
    naam: 'Lederrand',
    modellen: [
      {
        model: '380',
        gegevens: {
          notitie: 'Imitatie flexibel',
        },
        kleuren: [
          {kleur: 'Zwart met zwart stiksel', code: '380'},
          {kleur: 'Zwart met zwart stiksel gekartelt', code: '381'},
          {kleur: 'Bruin met bruin stiksel', code: '382'},
          {kleur: 'Bruin met bruin stiksel gekartelt', code: '383'},
        ],
      },
      {
        model: '500',
        kleuren: [
          {kleur: 'Zwart met wit stiksel', code: '500'},
          {kleur: 'Bruin met wit stiksel', code: '501'},
          {kleur: 'Naturel met wit stiksel', code: '502'},
        ],
      },
    ],
  },
  {
    naam: 'Rubberrand',
    modellen: [
      {
        model: '28',
        gegevens: {
          notitie: 'Imitatie flexibel',
        },
        kleuren: [{kleur: 'Middenbruin'}, {kleur: 'Zwart'}],
      },
      {
        model: '47',
        gegevens: {
          notitie: 'Dr. Martens',
        },
        kleuren: [{kleur: 'Donkerbruin'}, {kleur: 'Zwart'}],
      },
    ],
  },
  {
    naam: 'CSO Rand',
    modellen: [
      {
        model: '40',
        gegevens: {
          notitie: 'Standaard',
        },
        kleuren: [
          {kleur: 'Zand', code: '05'},
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Middelbruin', code: '35'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Donkerbruin', code: '46'},
          {kleur: 'Grijs', code: '56'},
          {kleur: 'Donkerblauw', code: '78'},
          {kleur: 'Antraciet', code: '80'},
          {kleur: 'Zwart', code: '81'},
        ],
      },
      {
        model: '60',
        gegevens: {
          notitie: 'Glad',
        },
        kleuren: [
          {kleur: 'Zand', code: '05'},
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Middelbruin', code: '35'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Donkerbruin', code: '46'},
          {kleur: 'Grijs', code: '56'},
          {kleur: 'Donkerblauw', code: '78'},
          {kleur: 'Antraciet', code: '80'},
          {kleur: 'Zwart', code: '81'},
        ],
      },
      {
        model: '70',
        gegevens: {
          notitie: 'Glad met streep',
        },
        kleuren: [
          {kleur: 'Donkerblauw (78) - Witte streep'},
          {kleur: 'Zwart (81) - Witte streep'},
          {kleur: 'Taupe (41) - Witte streep'},
          {kleur: 'Beige (19) - Witte streep'},
          {kleur: 'Wit (09) - Zwarte streep'},
        ],
      },
    ],
  },
];

/** Onderwerken - Structured data for sole types with categories, models, metadata, and colors */
export interface OnderwerkKleur {
  kleur: string;
  code?: string;
}

export interface OnderwerkModel {
  model: string;
  gegevens?: {
    notitie?: string;
    zwaarte?: string;
    zool_dikte?: string;
    hak_dikte?: string;
    dikte?: string;
  };
  kleuren: OnderwerkKleur[];
}

export interface OnderwerkCategorie {
  naam: string;
  zolen: OnderwerkModel[];
}

//Kleurstaal voor shoedesign. Twee merken. Myfoot en Maasleder
// Merk: Myfoot
// Soort: Mouse
// kleuren: [{kleur: 'Bianco', code: 'M101'}, {kleur: 'Room', code: 'M223'}]
//
export type OsaKleur = {
  merk: string;
  soorten: Array<{
    soort: string;
    kleuren: Array<{kleur: string; code: string}>;
  }>;
};

// export const KLEUREN_STAAL: OsaKleur[] = [
//   {
//     merk: 'Maasleder',
//     soorten: [
//       {
//         soort: 'Mouse', //(Glad kalfsleder, soepel met zijdeglans 1.0-1.1 mm)
//         kleuren: [
//           {kleur: 'Bianco', code: 'M101'},
//           {kleur: 'Room', code: 'M223'},
//           {kleur: 'Porcelan', code: 'M124'},
//           {kleur: 'Perla', code: 'M126'},
//           {kleur: 'Sand', code: 'M210'},
//           {kleur: 'Beige', code: 'M106'},
//           {kleur: 'Taupe', code: 'M128'},
//           {kleur: 'Talpa', code: 'M127'},
//           {kleur: 'Fango', code: 'M222'},
//           {kleur: 'Brandy', code: 'M132'},
//           {kleur: 'Noce', code: 'M167'},
//           {kleur: 'Robusta', code: 'M103'},
//           {kleur: 'T.moro', code: 'M114'},
//           {kleur: 'North sea', code: 'M219'},
//           {kleur: 'Night', code: 'M208'},
//           {kleur: 'Tulip', code: 'M198'},
//           {kleur: 'Shiraz', code: 'M207'},
//           {kleur: 'Rino', code: 'M117'},
//           {kleur: 'Cenero', code: 'M143'},
//           {kleur: 'Umbra', code: 'M136'},
//           {kleur: 'Nero', code: 'M121'},
//         ],
//       },
//       {
//         soort: 'Lumiere & Lipstick', //(Soepel kalfsleder 0.9-1.1 mm)
//         kleuren: [
//           {kleur: 'Lipstick silver', code: 'M411'},
//           {kleur: 'Lumiere pearl', code: 'M415'},
//           {kleur: 'Lumiere light gold', code: 'M417'},
//           {kleur: 'Lumiere champagne', code: 'M423'},
//           {kleur: 'Lumiere lapis', code: 'M419'},
//           {kleur: 'Lumiere antracite', code: 'M420'},
//         ],
//       },
//       {
//         soort: 'Metallico', //(geprent leder 1.1-1.3 mm)
//         kleuren: [
//           {kleur: 'Marmo', code: 'M712'},
//           {kleur: 'Gris', code: 'M711'},
//           {kleur: 'Azul', code: 'M710'},
//     ],
//       },
//       {
//         soort: 'Fantasy', //(trendy)
//         kleuren: [
//           {kleur: 'Sabor beige', code: 'M741'},
//           {kleur: 'Sabor taupe', code: 'M742'},
//           {kleur: 'Sabor blue', code: 'M740'},
//           {kleur: 'Paris silver', code: 'M761'},
//           {kleur: 'Paris gold', code: 'M760'},
//           {kleur: 'Lilly bronze', code: 'M775'},
//           {kleur: 'Grace mocha', code: 'M730'},
//           {kleur: 'Grace notte', code: 'M731'},
//           {kleur: 'Grace nero', code: 'M732'},
//           {kleur: 'Doshi silver', code: 'M781'},
//           {kleur: 'Doshi beige', code: 'M780'},
//           {kleur: 'Doshi antracite', code: 'M782'},
//           {kleur: 'Kengo jordan', code: 'M771'},
//           {kleur: 'Kengo zebra', code: 'M770'},
//           {kleur: 'Camelia nero', code: 'M640'},
//           {kleur: 'Dundee nero', code: 'M613'},
//     ],
//       },
//       {
//         soort: 'Vanessa', //(Zachte kalf splitsuede 0.8-1.1 mm)
//         kleuren: [
//           {kleur: 'Talpa', code: 'M319'},
//           {kleur: 'Ebano', code: 'M318'},
//           {kleur: 'Brandy', code: 'M320'},
//           {kleur: 'Marine', code: 'M315'},
//           {kleur: 'Vino', code: 'M314'},
//           {kleur: 'Fumo', code: 'M312'},
//           {kleur: 'Nero', code: 'M316'},
//     ],
//       },
//       {
//         soort: 'Diacalf', //(Dunne, superzachte gewalkte kalfsnappa 0.8-1.0 mm)
//         kleuren: [
//           {kleur: 'Coffee', code: 'M231'},
//           {kleur: 'Nero', code: 'M232'},
//     ],
//       },
//       {
//         soort: 'Puresoft', //(Zachte kalfsnappa met subtiele glans 1.0-1.3 mm)
//         kleuren: [
//           {kleur: 'Bianco', code: 'M509'},
//           {kleur: 'Beige', code: 'M510'},
//           {kleur: 'Ocre', code: 'M589'},
//           {kleur: 'Brique', code: 'M588'},
//           {kleur: 'Lavander', code: 'M590'},
//           {kleur: 'Opal', code: 'M519'},
//           {kleur: 'Taupe', code: 'M512'},
//           {kleur: 'Pyrit', code: 'M528'},
//           {kleur: 'Smog', code: 'M511'},
//           {kleur: 'Brandy', code: 'M514'},
//           {kleur: 'Praline', code: 'M527'},
//           {kleur: 'Coffee', code: 'M585'},
//           {kleur: 'Denim', code: 'M591'},
//           {kleur: 'Notte', code: 'M518'},
//           {kleur: 'Koala', code: 'M584'},
//           {kleur: 'Ferro', code: 'M587'},
//           {kleur: 'Cardinale', code: 'M508'},
//           {kleur: 'Olive', code: 'M513'},
//           {kleur: 'Onyx', code: 'M516'},
//     ],
//       },
//       {
//         soort: 'Velvet', //(Soepele Kalfsnubuck 0.9-1.1 mm)
//         kleuren: [
//           {kleur: 'Powder', code: 'M474'},
//           {kleur: 'Nougat', code: 'M438'},
//           {kleur: 'Steppe', code: 'M440'},
//           {kleur: 'Mocca', code: 'M439'},
//           {kleur: 'Robusta', code: 'M473'},
//           {kleur: 'Camus', code: 'M451'},
//           {kleur: 'Marine', code: 'M443'},
//           {kleur: 'Tulip', code: 'M454'},
//           {kleur: 'Capri', code: 'M456'},
//           {kleur: 'Rino', code: 'M448'},
//           {kleur: 'Nero', code: 'M445'},
//     ],
//       },
//       {
//         soort: 'Cracked', //(Kalfsnubuck 0.9-1.1 mm)
//         kleuren: [
//         {kleur: 'Powder', code: 'M393'},
//         {kleur: 'Nougat', code: 'M394'},
//         {kleur: 'Steppe', code: 'M391'},
//         {kleur: 'Rino', code: 'M392'},
//         {kleur: 'Marine', code: 'M390'},
//     ],
//       },
//       {
//         soort: 'Coins', //(Kalfsnubuck 0.9-1.1 mm)
//         kleuren: [
//           {kleur: 'Pearl', code: 'M323'},
//           {kleur: 'Rino', code: 'M327'},
//           {kleur: 'Nero', code: 'M325'},
//           {kleur: 'Robusta', code: 'M326'},
//           {kleur: 'Barolo', code: 'M324'},
//           {kleur: 'Marine', code: 'M322'},
//         ],
//       },
//       {
//         soort: 'Patent', //(Kalfsleeren met lakfinish 0.9-1.1 mm)
//         kleuren: [
//           {kleur: 'C.oyster barolo', code: 'M577'},
//           {kleur: 'C.oyster notte', code: 'M576'},
//           {kleur: 'Souplesse nero', code: 'M144'},
//           {kleur: 'Bombay nero', code: 'M157'},
//           {kleur: 'Viper nero', code: 'M950'},
//         ],
//       },
//       {
//         soort: 'Saffiano', //(Geprint kalfsleder 0.9-1.1 mm)
//         kleuren: [
//           {kleur: 'Bianco', code: 'M601'},
//           {kleur: 'Beige', code: 'M602'},
//           {kleur: 'Ocre', code: 'M603'},
//
//     ],
//
//         ],
//   {
//     merk: 'MyFoot',
//     soorten: [
//       {
//         soort: '',
//         kleuren: [
//           {kleur: '', code: 'ML-01'},
//           {kleur: 'Bruin', code: 'ML-02'},
//         ],
//       },
//     ],
//   },
// ];

export const ONDERWERKEN: OnderwerkCategorie[] = [
  {
    naam: 'Vibram',
    zolen: [
      {
        model: '1100 profielzool',
        gegevens: {
          zwaarte: 'Zwaar',
          zool_dikte: '12 mm',
          hak_dikte: '20 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
      {
        model: '1220 profielzool',
        gegevens: {
          zwaarte: 'Zwaar',
          zool_dikte: '8 mm',
          hak_dikte: '8 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Honing'}, {kleur: 'Moreno'}],
      },
      {
        model: '2603 gumlitezool',
        gegevens: {
          notitie: 'Dr. Martens',
          zwaarte: 'Licht',
          zool_dikte: '12 mm',
          hak_dikte: '23 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: '2644 gumlitezool',
        gegevens: {
          zwaarte: 'Licht',
          zool_dikte: '6 mm',
          hak_dikte: '6 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: '2655 gumlitezool',
        gegevens: {
          zwaarte: 'Licht',
          zool_dikte: '7 mm',
          hak_dikte: '10 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: '4855 Newflex zool',
        gegevens: {
          zwaarte: 'Licht',
          zool_dikte: '6 mm',
          hak_dikte: '6 mm',
        },
        kleuren: [{kleur: 'Honing'}, {kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: 'Mammoth profielzool',
        gegevens: {
          notitie: 'Slijtvast zwaarder',
          zwaarte: 'Zwaar',
          zool_dikte: '8 mm',
          hak_dikte: '8 mm',
        },
        kleuren: [{kleur: 'Bruin'}, {kleur: 'Zwart'}, {kleur: 'Honing'}],
      },
      {
        model: 'Flensburg PUR profielzool',
        gegevens: {
          notitie: 'Werkschoen (Olie en Benzinebestendig + Antistatisch)',
          zwaarte: 'Licht',
          zool_dikte: '8 mm',
          hak_dikte: '24 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
      {
        model: 'Kiel profielzool',
        gegevens: {
          notitie: 'Werkschoen (Olie en Zuurbestendig + Antistatisch)',
          zwaarte: 'Licht',
          zool_dikte: '6 mm',
          hak_dikte: '11 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
      {
        model: 'Lübeck PUR profielzool',
        gegevens: {
          notitie:
            'Werkschoen (Olie en Benzinebestendig + Antistatisch) - Sleehak & CSO Rand',
          zwaarte: 'Licht',
          zool_dikte: '9 mm',
          hak_dikte: '9 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
      {
        model: 'Onderwerk Sportflex',
        gegevens: {
          notitie: 'Slijtvast / Sneaker',
          zwaarte: 'Zwaar',
          zool_dikte: '5,5 mm',
          hak_dikte: '5,5 mm',
        },
        kleuren: [
          {kleur: 'Bruin'},
          {kleur: 'Grijs'},
          {kleur: 'Rood'},
          {kleur: 'Zwart'},
          {kleur: 'Oranje'},
          {kleur: 'Groen'},
          {kleur: 'Geel'},
          {kleur: 'Wit'},
          {kleur: 'Blauw'},
        ],
      },
      {
        model: 'Iztok sportzool',
        gegevens: {
          notitie: 'Sportief',
          zwaarte: 'Medium',
          zool_dikte: '6,5 mm',
          hak_dikte: '6,5 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Tri-Color'}],
      },
    ],
  },
  {
    naam: 'Zolenplaat',
    zolen: [
      {
        model: 'Zoolrubber Lavero flex profielen',
        gegevens: {
          notitie: 'Sportief',
          dikte: '4 mm',
        },
        kleuren: [
          {kleur: 'Rood', code: '102'},
          {kleur: 'Blauw', code: '103'},
          {kleur: 'Groen', code: '105'},
          {kleur: 'Roze', code: '106'},
        ],
      },
      {
        model: 'Vibram 8316 Mandorlo',
        gegevens: {
          notitie: 'Extra Zachte E.V.A. - Huisschoen',
          zwaarte: 'Super licht',
          dikte: '6 of 8 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: 'Zoolrubber Astro Star',
        gegevens: {
          notitie: 'Nette schoenen - Onder MyFoot',
          zwaarte: 'Licht',
          dikte: '4 of 6 mm',
        },
        kleuren: [
          {kleur: 'Zwart', code: '81'},
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Donkerbruin', code: '46'},
          {kleur: 'Donkergrijs', code: '56'},
          {kleur: 'Rood', code: '89'},
          {kleur: 'Blauw', code: '352'},
        ],
      },
      {
        model: 'Zoolrubber PowerGrip',
        gegevens: {
          notitie: 'Werkschoen (Olie en Zuurbestendig + Antistatisch)',
          dikte: '4,7 of 6,5 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
    ],
  },
];

/** Zipper placement options */
export const ZIPPER_PLACEMENT_OPTIONS = [
  {label: 'Langs Ringbies', value: 'Langs Ringbies'},
  {label: 'Zie leest', value: 'Zie leest'},
];

/** Zoolrand polish types */
export type SoleEdgePolishType =
  | 'none'
  | 'black'
  | 'brown'
  | 'mahogany'
  | 'ridges'
  | 'other';
export const SOLE_EDGE_POLISH_TYPE_OPTIONS = [
  {label: 'none', value: 'none'},
  {label: 'black', value: 'black'},
  {label: 'brown', value: 'brown'},
  {label: 'mahogany', value: 'mahogany'},
  {label: 'ridges', value: 'ridges'},
  {label: 'other', value: 'other'},
];

/** Model type options */
export type ModelType = 'asPhoto' | 'model';
export const MODEL_TYPE_OPTIONS = [
  {label: 'asPhoto', value: 'asPhoto' as const},
  {label: 'model', value: 'model' as const},
];

/** Tongue padding options (mm) */
export type TonguePaddingMm = 'no' | 'mm3' | 'mm5';
export const TONGUE_PADDING_MM_OPTIONS = [
  {label: 'no', value: 'no' as const},
  {label: '3', value: 'mm3' as const},
  {label: '5', value: 'mm5' as const},
];

/** Tongue Type options **/
export type TongueType = 'standard' | 'watertongue';
export const TONGUE_TYPE_OPTIONS = [
  {label: 'standard', value: 'standard' as const},
  {label: 'watertongue', value: 'watertongue' as const},
];

/** Padding collar options (mm) */
export type PaddingCollarMm = 'no' | 'mm5' | 'mm10';
export const PADDING_COLLAR_MM_OPTIONS = [
  {label: 'no', value: 'no' as const},
  {label: '5', value: 'mm5' as const},
  {label: '10', value: 'mm10' as const},
];

/** Closure type options */
export type ClosureType =
  | 'ringsAndHooksClosure'
  | 'velcroClosure'
  | 'velcroExtraLongClosure'
  | 'oneHandClosure'
  | 'boaClosure';
export const CLOSURE_TYPE_OPTIONS = [
  {
    label: 'ringAndHooksClosure',
    value: 'ringsAndHooksClosure' as const,
  },
  {
    label: 'velcroClosure',
    value: 'velcroClosure' as const,
  },
  {
    label: 'velcroExtraLongClosure',
    value: 'velcroExtraLongClosure' as const,
  },
  {
    label: 'oneHandClosure',
    value: 'oneHandClosure' as const,
  },
  {
    label: 'boaClosure',
    value: 'boaClosure' as const,
  },
];

/** Zipper type options */
export type ZipperType = 'none' | 'functionalNylon' | 'decorativeNylon';
export const ZIPPER_TYPE_OPTIONS = [
  {label: 'none', value: 'none' as const},
  {
    label: 'functionalNylon',
    value: 'functionalNylon' as const,
  },
  {
    label: 'decorativeNylon',
    value: 'decorativeNylon' as const,
  },
];

/** Toe type options / Neusmodellen */
export type ToeType = 'standard' | 'carbonToes' | 'rubberCrawlToes';
export const TOE_TYPE_OPTIONS = [
  {label: 'standard', value: 'standard' as const},
  {
    label: 'carbonToes',
    value: 'carbonToes' as const,
  },
  {
    label: 'rubberCrawlToes',
    value: 'rubberCrawlToes' as const,
  },
];

/** Counterfort type options */
export type CounterfortType = 'formo' | 'leather' | 'other';
export const COUNTERFORT_TYPE_OPTIONS = [
  {label: 'formo', value: 'formo' as const},
  {label: 'leather', value: 'leather' as const},
  {label: 'other', value: 'other' as const},
];

/** Insole type options for CheckFoliepas */
export type CheckFoliepasInsoleType = 'leather' | 'other';
export const CHECK_FOLIEPAS_INSOLE_TYPE_OPTIONS = [
  {label: 'leather', value: 'leather' as const},
  {label: 'other', value: 'other' as const},
];

/** Construction method type options */
export type ConstructionMethodType = 'glued' | 'flexible' | 'other';
export const CONSTRUCTION_METHOD_TYPE_OPTIONS = [
  {label: 'glued', value: 'glued' as const},
  {label: 'flexible', value: 'flexible' as const},
  {label: 'other', value: 'other' as const},
];

/** Heel model type options */
export type HeelModelType = 'buildUpHeel' | 'wedgeHeel' | 'blockHeel'; //Opbouw, sleehak, blokhak
export const HEEL_MODEL_TYPE_OPTIONS = [
  {
    label: 'buildUp',
    value: 'buildUpHeel' as const,
  },
  {
    label: 'wedge',
    value: 'wedgeHeel' as const,
  },
  {
    label: 'block',
    value: 'blockHeel' as const,
  },
];

/** Heel buildup material options */
export type HeelBuildUpMaterial = 'poro' | 'leather';
export const HEEL_BUILDUP_MATERIAL_OPTIONS = [
  {label: 'poro', value: 'poro' as const},
  {label: 'leather', value: 'leather' as const},
];

/** Shoring type options */
export type ShoringType = 'none' | 'lateral' | 'medial' | 'lateralAndMedial';
export const SHORING_TYPE_OPTIONS = [
  {label: 'none', value: 'none' as const},
  {label: 'lateral', value: 'lateral' as const},
  {label: 'medial', value: 'medial' as const},
  {
    label: 'lateralAndMedial',
    value: 'lateralAndMedial' as const,
  },
];
