from flask import Blueprint, jsonify, request, render_template, redirect, url_for, flash
from werkzeug.utils import secure_filename
from backend import db
from backend.models import Product
import os

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    products = Product.query.all()  # Fetch all products from the database
    return render_template('index.html', products=products)

@routes.route('/admin')
def admin():
    return render_template('admin.html')

@routes.route('/product/<int:product_id>')
def product_detail(product_id):
    product = Product.query.get_or_404(product_id)
    return render_template('product_detail.html', product=product)

@routes.route('/admin/add-product', methods=['POST'])
def add_product():
    name = request.form['name']
    price = request.form['price']
    image = request.files['image']
    
    if image:
        # Ensure the 'static/uploads' directory exists
        upload_folder = os.path.join('static', 'uploads')
        os.makedirs(upload_folder, exist_ok=True)

        # Save the image
        filename = secure_filename(image.filename)
        image_path = os.path.join(upload_folder, filename)
        image.save(image_path)
        
        # Convert the file system path to a URL path by replacing backslashes with forward slashes
        relative_image_path = os.path.join('uploads', filename).replace(os.sep, '/')
        
        # Save product to the database
        new_product = Product(name=name, price=price, image_url=relative_image_path)
        db.session.add(new_product)
        db.session.commit()
        
        flash('Product added successfully!', 'success')
    else:
        flash('Error uploading image.', 'danger')

    return redirect(url_for('routes.admin'))
