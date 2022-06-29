import { useState } from 'react';
import styled from 'styled-components/native';
import PostCard from '../components/PostCard';

// User posts placeholder data
import fakeData from '../data/fakeData.json';

const Newsfeed = ({ navigation }) => {

  return(
      <ScrollView>
        <Container>
            { fakeData.response.map((post, index) => {
              return(
                <PostCard 
                  key={index}
                  profileImage={post.profileImage}
                  firstName={post.firstName}
                  lastName={post.lastName}
                  middleIntial={post.middleIntial}
                  specializtion={post.specializtion}
                  description={post.description}
                  numberOfComments={post.numberOfComments}
                  numberOfLikes={post.numberOfLikes}
                  postLiked={post.postLiked}
                  navigateToUserProfile={() => navigation.push('profile')}
                  navigateToPostDetails={() => navigation.push('post-details')}
                  navigateToComments={() => navigation.push('post-details')}
                  handleLikePost={() => {}}
                  handleCommentOnPost={() => {}}
                />
              )
            })}
        </Container>
      </ScrollView>
  )
};

export default Newsfeed;

const ScrollView = styled.ScrollView`
	background-color: #f8f8f8;
	padding-top: 14px;
`;

const Container = styled.View`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;