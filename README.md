# CAB432 Assignment 1 - Weekend Planner

This Assignment contain first assignment for CAB432. Submission date set to *Monday, September 17 2018* with Weight *50%* of Unit. Task is individual.

It requires to design a sophisticated mashup that draws upon a set of publicly  vailable services.

## Important Due Dates

* **Week5 - Proposal** -  - *Monday, August 27th* - Send One Page to Jacob Marks *marksj@qut.edu.au*

* **Week7 - Report Draft** -  - *Friday, September 7th* - A more progressed version of draft.

* **Week9 - Final Submission** -  - *Monday, September 17th* - Completed report, code and tests, deployment and execution instructions.

## Getting Started

Project based of Week2 and Week4 exercises. In also contain Docler commands and Latex Report. Working with Git and Latex is optional. But pain from using JavaScript - uncomparable.

## Prerequisites

### Installing on Linux 
```
sudo apt install docker.io
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
docker run --name Assignment1 -p 8000:80 -i -d -t weekends-pl
```
After just move to localhost:8000 to see folder.

Following command will upload image to DockerHub
```
docker tag 64202 smugglersmr/weekends-pl:latest
docker push smugglersmr/weekends-pl
```

Similar way to run in from DuckerHub strigh Forward.
```
docker run --name Assignment1 -p 8000:80 -i -d -t smugglersmr/weekends-pl
```

Remaining work in progrss...

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

* Farther who provided briliant ideas.
