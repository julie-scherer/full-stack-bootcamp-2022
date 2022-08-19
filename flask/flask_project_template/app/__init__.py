from flask import Flask, render_template, url_for
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__, template_folder="templates")
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)

from . import routes, models


# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world
# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-ii-templates
# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database