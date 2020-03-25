FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

RUN npm install yarn

COPY package*.json ./
RUN yarn install --frozen-lockfile --ignore-scripts && yarn cache clean

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
