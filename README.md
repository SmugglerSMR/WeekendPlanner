# Weekend Planner - QUT University Assignment

## Getting Started

Project based on Uni exercises exercises. In also contain Docker commands and Latex Report. Working with Git and Latex is optional. But pain from using JavaScript - uncomparable.

Taking my words back. That was painful, but an experiance.

## Prerequisites

### Installing on Linux 
```
sudo apt-get update
sudo apt install docker.io
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce
```
OR using one web sh script
```
sudo apt update
sudo curl -fsSL https://get.docker.com | sh
```
### Installing on Mac
Download from following websites and go through Getting Started.
```
https://store.docker.com/editions/community/docker-ce-desktop-mac
https://docs.docker.com/docker-for-mac/
```
## Deployment
With DocvkerFile in folder run following command to build image.
```
docker build -t weekends-pl .
```
Next, run docker in order to acess it.
Flags specify certain parameters: -p Port iner&outer. -d run as damonise.
```
docker run --name Assignment1 -p 8000:3000 -i -d -t weekends-pl
```
After just move to localhost:8000 to see folder.

Following command will upload image to DockerHub
```
docker tag weekends-pl smugglersmr/weekends-pl:latest
docker push smugglersmr/weekends-pl
```

Similar way to run in from DuckerHub strigh Forward.
```
docker login --username=smugglersmr --email=123@mail.ru
sudo docker run --name Assignment1 -p 8000:3000 -i -d -t smugglersmr/weekends-pl
```

## Connecting.
Now, docker have to appear as daemon.
Check it on following adress:
```
127.0.0.1:8000
```
or
```
sudo docker exec -it  Assignment1 /bin/bash
```

## Removing
Container after start
```
docker stop Assignment1
docker rm Assignment1
```
Image after stopping everything
```
docker rmi weekends-pl
```
## Running Node Project:
Optional reinitialise project.
(optional) If we want to start project from the start
```
 (optional) npm init
```
Perform dependencies reinstalation
```
npm install
```

Run scripts (app.js):
```
npm start
```
Server is expected to be listed in: <localhost> : <3000>

Run Test scripts (test.js):
```
npm test
```

## Built With

* [DockerHub](https://hub.docker.com/) - Official Docker Hub
* [GitHub](https://github.com/SmugglerSMR/CAB432-assgn1) - Storage Location for repository
* [Latex](https://www.latex-project.org/get/) - Report written using Latex

## Contributing

Please read [CONTRIBUTING.md](https://github.com/) too see how many my OS's girls participated in writing.

## Authors

* **Matt Sadykov** - *Developer* - [Email](marat.sadykov@connect.qut.edu.au)

## License

This project is licensed under the Eclipse License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Farther who provided brilliant ideas and some additional scripts.
