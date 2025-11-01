import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {Flex, Text} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {TextareaField} from '@/presentation/base/input/textareaField';
import {TextField} from '@/presentation/base/input/textField';
import {DatePickerField} from '@/presentation/base/input/datePickerField';
import {CheckboxField} from '@/presentation/base/input/checkboxField';
import {
  DropdownField,
  DropdownType,
} from '@/presentation/base/input/dropdownField';
import {TwoColumnField} from '@/presentation/base/twoColumnField';

export const FormNewClientPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');

  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const practitioners = [
    {id: '1', name: 'Dr. Alice Johnson'},
    {id: '2', name: 'Dr. Bob Smith'},
    {id: '3', name: 'Dr. Carol White'},
  ];

  const [practitionerId, setPractitionerId] = useState('');

  return (
    <BaseLayout
      title={t('new-client')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w={'full'}
        h={'full'}
        bg={'white'}
        borderRadius={'2'}
        flex={'1'}
        p={4}
        direction="column"
        gap={4}
      >
        <Text variant={'title'} w={'full'} noOfLines={1} mb={4}>
          {t('new-client')}
        </Text>
        <TextareaField
          placeholder={t('notePlaceholder')}
          value={note}
          onChange={event => {
            event.preventDefault();
            setNote(event.target.value);
          }}
          resize={'none'}
          h={'noteField.h'}
          color={undefined}
        />
        <TextField label={t('name')} value={name} onTextChanged={setName} />
        <TwoColumnField
          leftComponent={<Text variant={'semiBold'}>{t('birthDate')}</Text>}
          rightComponent={
            <DatePickerField
              placeholder={t('birthDatePlaceholder')}
              isSmallVariant={true}
              date={new Date()}
              onDateChanged={date => {
                date && setBirthDate(date.toISOString());
              }}
            />
          }
          leftWeight={5}
          rightWeight={6}
          mt={'0'}
        />
        <CheckboxField
          mt={'12'}
          alignSelf={'center'}
          title={t('rememberMyInfo')}
          isChecked={isCheckboxChecked}
          onChange={event => {
            setIsCheckboxChecked(event.target.checked);
          }}
        />
        <DropdownField
          type={DropdownType.SINGLE_NON_CREATABLE}
          placeholder={t('practitionerPlaceholder')}
          item={practitionerId}
          onItemSelected={item => {
            setPractitionerId(item?.value ?? '');
          }}
          items={practitioners.map(({id, name}) => ({
            value: id,
            label: name,
          }))}
        />
      </Flex>
    </BaseLayout>
  );
};
