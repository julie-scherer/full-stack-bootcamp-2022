from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20),nullable=False)
    lastname = db.Column(db.String(20),nullable=False)
    phone = db.Column(db.String(14),nullable=False)
    email = db.Column(db.String(50))
    street1 = db.Column(db.String(100),nullable=False)
    street2 = db.Column(db.String(20),nullable=False)
    city = db.Column(db.String(20),nullable=False)
    state = db.Column(db.String(2),nullable=False)
    zip = db.Column(db.String(10),nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)