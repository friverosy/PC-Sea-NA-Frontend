# Universal Web Platform


## Structure

```
├── ./e2e                                     - end to end tests
└── ./src
    ├── ./src/app                             -  Application root module
    │   ├── ./src/app/admin                   -  Admin section module (admins will be redirected here after login sucessfully)
    │   │   └── ./src/app/admin/list-users    -  List users component to list and manage platform users
    │   ├── ./src/app/home                    -  Home section module (users and supervisors will be redirected here after login sucessfully)
    │   │   └── ./src/app/home/registers      -  Registers component (holds metrtics and plots)
    │   ├── ./src/app/login                   -  Login component to handle login page
    │   └── ./src/app/shared                  -  Shared module which contains a bunch of components & providers used widely in the application
    │       ├── ./src/app/shared/auth         -  Auth service which contains auth related logic
    │       ├── ./src/app/shared/left-sidebar -  Application left-side component 
    │       ├── ./src/app/shared/socket       -  Socket service for socket.io handling
    │       ├── ./src/app/shared/top-header   -  Application top-header component 
    │       ├── ./src/app/shared/user         -  User service (User API mapping)
    │       └── ./src/app/shared/utils        -  Several utilities
    ├── ./src/assets                          -  App assets not mantained by NPM
    └── ./src/environments                    -  Environment related configurations (i.e: API_URL) 
```

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [nvm](https://github.com/creationix/nvm) (highly recomended)
- [Node.js and npm](nodejs.org) node lts/boron (`nvm install lts/boron`)
- [angular-cli](https://github.com/angular/angular-cli) (`npm install -g @angular/cli`)

### Installation for development

1. Run `npm install` to install server dependencies.
3. Run `ng serve -aot` in order to build and start a server which host static content.

## Building for production

1. Run `ng build --prod` for building. Production ready static files will be stored under `./dist` directory

## Testing

- Static code analysis: `ng lint`
- Run tests (w/ code coverage): `ng test --code-coverage`

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
