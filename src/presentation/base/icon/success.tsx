import {createIcon} from '@chakra-ui/icon';

export const SuccessIcon = createIcon({
  displayName: 'Success',
  viewBox: '0 0 20 20',
  defaultProps: {fill: 'none', color: '#38A169'},
  path: (
    <path
      d={
        'M9.99984 18.6471C5.39734 18.6471 1.6665 14.9163 1.6665 10.3138C1.6665 5.7113 5.39734 1.98047 9.99984 1.98047C14.6023 1.98047 18.3332 5.7113 18.3332 10.3138C18.3332 14.9163 14.6023 18.6471 9.99984 18.6471ZM9.169 13.6471L15.0607 7.75464L13.8823 6.5763L9.169 11.2905L6.8115 8.93297L5.63317 10.1113L9.169 13.6471Z'
      }
      fill={'currentColor'}
    />
  ),
});
