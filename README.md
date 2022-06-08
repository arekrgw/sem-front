## Configuration

.env.production file:

```bash
REACT_APP_API_URL=http://vps-8f870bb8.vps.ovh.net/api
REACT_APP_SOCKETS_SERVER=http://vps-8f870bb8.vps.ovh.net
REACT_APP_SOCKETS_PATH=/api/socket.io
REACT_APP_GOOGLE_ID=10146193jp3llo2l8ccemdqnugaql9pr1etnv0.apps.googleusercontent.com
```

Adjust paths and then:

```
yarn
yarn build

to start locally: yarn start:dev
to start for production: yarn start

```