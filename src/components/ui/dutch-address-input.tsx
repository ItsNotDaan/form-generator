import React, {useState, useCallback} from 'react';
import {Input} from './input';
import {Label} from './label';

interface DutchAddressInputProps {
  postcode: string;
  houseNumber: string;
  onPostcodeChange: (value: string) => void;
  onHouseNumberChange: (value: string) => void;
  onAddressChange?: (data: {
    street: string;
    city: string;
    postcode: string;
    houseNumber: string;
  }) => void;
  onStreetChange?: (value: string) => void;
  onCityChange?: (value: string) => void;
  label?: string;
  streetLabel?: string;
  cityLabel?: string;
  postcodeLabel?: string;
  houseNumberLabel?: string;
  street?: string;
  city?: string;
  t?: (key: string) => string;
}

export const DutchAddressInput: React.FC<DutchAddressInputProps> = ({
  postcode,
  houseNumber,
  onPostcodeChange,
  onHouseNumberChange,
  onAddressChange,
  onStreetChange,
  onCityChange,
  label = 'Adres',
  streetLabel = 'Straat',
  cityLabel = 'Stad',
  postcodeLabel = 'Postcode',
  houseNumberLabel = 'Huisnummer',
  street = '',
  city = '',
  t,
}) => {
  const translate = t || ((key: string) => key);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [displayHouseNumber, setDisplayHouseNumber] = useState(houseNumber);

  const getAddress = useCallback(
    async (pc: string, num: string) => {
      if (!pc || !num) {
        return;
      }

      const cleanPc = pc.replace(/\s/g, '').toUpperCase();
      if (cleanPc.length < 4 || !/^\d{4}[A-Z]{2}$/.test(cleanPc)) {
        setError(translate('invalidPostcodeMessage'));
        return;
      }

      setLoading(true);
      setError('');

      try {
        const res = await fetch(
          `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${cleanPc}&fq=huisnummer:${num}`
        );
        const data = await res.json();

        if (data.response && data.response.numFound > 0) {
          const doc = data.response.docs[0];
          const streetName = doc.straatnaam || '';
          const cityName = doc.woonplaatsnaam || '';

          onStreetChange?.(streetName);
          onCityChange?.(cityName);

          if (onAddressChange) {
            onAddressChange({
              street: streetName,
              city: cityName,
              postcode: pc,
              houseNumber: num,
            });
          }
        } else {
          setError(translate('addressNotFoundMessage'));
          onStreetChange?.('');
          onCityChange?.('');
        }
      } catch (err) {
        setError(translate('errorFetchingAddressMessage'));
        console.error('Address lookup error:', err);
      } finally {
        setLoading(false);
      }
    },
    [onAddressChange, onStreetChange, onCityChange, translate]
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

  return (
    <div className="space-y-4">
      {label && <Label className="text-base font-semibold">{label}</Label>}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postcode" className="text-sm">
            {postcodeLabel}
          </Label>
          <Input
            id="postcode"
            placeholder={translate('postalCodePlaceholder')}
            value={postcode}
            onChange={e => onPostcodeChange(e.target.value.toUpperCase())}
            onBlur={handlePostcodeBlur}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="houseNumber" className="text-sm">
            {houseNumberLabel}
          </Label>
          <Input
            id="houseNumber"
            placeholder={translate('houseNumberPlaceholder')}
            value={displayHouseNumber}
            onChange={e => {
              const displayValue = e.target.value;
              setDisplayHouseNumber(displayValue);
              const processedValue = displayValue.replace(/-/g, ' ');
              onHouseNumberChange(processedValue);
            }}
            onBlur={handleHouseNumberBlur}
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="street" className="text-sm">
            {streetLabel}
          </Label>
          <Input
            id="street"
            placeholder={translate('autofill')}
            value={street}
            readOnly
            disabled={loading}
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm">
            {cityLabel}
          </Label>
          <Input
            id="city"
            placeholder={translate('autofill')}
            value={city}
            readOnly
            disabled={loading}
            className="bg-muted"
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading && (
        <p className="text-sm text-muted-foreground">
          {translate('loadingMessage')}
        </p>
      )}
    </div>
  );
};
