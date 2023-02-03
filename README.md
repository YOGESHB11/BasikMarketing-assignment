# BasikMarketing-assignment

CDN Strategy
Create a service that pushes updates to a CDN network. The service should interact with the API of the CDN service to programmatically update the content served by the CDN. Should be capable of performing actions such as create, update and delete cache.

 

The service should contain the following endpoints

 

/create -> create new CDN entry. the request body should contain:

 

the directory path to place it in.

the content to add.

/update -> update the CDN data. Invalidate old data and replace with new content the request body should contain:

 

the directory path of the file in the CDN

the content to replace it with. (assume JSON based data)

/delete -> delete the CDN entry. the request body should contain:

 

the directory path of the file to delete