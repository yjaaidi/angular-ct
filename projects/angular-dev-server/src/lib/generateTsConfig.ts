import { writeFileSync } from 'fs';
import { join } from 'path';

type SpecPattern = string | string[];

export const generateTsConfigContent = (specPattern: SpecPattern, projectRoot: string): string => {

  const getFilePath = (fileName: string): string => join(projectRoot, fileName);

  const getIncludePaths = (): string[] => {
    const d = getFilePath('src/**/*.d.ts');

    if (Array.isArray(specPattern)) {
      return [d, ...specPattern.map(sp => getFilePath(sp))]
    }

    if (typeof specPattern === 'string') {
      return [d, getFilePath(specPattern)]
    }

    return [d]
  }
  
return `
{
  "extends": "${getFilePath('tsconfig.json')}",
  "compilerOptions": {
    "outDir": "${getFilePath('out-tsc/cy')}",
    "types": ["${getFilePath('node_modules/cypress')}"],
    "allowSyntheticDefaultImports": true
  },
  "include": [${getIncludePaths().map(x => `"${x}"`)}]
}
`
}

export const generateTsConfig = (specPattern: SpecPattern, projectRoot: string, tempDir: string): void => {
  const tsconfigContent = generateTsConfigContent(specPattern, projectRoot);
  writeFileSync(`${tempDir}/tsconfig.cy.json`, tsconfigContent);
}