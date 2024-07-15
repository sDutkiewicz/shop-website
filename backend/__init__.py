from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        from backend import routes
        app.register_blueprint(routes.routes)

        db.create_all()

        # Using a workaround for debugging
        if not hasattr(app, 'template_folder_printed'):
            print(f"Template folder: {app.template_folder}")
            print(f"Static folder: {app.static_folder}")
            app.template_folder_printed = True

    return app
