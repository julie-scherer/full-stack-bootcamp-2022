from app import app, db
from flask import render_template, flash, redirect, url_for, request
from app.forms import AddressForm, RegistrationForm, LoginForm
from app.models import User, Address
from flask_login import login_user, logout_user, login_required, current_user

from app.static.states import States


@app.route('/')
@app.route('/index')
@app.route('/home')
def home():
    return render_template('home.html')



@app.route('/register', methods=["GET","POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():   # note: form checks for valid email and username
        # existing_user = User.query.filter((User.email == form.email.data) | (User.username == form.username.data)).first()
        # if existing_user:
        #     flash('A user with that username or email already exists.', 'danger')
        #     return redirect(url_for('signup'))

        # create instance of User (from models.py) with form data
        user = User(
                username=form.username.data, 
                email=form.email.data,
                password=form.password.data
                )
        # set_password(form.password.data), db.session and db.session.add(user) are called in models.py to save user to database
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
        if user is not None and user.check_password(form.password.data):
            login_user(user)
            flash(f"{form.username.data} successfully logged in.", 'success')
            return redirect(url_for('home'))
        else:
            flash(f"Login Unsuccessful. Please check username and password.", 'danger')
    return render_template('login.html',form=form)



@app.route("/logout")
def logout():
    logout_user()
    flash(f"Logged out successfully",'success')
    return redirect(url_for('home'))



@app.route('/phonebook', methods=["GET","POST"])
@login_required
def phonebook():
    form = AddressForm()
    if form.validate_on_submit():
        print("Form validated")
        address = Address(
            firstname=form.firstname.data, 
            lastname=form.lastname.data,             
            phone=form.phone.data, 
            street1=form.street1.data, 
            street2=form.street2.data,
            city=form.city.data, 
            state=form.state.data, 
            state_abbrv=States.state_dict.get(form.state.data),
            zip=form.zip.data,
            user_id=current_user.id
            )
        # db.session.add(address) and db.session.commit() called in models.py to save address to database
        db.session.add(address)
        db.session.commit()
        flash(f"{address}", 'success')
        return redirect(url_for('phonebook'))
    else:
        print("Form NOT validated")
    addresses = Address.query.all()
    return render_template('phonebook.html',form=form, addresses=addresses)



@app.route('/phonebook/contact/<address_id>')
@login_required
def view_contact(address_id):
    address = Address.query.get_or_404(address_id)
    return render_template('contact.html', address=address)



@app.route('/phonebook/contact/<address_id>/edit', methods=['GET','POST'])
@login_required
def edit_contact(address_id):
    address_to_edit = Address.query.get_or_404(address_id)
    if address_to_edit.user != current_user:
        flash("You do not have permission to edit this post",'danger')
        return render_template('view_contact.html', address_id=address_id)
    form = AddressForm()
    if form.validate_on_submit():
        # Update the post with data from the form
        address_to_edit.update(
            firstname=form.firstname.data, 
            lastname=form.lastname.data,             
            phone=form.phone.data, 
            street1=form.street1.data, 
            street2=form.street2.data,
            city=form.city.data, 
            state=form.state.data, 
            zip=form.zip.data
        )
        flash(f'{address_to_edit.firstname} {address_to_edit.lastname} has been updated', 'success')
        return redirect(url_for('view_contact', address_id=address_id))
    return render_template('edit_contact.html', address=address_to_edit, form=form)
    # return render_template('contact.html', address=address_to_edit)



@app.route('/phonebook/contact/<address_id>/delete')
@login_required
def delete_contact(address_id):
    address_to_delete = Address.query.get_or_404(address_id)
    if address_to_delete.user != current_user:
        flash('You do not have permission to delete this address', 'danger')
        return redirect(url_for('home'))
    address_to_delete.delete()
    flash(f"{address_to_delete.firstname} {address_to_delete.lastname} has been deleted", 'info')
    return redirect(url_for('home'))