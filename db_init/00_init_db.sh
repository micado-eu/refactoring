#!/bin/sh

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

env

# ----- NEED TO CREATE BEFORE API SCHEMA SINCE MICADO WILL DEPEND ON SOME TABLES AND THUS THOSE TABLES NEED TO BE THERE OR REFERENCE WILL NOT WORK

# ---------- KEYCLOAK SHARED DB

echo "\nCreating KC components\n"
psql -c "CREATE USER $KC_USER WITH ENCRYPTED PASSWORD '$KC_PWD';"
psql -c "CREATE SCHEMA $KC_SCHEMA;"
psql -c "GRANT CONNECT ON DATABASE $POSTGRES_DB TO $KC_USER;"
psql -c "GRANT USAGE ON SCHEMA $KC_SCHEMA TO $KC_USER;"
psql -c "GRANT CREATE ON SCHEMA $KC_SCHEMA TO $KC_USER;"
psql -c "ALTER ROLE $KC_USER IN DATABASE $POSTGRES_DB SET search_path = $KC_SCHEMA;"
psql -c "ALTER DEFAULT PRIVILEGES IN SCHEMA $KC_SCHEMA GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $KC_USER;"
psql -c "ALTER DEFAULT PRIVILEGES IN SCHEMA $KC_SCHEMA GRANT USAGE ON SEQUENCES TO $KC_USER;"

echo "\nCreated KC components, now adding tables\n"




echo "\nCreating MICADO apps components\n"
psql -c "CREATE USER $MICADO_DB_USER WITH ENCRYPTED PASSWORD '$MICADO_DB_PWD';"
psql -c "CREATE SCHEMA $MICADO_DB_SCHEMA;"
psql -c "GRANT CONNECT ON DATABASE $POSTGRES_DB TO $MICADO_DB_USER;"
psql -c "GRANT USAGE ON SCHEMA $MICADO_DB_SCHEMA TO $MICADO_DB_USER;"
psql -c "GRANT CREATE ON SCHEMA $MICADO_DB_SCHEMA TO $MICADO_DB_USER;"
psql -c "ALTER ROLE $MICADO_DB_USER IN DATABASE $POSTGRES_DB SET search_path = $MICADO_DB_SCHEMA;"
psql -c "ALTER DEFAULT PRIVILEGES IN SCHEMA $MICADO_DB_SCHEMA GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $MICADO_DB_USER;"
psql -c "ALTER DEFAULT PRIVILEGES IN SCHEMA $MICADO_DB_SCHEMA GRANT USAGE ON SEQUENCES TO $MICADO_DB_USER;"


# THIS IS TEMPORARY UNTILL LOOPBACK GET OUR PATCH
psql -c "GRANT CREATE ON DATABASE $POSTGRES_DB TO $MICADO_DB_USER;"

echo "\nCreated MICADO apps components, now adding tables\n"

#psql -U $MICADO_DB_USER -d $POSTGRES_DB -a -q -f /docker-entrypoint-initdb.d/01_db.sql.txt

#UNCOMMENT THIS IF YOU WANT TO HAVE THE DB WITH THE TABLES 
psql -U $MICADO_DB_USER -d $POSTGRES_DB -a -q -f /docker-entrypoint-initdb.d/Micado_DB_Schema.sql.txt

#CREATE indexes for full text searches for PGROONGA

