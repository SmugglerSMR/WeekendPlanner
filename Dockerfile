# Set initial image to ubuntu
FROM ubuntu
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
python \
python-dev \
python-setuptools \
python-distribute \
python-pip \
python-numpy \
python-scipy \
tar \
vim \
wget
# pip installation
RUN pip install flask
RUN pip install cherrypy
RUN pip install -U nltk
# copy the app
ADD /app /app
# expose
EXPOSE 80
# Default directory
WORKDIR /app
CMD python server.py
