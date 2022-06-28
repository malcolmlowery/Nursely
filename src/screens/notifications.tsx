import styled from 'styled-components/native';

const Notifications = () => {
  return(
    <Container>
      <Title>Notifications</Title>
    </Container>
  )
};

export default Notifications;

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