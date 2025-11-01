import {createIcon} from '@chakra-ui/icon';

/**
 * https://www.figma.com/file/T4sPmR1bDjemGLB4uVqDHY/Heroicons-(Community)?type=design&node-id=8-3823&t=0mOTYgx9aucwoJ2q-0
 */
export const FolderIcon = createIcon({
  displayName: 'Folder',
  viewBox: '0 0 16 17',
  defaultProps: {
    fill: 'none',
    width: '16px',
    height: '17px',
    color: 'gray.700',
  },
  path: (
    <>
      <path
        d={
          'M2.99998 2.8999C2.22678 2.8999 1.59998 3.5267 1.59998 4.2999V6.90863C2.0041 6.6499 2.48452 6.4999 2.99998 6.4999H13C13.5154 6.4999 13.9959 6.6499 14.4 6.90863V5.8999C14.4 5.1267 13.7732 4.4999 13 4.4999H9.13135C9.0783 4.4999 9.02743 4.47883 8.98992 4.44132L7.85855 3.30995C7.596 3.0474 7.23991 2.8999 6.8686 2.8999H2.99998Z'
        }
        fill={'currentColor'}
      />
      <path
        d={
          'M2.99998 7.6999C2.22678 7.6999 1.59998 8.3267 1.59998 9.0999V12.6999C1.59998 13.4731 2.22678 14.0999 2.99998 14.0999H13C13.7732 14.0999 14.4 13.4731 14.4 12.6999V9.0999C14.4 8.3267 13.7732 7.6999 13 7.6999H2.99998Z'
        }
        fill={'currentColor'}
      />
    </>
  ),
});
