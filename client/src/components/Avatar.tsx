import styled from 'styled-components/native';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large'
  uri?: string
  top?: number
  left?: number
  right?: number
  bottom?: number
  positon?: 'absolute' | 'relative'
}

const handleAvatarSize = (size: any) => {
  switch(size) {
    case 'small': return 35
    case 'medium': return 40
    case 'large': return 45
    default: return 35
  }
}

const Avatar = ({ 
  size = 'medium', 
  uri='https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg', 
  top=0,
  bottom=0,
  left=0,
  right=0,
  positon='relative',
}: AvatarProps) => {
  return(
    <Container 
      size={size} 
      top={top} 
      bottom={bottom} 
      left={left}
      right={right}
      positon={positon}
    >
      <Img source={{ uri }} />
    </Container>
  )
}

export default Avatar;

const Container = styled.View<AvatarProps>`
  height: ${({ size }) => handleAvatarSize(size)}px;
  width: ${({ size }) => handleAvatarSize(size)}px;
  top: ${({ top }) => top}px;
  bottom: ${({ bottom }) => bottom}px;
  left: ${({ left }) => left}px;
  right: ${({ right }) => right}px;
  position: ${({ positon }) => positon};
`;

const Img = styled.Image<AvatarProps>`
  border-radius: ${({ size }) => handleAvatarSize(size)}px;
  flex: 1;
`;