from app import app, db
from flask import render_template, flash, redirect, url_for, request
from app.forms import AddressForm, RegistrationForm, LoginForm
from app.models import User, Address
from flask_login import login_user, logout_user, login_required, current_user


@app.route('/')
@app.route('/home')
@app.route('/index')
def home():
    user_info = {
            'username': 'brians',
            'email': 'brians@codingtemple.com'
        }
    return render_template('home.html',user=user_info)


@app.route('/register', methods=["GET","POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():   # note: form checks for valid email and username
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)   # 
        
        db.session.add(user)
        db.session.commit() # call db commit method to save user to database        
        flash("Your account has been created! You are now able to log in.", 'success')
        return redirect(url_for('login'))
    return render_template('register.html',form=form)


@app.route('/login', methods=["GET","POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(password=form.password.data):
            login_user(user)
            flash(f"{form.username.data} successfully logged in.", 'success')
            return redirect(url_for('home'))
            # next_page = request.args.get('next')
            # return request.args.get('next') if next_page else redirect(url_for('home'))
        else:
            flash(f"Login Unsuccessful. Please check username and password.", 'danger')
    return render_template('login.html',form=form)


@app.route('/address', methods=["GET","POST"])
@login_required
def address():
    # if not current_user.is_authenticated:
    #     flash(f"You must be logged in to access this page.", 'info')
    #     return redirect(url_for('login'))
    form = AddressForm()
    if form.validate_on_submit():
        address = Address(firstname=form.firstname.data, lastname=form.lastname.data, phone=form.phone.data, 
                        email=form.email.data, street1=form.street1.data, street2=form.street2.data,
                        city=form.city.data, state=form.state.data, zip=form.zip.data)
        db.session.add(address)
        db.session.commit()
        flash(f"Address added for {form.firstname.data} {form.lastname.data} at {form.street1.data} {form.street2.data} {form.city.data} {form.state.data} {form.zip.data}, 'success'")
        return redirect(url_for('home'))
    flash('Submission Unsuccessful. Please check you have entered the correct information.', 'danger')
    return render_template('address.html',form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))