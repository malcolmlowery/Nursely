import styled from 'styled-components/native';
import { HeaderHeightContext } from '@react-navigation/elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Message = ({ route }: any) => {
   const { messageId } = route.params;

   return(
      <HeaderHeightContext.Consumer>
         {(headerHeight: any) => {
            return(
               <SafeAreaProvider style={{ flex: 1, marginBottom: headerHeight * 1.75, top: headerHeight }}>
                  <Container>
                     <Title>Message ID: {messageId}</Title>
                  </Container>
               </SafeAreaProvider>
            )
         }}
      </HeaderHeightContext.Consumer>
   )
};

export default Message;

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