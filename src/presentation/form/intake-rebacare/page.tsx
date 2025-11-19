import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
    Flex,
    Text,
    Box,
    Divider,
    Textarea,
    Stack,
    Radio,
    RadioGroup,
    Button,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/domain/store/hooks';
import { setIntakeRebacareData } from '@/domain/store/slices/formData';
import { Side } from '@/presentation/form/constants/formConstants';

export const FormIntakeRebacarePage = () => {
    const router = useRouter();
    const { t } = useTranslation('form');
    const dispatch = useAppDispatch();

    // State voor Links/Rechts/Beide selectie (default: Beide)
    const [side, setSide] = useState<Side>('beide');

    // State voor medische indicatie
    const [medischeIndicatie, setMedischeIndicatie] = useState('');

    // State voor gezwachteld
    const [gezwachteld, setGezwachteld] = useState<'ja' | 'nee'>('nee');

    // State voor bijzonderheden
    const [bijzonderheden, setBijzonderheden] = useState('');

    const handleSubmit = () => {
        dispatch(
            setIntakeRebacareData({
                side,
                medischeIndicatie,
                gezwachteld,
                bijzonderheden,
            })
        );

        console.log('Intake Rebacare data opgeslagen in Redux store');
    };

    return (
        <BaseLayout
            title={t('intakeRebacare')}
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
                    <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
                        {t('side')}
                    </Text>
                    <Flex
                        gap={{ base: 4, md: 6 }}
                        direction={{ base: 'column', md: 'row' }}
                        border="1px solid"
                        borderColor="inherit"
                        borderRadius="md"
                        align={'center'}
                        p={4}
                        mt={2}
                        color="inherit"
                    >
                        <RadioGroup value={side} onChange={v => setSide(v as Side)}>
                            <Stack direction="row" spacing={6}>
                                <Radio value="beide">{t('beide')}</Radio>
                                <Radio value="links">{t('links')}</Radio>
                                <Radio value="rechts">{t('rechts')}</Radio>
                            </Stack>
                        </RadioGroup>
                    </Flex>
                </Box>

                <Divider />

                {/* Medische Indicatie */}
                <Box>
                    <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
                        {t('medischeIndicatie')}
                    </Text>
                    <Textarea
                        placeholder={t('medischeIndicatiePlaceholder')}
                        value={medischeIndicatie}
                        onChange={e => setMedischeIndicatie(e.target.value)}
                        minH={{ base: '80px', md: '100px' }}
                    />
                </Box>

                <Divider />

                {/* Gezwachteld */}
                <Box>
                    <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
                        {t('gezwachteld')}
                    </Text>
                    <Flex
                        gap={{ base: 4, md: 6 }}
                        direction={{ base: 'column', md: 'row' }}
                        border="1px solid"
                        borderColor="inherit"
                        borderRadius="md"
                        align={'center'}
                        p={4}
                        mt={2}
                        color="inherit"
                    >
                        <RadioGroup value={gezwachteld} onChange={v => setGezwachteld(v as 'ja' | 'nee')}>
                            <Stack direction="row" spacing={6}>
                                <Radio value="ja">{t('ja')}</Radio>
                                <Radio value="nee">{t('nee')}</Radio>
                            </Stack>
                        </RadioGroup>
                    </Flex>
                </Box>

                <Divider />

                {/* Bijzonderheden */}
                <Box>
                    <Text fontWeight="bold" mb={4} fontSize={{ base: 'md', md: 'lg' }}>
                        {t('bijzonderheden')}
                    </Text>
                    <Textarea
                        placeholder={t('bijzonderhedenPlaceholder')}
                        value={bijzonderheden}
                        onChange={e => setBijzonderheden(e.target.value)}
                        minH={{ base: '100px', md: '120px' }}
                    />
                </Box>

                {/* Submit button */}
                <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        w={{ base: 'full', sm: 'auto' }}
                    >
                        {t('opslaanEnDoorgaan')}
                    </Button>
                </Flex>
            </Flex>
        </BaseLayout>
    );
};

export default FormIntakeRebacarePage;

