import { AngularWebpackPlugin } from "@ngtools/webpack"
import { getWebpackConfig } from "./getWebpackConfig";
import { Configuration } from 'webpack';
describe('getWebpackConfig', () => {
    it('should prepend the tmpDir to the tsconfig path and return the Webpack Configuration', async() => {
  
        // arrange
        const tmpDir = '/myTempDir/123456789/tmp'
        const expected: Configuration = {
            mode: 'development',
            module: {
              rules: [
                {
                  test: /\.[jt]sx?$/,
                  loader: '@ngtools/webpack',
                },
                {
                  test: /(\.scss|\.sass)$/,
                  use: ['raw-loader', 'sass-loader'],
                },
                {
                  test: /\.css$/,
                  loader: 'raw-loader',
                },
                {
                  test: /\.html$/,
                  loader: 'raw-loader'
                },
              ],
            },
            resolve: {
                extensions: ['.ts', '.js'],
            },
            plugins: [
                new AngularWebpackPlugin({
                    tsconfig: `${tmpDir}/tsconfig.cy.json`
                }),
            ],
        }

        // act
        const actual = await getWebpackConfig(tmpDir);

        // assert
        expect(actual).toEqual(expected);
    })
})