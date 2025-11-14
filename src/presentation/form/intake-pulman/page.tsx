import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Divider,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
  Select,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/domain/store/hooks';
import { setIntakePulmanData } from '@/domain/store/slices/formData';

export const FormIntakePulmanPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<string>('beide');

  // State voor omsluiting
  const [omsluitingLinksType, setOmsluitingLinksType] = useState('');
  const [omsluitingRechtsType, setOmsluitingRechtsType] = useState('');
  const [omsluitingLinksMm, setOmsluitingLinksMm] = useState('');
  const [omsluitingRechtsMm, setOmsluitingRechtsMm] = useState('');

  // State voor proefschoen
  const [proefschoen, setProefschoen] = useState('');

  // State voor hiel
  const [hielLinks, setHielLinks] = useState('');
  const [hielRechts, setHielRechts] = useState('');

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const showLinks = side === 'links' || side === 'beide';
  const showRechts = side === 'rechts' || side === 'beide';

  const handleSubmit = () => {
    dispatch(setIntakePulmanData({
      side: side as 'beide' | 'links' | 'rechts',
      omsluitingLinksType,
      omsluitingRechtsType,
      omsluitingLinksMm,
      omsluitingRechtsMm,
      proefschoen,
      hielLinks,
      hielRechts,
      bijzonderheden,
    }));

    console.log('Intake Pulman data opgeslagen in Redux store');
  };

  return (
    <BaseLayout
      title="Intakeformulier Pulman"
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w="full"
        direction="column"
        bg="white"
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        gap={{ base: 4, md: 6 }}
      >
        {/* Links/Rechts/Beide selectie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>{t('side')}</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
            color="inherit"
          >
            <RadioGroup value={side} onChange={setSide}>
              <Stack direction="row" spacing={6}>
                <Radio value="beide">{t('beide')}</Radio>
                <Radio value="links">{t('links')}</Radio>
                <Radio value="rechts">{t('rechts')}</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Omsluiting */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>{t('omsluiting')}</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {showLinks && (
              <Box flex={1}>
                <FormLabel fontSize="sm" mb={3}>{t('links')}</FormLabel>
                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel fontSize="sm">Type</FormLabel>
                    <Input
                      placeholder="Type omsluiting"
                      value={omsluitingLinksType}
                      onChange={(e) => setOmsluitingLinksType(e.target.value)}
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">mm</FormLabel>
                    <Input
                      type="number"
                      placeholder="mm"
                      value={omsluitingLinksMm}
                      onChange={(e) => setOmsluitingLinksMm(e.target.value)}
                      size="sm"
                    />
                  </FormControl>
                </Stack>
              </Box>
            )}
            {showRechts && (
              <Box
                flex={1}
                borderLeft={{ base: 'none', md: showLinks ? '1px' : 'none' }}
                borderTop={{ base: showLinks ? '1px' : 'none', md: 'none' }}
                borderColor="inherit"
                pl={{ base: 0, md: showLinks ? 6 : 0 }}
                pt={{ base: showLinks ? 4 : 0, md: 0 }}
              >
                <FormLabel fontSize="sm" mb={3}>{t('rechts')}</FormLabel>
                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel fontSize="sm">Type</FormLabel>
                    <Input
                      placeholder="Type omsluiting"
                      value={omsluitingRechtsType}
                      onChange={(e) => setOmsluitingRechtsType(e.target.value)}
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">mm</FormLabel>
                    <Input
                      type="number"
                      placeholder="mm"
                      value={omsluitingRechtsMm}
                      onChange={(e) => setOmsluitingRechtsMm(e.target.value)}
                      size="sm"
                    />
                  </FormControl>
                </Stack>
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Proefschoen */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>{t('proefschoen')}</Text>
          <FormControl>
            <Input
              placeholder="Proefschoen details"
              value={proefschoen}
              onChange={(e) => setProefschoen(e.target.value)}
              size="sm"
            />
          </FormControl>
        </Box>

        <Divider />

        {/* Hiel */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Hiel</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
          >
            {showLinks && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('links')}</FormLabel>
                <Input
                  placeholder="Hiel links"
                  value={hielLinks}
                  onChange={(e) => setHielLinks(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
            {showRechts && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('rechts')}</FormLabel>
                <Input
                  placeholder="Hiel rechts"
                  value={hielRechts}
                  onChange={(e) => setHielRechts(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Bijzonderheden */}
        <Box>
          <Text fontWeight="bold" mb={4} fontSize={{ base: 'md', md: 'lg' }}>{t('bijzonderheden')}</Text>
          <Textarea
            placeholder={t('bijzonderhedenPlaceholder')}
            value={bijzonderheden}
            onChange={(e) => setBijzonderheden(e.target.value)}
            minH={{ base: '100px', md: '120px' }}
          />
        </Box>

        {/* Submit button */}
        <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
          <Button variant="primary" onClick={handleSubmit} w={{ base: 'full', sm: 'auto' }}>
            Opslaan en doorgaan
          </Button>
        </Flex>

      </Flex>
    </BaseLayout>
  );
};

export default FormIntakePulmanPage;
