from backend import create_app, db
from backend.models import User

app = create_app()

with app.app_context():
    admin_user = User(name='Admin', email='admin@example.com', is_admin=True)
    admin_user.set_password('adminpassword')
    db.session.add(admin_user)
    db.session.commit()
    print("Admin user created successfully.")
