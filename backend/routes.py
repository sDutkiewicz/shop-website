from flask import Blueprint, jsonify, request, send_from_directory, current_app, abort, session
from backend.models import User, Product, CartItem, db
import os


routes = Blueprint('routes', __name__)

# Serve React App
# Serve React App
@routes.route('/', defaults={'path': ''})
@routes.route('/<path:path>')
def serve_react_app(path):
    full_path = os.path.join(current_app.static_folder, path)

    if path != "" and os.path.exists(full_path):
        return send_from_directory(current_app.static_folder, path)
    else:
        index_path = os.path.join(current_app.static_folder, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(current_app.static_folder, 'index.html')
        else:
            return abort(404)


# API to get all products
@routes.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = [{
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'description': product.description,
        'image_url': f'/uploads/{product.image_url_1}' if product.image_url_1 else None,
    } for product in products]
    return jsonify(products_list)




# API to add a new product
@routes.route('/admin/add-product', methods=['POST'])
def add_product():
    name = request.form.get('name')
    price = request.form.get('price')
    description = request.form.get('description')  # Get the description
    image_1 = request.files.get('image_1')
    image_2 = request.files.get('image_2')
    image_3 = request.files.get('image_3')

    new_product = Product(
        name=name,
        price=price,
        description=description
    )

    # Save images if they are provided
    if image_1:
        image_filename_1 = image_1.filename
        image_path_1 = os.path.join(current_app.config['UPLOAD_FOLDER'], image_filename_1)
        image_1.save(image_path_1)
        new_product.image_url_1 = image_filename_1

    if image_2:
        image_filename_2 = image_2.filename
        image_path_2 = os.path.join(current_app.config['UPLOAD_FOLDER'], image_filename_2)
        image_2.save(image_path_2)
        new_product.image_url_2 = image_filename_2

    if image_3:
        image_filename_3 = image_3.filename
        image_path_3 = os.path.join(current_app.config['UPLOAD_FOLDER'], image_filename_3)
        image_3.save(image_path_3)
        new_product.image_url_3 = image_filename_3

    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product added successfully!'}), 201

# Serve uploaded images
@routes.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)


@routes.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    product_data = {
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'description': product.description,
        'date_added': product.date_added.strftime('%Y-%m-%d') if product.date_added else 'N/A',
        'image_url_1': f'/uploads/{product.image_url_1}' if product.image_url_1 else None,
        'image_url_2': f'/uploads/{product.image_url_2}' if product.image_url_2 else None,
        'image_url_3': f'/uploads/{product.image_url_3}' if product.image_url_3 else None,
    }
    return jsonify(product_data)


@routes.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    new_user = User(name=name, email=email)
    new_user.set_password(password)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

# User Login
@routes.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    session['user_id'] = user.id
    session['user_name'] = user.name
    return jsonify({'message': 'Logged in successfully', 'user': {'name': user.name, 'email': user.email}}), 200

# User Logout
@routes.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    return jsonify({'message': 'Logged out successfully'}), 200

# Check if user is logged in
@routes.route('/check_session', methods=['GET'])
def check_session():
    if 'user_id' in session:
        return jsonify({'logged_in': True, 'user_name': session.get('user_name')})
    else:
        return jsonify({'logged_in': False})