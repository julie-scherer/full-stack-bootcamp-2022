from app import app
from flask import render_template,flash,redirect,url_for
from app.forms import Address

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html') 

@app.route('/addressbook', methods=["GET","POST"])
def addressbook():
    form = Address()
    if form.validate_on_submit():
        flash(f"Whitepage created for {form.firstname.data} {form.lastname.data}!, 'success'")
        return redirect(url_for('home'))
    return render_template('addressbook.html',form=form)