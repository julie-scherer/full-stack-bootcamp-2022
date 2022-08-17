from app import app
from flask import render_template,flash,redirect,url_for
from app.forms import AddressBook

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html') 

@app.route('/addressbook', methods=["GET","POST"])
def addressbook():
    form = AddressBook()
    if form.validate_on_submit():
        print('Form has been validated.')
        # id = form.id.data  <- not an argument, PK will populate automatically
        firstname = form.firstname.data
        lastname = form.lastname.data
        phone = form.phone.data
        email = form.email.data
        street1 = form.street1.data
        street2 = form.street2.data
        city = form.city.data
        state = form.state.data
        zip = form.zip.data
        # date_created = form.date_created.data  <- not an argument
        new_address = AddressBook(firstname=firstname,
                            lastname=lastname,
                            phone=phone,
                            email=email,
                            street1=street1,
                            street2=street2,
                            city=city,
                            state=state,
                            zip=zip)
        print(f"Instance created at {new_address}")
        flash(f"Whitepage created for {form.firstname.data} {form.lastname.data}!, 'success'")
        return redirect(url_for('home'))
    flash('Submission Unsuccessful. Please check you have entered the correct information.', 'danger')
    return render_template('addressbook.html',form=form)