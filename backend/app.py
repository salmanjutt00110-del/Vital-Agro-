import os
import time
import json
import base64
import jwt
from threading import Lock
from functools import wraps
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Product, Order, OrderItem, Payment, PaymentScreenshot, Review, Wishlist, CartItem, ScannerHistory, ChatHistory, Notification, Coupon, Inventory, AdminLog

app = Flask(__name__)
CORS(app)

# Load secret keys
JWT_SECRET = os.environ.get("JWT_SECRET", "super_premium_secure_jwt_secret_token_12345")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@vitalagro.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "your_secure_password_here")
GEMINI_API_KEY = os.environ.get("VITE_GEMINI_API_KEY") or os.environ.get("GEMINI_API_KEY", "")

# Thread-safe local rate limiter dictionary to avoid redis dependency
ip_request_times = {}
rate_limiter_lock = Lock()
RATE_LIMIT_MAX = 60 # 60 requests per minute
RATE_LIMIT_WINDOW = 60 # seconds

# Configuration: PostgreSQL with SQLite fallback
DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL:
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///vital_agro.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# Create tables and load mock products if database is fresh
with app.app_context():
    db.create_all()

# Utility functions
def verify_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if token and token.startswith("Bearer "):
            token = token.split(" ")[1]
        else:
            return jsonify({"error": "Unauthorized"}), 401
        
        user_data = verify_token(token)
        if not user_data:
            return jsonify({"error": "Invalid or expired token"}), 401
        
        request.user = user_data
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if token and token.startswith("Bearer "):
            token = token.split(" ")[1]
        else:
            return jsonify({"error": "Unauthorized"}), 401
        
        user_data = verify_token(token)
        if not user_data or user_data.get("role") != "admin":
            return jsonify({"error": "Admin privileges required"}), 403
        
        request.user = user_data
        return f(*args, **kwargs)
    return decorated

# Simple Rate Limiter Middleware
@app.before_request
def rate_limit():
    ip = request.remote_addr
    now = time.time()
    with rate_limiter_lock:
        if ip not in ip_request_times:
            ip_request_times[ip] = []
        
        # Filter request timestamps older than rate limit window
        ip_request_times[ip] = [t for t in ip_request_times[ip] if now - t < RATE_LIMIT_WINDOW]
        
        if len(ip_request_times[ip]) >= RATE_LIMIT_MAX:
            return jsonify({"error": "Too many requests. Please try again in a minute."}), 429
        
        ip_request_times[ip].append(now)

