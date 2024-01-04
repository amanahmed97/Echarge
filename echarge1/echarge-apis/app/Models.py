from app import db, app
from flask_login import LoginManager, UserMixin


class User(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(30))
    user_email = db.Column(db.String(50), unique=True)
    user_password = db.Column(db.String(150))
    user_phone = db.Column(db.String(12), unique=True)

    def get_id(self):
        return self.user_id



