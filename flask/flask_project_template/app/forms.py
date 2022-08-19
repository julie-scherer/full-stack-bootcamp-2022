from flask_wtf import FlaskForm
# https://wtforms.readthedocs.io/en/2.3.x/fields/
from wtforms import StringField, SubmitField, PasswordField # BooleanField, DateField, DateTimeField, DecimalField, FileField, MultipleFileField, FloatField, IntegerField, RadioField, SelectField, SelectMultipleField, TextAreaField, etc.
# https://wtforms.readthedocs.io/en/2.3.x/validators/
from wtforms.validators import InputRequired, Length, Email, EqualTo, ValidationError # Regexp, DataRequired, NumberRange, Optional, URL, AnyOf, NoneOf, etc.
from app.models import User

class TemplateForm(FlaskForm):
    username = StringField('Label',validators=[InputRequired(), Length(min=2,max=20)])
    email = StringField('Label',validators=[InputRequired(), Email()])
    password = PasswordField('Password',validators=[InputRequired(),Length(min=6,max=25)])
    confirm_password = PasswordField('Confirm Password',validators=[InputRequired(),EqualTo(password)])
    submit = SubmitField('Submit')

    # wtforms allows you to create a custom validator by creating a function inside this form https://wtforms.readthedocs.io/en/2.3.x/validators/
    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user != None:
            raise ValidationError("That username is taken. Please choose a different one.")
    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user != None:
            raise ValidationError("Email already exists. Please enter a different one or login.")
        
# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iii-web-forms