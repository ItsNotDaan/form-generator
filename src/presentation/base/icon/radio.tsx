import {createIcon} from '@chakra-ui/icon';

export const RadioCheckedIcon = createIcon({
  displayName: 'Radio checked',
  viewBox: '0 0 14 14',
  defaultProps: {
    fill: 'none',
    w: '3.5',
    h: '3.5',
    color: 'brand.500',
  },
  path: (
    <>
      <rect
        x={'0.5'}
        y={'0.5'}
        width={'13'}
        height={'13'}
        rx={'6.5'}
        fill={'white'}
      />
      <circle cx={'7'} cy={'7'} r={'4.375'} fill={'currentColor'} />
      <rect
        x={'0.5'}
        y={'0.5'}
        width={'13'}
        height={'13'}
        rx={'6.5'}
        stroke={'currentColor'}
      />
    </>
  ),
});

export const RadioUncheckedIcon = createIcon({
  displayName: 'Radio unchecked',
  viewBox: '0 0 14 14',
  defaultProps: {
    fill: 'none',
    w: '3.5',
    h: '3.5',
    color: 'brand.500',
  },
  path: (
    <rect
      x={'0.5'}
      y={'0.5'}
      width={'13'}
      height={'13'}
      rx={'6.5'}
      stroke={'currentColor'}
    />
  ),
});
