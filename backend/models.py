import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='customer') # 'admin' or 'customer'
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    wishlist = db.relationship('Wishlist', backref='user', lazy=True, cascade="all, delete-orphan")
    cart_items = db.relationship('CartItem', backref='user', lazy=True, cascade="all, delete-orphan")
    scanner_history = db.relationship('ScannerHistory', backref='user', lazy=True, cascade="all, delete-orphan")
    chat_history = db.relationship('ChatHistory', backref='user', lazy=True, cascade="all, delete-orphan")

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.String(100), primary_key=True) # e.g. "fatty", "conference-gold"
    name_en = db.Column(db.String(255), nullable=False)
    name_ur = db.Column(db.String(255), nullable=False)
    generic_name_en = db.Column(db.String(255))
    generic_name_ur = db.Column(db.String(255))
    slug = db.Column(db.String(100), unique=True, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float, default=4.5)
    active_ingredient = db.Column(db.String(255))
    formulation = db.Column(db.String(100))
    packaging = db.Column(db.String(255))
    product_code = db.Column(db.String(100))
    price = db.Column(db.Float, nullable=False)
    old_price = db.Column(db.Float)
    stock_status = db.Column(db.String(50), default='In Stock')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.String(100), primary_key=True) # Order ID generated on server or client
    order_number = db.Column(db.String(100), unique=True, nullable=False) # e.g. VA-YYYY-NNNN
    customer_name = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    province = db.Column(db.String(100), nullable=False)
    postal_code = db.Column(db.String(100))
    address = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text)
    status = db.Column(db.String(50), default='pending') # pending, confirmed, dispatched, delivered, cancelled
    quantity = db.Column(db.Integer, default=1)
    total_amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(100), default='COD') # COD, Stripe, JazzCash, Easypaisa, Bank
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade="all, delete-orphan")
    payments = db.relationship('Payment', backref='order', lazy=True, cascade="all, delete-orphan")
    screenshots = db.relationship('PaymentScreenshot', backref='order', lazy=True, cascade="all, delete-orphan")

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(100), db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.String(100), nullable=False)
    product_name = db.Column(db.String(255), nullable=False)
    pack_size = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(100), db.ForeignKey('orders.id'), nullable=False)
    method = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='pending') # pending, approved, rejected, request_new
    transaction_ref = db.Column(db.String(255))
    timestamp = db.Column(db.String(100))
    receiver_wallet = db.Column(db.String(100))
    sender_name = db.Column(db.String(255))
    confidence_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class PaymentScreenshot(db.Model):
    __tablename__ = 'payment_screenshots'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(100), db.ForeignKey('orders.id'), nullable=False)
    file_path = db.Column(db.String(512))
    base64_data = db.Column(db.Text)
    ocr_report = db.Column(db.Text) # JSON string
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.String(100), nullable=False)
    user_name = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, default=5)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Wishlist(db.Model):
    __tablename__ = 'wishlist'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class CartItem(db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    size = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class ScannerHistory(db.Model):
    __tablename__ = 'scanner_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    crop_type = db.Column(db.String(255))
    diagnosis = db.Column(db.Text)
    recommended_treatment = db.Column(db.Text)
    base64_image = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class ChatHistory(db.Model):
    __tablename__ = 'chat_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    role = db.Column(db.String(50), nullable=False) # 'user', 'assistant'
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100)) # e.g. "new_order", "payment_uploaded"
    message = db.Column(db.Text, nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Coupon(db.Model):
    __tablename__ = 'coupons'
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(100), unique=True, nullable=False)
    discount_percent = db.Column(db.Float, nullable=False)
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Inventory(db.Model):
    __tablename__ = 'inventory'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(50), nullable=False)
    stock = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class AdminLog(db.Model):
    __tablename__ = 'admin_logs'
    id = db.Column(db.Integer, primary_key=True)
    admin_user = db.Column(db.String(255), nullable=False)
    action = db.Column(db.Text, nullable=False)
    ip_address = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
