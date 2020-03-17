#
# * Project: generic-node-dashboard
# * File: Dockerfile
# * Author: Emil Nilsson
# * Contact: emil.nilsson@nutanix.com
#

FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]