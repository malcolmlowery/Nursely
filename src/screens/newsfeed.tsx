import styled from 'styled-components/native';
import PostCard from '../components/PostCard';

const Newsfeed = () => {
  return(
      <ScrollView>
        <Container>
            <PostCard 
              profileImage='https://www.safetyandhealthmagazine.com/ext/resources/images/news/healthcare/female-nurse.jpg?1494948091'
              firstName='Malani'
              lastName='Lowery'
              middleIntial='K'
              specializtion='oncology'
              description="The report, which will form part of the BMA's submission to the UK Covid-19 Public Inquiry, included anecdotal evidence from healthcare workers, who described shortages of personal protective equipment (PPE), lack of testing capacity and low staffing levels which left them unprotected and at risk of exposure to Covid-19."
              numberOfComments={20}
              numberOfLikes={3}
              postLiked={false}
            />
        </Container>
      </ScrollView>
  )
};

export default Newsfeed;

const ScrollView = styled.ScrollView`
	background-color: #f8f8f8;
	padding-top: 10px;
`;

const Container = styled.View`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;