## Prepare Environment Variables (Required)

1. Change the name of `/server/.env.example` to `.env` by running `mv server/.env.example server/.env`and edit the `NODE_ENV` and/or `PORT` if you wish. (No changes necessary for simple local testing.)

1. Change the name `/app/.env.example` to `.env` and edit the `HOST` and/or `PORT` if you wish. (No changes necessary for simple local testing.)

## Run in Docker (Option 1)

1. Install **Docker** on your host machine.

[ https://docs.docker.com/get-docker/ ]

2. In a PowerShell/terminal, `cd` to the project root directory (where `docker-compose.yml` is) and run :

`docker-compose up --build`

3. The `docker-compose` will spin up the `backend` server, followed by the `frontend` server.

4. Wait until the `frontend` portion of the `docker-compose` completes. The final message displayed in PowerShell/terminal should be:

```bash
frontend_1  |   App running at:
frontend_1  |   - Local:   http://localhost:8080/
frontend_1  |
frontend_1  |   It seems you are running Vue CLI inside a container.
frontend_1  |   Access the dev server via http://localhost:<your container's external mapped port>/
frontend_1  |
frontend_1  |   Note that the development build is not optimized.
frontend_1  |   To create a production build, run npm run build.
```

5. Once the above message is displayed, navigate to `localhost:8080` in a web browser on your host machine.

### Shut Down
In a new PowerShell/terminal, navigate to the project root directory (where `docker-compose.yml` is) and run:
`docker-compose down`

## Set up for Local Development (Option 2)

### Install dependancies

1. In a PowerShell/terminal, `cd` to `/server/` and run `npm install` to install the backend dependancies.

1. In a PowerShell/terminal, `cd` to `/app/` and run `npm install` to install the frontend dependancies.

### Run the app

1. **Backend:** `cd` to `/server/` and run `node index.js`.

1. **Frontend:** `cd` to `/app/` and run `npm run dev`.
