import styled from 'styled-components';

const TextErrorWrapper = styled.div`
  color: ${({ theme }: { theme: any }) => theme.errorOutputColor};
`;

export default TextErrorWrapper;
