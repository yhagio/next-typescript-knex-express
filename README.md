[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/yhagio/next-typescript-knex-express/blob/master/LICENSE)

# Typescript Next.js Express Postgres starter


### Run locally
Clone this repo


```sh
# Install dependencies
npm i # or
yarn

# then start
npm run dev
```

or with Docker / Docker-Compose
```sh
docker-compose up
```


---

To go inside the db container and check
```
docker ps
docker exec -it <container id> sh
# inside the container
psql -U dev_user -d sensei_next_dev
# inside the Postgres in the container
```
---

- [x] User Signup
- [x] User Login
- [x] User Logout
- [x] User Profile (Protected page)
- [x] Dockerized (basic) with docker-compose