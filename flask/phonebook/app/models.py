from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)  # need to specify object at User.query


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    addresses = db.relationship('Address',backref='user',lazy=True)

    # https://hackersandslackers.com/flask-login-user-authentication
    # create hashed password
    def set_password(self, password):
        self.password = generate_password_hash(password)
        db.session.commit() # commit change to database
    
    # check hashed password
    def check_password(self, password):
        # self.password = check_password_hash(password)
        return check_password_hash(self.password, password)

    # db.session.add() and db.session.commit() required to save instance to database
    def __init__(self,**kwargs) -> None: # kwargs takes all our key word arguments and turns into dictionary
        super().__init__(**kwargs)
        # self.password = generate_password_hash(**kwargs.get('password'))
        self.set_password(kwargs.get('password'))   
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"User('{self.username}')"

class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20),nullable=False)
    lastname = db.Column(db.String(20),nullable=False)
    phone = db.Column(db.String(14),nullable=False)
    street1 = db.Column(db.String(100),nullable=False)
    street2 = db.Column(db.String(20),nullable=False)
    city = db.Column(db.String(20),nullable=False)
    state = db.Column(db.String(2),nullable=False)
    zip = db.Column(db.String(10),nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # db.session.add() and db.session.commit() required to save instance to database
    def __init__(self,**kwargs) -> None:
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()
    
    def __repr__(self):
        return f"User('{self.firstname}', '{self.lastname}', '{self.date_created}')"