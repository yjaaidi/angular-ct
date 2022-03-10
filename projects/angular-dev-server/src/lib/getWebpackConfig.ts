import { AngularWebpackPlugin } from "@ngtools/webpack";
import { Configuration } from "webpack";

export async function getWebpackConfig(tmpDir: string): Promise<Configuration> {
  const linkerPlugin = await import('@angular/compiler-cli/linker/babel');

  return {
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
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
          {
            test: /\.m?js$/,
            use: {
              loader: 'babel-loader',
              options: {
                plugins: [linkerPlugin.default],
                compact: false,
                cacheDirectory: true,
              }
            }
          }
        ],
      },
      resolve: {
          extensions: ['.ts', '.js'],
      },
      plugins: [
          new AngularWebpackPlugin({
              tsconfig: `${tmpDir}/tsconfig.cy.json`,
              jitMode: true
          }),
      ],
    }
}