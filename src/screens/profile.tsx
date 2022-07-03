import styled from 'styled-components/native';
import { HeaderHeightContext } from '@react-navigation/elements';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Profile = () => {
   return(
      <HeaderHeightContext.Consumer>
         {(headerHeight: any) => {
            return(
               <SafeAreaView>
                  <Container style={{ paddingTop: headerHeight }}>
                     <ScrollView>
                        <Header>
                           <BannerImage source={{ uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/11/10/1005/Hyatt-Centric-Las-Olas-Fort-Lauderdale-P038-Dusk-Hotel.jpg/Hyatt-Centric-Las-Olas-Fort-Lauderdale-P038-Dusk-Hotel.16x9.jpg?imwidth=1920' }} />
                           <ProfileImage style={{ top: headerHeight - 52 }} source={{ uri: 'https://avatars.githubusercontent.com/u/100153203?v=4' }} />
                        </Header>
                        <Content>
                           <Text style={{ color: '#131313', fontSize: 24, fontWeight: '600' }}>Malcolm Lowery</Text>
                           <ActionButtonContainer>
                              <Button>
                                 <Ionicons name='person-add' size={24} color='#fff' /> 
                              </Button>
                              <Button>
                              <Ionicons name='mail' size={24} color='#fff' /> 
                              </Button>
                           </ActionButtonContainer>
                        </Content>
                     </ScrollView>
                  </Container>
               </SafeAreaView>
            )
         }}
      </HeaderHeightContext.Consumer>
   )
};

export default Profile;

const Container = styled.View`
   align-items: center;
   flex: 1;
`;

const Text = styled.Text``;

const ScrollView = styled.ScrollView`
   overflow: visible;
   width: 100%;
`;

const Header = styled.View`
   height: 232px;
`;

const BannerImage = styled.Image`
   height: 170px;
   background-color: #e2e2e2;
`;

const ProfileImage = styled.Image`
   align-self: center;
   background-color: #e2e2e2;
   border-width: 3px;
   border-color: #fff;
   border-radius: 52px;
   height: 104px;
   width: 104px;
`;

const Content = styled.View`
   align-items: center;
`;

const ActionButtonContainer = styled.View`
   flex-direction: row;
   justify-content: center;
   margin-top: 16px;
   width: 100%;
`;

const Button = styled.TouchableOpacity`
   align-items: center;
   background-color: #5F5BFF;
   border-radius: 25px;
   height: 50px;
   justify-content: center;
   margin-left: 10px;
   margin-right: 10px;
   width: 50px;
`;