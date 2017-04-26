# Database Service
the development database system is mysql server and provided inside an docker container


## Install
all database scripts have to be tested with mysql workbench which has to be installed on your local development host.

for linux:
``` https://dev.mysql.com/doc/workbench/en/wb-installing-linux.html ```

## Development cycle
1. run the database container
```bash
npm run start
```

2. start mysql workbench and create and test your sql scripts

3. when done create new dbmigration (to change structure) or dbseed (to add data)

4. restart the database container to test your migrations and seeds
```bash
npm run restart
```

### Create dbmigration
for automatic schema script detection you have to create a dbmigration
run 
```bash
npm run sequelize migration:create
```
this creates a new migration file in folder migrations:

```migrations/20170426134225-unnamed-migration.js```

rename it to something like 

```bash
migrations/20170426134225-create-table-newtable.ts
```

__pay attention to change the suffix from .js to .ts__

Two different types of migrations can be implemented

#### SQL script migration
For this tpye of migration you have manually to add two files in the migration/sql folder for the up and down logic.

> the following step should be automated:

```bash
migrations/sql/20170426134225-create-table-newtable.sql
```
and
```bash
migrations/sql/20170426134225-create-table-newtable.undo.sql
```
__Important: these two files must have the same basename as the typescript file of the migration

copy the typescript logic from other SQL script migration as is to current one.

#### Typesript migration

No additional files have to be added here. Just implement the up and down logic inside the migration file.

### Create dbseed
for automatic data script detection you have to create a dbseed
run 
```bash
npm run sequelize seed:create
```
Next steps are the same as described for "Create migration".

