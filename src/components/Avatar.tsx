import styled from 'styled-components/native';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large'
  uri?: string
  top?: number
  bottom?: number
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
  uri = 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg', 
  top = 0,
  bottom = 0,
}: AvatarProps) => {
  return(
    <Container bottom={bottom} size={size} top={top}>
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
`;

const Img = styled.Image<AvatarProps>`
  border-radius: ${({ size }) => handleAvatarSize(size)}px;
  flex: 1;
`;