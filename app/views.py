from flask import render_template, redirect, jsonify, url_for, request
from datetime import datetime
from app import db, app, models
from .forms import AppointmentForm

@app.route('/')

def root():
    return render_template("index.html")

@app.route('/appointments', methods = ['GET', 'POST'])
def appointments():
    if request.method == 'POST':
        form = AppointmentForm()
        if form.validate_on_submit():
            apt = models.Appointment()
            apt.desc = form.desc.data
            timey = str(form.date.data + ' ' + form.time.data)
            time = datetime.strptime(timey, '%b %d %Y %I:%M%p')
            apt.apt_time = time
            db.session.add(apt)
            db.session.commit()
        return redirect(url_for('root'))
    data = models.Appointment.query.all()
    resp = jsonify([i.serialize for i in data])
    resp.status_code = 200
    return resp
