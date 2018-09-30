FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# App binds to port 3031 so  use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 3031
CMD [ "npm", "start" ]

# Next
# build: docker build -t <your-image-name>
# run:  docker run -p 3031:3031 -d <your-image-name> // The -p flag redirects a host port to a guest port inside the container.