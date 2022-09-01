import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database
    # Setting up the configuration for the application. Pull from environment variables using os.environ.get()
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db') # if no database set up, create sqlite db in main directory
    SQLALCHEMY_TRACK_MODIFICATIONS = False
