// Type definitions for client and intake form data
export interface ClientData {
  // Behandelaar en datum
  practitionerId?: string;
  date: string;
  
  // OSA/VLOS selectie
  osaVlos?: 'OSA' | 'VLOS';
  
  // Locatie
  location?: 'FZ' | 'FM' | 'NN' | 'MMC' | 'AMC';
  
  // Persoonlijke gegevens
  salutation?: 'Mw.' | 'Dhr.' | 'Mej.';
  initials: string;
  clientName: string;
  birthDate: string;
  
  // Adresgegevens
  postalCode: string;
  houseNumber: string;
  city: string;
  address: string;
  
  // Contactgegevens
  phoneOne: string;
  phoneTwo?: string;
  email: string;
  
  // Medische gegevens
  insurance: string;
  bsn?: string;
  specialist?: string;
  familyDoctor?: string;
}

export interface IntakeVLOSData {
  // Zijde selectie
  side: 'beide' | 'links' | 'rechts';
  
  // Schachthoogte (cm)
  schachthoogteLinks?: string;
  schachthoogteRechts?: string;
  
  // Omsluiting
  omsluitingLinks: string[]; // OmsluitingKey[]
  omsluitingRechts: string[];
  omsluitingLinksMm: Record<string, string>;
  omsluitingRechtsMm: Record<string, string>;
  
  // Supplementschoring
  supplementschoringLinksEnabled: 'ja' | 'nee';
  supplementschoringRechtsEnabled: 'ja' | 'nee';
  supplementschoringLinksType?: string; // Lateraal/Mediaal/Lateraal of Mediaal
  supplementschoringRechtsType?: string; // Lateraal/Mediaal/Lateraal of Mediaal
  
  // Zoolverstijving
  zoolverstijvingEnabled: 'ja' | 'nee';
  zoolverstijvingLinks?: boolean;
  zoolverstijvingRechts?: boolean;
  
  // Sluiting
  sluitingType?: string; // haken/ringen of klittenband
  
  // Inschotpunt
  inschotpunt?: string;
  
  // Openstand Schacht
  openstandSchacht?: string;
  
  // Tongpolster
  tongpolsterEnabled: 'ja' | 'nee';
  
  // Tong vaststikken
  tongVaststikkenEnabled: 'ja' | 'nee';
  
  // Haksoort
  haksoortLinks?: string;
  haksoortRechts?: string;
  
  // Hakhoogte
  hakhoogteLinks?: string;
  hakhoogteRechts?: string;
  
  // Hakschoring
  hakschoringLinksEnabled: 'ja' | 'nee';
  hakschoringRechtsEnabled: 'ja' | 'nee';
  hakschoringLinksType?: string; // Mediaal/Lateraal
  hakschoringRechtsType?: string; // Mediaal/Lateraal
  
  // Hakafronding
  hakafrondingLinksEnabled: 'ja' | 'nee';
  hakafrondingRechtsEnabled: 'ja' | 'nee';
  hakafrondingLinksHoogte?: string;
  hakafrondingLinksLengte?: string;
  hakafrondingRechtsHoogte?: string;
  hakafrondingRechtsLengte?: string;
  
  // Loopzool
  loopzoolType?: string;
  
  // Bijzonderheden
  bijzonderheden?: string;
}

export interface FormSubmissionData {
  client: ClientData;
  intakeVLOS?: IntakeVLOSData;
  // Voor toekomstige forms
  intakeOSA?: any;
  intakeOSB?: any;
  intakeSteunsolen?: any;
  intakeOVAC?: any;
}
