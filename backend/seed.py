from app import app
from models import db, User, Restaurant, Post, Comment, UserPost
from datetime import datetime

with app.app_context():
    db.drop_all()
    db.create_all()

    # Users
    alice = User(username="alice", email="alice@alice.com", mobile="0700000001", password_hash="hash1", user_bio="Foodie", photo_url="http://alice.jpg")
    bob = User(username="bob", email="bob@bob.com", mobile="0700000002", password_hash="hash2", user_bio="Chef", photo_url="http://bob.jpg")
    charlie = User(username="charlie", email="charlie@charlie.com", mobile="0700000003", password_hash="hash3", user_bio="Home cook", photo_url="http://charlie.jpg")

    db.session.add_all([alice, bob, charlie])
    db.session.commit()

    # Restaurants
    kfc = Restaurant(name="KFC", email="info@kfc.com", mobile="0700000000", password_hash="hash1", restaurant_bio="Finger-licking good", photo_url="http://kfc.jpg")
    nyama_mama = Restaurant(name="Nyama Mama", email="info@nyamamama.com", mobile="0700000000", password_hash="hash2", restaurant_bio="Home of tasty African dishes", photo_url="http://nyamamama.jpg")

    # Posts
    post1 = Post(restaurant=kfc, caption="New burger alert!!", media_url="http://burger.jpg", location_tag="Nairobi", price=400, type_food="Burger", category="Fast Food")
    post2 = Post(restaurant=nyama_mama, caption="Mbuzi Quarter!",  media_url="http://ugalinyama.jpg", location_tag="Mombasa", price=600, type_food="Nyama Choma", category="African")

    db.session.add_all([post1, post2, kfc, nyama_mama])
    db.session.commit()

    # Comments
    comment1 = Comment(content="This looks mouthwatering")
    comment2 = Comment(content="Can't wait to try this out!")

    db.session.add_all([comment1, comment2])
    db.session.commit()

    up1 = UserPost(user=alice, post=post1, comment=comment1, liked=True)
    up2 = UserPost(user=charlie, post=post2, comment=comment2, liked=False)
    up3 = UserPost(user=bob, post=post2, liked=True) 

    db.session.add_all([up1, up2, up3])
    db.session.commit()

    print("Seeding complete!")