from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

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

    def __repr__(self):
        return (
            f"<User\n"
            f"  id={self.id}\n"
            f"  username={self.username}\n"
            f"  email={self.email}\n"
            f"  mobile={self.mobile}\n"
            f"  user_bio={self.user_bio}\n"
            f"  photo_url={self.photo_url}\n"
            f">"
        )

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

    def __repr__(self):
        return (
            f"<Post\n"
            f"  id={self.id}\n"
            f"  user_id={self.user_id}\n"
            f"  caption={self.caption}\n"
            f"  media_url={self.media_url}\n"
            f"  external_link={self.external_link}\n"
            f"  food_id={self.food_id}\n"
            f"  location_tag={self.location_tag}\n"
            f"  profile_tag={self.profile_tag}\n"
            f"  mobile={self.mobile}\n"
            f">"
        )
class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    def __repr__(self):
        return (
            f"<Comment\n"
            f"  id={self.id}\n"
            f"  post_id={self.post_id}\n"
            f"  user_id={self.user_id}\n"
            f"  content={self.content}\n"
            f">"
        )

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')

    def __repr__(self):
        return (
            f"<Like\n"
            f"  id={self.id}\n"
            f"  post_id={self.post_id}\n"
            f"  user_id={self.user_id}\n"
            f">"
        )

class Favourite(db.Model):
    __tablename__ = 'favourites'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='favourites')
    post = db.relationship('Post', back_populates='favourites')

    def __repr__(self):
        return (
            f"<Favourite\n"
            f"  id={self.id}\n"
            f"  post_id={self.post_id}\n"
            f"  user_id={self.user_id}\n"
            f">"
        )

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)

    follower = db.relationship('User', foreign_keys=[follower_id], back_populates='following')
    followed = db.relationship('User', foreign_keys=[followed_id], back_populates='followers')

    def __repr__(self):
        return (
            f"<Follow\n"
            f"  id={self.id}\n"
            f"  follower_id={self.follower_id}\n"
            f"  followed_id={self.followed_id}\n"
            f">"
        )

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

    def __repr__(self):
        return (
            f"<Food\n"
            f"  id={self.id}\n"
            f"  name={self.name}\n"
            f"  link={self.link}\n"
            f"  user_id={self.user_id}\n"
            f"  type_food={self.type_food}\n"
            f"  price={self.price}\n"
            f"  photo_url={self.photo_url}\n"
            f">"
        )