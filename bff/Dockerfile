FROM node:20-slim

# RUN mkdir /home/node/app && chown node:node /home/node/app

WORKDIR /home/node/app

USER root

# COPY --chown=node:node package.json package-lock.json* ./

# RUN npm install

# COPY --chown=node:node . .

# COPY package.json /home/node/app

# COPY . /home/node/app

# RUN chown -R node /home/node/app/node_modules


CMD [ "tail", "-f", "/dev/null"	]