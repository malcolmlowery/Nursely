import styled from 'styled-components/native';
import { HeaderHeightContext } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useLayoutEffect } from 'react';

const Profile = ({ navigation }: any) => {

   useLayoutEffect(() => {
      navigation.setOptions({
         title: 'Malcolm Lowery'
      });
   }, []);

   return(
      <HeaderHeightContext.Consumer>
         {(headerHeight: any) => {
            return(
               <SafeAreaView style={{ flex: 1 , top: headerHeight }}>
                  <Container>
                     <ScrollView>
                        <Header>
                           <BannerImage source={{ uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/11/10/1005/Hyatt-Centric-Las-Olas-Fort-Lauderdale-P038-Dusk-Hotel.jpg/Hyatt-Centric-Las-Olas-Fort-Lauderdale-P038-Dusk-Hotel.16x9.jpg?imwidth=1920' }} />
                           <ProfileImage style={{ top: -headerHeight + 40 }} source={{ uri: 'https://avatars.githubusercontent.com/u/100153203?v=4' }} />
                        </Header>
                        <Content>
                           <ActionButtonContainer>
                              <Button>
                                 <Ionicons name='person-add' size={20} color='#fff' /> 
                              </Button>
                              <Button>
                                 <Ionicons name='mail' size={20} color='#fff' /> 
                              </Button>
                           </ActionButtonContainer>
                           <AboutSection>
                              <TextIconItem>
                                 <Ionicons name='home' color='#131313' size={20} />
                                 <Text style={{fontSize: 12, fontWeight: '600', marginLeft: 6 }}>Lives in Lighthouse Point, FL</Text>
                              </TextIconItem>
                              <TextIconItem>
                                 <Ionicons name='briefcase' color='#131313' size={20} />
                                 <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 6 }}>Works at Delray Medical Center</Text>
                              </TextIconItem>
                              <TextIconItem>
                                 <Ionicons name='business' color='#131313' size={20} />
                                 <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 6 }}>Departments: ICU, Neurology, Gynecology</Text>
                              </TextIconItem>
                           </AboutSection>
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

const Text = styled.Text`
   color: #131313;
`;

const ScrollView = styled.ScrollView`
   overflow: visible;
   width: 100%;
`;

const Header = styled.View`
   height: 180px;
`;

const BannerImage = styled.Image`
   height: 120px;
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
   margin-top: 8px;
   width: 100%;
`;

const Button = styled.TouchableOpacity`
   box-shadow: 0px 6px 6px rgba(0,0,0,0.15);
   align-items: center;
   background-color: #5F5BFF;
   border-radius: 22px;
   height: 32px;
   justify-content: center;
   margin-left: 10px;
   margin-right: 10px;
   width: 120px;
`;

const AboutSection = styled.View`
   margin-top: 20px;
   padding-left: 16px;
   padding-right: 16px;
   width: 100%;
`;

const TextIconItem = styled.View`
   align-items: center;
   flex-direction: row;
   margin-bottom: 8px;
`;