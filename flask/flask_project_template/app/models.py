from app import db
from datetime import datetime

class FormName(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    column1 = db.Column(db.String(20),nullable=False)
    column2 = db.Column(db.String(20),nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database