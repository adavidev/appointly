from flask_wtf import Form
from wtforms import StringField
from wtforms.validators import DataRequired, Email

class AppointmentForm(Form):
    desc = StringField('desc', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    time = StringField('time', validators=[DataRequired()])
