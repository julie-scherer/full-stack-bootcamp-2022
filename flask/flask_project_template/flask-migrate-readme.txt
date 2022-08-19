Create Migration Repo
(venv) % flask db init

Database Migration
(venv) % flask db migrate -m "form table"

The flask db migrate command does not make any changes to the database, it just generates the migration script. \
To apply the changes to the database, the flask db upgrade command must be used.

(venv) % flask db upgrade



source: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database