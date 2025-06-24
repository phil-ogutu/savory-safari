from app import app
from models import db, User, Food, Post, Comment, Like, Favourite, Follow
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

    # Foods
    pizza = Food(name="Pizza", link="http://pizza.com", user=alice, type_food="Fast Food", price="500", photo_url="http://pizza.jpg")
    burger = Food(name="Burger", link="http://burger.com", user=bob, type_food="Snack", price="350", photo_url="http://burger.jpg")

    db.session.add_all([pizza, burger])
    db.session.commit()

    # Posts
    post1 = Post(user=alice, caption="Best pizza ever!", media_url="http://post1.jpg", food=pizza, location_tag="Nairobi", profile_tag="alice", mobile="0700000001")
    post2 = Post(user=bob, caption="Try my juicy burger!", media_url="http://post2.jpg", food=burger, location_tag="Mombasa", profile_tag="bob", mobile="0700000002")

    db.session.add_all([post1, post2])
    db.session.commit()

    # Comments
    comment1 = Comment(user=charlie, post=post1, content="Looks delicious!")
    comment2 = Comment(user=alice, post=post2, content="Wow, I need to try this!")

    db.session.add_all([comment1, comment2])
    db.session.commit()

    # Likes
    like1 = Like(user=charlie, post=post1)
    like2 = Like(user=alice, post=post2)

    db.session.add_all([like1, like2])
    db.session.commit()

    # Favourites
    fav1 = Favourite(user=charlie, post=post1)
    fav2 = Favourite(user=alice, post=post2)

    db.session.add_all([fav1, fav2])
    db.session.commit()

    # Follows
    follow1 = Follow(follower=alice, followed=bob)
    follow2 = Follow(follower=charlie, followed=alice)

    db.session.add_all([follow1, follow2])
    db.session.commit()

    print("Seeding complete!")


