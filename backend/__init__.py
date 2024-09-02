from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from config.config import Config
import os

db = SQLAlchemy()

# New upload folder outside of static directory
UPLOAD_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../uploads')

def create_app():
    base_dir = os.path.abspath(os.path.dirname(__file__))

    app = Flask(
        __name__,
        template_folder=os.path.join(base_dir, '../templates'),
        static_folder=os.path.join(base_dir, '../static')
    )
    
    app.config.from_object(Config)
    
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['SECRET_KEY'] = 'wowow'
    
    db.init_app(app)

    with app.app_context():
        from backend import routes
        app.register_blueprint(routes.routes)

        db.create_all()

        print(f"Template folder: {app.template_folder}")
        print(f"Static folder: {app.static_folder}")
        print(f"Upload folder: {app.config['UPLOAD_FOLDER']}")

    return app
