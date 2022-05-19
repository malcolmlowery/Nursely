import styled from 'styled-components/native';

const App = () => {
  return (
    <Container>
      <Title>Nursely App</Title>
    </Container>
  )
};

export default App;

const Container = styled.View`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 19px;
`;