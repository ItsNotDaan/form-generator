import { useState, useCallback } from 'react';

export interface UseDutchAddressLookupProps {
  postcode: string;
  houseNumber: string;
  t?: (key: string) => string;
}


export function useDutchAddressLookup({ postcode, houseNumber, t }: UseDutchAddressLookupProps) {
  const translate = t || ((key: string) => key);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const getAddress = useCallback(
    async (pc: string, num: string) => {
      if (!pc || !num) return;
      const cleanPc = pc.replace(/\s/g, '').toUpperCase();
      if (cleanPc.length < 4 || !/^\d{4}[A-Z]{2}$/.test(cleanPc)) {
        setError(translate('invalidPostcodeMessage'));
        setStreet('');
        setCity('');
        return;
      }
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${cleanPc}&fq=huisnummer:${num}`,
        );
        const data = await res.json();
        if (data.response && data.response.numFound > 0) {
          const doc = data.response.docs[0];
          const streetName = doc.straatnaam || '';
          const cityName = doc.woonplaatsnaam || '';
          setStreet(streetName);
          setCity(cityName);
        } else {
          setError(translate('addressNotFoundMessage'));
          setStreet('');
          setCity('');
        }
      } catch (err) {
        setError(translate('errorFetchingAddressMessage'));
        setStreet('');
        setCity('');
        console.error('Address lookup error:', err);
      } finally {
        setLoading(false);
      }
    },
    [translate],
  );

  const handlePostcodeBlur = () => {
    if (postcode && houseNumber) {
      getAddress(postcode, houseNumber);
    }
  };
  const handleHouseNumberBlur = () => {
    if (postcode && houseNumber) {
      const normalizedNumber = houseNumber.replace(/-/g, ' ');
      getAddress(postcode, normalizedNumber);
    }
  };

  return { loading, error, street, city, handlePostcodeBlur, handleHouseNumberBlur };
}
