from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from backend import db


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)  
    date_added = db.Column(db.DateTime, default=datetime.utcnow)  

    
    image_url_1 = db.Column(db.String(100), nullable=True)
    image_url_2 = db.Column(db.String(100), nullable=True)
    image_url_3 = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Product {self.name}>'
