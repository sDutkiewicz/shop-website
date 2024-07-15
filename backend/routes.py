from flask import Flask, jsonify, request, Blueprint, render_template

routes = Blueprint('routes', __name__)

# Sample data for products
products = [
    {'id': 1, 'name': 'Product 1', 'price': 10.0},
    {'id': 2, 'name': 'Product 2', 'price': 20.0},
    {'id': 3, 'name': 'Product 3', 'price': 30.0},
]

@routes.route('/')
def index():
    return render_template('index.html')

@routes.route('/admin')
def admin():
    return render_template('admin.html')

@routes.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@routes.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product is not None:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@routes.route('/api/products', methods=['POST'])
def add_product():
    new_product = request.get_json()
    new_product['id'] = len(products) + 1
    products.append(new_product)
    return jsonify(new_product), 201
