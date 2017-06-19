from app import db

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    desc = db.Column(db.String(120), index=True, unique=False)
    apt_time = db.Column(db.DateTime(timezone=False), index=True, unique=True)

    def __repr__(self):
        return '<Appointment %r>' % (self.desc)

    def dump_datetime(self, value):
        if value is None:
            return None
        return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]

    @property
    def serialize(self):
       return {
           'id'        : self.id,
           'apt_time'  : self.dump_datetime(self.apt_time),
           'desc'      : self.desc
       }
