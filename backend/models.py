from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    mobile = db.Column(db.String)
    password_hash = db.Column(db.String)
    user_bio = db.Column(db.String)
    photo_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    favourites = db.relationship('Favourite', back_populates='user')
    foods = db.relationship('Food', back_populates='user')
    following = db.relationship('Follow', foreign_keys='Follow.follower_id', back_populates='follower')
    followers = db.relationship('Follow', foreign_keys='Follow.followed_id', back_populates='followed')



class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    caption = db.Column(db.String)
    media_url = db.Column(db.String)
    external_link = db.Column(db.String)
    food_id = db.Column(db.Integer, db.ForeignKey('foods.id'))
    location_tag = db.Column(db.String)
    profile_tag = db.Column(db.String)
    mobile = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='posts')
    food = db.relationship('Food', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')
    likes = db.relationship('Like', back_populates='post')
    favourites = db.relationship('Favourite', back_populates='post')


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')


class Favourite(db.Model):
    __tablename__ = 'favourites'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='favourites')
    post = db.relationship('Post', back_populates='favourites')


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)

    follower = db.relationship('User', foreign_keys=[follower_id], back_populates='following')
    followed = db.relationship('User', foreign_keys=[followed_id], back_populates='followers')


class Food(db.Model):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    link = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    type_food = db.Column(db.String)
    price = db.Column(db.String)
    photo_url = db.Column(db.String)

    user = db.relationship('User', back_populates='foods')
    posts = db.relationship('Post', back_populates='food')