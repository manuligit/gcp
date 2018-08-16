-Add done daily tasks into the done list, and reset the list every day/week/month depending

-or maybe done_d done_w done_m and reset dones every day/week/month and add them to the normal done list
-also permanent done list for "do once-lists"




task:
-name
-description
-mats (if any)
-repeat (daily, montly, weekly, once)
-link (if any)
-timestamp when task was added

-journey drop duration showing in the ui?

-tabit ylös repeatin mukaan (+ done)

-done-tabiin mahdoitus tehdä taski uusiksi

# electron-webpack-quick-start
> A bare minimum project structure to get started developing with [`electron-webpack`](https://github.com/electron-userland/electron-webpack).

Thanks to the power of `electron-webpack` this template comes packed with...

* Use of [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) for development
* HMR for both `renderer` and `main` processes
* Use of [`babel-preset-env`](https://github.com/babel/babel-preset-env) that is automatically configured based on your `electron` version
* Use of [`electron-builder`](https://github.com/electron-userland/electron-builder) to package and build a distributable electron application

Make sure to check out [`electron-webpack`'s documentation](https://webpack.electron.build/) for more details.

## Getting Started
Simply clone down this reposity, install dependencies, and get started on your application.

The use of the [yarn](https://yarnpkg.com/) package manager is **strongly** recommended, as opposed to using `npm`.

```bash
# create a directory of your choice, and copy template using curl
mkdir new-electron-webpack-project && cd new-electron-webpack-project
curl -fsSL https://github.com/electron-userland/electron-webpack-quick-start/archive/master.tar.gz | tar -xz --strip-components 1

# or copy template using git clone
git clone https://github.com/electron-userland/electron-webpack-quick-start.git
cd electron-webpack-quick-start
rm -rf .git

# install dependencies
yarn
```

### Development Scripts

```bash
# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```
