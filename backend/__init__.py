from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config.config import Config
import os

db = SQLAlchemy()
migrate = Migrate()

# Setting up the upload folder path
UPLOAD_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../uploads')

def create_app():
    base_dir = os.path.abspath(os.path.dirname(__file__))

    app = Flask(
        __name__,
        template_folder=os.path.join(base_dir, '../templates'),
        static_folder=os.path.join(base_dir, '../static')
    )
    
    app.config.from_object(Config)
    
    # Configuration settings
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['SECRET_KEY'] = 'wowow'  # Set a strong secret key for session management
    
    db.init_app(app)
    migrate.init_app(app, db)  # Initialize Flask-Migrate with your app and db

    with app.app_context():
        from backend import routes, models  # Import routes and models
        
        app.register_blueprint(routes.routes)  # Register routes blueprint

        # Ensure that all tables are created
        db.create_all()

        # Debug information
        print(f"Template folder: {app.template_folder}")
        print(f"Static folder: {app.static_folder}")
        print(f"Upload folder: {app.config['UPLOAD_FOLDER']}")

    return app
