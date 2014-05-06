FROM	ubuntu


#Install some packages we need
RUN		apt-get install -y python-software-properties python g++ make software-properties-common

#Add node repository to sources.list and update apt
RUN		add-apt-repository ppa:chris-lea/node.js && apt-get update

#Install node.js
RUN		apt-get -y install nodejs


ADD . /src


# Install app dependencies
RUN cd /src/server; npm install

RUN npm install nodemon


EXPOSE 3000

CMD ["nodemon", "/src/server/server.js"]
