FROM centos:7 
MAINTAINER Wyatt Pearsall<Wyatt.Pearsall@cfpb.gov>

# Install Nginx YUM Repo
#RUN yum update -y && \
#    yum install -y gcc-c++ make && \
#    printf "[nginx]\nname=nginx repo\nbaseurl=https://nginx.org/packages/centos/7/x86_64/\ngpgcheck=0\nenabled=1" > /etc/yum.repos.d/nginx.repo

# Install NodeJS YUM Repo
#RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

#RUN yum update -y && \
#    yum install -y nginx nodejs npm

RUN yum update -y && \
    yum install -y epel-release && \
    yum update -y && \
    yum install -y nginx nodejs npm 

WORKDIR /usr/src/app
COPY . /usr/src/app
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN chown -R root /usr/src/app && chmod u+rwx /usr/src/app

RUN npm cache clean && \
    npm install && \
    npm run clean && \
    npm run build

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
