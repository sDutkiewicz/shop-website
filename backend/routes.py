from flask import Blueprint, jsonify, request, render_template
from backend import db
from backend.models import Product

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    return render_template('index.html')

@routes.route('/admin')
def admin():
    return render_template('admin.html')

@routes.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = [{'id': p.id, 'name': p.name, 'price': p.price} for p in products]
    return jsonify(products_list)

@routes.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({'id': product.id, 'name': product.name, 'price': product.price})

@routes.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(name=data['name'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'id': new_product.id, 'name': new_product.name, 'price': new_product.price}), 201
