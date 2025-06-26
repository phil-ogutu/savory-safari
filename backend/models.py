from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    mobile = db.Column(db.String)
    password_hash = db.Column(db.String)
    user_bio = db.Column(db.String)
    photo_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user_post_interactions = db.relationship('UserPost', back_populates='user')

    serialize_rules = ('-user_post_interactions.user', )

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
    
class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    mobile = db.Column(db.String)
    password_hash = db.Column(db.String)
    restaurant_bio = db.Column(db.String)
    photo_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)

    posts = db.relationship('Post', back_populates='restaurant')

    serialize_rules = ('-posts.restaurant', '-password_hash',)

    def __repr__(self):
        return (
            f"<Restaurant\n"
            f"  id={self.id}\n"
            f"  name={self.name}\n"
            f"  email={self.email}\n"
            f"  mobile={self.mobile}\n"
            f"  restaurant_bio={self.restaurant_bio}\n"
            f"  photo_url={self.photo_url}\n"
            f">"
        )

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    caption = db.Column(db.String)
    media_url = db.Column(db.String)
    location_tag = db.Column(db.String)
    price = db.Column(db.Float)
    type_food = db.Column(db.String)
    category=db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)

    restaurant = db.relationship('Restaurant', back_populates='posts')
    
    user_post_interactions = db.relationship('UserPost', back_populates='post')

    serialize_rules = ('-restaurant.posts', '-user_post_interactions.post',)


    def __repr__(self):
        return (
            f"<Post\n"
            f"  id={self.id}\n"
            f"  restaurant_id={self.restaurant_id}\n"
            f"  caption={self.caption}\n"
            f"  media_url={self.media_url}\n"
            f"  location_tag={self.location_tag}\n"
            f"  price={self.price}\n"
            f"  type_food={self.type_food}\n"
            f"  category={self.category}\n"
            f">"
        )
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user_post_comments = db.relationship('UserPost', back_populates='comment')

    serialize_rules = ('-user_post_comments.comment',)

    def __repr__(self):
        return (
            f"<Comment\n"
            f"  id={self.id}\n"
            f"  content={self.content}\n"
            f">"
        )

class UserPost(db.Model, SerializerMixin):
    __tablename__ = 'user_posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), default=None)
    liked = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='user_post_interactions')
    post = db.relationship('Post', back_populates='user_post_interactions')
    comment = db.relationship('Comment', back_populates='user_post_comments')

    serialize_rules = (
        '-user.user_post_interactions',
        '-post.user_post_interactions',
        '-comment.user_post_comments',
    )

    def __repr__(self):
        return (
            f"<UserPost\n"
            f"  id={self.id}\n"
            f"  user_id={self.user_id}\n"
            f"  post_id={self.post_id}\n"
            f"  comment_id={self.comment_id}\n"
            f"  liked={self.liked}\n"
            f">"
        )