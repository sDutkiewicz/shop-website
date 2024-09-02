from flask import Blueprint, jsonify, request, send_from_directory, current_app, abort
from backend.models import Product, db
import os

routes = Blueprint('routes', __name__)

# Serve React App
@routes.route('/', defaults={'path': ''})
@routes.route('/<path:path>')
def serve_react_app(path):
    print(f"Requested path: {path}")
    full_path = os.path.join(current_app.static_folder, path)
    print(f"Full path to file: {full_path}")

    if path != "" and os.path.exists(full_path):
        # print(f"Serving file from static directory: {full_path}")
        return send_from_directory(current_app.static_folder, path)
    else:
        index_path = os.path.join(current_app.static_folder, 'index.html')
        if os.path.exists(index_path):
            # print(f"File not found. Serving index.html from static directory: {index_path}")
            return send_from_directory(current_app.static_folder, 'index.html')
        else:
            # print(f"index.html not found in the static directory: {index_path}")
            return abort(404)

# API to get all products
@routes.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = [{
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'image_url': f'/uploads/{product.image_url}'  
    } for product in products]
    return jsonify(products_list)

# API to add a new product
@routes.route('/admin/add-product', methods=['POST'])
def add_product():
    name = request.form.get('name')
    price = request.form.get('price')
    image = request.files.get('image')

    if image:
        image_filename = image.filename
        image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], image_filename)
        image.save(image_path)

        new_product = Product(
            name=name,
            price=price,
            image_url=image_filename 
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify({'message': 'Product added successfully!'}), 201

    return jsonify({'message': 'Failed to add product. Missing data.'}), 400

# Serve uploaded images
@routes.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)
