from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    # email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    addresses = db.relationship('Address',backref='user',lazy=True)
    # addresses = db.relationship("Address", back_populates="user")

    def set_password(self, password):
        self.password = generate_password_hash(password)
    def check_password(self, password):
        self.password = check_password_hash(password)
    
    # def __init__(self,**kwargs) -> None:
    #     super().__init__(**kwargs)
    #     self.password = generate_password_hash(**kwargs.get('password'))
    #     db.session.add(self)
    #     db.session.commit()

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"


class Address(db.Model):
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # user = db.relationship("User", back_populates="addresses")

    # db.session.add() and db.session.commit() required to save instance to database
    # def __init__(self,**kwargs) -> None:
    #     super().__init__(**kwargs)
    #     db.session.add(self)
    #     db.session.commit()
    
    def __repr__(self):
        return f"User('{self.firstname}', '{self.lastname}', '{self.date_created}')"