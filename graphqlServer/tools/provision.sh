#!/bin/bash

echo "Acquire::ForceIPv4 true;" > /etc/apt/apt.conf.d/99force-ipv4
apt-get update
apt-get -yqq install xserver-xorg-video-fbdev
apt-get -yqq install xfce4
X -configure
startxfce4&