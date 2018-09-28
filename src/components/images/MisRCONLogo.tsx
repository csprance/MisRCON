import * as React from 'react';

import green from '@material-ui/core/colors/green';

type Props = {
  width?: number;
  color?: string;
  height?: number;
};
type State = {};
class MisRCONLogo extends React.Component<Props, State> {
  public static defaultProps = {
    width: 225,
    height: 225,
    color: green[500]
  };
  public state = {};

  public render() {
    const { width, color, height } = this.props;
    return (
      <svg
        xmlns={'http://www.w3.org/2000/svg'}
        viewBox={'0 0 553 491'}
        width={width}
        height={height}
        fill={color}
      >
        <path
          d={`M226 112.3c-26.8 10.1-51.4 18.9-75.5 28.8-7.9 3.2-12.1 2.7-14.9-5.6-.9-2.6-3.1-4.8-4.6-7.1-1.8 2.4-5.5 5-5.2 7.1 2.1 16.3-9.9 21.3-20.6
          28.5-21.1 14.2-41.9 28.9-62.1 44.2C31.6 216.9 22 228 25 244.1c1.5 7.8 3.7 17.4 9.1 22 24.6 21 50 41.3 76.3 60.2 10.3 7.4 15.4 14.3 15.1
          27.3-.8 38.2-.8 76.4 0 114.6.3 13.9-4.6 17.9-18 17.4-27.3-.9-54.7-.8-82 0-12.1.3-15.2-4.2-15.1-15.6.3-148.5.3-297.1 0-445.6 0-10.7
          2.9-15.1 14.4-15 53.7.5 107.5.3 161.3.1 7.9 0 13.9 1.4 16.1 10.1 7.9 31.5 16.1 62.9 23.8 92.7zM329.6 114.9c4.7-20.2 9.2-39.7 13.7-59.1
          2.3-10.1 4.3-20.3 7.2-30.3 2.7-9.3 6.8-16.2 19.3-16.1 54.2.6 108.4.4 162.6.1 9.7-.1 13.3 3.2 13.3 13.1-.2 149.9-.2 299.8 0 449.8 0 9.8-3.5
          13.3-13.2 13.1-29.2-.4-58.5-.5-87.7 0-10.8.2-13.9-4.3-13.8-14.3.3-40.5-.4-81.1.6-121.6.2-6.6 5.5-14.8 10.9-19.1 23.6-18.6 48.6-35.5
          72.2-54.1 22.5-17.8 24.3-45.4 2.4-63.9-22.9-19.4-47.9-36.5-73.1-52.8-8.7-5.6-13.5-10.2-13.2-20.5.1-3.4-3-6.9-4.7-10.3-1.7 2.5-3.4 5.1-5.2
          7.6-7.3 10.3-15.1 2.6-22.3.1-16-5.4-31.7-11.9-47.6-17.4-5.8-2-12-2.5-21.4-4.3z`}
        />
        <path
          d={`M237 156.9c4.2 16.1 9 30.8 11.6 45.9.9 5.2-2.4 11.8-5.3 16.8-14.6 25.6-6.9 50.9 19.6 63.4 3.3 1.5 7.8 3.1 9.1 5.9 4.5 9.8 7.1 10.1
            11.9.1 1.6-3.3 7.7-4.9 12-6.5 26.6-10 29.8-47.8 16.5-65.9-3.9-5.4-5.1-14.6-4-21.5 2-13.2 6.4-26.1 9.8-39.2 39.4 15.3 62.5 59.7 55.1
            104.4-7.9 48-47.6 76-78.3 79-52.1 5.1-99.6-24.8-110.2-66-12.5-48.4 8.8-95.9 52.2-116.4zM199.5 368.9c23.4 3.4 45.1 8.9 66.8 9.1 24.6.3
            49.4-3.3 73.8-6.9 18.1-2.6 19.4-2.5 14.9 15.3-7.1 28.6-15 57.1-21.8 85.8-2.3 9.6-6.8 13.3-16.5 13.2-26.4-.3-52.8-.3-79.2
            0-8.7.1-13.3-2.8-15.5-12.1-7.4-31-16-61.8-23.8-92.7-.8-3.3.8-7.3 1.3-11.7z`}
        />
      </svg>
    );
  }
}

export default MisRCONLogo;
