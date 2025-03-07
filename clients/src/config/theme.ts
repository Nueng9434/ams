import { FontName } from '@/utils/fonts';

interface ThemeConfig {
  font: FontName;
}

const themeConfig: ThemeConfig = {
  // Change this value to use a different font throughout the project
  // Available options: 'Inter' | 'Kanit' | 'Prompt' | 'Roboto' | 'Sarabun'
  font: 'Prompt'
};

export default themeConfig;
