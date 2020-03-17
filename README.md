
 [//]: # ( ** )  
 [//]: # ( * Project: generic-node-dashboard)  
 [//]: # ( * File: README.md)  
 [//]: # ( * Author: Emil Nilsson)  
 [//]: # ( * Contact: emil.nilsson@nutanix.com)  
 [//]: # ( ** )  

# Generic Node Dashboard

Simple Dashboard built using MDBootstrap, Express, Socket.io, NATS.io and Node to display two video feeds and relevant data.

The node server is listening on port 4000

## Run using docker

```bash
docker build -t your/tag:latest .
docker run -p 4000:4000 your/tag:latest
```

Project: generic-node-dashboard
File: index.js
Author: Emil Nilsson
Contact: emil.nilsson@nutanix.com
