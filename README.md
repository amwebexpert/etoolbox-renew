<!--
  ⚠️ WORK IN PROGRESS ⚠️
  
  This repository is a complete redesign/rewrite of the original etoolbox application
  using Ant Design (AntD) as the main UI component library.
  
  Original project: https://github.com/amwebexpert/etoolbox
  
  Build Status:
  - TypeScript: 5.9
  - React: 19.x
  - Ant Design: 5.x
  - Vite: 6.x
  
  WARNING: This is an active development branch. Features may be incomplete,
  unstable, or subject to significant changes. Do not use in production.
-->

> [!WARNING]
> 🚧 **Work In Progress** 🚧
> 
> This is a complete re-write of the [original etoolbox](https://github.com/amwebexpert/etoolbox) application using **Ant Design**.
> Features may be incomplete or unstable. Not ready for production use.

# Web Toolbox

Open source collection of web developer utilities.

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green.svg?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18.svg?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Yarn](https://img.shields.io/badge/Yarn-1.22+-2C8EBB.svg?style=flat-square&logo=yarn)](https://yarnpkg.com/)

<div align="center">
  <img src="public/icon-512x512.png" width="100" alt="Web Toolbox" />
  <div>Icon made by: <a href="https://therealjerrylow.com/">Jerry Low</a></div>
  <div>Like the project? Don't forget to give it a ⭐️!</div>
</div>

## Features

Some screen captures of the implemented features...

| JSON format                                                 | File encoder                                               | RegEx tester                                              | Imaging OCR                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| <img src="public/screen-captures/JSONFormatter-demo.gif" /> | <img src="public/screen-captures/ImageEncoder-demo.gif" /> | <img src="public/screen-captures/RegexTester-demo.gif" /> | <img src="public/screen-captures/ImageOCR-demo.gif" /> |

## Online demo

The web application has been deployed and you can use it [JUST HERE!](https://amwebexpert.github.io/etoolbox)

## Development commands

| Script                     | Description                                                                             |
|----------------------------|-----------------------------------------------------------------------------------------|
| `yarn start`               | Alias for `yarn dev` - starts the development server                                    |
| `yarn dev`                 | Starts Vite development server with hot reload                                          |
| `yarn build`               | Builds the production application (cleans dist, generates version, compiles TypeScript) |
| `yarn preview`             | Previews the production build locally                                                   |
| `yarn test`                | Runs tests with Vitest                                                                  |
| `yarn lint`                | Runs ESLint on the codebase                                                             |
| `yarn typecheck`           | Runs TypeScript type checking without emitting files                                    |
| `yarn format`              | Formats code with Prettier                                                              |
| `yarn format:check`        | Checks code formatting without making changes                                           |
| `yarn clean:node`          | Removes `node_modules` and `yarn.lock` for a fresh install                              |
| `yarn deploy`              | Deploys the application using the deploy script                                         |
| `yarn generate:version`    | Generates version information file                                                      |
| `yarn generate:api:client` | Generates API client from OpenAPI specification                                         |
| `yarn copy:wasm`           | Copies WASM files (tree-sitter) to public folder                                        |
| `yarn postinstall`         | Runs after install: applies patches and copies WASM files                               |

## Roadmap (of next features)

- Excel File reader
- Text diff tooling
- Image compressor
- Mardown viewer
- DataURI scheme viewer (Base64 raw data)
  - Like this website: [Data URL to image](https://base64.guru/tools/data-url-to-image)
- Add list of all official HTTP Server codes (REST)
- Markdown utilities, like [table formatter](https://tabletomarkdown.com/format-markdown-table/)
- Suggests something or add your pull request!

## License

This project is licensed under the MIT license. For more information see [`LICENSE`](./LICENSE) file.

## Project coding guidelines

Adhering to established coding guidelines is essential for developing efficient, maintainable, and scalable software. These guidelines promote consistency across codebases, making it easier for teams to collaborate and for new developers to understand existing code. By following standardized patterns, such as those outlined in the [Coding guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md), developers can reduce errors and enhance code readability.

- [Coding guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md)
