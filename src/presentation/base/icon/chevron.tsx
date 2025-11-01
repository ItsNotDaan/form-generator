import {createIcon} from '@chakra-ui/icon';

export const ChevronUpIcon = createIcon({
  viewBox: '0 0 16 16',
  defaultProps: {fill: 'none', w: '4', h: '4', color: 'gray.700'},
  path: (
    <path
      d={'M3 10.5L8 5.5L13 10.5'}
      stroke={'currentColor'}
      strokeWidth={'1.5'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
  ),
});

export const ChevronDownIcon = createIcon({
  viewBox: '0 0 20 20',
  defaultProps: {fill: 'none', w: '5', h: '6', color: 'gray.700'},
  path: (
    <path
      fillRule={'evenodd'}
      clipRule={'evenodd'}
      d={
        'M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z'
      }
      fill={'currentColor'}
    />
  ),
});
