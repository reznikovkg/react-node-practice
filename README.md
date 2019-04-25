## MAPS-NODE-VUE ##

## Deploy a project ##

    git clone https://github.com/reznikovkg/maps-node-vue
    
    cd maps-node-vue

## Run a project ##

#### Need 2 session of terminal ####

    docker-compose up
   
After deploying the docker (this lasts a long time). Run the second terminal and command:

    sh deploy-project.sh
    
**After open: [http://localhost:8080](http://localhost:3000)**

### Database ###

    db_core: mysql
    
    db_name: dsr_db
    db_user: root
    db_pass: 1111

Or change it in the project


### Clear docker ###

    sh crash-project.sh
