from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField

class CupcakeAddForm(FlaskForm):
    flavor = StringField('Flavor')
    size = StringField('Size')
    rating = FloatField('Rating')
    image = StringField('Image URL')