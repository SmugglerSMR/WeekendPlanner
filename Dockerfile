# Set initial image to ubuntu
FROM node:8
# Author
LABEL maintainer="Smuggler"
# Updating
RUN apt update && apt install -y \
build-essential \
curl \
dialog \
git \
mc \
net-tools \
npm \
tar \
vim \
wget
# copy the app
ADD /app /app
# expose
EXPOSE 80
# Default directory
WORKDIR /app
RUN npm install
CMD [ "npm", "start" ]
