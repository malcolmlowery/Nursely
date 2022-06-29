import styled from 'styled-components/native';

const PostDetails = () => {
  return(
    <Container>
      <Title>Post Details</Title>
    </Container>
  )
};

export default PostDetails;

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