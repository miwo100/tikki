#!/bin/bash

# IPv4 fix
if [ ! -f /etc/apt/apt.conf.d/99force-ipv4 ]; then
	echo "Acquire::ForceIPv4 true;" > /etc/apt/apt.conf.d/99force-ipv4
fi

# install software
echo "Updating repositories"
export DEBIAN_FRONTEND=noninteractive
apt-get -qq update > /dev/null
while [ $? -ne 0 ]; do
	echo "Error updating... retrying in 1 min"
	sleep 60
	apt-get -qq update > /dev/null
done
echo "Installing XServer"
apt-get -yqq install xserver-xorg-video-fbdev > /dev/null
if [ $? -eq 0 ]; then
	echo "xserver installed"
else
	echo "Error installing Xserver"
fi

echo "Installing xfce4"
apt-get -yqq install xubuntu-desktop xfce4-terminal > /dev/null
if [ $? -eq 0 ]; then
	echo "xfce4 installed"
else
	echo "Error installing xfce4"
fi

# add user cognovo
# echo "Adding user cognovo"
# if id "cognovo" >/dev/null 2>&1; then
#     echo "User cognovo already exists. Skipping adding."
# else
#     adduser --disabled-password --gecos "" cognovo
# 	usermod -aG sudo cognovo
# 	usermod -aG video cognovo
# 	echo cognovo:cognovo | chpasswd
# fi

# install software
# meteor
# echo "Installing meteor"
# curl -s https://install.meteor.com/ | sh
#if [ $? -eq 0 ]; then
#	echo "meteor installed"
#else
#	echo "Error installing meteor"
#fi
# NVM
echo "Installing node.js"
#apt-get -yqq install build-essential libssl-dev > /dev/null
#runuser -l cognovo -c 'curl -s -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash'

#chmod +x /home/cognovo/.nvm/nvm.sh
#runuser -l cognovo -c 'source /home/cognovo/.nvm/nvm.sh'
# Node.js
#runuser -l cognovo -c 'nvm install node'
curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -yqq nodejs > /dev/null
#chown -R cognovo:cognovo /home/cognovo/.npm
if [ $? -eq 0 ]; then
	echo "node.js installed"
else
	echo "Error installing node.js"
fi
npm install npm@latest -g
npm install typings -g
# Chrome
echo "Installing Chrome"
apt-get -yqq install chromium-browser > /dev/null
if [ $? -eq 0 ]; then
	echo "Chromium installed"
else
	echo "Error installing Chromium"
fi
# VS Code
echo "Installing VS Code"
wget --quiet -O code.deb https://go.microsoft.com/fwlink/?LinkID=760868
dpkg -i code.deb
if [ $? -eq 0 ]; then
	echo "VS Code installed"
else
	echo "Error installing VS Code"
fi
rm code.deb
#MySQL
echo "Installing MySQL"
debconf-set-selections <<< 'mysql-server mysql-server/root_password password cognovo'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password cognovo'
apt-get -yqq install mysql-server mysql-client mysql-workbench > /dev/null
if [ $? -eq 0 ]; then
	echo "MySQL installed"
else
	echo "Error installing MySQL"
fi
echo "Create database tikki"
mysql -u root -pcognovo -e 'CREATE DATABASE tikki;'
if [ $? -eq 0 ]; then
	echo "tikki database created"
else
	echo "Error creating tikki dtabase"
fi
#Sublime
echo "Installing Sublime"
add-apt-repository ppa:webupd8team/sublime-text-3
apt-get update > /dev/null
apt-get -y install sublime-text-installer > /dev/null
if [ $? -eq 0 ]; then
	echo "Sublime installed"
else
	echo "Error installing Sublime"
fi

echo "Installing git"
apt-get -yqq install git > /dev/null
if [ $? -eq 0 ]; then
	echo "git installed"
else
	echo "Error installing git"
fi

# create tikki desktop icon
#chown -R cognovo:cognovo /tikki
# Tikki desktop icon
#echo "Creating VMShare desktop icon"
#if [ ! -d /home/vagrant/Desktop/VMShare ]; then
#	runuser -l vagrant -c 'mkdir /home/vagrant/Desktop'
#	ln -s /VMShare /home/vagrant/Desktop/VMShare
#fi

echo "Cloning tikki project"
runuser -l vagrant -c 'git clone https://github.com/miwo100/tikki.git /home/vagrant/tikki' > /dev/null
if [ $? -eq 0 ]; then
	echo "tikki installed"
else
	echo "Error cloning tikki"
fi

# echo "NPM install tikki"
# runuser -l vagrant -c 'cd /home/vagrant/tikki/graphqlServer && npm install' > /dev/null
# runuser -l vagrant -c 'cd /home/vagrant/tikki/webApp && npm install' > /dev/null
# if [ $? -eq 0 ]; then
# 	echo "npm tikki install succeeded"
# else
# 	echo "npm tikki install failed"
# fi

# Xserver setup
#echo "Setting up Xserver"
#if [ ! -f /home/congovo/.bash_profile ]; then
#	printf "startx" > /home/cognovo/.bash_profile
#fi
# Dist Upgrade
#echo "Upgrading to Ubuntu 16.04"
#apt-get -yqq upgrade > /dev/null
#apt-get -yqq dist-upgrade > /dev/null
#apt-get -yqq install update-manager-core > /dev/null
#sleep 10
#do-release-upgrade -f DistUpgradeViewNonInteractive > /dev/null
#if [ $? -eq 0 ]; then
#	echo "Upgrade successful"
#else
#	echo "Error upgrading Ubuntu"
#fi
#apt-get -f install --reinstall xfce4-panel

#docker
echo "Installing Docker"
#
#
#
#installation steps according to https://docs.docker.com/engine/installation/linux/ubuntu/#install-using-the-repository
#
#SET UP THE REPOSITORY
#
#1. Install packages to allow apt to use a repository over HTTPS
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
#2. Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
#3. Use the following command to set up the stable repository
#amd64
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
#
#INSTALL DOCKER
#
#1. Update the apt package index.
sudo apt-get -y update
#2. Install the latest version of Docker, or go to the next step to install a specific version. Any existing installation of Docker is replaced.
sudo apt-get -y install docker-ce
#
#
#
#post-installation steps according to https://docs.docker.com/engine/installation/linux/linux-postinstall/#configure-docker-to-start-on-boot
#
#Manage Docker as a non-root user
#
#1. Create the docker group.
sudo groupadd docker
#2. Add your user to the docker group.
sudo usermod -aG docker vagrant
#3. Log out and log back in so that your group membership is re-evaluated.
#4. Verify that you can run docker commands without sudo
#
#Configure Docker to start on boot
#
#systemd
sudo systemctl enable docker

echo "XKBMODEL=\"pc105\"
XKBLAYOUT=\"de\"
XKBVARIANT=\"\"
XKBOPTIONS=\"\"

BACKSPACE=\"guess\"" > /etc/default/keyboard

echo "Provisioning complete."