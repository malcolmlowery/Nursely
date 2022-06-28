// This component needs to be refactored
import { TextComponent } from 'react-native';
import { ColorsI } from '../types/Colors.interface';

interface TypographyProps {
  fontType?: 'title' | 'text' | 'subtitle'
  fontWeight?: 'heavy' |'bold' | 'semibold' | 'normal' | 'light'
  color?: ColorsI
  children?: any
}

const handleFontType = ({ fontType, fontWeight, color }: TypographyProps) => {
  switch(fontType) {
    case 'title': return 'fontSize: 28px'
    case 'text': return 'fontSize: 12px'
    case 'subtitle': return 'fontSize: 11px'
    default: return 'fontSize: 12px'
  }
}

const Text = ({ fontType, children }: TypographyProps) => {
  return(
    <TextComponent style={{ fontSize: handleFontType(fontType) }}>{children}</TextComponent>
  )
}

export default Text;