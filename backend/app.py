from flask import Flask,request,jsonify,make_response
from flask_cors import CORS
from flask_restful import Resource,Api
from flask_migrate import Migrate
from models import db, User,Post,Comment,Like,Favourite,Follow,Food
import bcrypt
import jwt

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///savory-safari.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact=False

CORS(app)
migrate=Migrate(app,db)
db.init_app(app)

api=Api(app)


class Register(Resource):
    def post(self):
        data=request.get_json()
        username=data['username']
        email=data['email']
        mobile=data['mobile']
        user_bio=data['user_bio']
        photo_url=data['photo_url']
        password=data['password']
        
        if User.query.filter_by(email=email).first():
            return make_response(f'This user already exists',400)
        
        password_hash = bcrypt.hashpw(password, bcrypt.gensalt())
        new_user = User(
            username=username,
            email=email,
            mobile=mobile,
            user_bio=user_bio,
            photo_url=photo_url,
            password_hash=password_hash
        )
        db.session(new_user)
        db.session.commit()
        encoded_jwt = jwt.encode({"username": new_user.username,id:new_user.id}, "secret", algorithm="HS256")

        response=make_response(
           {"token":encoded_jwt,"message":"User created successfully"},
           201
        )
        return response
    
class Login(Resource):
    def post(self):
        data=request.get_json()
        email=data['email']
        password=data['password']

        user = User.query.filter_by(email=email).first()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash):
            encoded_jwt = jwt.encode({"username": user.username,id:user.id}, "secret", algorithm="HS256")
            return make_response(
                {"token":encoded_jwt,"message":"Login successful"},
                201
            )
        else:
            return make_response('Invalid credentials', 400)

class User_list(Resource):
    def get(self):
        users=[user.to_dict()  for user in User.query.all()]
        response=make_response(
            jsonify(users),
            200        
        )
        return response
    
# api.add_resource(User,'/users')
    

class User_by_id(Resource):
    def get(self,id):
        user_by_id=User.query.get(id)
        if user_by_id:

            response=make_response(
                jsonify(user_by_id),
                200
            )
  
            return response
        return jsonify({'error':f'*{user_by_id.username}* not found'})
    
    def patch(self,id):
        data=request.get_json()
        user=User.query.get(id)
        for attr in data:
            setattr(user,attr,data[attr])
        db.session.commit()
        response_body=user.to_dict()
        response=make_response(
            jsonify(response_body),
            200
        )
        return response
    def delete(self,id):        
        user_to_delete=User.query.get(id)
        if user_to_delete:
                 db.session.delete(user_to_delete)
                 db.session.commit()
                 response_body=jsonify({'Message':f'User : *{user_to_delete.username}* is deleted successfully'})
                 return make_response(
                      response_body,
                      200
                 )
        return jsonify({'Alert':f'User with id *{id}* not found!'}), 404             


    
class Posts(Resource):
    def get(self):
        posts=[post.to_dict()  for post in Post.query.all()]
        response=make_response(
            jsonify(posts),
            200        
        )
        return response
    
    def post(self):
        data = request.get_json()
        
        user_id = data['user_id']
        caption = data['caption']
        media_url = data['media_url']
        external_link = data['external_link']
        food_id = data['food_id']
        location_tag = data['location_tag']
        profile_tag = data['profile_tag']
        mobile = data['mobile']


        new_post = Post(
            user_id=user_id,
            caption=caption,
            media_url=media_url,
            external_link=external_link,
            food_id=food_id,
            location_tag=location_tag,
            profile_tag=profile_tag,
            mobile=mobile
        )

        db.session.add(new_post)
        db.session.commit()

        response = make_response(
            {"message": "Post created successfully", "post_id": new_post.id},
            201
        )
        return response
    
class PostById(Resource):
    def get(self, id):
        post = Post.query.get(id)
        if post:
            return make_response(post.to_dict(), 200)
        return make_response({'message': 'Post not found'}, 404)

    def put(self, id):
        post = Post.query.get(id)
        if not post:
            return make_response({'error': 'Post not found'}, 404)

        data = request.get_json()

        post.user_id = data['user_id']
        post.caption = data['caption']
        post.media_url = data['media_url']
        post.external_link = data['external_link']
        post.food_id = data['food_id']
        post.location_tag = data['location_tag']
        post.profile_tag = data['profile_tag']
        post.mobile = data['mobile']

        db.session.commit()
        return make_response({'message': 'Post updated successfully'}, 200)

    def patch(self, id):
        post = Post.query.get(id)
        if not post:
            return make_response({'error': 'Post not found'}, 404)

        data = request.get_json()

        # Only update fields that are present in the request
        for field in ['user_id', 'caption', 'media_url', 'external_link', 'food_id', 'location_tag', 'profile_tag', 'mobile']:
            if field in data:
                setattr(post, field, data[field])

        db.session.commit()
        return make_response({'message': 'Post updated'}, 200)

    def delete(self, id):
        post = Post.query.get(id)
        if not post:
            return make_response({'error': 'Post not found'}, 404)

        db.session.delete(post)
        db.session.commit()
        return make_response({'message': 'Post deleted successfully'}, 200)


api.add_resource(Register,'/api/users/register')
api.add_resource(Login,'/api/users/login')

api.add_resource(User_by_id,'/users/<int:id>')
api.add_resource(User_list,'/users')
# Posts
api.add_resource(Posts,'/api/posts')
api.add_resource(PostById,'/api/posts/<int:id>')
