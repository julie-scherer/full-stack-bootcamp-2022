import email
from app import db, login
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def set_password(self, password):
        self.password = generate_password_hash(password)
        db.session.commit()

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Save the password as the hashed version of the password
        self.set_password(kwargs['password'])
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<User {self.id} | {self.username}>"

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # Add a method that returns a dict so that json package can convert to and from JSON
    def to_dict(self, include_email=False):
        data = {
            "id": self.id,
            # "email": self.email,          # See note below
            "username": self.username,
            # "password": self.password,    # Passwords are not stored in the database (only a hashed version) so it will not be returned
            "date_created": self.date_created.isoformat() + 'Z'    # date.isoformat() returns a string representing the date in ISO 1861 format: https://docs.python.org/3/library/datetime.html#datetime.date.isoformat
            # "posts": self.post_id
        }
        
        # Only want to include the email when users request their own
        if include_email:
            data['email'] = self.email
        
        return data

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

@login.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) # SQL equivalent = FOREIGN KEY(user_id) REFERENCES user(id)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()
    
    def __repr__(self):
        return f"<Post {self.id} | {self.title}>"
    
    def update(self, **kwargs):
        for key, value in kwargs.items():
            if key in {'title', 'body'}:
                setattr(self, key, value)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def to_dict(self):
        data = {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "date_created": self.date_created,
            "user_id": self.user_id
        }

        return data


# API reference: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xxiii-application-programming-interfaces-apis
