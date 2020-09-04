# Crewhitz Client Web

## How to setup

### 1. Copy .env.example and rename to .env

```bash
ENV=
```
The environment of running project
* development
* production

```bash
API_DOMAIN_NAME=
```
The Domain name
* Development: https://api-dev.crewhitz.com
* Production: https://api.crewhitz.com

```bash
API_USER=
```
The API User Service
* Development: https://api-dev.crewhitz.com/user
* Production: https://api.crewhitz.com/user
----
The documentation
* Development: https://api-dev.crewhitz.com/user/documentation
* Production: https://api.crewhitz.com/user/documentation

```bash
API_MASTER=
```
The API master Service
* Development: https://api-dev.crewhitz.com/master
* Production: https://api.crewhitz.com/master
----
The documentation
* Development: https://api-dev.crewhitz.com/master/documentation
* Production: https://api.crewhitz.com/master/documentation

```bash
API_SERVICE=
```
The API service Service
* Development: https://api-dev.crewhitz.com/service
* Production: https://api.crewhitz.com/service
----
The documentation
* Development: https://api-dev.crewhitz.com/service/documentation
* Production: https://api.crewhitz.com/service/documentation

```bash
API_MARKET=
```
The API market Service
* Development: https://api-dev.crewhitz.com/market
* Production: https://api.crewhitz.com/market
----
The documentation
* Development: https://api-dev.crewhitz.com/market/documentation
* Production: https://api.crewhitz.com/market/documentation

```bash
API_WALLET=
```
The API wallet Service
* Development: https://api-dev.crewhitz.com/wallet
* Production: https://api.crewhitz.com/wallet
----
The documentation
* Development: https://api-dev.crewhitz.com/wallet/documentation
* Production: https://api.crewhitz.com/wallet/documentation

```bash
API_RECRUIT=
```
The API recruit Service
* Development: https://api-dev.crewhitz.com/recruit
* Production: https://api.crewhitz.com/recruit
----
The documentation
* Development: https://api-dev.crewhitz.com/recruit/documentation
* Production: https://api.crewhitz.com/recruit/documentation

```bash
API_MESSAGE=
```
The API message Service
* Development: https://api-dev.crewhitz.com/message
* Production: https://api.crewhitz.com/message
----
The documentation
* Development: https://api-dev.crewhitz.com/message/documentation
* Production: https://api.crewhitz.com/message/documentation

```bash
API_FEED=
```
The API feed Service
* Development: https://api-dev.crewhitz.com/feed
* Production: https://api.crewhitz.com/feed
----
The documentation
* Development: https://api-dev.crewhitz.com/feed/documentation
* Production: https://api.crewhitz.com/feed/documentation

```bash
SOCKET_MESSAGE=
```
The socket endpoint for message
* Development: https://api-message-dev.crewhitz.com
* Production: https://api-message.crewhitz.com

```bash
SOCKET_FEED=
```
The socket endpoint for feed
* Development: https://api-feed-dev.crewhitz.com
* Production: https://api-feed.crewhitz.com

```bash
SOCKET_USER=
```
The socket endpoint for user
* Development: https://api-user-dev.crewhitz.com
* Production: https://api-user.crewhitz.com

```bash
SOCKET_SERVICE=
```
The socket endpoint for service
* Development: https://api-service-dev.crewhitz.com
* Production: https://api-service.crewhitz.com

## How to run

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Run production build with:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```