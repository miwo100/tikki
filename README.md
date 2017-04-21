# Welcome to tikki
[![Build Status](https://travis-ci.org/miwo100/tikki.svg?branch=master)](https://travis-ci.org/miwo100/tikki)
##time capturing and budget controlling for IT startups

Easy solution for integrating time capturing into your github workflow

### Our Challenge:
We have been tired of 
- tracking our working hours in excel sheets
- consolidating all sheets for billing
- using oversized project management solutions or too simple time trackers

### what we want
- deep github integration
- order based budget controlling
- role based dashboards
- reminder system based on github activity
- smart tool which makes time tracking fun and easy for everyone of the team


### what we not want
- "developer controlling"
- "stop watches"
- billing
- all in one "big brother is watching you" tool :-)
- productivity enhancement tool

in short seperation of concernes:
- project managers control budgets
- developers develop

### contribute

- clone project locally, npm install locally and run graphqlServer and webApp
```
git clone https://github.com/miwo100/tikki.git
cd tikki
cd graphqlServer
npm install
npm run start
cd ..
cd webApp
npm install
npm run start
```
direct browser to http://localhost:4200 

#### git settings
if you like to work with git from the command line please use these settings:

- your identity
``` bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```
- only push current branch
```bash
git config --global push.default simple
```

- cache credentials
```
git config --global credential.helper cache
git config --global credential.helper 'cache --timeout=3600'
```









