import styled from 'styled-components/native';

const Settings = () => {
  return(
    <Container>
      <Title>Settings</Title>
    </Container>
  )
};

export default Settings;

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