import { ReactNode } from 'react';
import styled from 'styled-components';

const Card = ({ children }: { children: ReactNode }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

const CardWrapper = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export default Card;
