from app import app, db
from flask import render_template, redirect, url_for, flash
from app.forms import TemplateForm
from app.models import User


@app.route('/')
@app.route('/index')
@app.route('/home', methods=["GET","POST"])
def home():
    return "Hello World!"

@app.route('/form')
def form():
    form = TemplateForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        
        db.session.add(user)
        db.session.commit() # call db commit method to save user to database        
        
        flash("Your account has been created! You are now able to log in.", 'success')
        return redirect(url_for('home'))
        
    return render_template('home.html',form=form)
