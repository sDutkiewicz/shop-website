from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.config import Config
import os

db = SQLAlchemy()

UPLOAD_FOLDER = 'static/uploads'  # Folder for uploaded images

def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object(Config)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['SECRET_KEY'] = 'wowow'  # Set a secret key

    db.init_app(app)

    with app.app_context():
        from backend import routes
        app.register_blueprint(routes.routes)

        db.create_all()

        # Print debug info on startup
        if not hasattr(app, 'template_folder_printed'):
            print(f"Template folder: {app.template_folder}")
            print(f"Static folder: {app.static_folder}")
            app.template_folder_printed = True

    return app
