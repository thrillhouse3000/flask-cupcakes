from flask import Flask, request, jsonify, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake
from forms import CupcakeUpdateForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secretsecret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def home_page():
    """Show home page"""
    return render_template('index.html')

@app.route('/api/cupcakes')
def cupcakes_index():
    all_cupcakes = [cupcake.serialize_cupcake() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=all_cupcakes)

@app.route('/api/cupcakes', methods=["POST"])
def add_cupcake():
    data = request.json
    cupcake = Cupcake(
        flavor=data['flavor'], 
        size=data['size'], 
        rating=data['rating'], 
        image=data['image'] or None
        )
    db.session.add(cupcake)
    db.session.commit()
    return (jsonify(cupcake=cupcake.serialize_cupcake()), 201)

@app.route('/api/cupcakes/search', methods=['POST'])
def post_search():
    search_term = request.json['term']
    search_results = [cupcake.serialize_cupcake() for cupcake in Cupcake.query.filter((Cupcake.flavor.ilike(f'%{search_term}%')) | (Cupcake.size.ilike(f'%{search_term}%')) | (Cupcake.rating.ilike(f'%{search_term}%'))).all()]
    return jsonify(cupcakes=search_results)

@app.route('/api/cupcakes/<int:cupcake_id>')
def show_cupcake_details(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.serialize_cupcake())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize_cupcake())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message = 'Deleted')