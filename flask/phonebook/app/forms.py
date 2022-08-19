from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField, SelectField
from wtforms.validators import InputRequired, Length, Email, Regexp, EqualTo, ValidationError
from app.models import User


class RegistrationForm(FlaskForm):
    email = StringField('Email Address',validators=[InputRequired(),Email()])
    username = StringField('Username',validators=[InputRequired(),Length(min=2,max=20)])
    password = PasswordField('Password',validators=[InputRequired(),Length(min=6,max=25)])
    confirm_password = PasswordField('Confirm Password',validators=[InputRequired(),EqualTo('password', message='Passwords must match.')])
    submit = SubmitField('Submit')

    # wtforms allows you to create a custom validator by creating a function inside this form https://wtforms.readthedocs.io/en/2.3.x/validators/
    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError("That username is taken. Please choose a different one.")
    
    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError("Email already exists. Please enter a different one or login.")


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    remember = BooleanField('Remember Me') 
    submit = SubmitField()

from app.static.states import States
class AddressForm(FlaskForm):
    firstname = StringField('First Name',validators=[InputRequired(),Length(min=2,max=20)])
    lastname = StringField('Last Name',validators=[InputRequired(),Length(min=2,max=25)])
    phone = StringField('Phone Number',validators=[InputRequired(),Length(min=10,max=14),Regexp('\(?\d{3}\)? ?\d{3}\-?\d{4}')])
    street1 = StringField('Street Line 1',validators=[InputRequired()])
    street2 = StringField('Street Line 2')
    city = StringField('City',validators=[InputRequired()])
    state = SelectField('State',validators=[InputRequired()],choices=States.state_list)
    zip = StringField('Zip Code',validators=[InputRequired(),Length(min=5,max=10)])
    submit = SubmitField('Submit')

    # def validate_state(self, state):
    #     if state.data == 'Choose...':
    #         raise ValidationError("Please enter the state.")