# Authentication Endpoints
@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400
    
    hashed_pwd = generate_password_hash(password)
    user = User(email=email, password_hash=hashed_pwd, role="customer")
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    # Check Admin Credentials via environment configs
    if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
        payload = {
            "user_id": "admin-uid",
            "email": email,
            "role": "admin",
            "exp": time.time() + 86400 # 24 hours
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
        return jsonify({
            "token": token,
            "user": {"email": email, "id": "admin-uid", "role": "admin"}
        }), 200
    
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 400
    
    payload = {
        "user_id": user.id,
        "email": user.email,
        "role": user.role,
        "exp": time.time() + 86400
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return jsonify({
        "token": token,
        "user": {"email": user.email, "id": user.id, "role": user.role}
    }), 200

@app.route("/api/auth/me", methods=["GET"])
@login_required
def auth_me():
    return jsonify({"user": request.user}), 200

# Products Endpoints
@app.route("/api/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    # If database has no products, return empty list (frontend handles seeding or fallback)
    output = []
    for p in products:
        output.append({
            "id": p.id,
            "name": {"en": p.name_en, "ur": p.name_ur},
            "genericName": {"en": p.generic_name_en, "ur": p.generic_name_ur},
            "slug": p.slug,
            "category": p.category,
            "rating": p.rating,
            "activeIngredient": p.active_ingredient,
            "formulation": p.formulation,
            "packaging": p.packaging,
            "productCode": p.product_code,
            "price": p.price,
            "oldPrice": p.old_price,
            "stockStatus": p.stock_status
        })
    return jsonify(output), 200

@app.route("/api/products/<product_id>", methods=["GET"])
def get_product_details(product_id):
    p = Product.query.filter_by(id=product_id).first()
    if not p:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({
        "id": p.id,
        "name": {"en": p.name_en, "ur": p.name_ur},
        "genericName": {"en": p.generic_name_en, "ur": p.generic_name_ur},
        "slug": p.slug,
        "category": p.category,
        "rating": p.rating,
        "activeIngredient": p.active_ingredient,
        "formulation": p.formulation,
        "packaging": p.packaging,
        "productCode": p.product_code,
        "price": p.price,
        "oldPrice": p.old_price,
        "stockStatus": p.stock_status
    }), 200

# Orders API
@app.route("/api/orders", methods=["POST"])
def place_order():
    data = request.get_json() or {}
    customer = data.get("customer", {})
    item = data.get("item", {})
    
    if not customer or not item:
        return jsonify({"error": "Missing customer or item payload parameters"}), 400
    
    # Generate sequential Order ID VA-YYYY-NNNN
    year = datetime.datetime.utcnow().year
    order_count = Order.query.count() + 1
    order_number = f"VA-{year}-{str(order_count).padStart(4, '0')}"
    
    order_id = data.get("id") or f"va-order-{int(time.time())}"
    
    new_order = Order(
        id=order_id,
        order_number=order_number,
        customer_name=customer.get("name"),
        phone=customer.get("phone"),
        city=customer.get("city"),
        province=customer.get("province"),
        postal_code=customer.get("postalCode"),
        address=customer.get("address"),
        notes=customer.get("specialInstructions", ""),
        status="pending",
        quantity=item.get("quantity", 1),
        total_amount=data.get("totalAmount"),
        payment_method=data.get("paymentMethod", "COD")
    )
    
    order_item = OrderItem(
        order_id=order_id,
        product_id=item.get("productId"),
        product_name=item.get("productName"),
        pack_size=item.get("packSize"),
        quantity=item.get("quantity"),
        price=item.get("price")
    )
    
    # If payment details are attached (e.g. from receipt verify screenshot or card)
    payment_details_data = data.get("paymentDetails")
    if payment_details_data:
        new_payment = Payment(
            order_id=order_id,
            method=data.get("paymentMethod"),
            amount=payment_details_data.get("amountPaid", 0),
            status=payment_details_data.get("status", "pending"),
            transaction_ref=payment_details_data.get("refId"),
            timestamp=payment_details_data.get("timestamp"),
            receiver_wallet=payment_details_data.get("receiverWallet"),
            sender_name=payment_details_data.get("senderName"),
            confidence_score=payment_details_data.get("confidenceScore")
        )
        db.session.add(new_payment)
        
        screenshot_base64 = payment_details_data.get("receiptBase64")
        if screenshot_base64:
            new_screenshot = PaymentScreenshot(
                order_id=order_id,
                base64_data=screenshot_base64,
                ocr_report=json.dumps(payment_details_data)
            )
            db.session.add(new_screenshot)
            
    db.session.add(new_order)
    db.session.add(order_item)
    db.session.commit()
    
    # Notify Admin Log
    admin_log = AdminLog(admin_user="system", action=f"Order {order_number} was successfully placed")
    db.session.add(admin_log)
    db.session.commit()
    
    return jsonify({"message": "Order created successfully", "order_id": order_id, "order_number": order_number}), 201

@app.route("/api/orders/<order_id>", methods=["GET"])
def get_order(order_id):
    order = Order.query.filter_by(id=order_id).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404
        
    order_item = OrderItem.query.filter_by(order_id=order_id).first()
    payment = Payment.query.filter_by(order_id=order_id).first()
    screenshot = PaymentScreenshot.query.filter_by(order_id=order_id).first()
    
    payment_details = None
    if payment:
        payment_details = {
            "refId": payment.transaction_ref,
            "amountPaid": payment.amount,
            "status": payment.status,
            "timestamp": payment.timestamp,
            "receiverWallet": payment.receiver_wallet,
            "senderName": payment.sender_name,
            "confidenceScore": payment.confidence_score,
            "receiptBase64": screenshot.base64_data if screenshot else None
        }
        
    return jsonify({
        "id": order.id,
        "orderNumber": order.order_number,
        "status": order.status,
        "paymentMethod": order.payment_method,
        "totalAmount": order.total_amount,
        "createdAt": order.created_at.isoformat() + "Z",
        "updatedAt": order.updated_at.isoformat() + "Z",
        "customer": {
            "name": order.customer_name,
            "phone": order.phone,
            "city": order.city,
            "province": order.province,
            "postalCode": order.postal_code,
            "address": order.address,
            "specialInstructions": order.notes
        },
        "item": {
            "productId": order_item.product_id if order_item else "",
            "productName": order_item.product_name if order_item else "",
            "packSize": order_item.pack_size if order_item else "",
            "quantity": order_item.quantity if order_item else 1,
            "price": order_item.price if order_item else 0
        },
        "paymentDetails": payment_details
    }), 200

@app.route("/api/orders", methods=["GET"])
@admin_required
def list_orders():
    orders = Order.query.all()
    output = []
    for order in orders:
        order_item = OrderItem.query.filter_by(order_id=order.id).first()
        payment = Payment.query.filter_by(order_id=order.id).first()
        screenshot = PaymentScreenshot.query.filter_by(order_id=order.id).first()
        
        payment_details = None
        if payment:
            payment_details = {
                "refId": payment.transaction_ref,
                "amountPaid": payment.amount,
                "status": payment.status,
                "timestamp": payment.timestamp,
                "receiverWallet": payment.receiver_wallet,
                "senderName": payment.sender_name,
                "confidenceScore": payment.confidence_score,
                "receiptBase64": screenshot.base64_data if screenshot else None
            }
            
        output.append({
            "id": order.id,
            "orderNumber": order.order_number,
            "status": order.status,
            "paymentMethod": order.payment_method,
            "totalAmount": order.total_amount,
            "createdAt": order.created_at.isoformat() + "Z",
            "updatedAt": order.updated_at.isoformat() + "Z",
            "customer": {
                "name": order.customer_name,
                "phone": order.phone,
                "city": order.city,
                "province": order.province,
                "address": order.address,
                "specialInstructions": order.notes
            },
            "item": {
                "productName": order_item.product_name if order_item else "",
                "packSize": order_item.pack_size if order_item else "",
                "quantity": order_item.quantity if order_item else 1,
                "price": order_item.price if order_item else 0
            },
            "paymentDetails": payment_details
        })
    # Sort orders by created date descending
    output.sort(key=lambda x: x["createdAt"], reverse=True)
    return jsonify(output), 200

@app.route("/api/orders/<order_id>/status", methods=["PUT"])
@admin_required
def update_order_status(order_id):
    order = Order.query.filter_by(id=order_id).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404
        
    data = request.get_json() or {}
    new_status = data.get("status")
    
    if new_status:
        order.status = new_status
        
    payment_details_data = data.get("paymentDetails")
    if payment_details_data:
        payment = Payment.query.filter_by(order_id=order_id).first()
        if payment:
            payment.status = payment_details_data.get("status", payment.status)
            payment.transaction_ref = payment_details_data.get("refId", payment.transaction_ref)
            payment.amount = payment_details_data.get("amountPaid", payment.amount)
            
    db.session.commit()
    
    log = AdminLog(admin_user=request.user.get("email", "admin"), action=f"Updated status of Order {order.order_number} to {new_status}")
    db.session.add(log)
    db.session.commit()
    
    return jsonify({"message": "Order updated successfully"}), 200

# OCR Payment verification proxy using client key securely
@app.route("/api/payments/verify-receipt", methods=["POST"])
def verify_payment_receipt():
    data = request.get_json() or {}
    ref_id = data.get("refId")
    
    # Check for duplicate double-spend payments database reference numbers
    if ref_id:
        existing = Payment.query.filter_by(transaction_ref=ref_id).first()
        if existing:
            return jsonify({
                "duplicate": True,
                "error": "Duplicate transaction detected. This reference ID was already validated."
            }), 400
            
    return jsonify({
        "duplicate": False,
        "message": "Transaction Reference ID is unique"
    }), 200

# Crop disease detector scanner proxies
@app.route("/api/scanner/diagnose", methods=["POST"])
def diagnose_crop():
    # Placeholder database record registration
    data = request.get_json() or {}
    base64_image = data.get("image")
    crop_type = data.get("cropType", "Unknown")
    
    new_diag = ScannerHistory(
        crop_type=crop_type,
        diagnosis="Awaiting evaluation",
        recommended_treatment="",
        base64_image=base64_image[:1000] if base64_image else ""
    )
    db.session.add(new_diag)
    db.session.commit()
    
    return jsonify({"id": new_diag.id, "message": "Scanner entry logged"}), 200

# Chatbot proxies
@app.route("/api/chatbot/ask", methods=["POST"])
def chat():
    # Register chat histories in SQLite/Postgres log database
    data = request.get_json() or {}
    message = data.get("message")
    
    new_chat = ChatHistory(
        role="user",
        content=message
    )
    db.session.add(new_chat)
    db.session.commit()
    
    return jsonify({"status": "received"}), 200

# Admin Stats Endpoints
@app.route("/api/admin/stats", methods=["GET"])
@admin_required
def get_admin_stats():
    orders = Order.query.all()
    total = len(orders)
    pending = len([o for o in orders if o.status == 'pending'])
    confirmed = len([o for o in orders if o.status == 'confirmed'])
    delivered = len([o for o in orders if o.status == 'delivered'])
    revenue = sum([o.total_amount for o in orders if o.status == 'delivered'])
    
    # Compute orders today
    today_str = datetime.date.today().isoformat()
    today_orders = len([o for o in orders if o.created_at.date().isoformat() == today_str])
    
    return jsonify({
        "total": total,
        "pending": pending,
        "confirmed": confirmed,
        "delivered": delivered,
        "revenue": revenue,
        "todayOrders": today_orders
    }), 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)
