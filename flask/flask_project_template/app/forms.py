from flask_wtf import FlaskForm
# https://wtforms.readthedocs.io/en/2.3.x/fields/
from wtforms import StringField, SubmitField # BooleanField, DateField, DateTimeField, DecimalField, FileField, MultipleFileField, FloatField, IntegerField, RadioField, SelectField, SelectMultipleField, PasswordField, TextAreaField, etc.
# https://wtforms.readthedocs.io/en/2.3.x/validators/
from wtforms.validators import DataRequired, Length # Email, Regexp, EqualTo, InputRequired, NumberRange, Optional, URL, AnyOf, NoneOf, etc.

class FormName(FlaskForm):
    column1 = StringField('Label',validators=[DataRequired(), Length(min=2,max=20)])
    column2 = StringField('Label',validators=[DataRequired(), Length(min=2,max=20)])
    submit = SubmitField('Submit')


# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iii-web-forms