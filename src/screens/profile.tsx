import styled from 'styled-components/native';

const Profile = () => {
  return(
    <Container>
      <Title>Profile</Title>
    </Container>
  )
};

export default Profile;

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