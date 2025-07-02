from app import app
from models import db, User, Restaurant, Post, Comment, UserPost
from faker import Faker
from datetime import datetime

fake = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Seed Users
    users = []
    for _ in range(20):
        username = fake.user_name()
        email = fake.email()
        mobile = fake.phone_number()
        password_hash = fake.sha256()
        user_bio = fake.text(max_nb_chars=100)
        photo_url = fake.image_url()
        user = User(username=username, email=email, mobile=mobile, password_hash=password_hash, user_bio=user_bio, photo_url=photo_url)
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    # Seed Restaurants
    restaurants = []
    for _ in range(20):
        name = fake.company()
        email = fake.email()
        mobile = fake.phone_number()
        password_hash = fake.sha256()
        restaurant_bio = fake.text(max_nb_chars=100)
        photo_url = fake.image_url()
        restaurant = Restaurant(name=name, email=email, mobile=mobile, password_hash=password_hash, restaurant_bio=restaurant_bio, photo_url=photo_url)
        restaurants.append(restaurant)

    db.session.add_all(restaurants)
    db.session.commit()

    # Seed Posts
    posts = []
    for _ in range(20):
        restaurant = fake.random_element(restaurants)
        caption = fake.text(max_nb_chars=50)
        media_url = fake.image_url()
        location_tag = fake.city()
        price = fake.random_int(min=100, max=8000)
        type_food = fake.word()
        category = fake.word()
        post = Post(restaurant=restaurant, caption=caption, media_url=media_url, location_tag=location_tag, price=price, type_food=type_food, category=category)
        posts.append(post)

    db.session.add_all(posts)
    db.session.commit()

    # Seed Comments
    comments = []
    for _ in range(20):
        content = fake.text(max_nb_chars=200)
        comment = Comment(content=content)
        comments.append(comment)

    db.session.add_all(comments)
    db.session.commit()

    # Seed UserPost relationships
    user_posts = []
    for _ in range(20):
        user = fake.random_element(users)
        post = fake.random_element(posts)
        comment = fake.random_element(comments)
        liked = fake.boolean()
        user_post = UserPost(user=user, post=post, comment=comment, liked=liked)
        user_posts.append(user_post)

    db.session.add_all(user_posts)
    db.session.commit()

    print("Database Seeding complete!")