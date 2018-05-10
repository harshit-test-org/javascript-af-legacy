# Javascript.af
 
[![Build Status](https://travis-ci.org/JesseRWeigel/javascript-af.svg?branch=master)](https://travis-ci.org/JesseRWeigel/javascript-af)
[![Coverage Status](https://coveralls.io/repos/github/JesseRWeigel/javascript-af/badge.svg?branch=master)](https://coveralls.io/github/JesseRWeigel/javascript-af?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
 
Javascript af is a platform for developers to share their great work. 
 
## Team
[Jesse R Weigel](https://github.com/JesseRWeigel) (Founder / Project Manager),
 
[Jvscrpt.r](https://github.com/jvscrptr) (Co-Founder / Frontend Dev),
 
[pantharshit00](https://github.com/pantharshit00) (Co-Founder / Fullstack Dev)
 
[Nicky Meuleman](https://github.com/NickyMeuleman) (Fullstack Dev)


# Docs

## Getting started

This repository uses the monorepo method to mange several part of the application. You need [yarn](https://yarnpkg.com) installed as it manages the monorepo structure. Nothing else special needed.

1. Fork and Clone the repo
    ```sh
    git clone https://github.com/<YOUR USERNAME>/javascript-af
    cd javascript-af
    ```

2. Install all of the dependencies

    __Note__: Windows user are required to download build tools to compile native node modules. Run this command in __powershell__, it will error out in others
      ```sh
      npm --add-python-to-path install --global windows-build-tools
      ```
    Now proceed to install the dependencies. You need to run __yarn__ on the root the the project.     
    ```sh
    $ ~/projects/javascript-af> yarn
    ```

    Do the exact same step as this is a monorepo

4. Replace env files and add keys

    Rename `.env` file on backend and frontend folders. Remove `.example` on each of the file. DO NOT DELETE any of them. You will not able to work if you do so. Then enter the required information

    There are these env files :

    ```sh
      javascript-af/
      ├── backend        
      ├    └──.env  # Contains server side use credentials      
      └── frontend 
          ├──.env.js # Contains development frontend credentials
          └──.env.prod.js # Contains production frontend credentials
    ```
    PS: You do need to change anything in `.env.prod.js` during development as it is not used. But the file should exist.

    Additional info that may be required wile filling the env file:
        
        1. You need to have mongodb installed or have a cloud hosted one on mlab or mongodb atlas
        2. You need to have github application credentials that can be easily obtained from your github settings
        3. You need to have some algolia credentials so that search can function

    All of these are free or have a good community service account.     

4. Boot up the development server
   
   Run the following command on the project root
   ```sh
   yarn dev
   ```

5. Access the site and other tools

      After running `yarn dev` you can access the local development server on http://localhost:3000 . You can access graphiql at http://localhost:8080/api/graphiql if you are working on the server. These URL are also been printed on the console for your convenience.

## License

GPL v3, see the [LICENSE](./LICENSE) file.
