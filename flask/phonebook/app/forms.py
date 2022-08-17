from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import InputRequired, Length, Email, Regexp

class Address(FlaskForm):
    firstname = StringField('First Name',validators=[InputRequired(),Length(min=2,max=20)])
    lastname = StringField('Last Name',validators=[InputRequired(),Length(min=2,max=25)])
    phone = StringField('Phone Number',validators=[InputRequired(),Length(min=10,max=14),Regexp('\(?\d{3}\)? ?\d{3}\-?\d{4}')])
    email = StringField('Email',validators=[Email()])
    street1 = StringField('Street Line 1',validators=[InputRequired()])
    street2 = StringField('Street Line 2')
    city = StringField('City',validators=[InputRequired()])
    state = StringField('State',validators=[InputRequired(),Length(2)])
    zip = StringField('Zip Code',validators=[InputRequired(),Length(min=5,max=10)])
    submit = SubmitField('Submit')

def __repr__(self):
    return f"User('{self.firstname}', '{self.lastname}', '{self.phone}')"