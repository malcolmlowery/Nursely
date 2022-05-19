import { registerRootComponent } from 'expo';
import styled from 'styled-components/native';

const App = () => {
  return (
    <Container>
      <Title>Nursely App</Title>
    </Container>
  )
};

const Container = styled.View`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 19px;
  font-weight: 600;
`;

registerRootComponent(App)