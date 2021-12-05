#!/usr/bin/env bash

sudo -i

sudo yum update -y
sudo yum install docker -y
sudo usermod -aG docker ec2-user
sudo systemctl enable docker
sudo systemctl start docker

sudo yum install git -y

mkdir -p /src/my-app

cd /src/my-app


git clone https://github.com/turaneminli/phonebook-project.git

cd phonebook-project/frontend

docker build -t react_app .
docker run -e REACT_APP_API_URL=${backend_url} -p 80:80 react_app
