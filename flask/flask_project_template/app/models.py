import email
from app import db
from datetime import datetime
from app import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.get(int(user_id))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20),nullable=False)
    email = db.Column(db.String(20),nullable=False)
    password = db.Column(db.String(256), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    # db.session.add() and db.session.commit() required to save instance to database
    def __init__(self,**kwargs) -> None:
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

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
    
# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database