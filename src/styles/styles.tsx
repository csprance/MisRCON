import { css } from 'styled-components';

export const mediaQuerySizes: { [s: string]: number } = {
  large: 2560,
  medium: 1920,
  small: 1280
};
interface MediaTypes {
  [key: string]: any;
  large: (tString: TemplateStringsArray) => TemplateStringsArray;
  medium: (tString: TemplateStringsArray) => TemplateStringsArray;
  small: (tString: TemplateStringsArray) => TemplateStringsArray;
}
// iterate through the sizes and create a media template
export const media: MediaTypes = Object.keys(mediaQuerySizes).reduce<
  MediaTypes
>(
  (accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = mediaQuerySizes[label] / 16;
    accumulator[label] = (...args: any) => css`
      @media (max-width: ${emSize}em) {
        // @ts-ignore
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {
    large: (str: TemplateStringsArray) => str,
    medium: (str: TemplateStringsArray) => str,
    small: (str: TemplateStringsArray) => str
  }
);
