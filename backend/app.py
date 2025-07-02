from flask import Flask,request,jsonify,make_response,g
from flask_cors import CORS
from flask_restful import Resource,Api
from flask_migrate import Migrate
from models import db, User,Post,Comment, Restaurant, UserPost
import bcrypt
import jwt
from functools import wraps

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///savory-safari.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'  # used for JWT encoding/decoding
app.json.compact=False

# Corrected CORS to allow specific origin and credentials (cookies)
CORS(app, supports_credentials=True)
# Replace http://localhost:3000 with your frontend URL in production

migrate=Migrate(app,db)
db.init_app(app)

api=Api(app)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')

        if not token:
            return {"message": "Token is missing!"}, 401

        try:
            data = jwt.decode(token, 'secret', algorithms=["HS256"])
            g.user_id = data['id']
            g.user_name = data['name']
        except jwt.ExpiredSignatureError:
            return {"message": "Token expired!"}, 401
        except jwt.InvalidTokenError:
            return {"message": "Invalid token!"}, 401

        return f(*args, **kwargs)
    return decorated

class RegisterUser(Resource):
    def post(self):
        data=request.get_json()
        username=data['username']
        email=data['email']
        mobile=data['mobile']
        password=data['password']
        
        if username == None and email == None and password == None:
            return make_response(f'Required inputs must exists',400)
        
        if User.query.filter_by(email=email).first():
            return make_response(f'This user already exists',400)
        
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user = User(
            username=username,
            email=email,
            mobile=mobile,
            user_bio="",
            photo_url="",
            password_hash=password_hash
        )
        db.session.add(new_user)
        db.session.commit()

        # encode the jwt token
        encoded_jwt = jwt.encode({"name": new_user.username,"id":new_user.id,"role":"user"}, 'secret', algorithm="HS256")
        response=make_response(
           {"token":encoded_jwt,"message":"User created successfully"},
           201
        )
        # create a cookie
        response.set_cookie(
            'token',  # cookie name
            encoded_jwt,  # cookie value
            httponly=True,  # prevent JS access
            samesite='Lax',  # adjust depending on cross-site needs
            secure=False  # set to True if using HTTPS in production
        )

        return response
    
class RegisterRestaurant(Resource):
    def post(self):
        data=request.get_json()
        name=data['username']
        email=data['email']
        mobile=data['mobile']
        password=data['password']
        
        if name == None and email == None and password == None:
            return make_response(f'Required inputs must exists',400)
        
        if Restaurant.query.filter_by(name=name).first():
            return make_response(f'This Restaurant already exists',400)
        
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_restaurant = Restaurant(
            name=name,
            email=email,
            mobile=mobile,
            restaurant_bio="",
            photo_url="",
            password_hash=password_hash
        )
        db.session.add(new_restaurant)
        db.session.commit()
        encoded_jwt = jwt.encode({"name": new_restaurant.name,"id":new_restaurant.id,"role":"restaurant"}, 'secret', algorithm="HS256")

        response=make_response(
           {"token":encoded_jwt,"message":"Restaurant created successfully"},
           201
        )
        # create a cookie
        response.set_cookie(
            'token',encoded_jwt,httponly=True,samesite='Lax',secure=False
        )
        return response
    
class LoginUser(Resource):
    def post(self):
        data=request.get_json()
        email=data['email']
        password=data['password']

        user = User.query.filter_by(email=email).first()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash):
            encoded_jwt = jwt.encode({"name": user.username,"id":user.id,"role":"user"}, 'secret', algorithm="HS256")
            # Create a response object
            response = make_response(
                {"token": encoded_jwt, "message": f"Welcome Back {user.username}"},
                201
            )
            
            # Set token in cookie upon login
            response.set_cookie( 'token', encoded_jwt, httponly=True, samesite='Lax', secure=False)
            
            return response
        else:
            return make_response('Invalid credentials', 400)
               
class LoginRestaurant(Resource):
    def post(self):
        data=request.get_json()
        email=data['email']
        password=data['password']

        restaurant = Restaurant.query.filter_by(email=email).first()
        
        if restaurant and bcrypt.checkpw(password.encode('utf-8'), restaurant.password_hash):
            encoded_jwt = jwt.encode({"name": restaurant.name,"id":restaurant.id,"role":"restaurant"}, 'secret', algorithm="HS256")
            response = make_response(
                {"token": encoded_jwt, "message": f"Welcome Back {restaurant.name}"},
                201
            )
            # Set token in cookie upon login
            response.set_cookie(
                'token',
                encoded_jwt,
                httponly=True,
                samesite='Lax',
                secure=False
            )
            return response
        else:
            return make_response('Invalid credentials', 400)

#User and Restaurant Resources handle CRUD operations
class users(Resource):
    method_decorators = [token_required]
    def get(self):
        users=[user.to_dict() for user in User.query.all()]
        response=make_response(
            jsonify(users),
            200        
        )
        return response
        
class User_by_id(Resource):
    method_decorators = [token_required]
    def get(self,id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        user=User.query.get(id)
        if user:
            response=make_response(
                jsonify(user.to_dict()),
                200
            )
  
            return response
        return make_response(jsonify({'message':'user not found'}),404)
    
    def patch(self,id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        data=request.get_json()
        user=User.query.get(id)
        if user:
            for attr in data:
                setattr(user,attr,data[attr])
            db.session.commit()
            response=make_response(
                jsonify(user.to_dict()),
                200
            )
            return response
        return make_response(jsonify({'message':'user not found'}),404)
    
    def delete(self,id):  
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
              
        user=User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            response_body=jsonify({'Message':f'User : *{user.username}* is deleted successfully'})
            return make_response(
                response_body,
                200
            )
        return make_response(jsonify({'message':'user not found'}),404)           

class restaurants(Resource):
    method_decorators = [token_required]
    def get(self):
        restaurants=[restaurant.to_dict()  for restaurant in Restaurant.query.all()]
        response=make_response(
            jsonify(restaurants),
            200        
        )
        return response
        
class Restaurant_by_id(Resource):
    method_decorators = [token_required]
    def get(self,id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        restaurant=Restaurant.query.get(id)
        if restaurant:
            response=make_response(
                jsonify(restaurant.to_dict()),
                200
            )
  
            return response
        return make_response(jsonify({'message':'restaurant not found'}),404)
    
    def patch(self,id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        data=request.get_json()
        restaurant=Restaurant.query.get(id)
        if restaurant:
            for attr in data:
                setattr(restaurant,attr,data[attr])
            db.session.commit()
            response=make_response(
                jsonify(restaurant.to_dict()),
                200
            )
            return response
        return make_response(jsonify({'message':'restaurant not found'}),404)
    
    def delete(self,id):  
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
              
        restaurant=Restaurant.query.get(id)
        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            response_body=jsonify({'Message':f'restaurant : *{restaurant.name}* is deleted successfully'})
            return make_response(
                response_body,
                200
            )
        return make_response(jsonify({'message':'restaurant not found'}),404)           

#Posts Resource handles CRUD operations for posts
class Posts(Resource):
    method_decorators = [token_required]
    def get(self):
        location = request.args.get('location')
        category = request.args.get('category')
        type_food = request.args.get('type_food')

        query = Post.query

        # Dynamically add filters if query params are provided
        if location:
            query = query.filter(Post.location_tag == location)
        if category:
            query = query.filter(Post.category == category)
        if type_food:
            query = query.filter(Post.type_food == type_food)

        # Run the query
        posts = query.order_by(Post.created_at.desc()).all()
        user_id=g.user_id
        print(user_id)
        
        result = []
        for post in posts:
            # Safely get last liked value for this user
            liked_matches = [i.liked for i in post.user_post_interactions if i.user_id == user_id]
            last_liked = liked_matches[-1] if liked_matches else False

            result.append({
                "restaurant": {
                    "id": post.restaurant.id,
                    "name": post.restaurant.name,
                    "photo_url": post.restaurant.photo_url
                },
                "caption": post.caption,
                "media_url": post.media_url,
                "location_tag": post.location_tag,
                "price": post.price,
                "type_food": post.type_food,
                "category": post.category,
                "created_at": post.created_at.isoformat(),  # make sure datetime is JSON serializable
                "id": post.id,
                "liked": last_liked,
                "likes": len({i.user_id for i in post.user_post_interactions if i.liked}),
                "comments": [
                    {
                        "user": i.user.username,
                        "content": i.comment.content,
                        "created_at": i.comment.created_at.isoformat()
                    }
                    for i in post.user_post_interactions if i.comment_id is not None
                ],
            })

        return result, 200  
    
    def post(self):
        data = request.get_json()
        
        restaurant_id = data['restaurant_id'] # http://frontend.com/post/1
        caption = data['caption']
        media_file = data['media_file']
        location_tag = data['location_tag']
        type_food = data['type_food']
        price = data['price']
        category = data['category']

        # save to online storages like s3 buckets and cloudinary and returns url but have done it on the frontend

        restaurant=Restaurant.query.filter_by(id=restaurant_id)
        if restaurant:
            new_post = Post(
                restaurant_id=restaurant_id,
                caption=caption,
                media_url=media_file,
                location_tag=location_tag,
                type_food=type_food,
                price=price,
                category=category,
            )

            db.session.add(new_post)
            db.session.commit()

            response = make_response(
                {"message": "Post created successfully", "post_id": new_post.id},
                201
            )
            return response
        return make_response(jsonify({'message':'restaurant not found'}),404)  
    
class PostById(Resource):
    method_decorators = [token_required]
    def get(self, id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        post = Post.query.get(id)
        user_id = g.user_id
        if post:
            return make_response({
                "restaurant": {
                    "id": post.restaurant.id,
                    "name": post.restaurant.name
                },
                "caption": post.caption,
                "media_url": post.media_url,
                "location_tag": post.location_tag,
                "price": post.price,
                "type_food": post.type_food,
                "category": post.category,
                "created_at": post.created_at,
                "liked": [interaction.liked for interaction in post.user_post_interactions if interaction.user_id == user_id][-1],
                "likes": len({interaction.user_id for interaction in post.user_post_interactions if interaction.liked}),
                "comments": [{"user": interaction.user.username, "content": interaction.comment.content,"created_at":interaction.comment.created_at} for interaction in post.user_post_interactions if interaction.comment_id is not None],
            }, 200)
        return make_response({'message': 'Post not found'}, 404)

    def post(self,id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        post = Post.query.get(id)
        if post:
            data = request.get_json()
            user_id = data['user_id']
            content = data['content']
            recent_interaction = post.user_post_interactions[-1] if post.user_post_interactions else None
            if content is not None:
                # we are creating a new comment 
                # save a comment to db
                new_comment=Comment(
                    content=content
                )
                db.session.add(new_comment)
                db.session.commit()
                # create a new interaction
                # get recent state of interaction
                new_interaction = UserPost(
                    user_id = user_id,
                    post_id = id,
                    comment_id=new_comment.id,
                    liked=recent_interaction.liked if recent_interaction else False 
                )
                db.session.add(new_interaction)
                db.session.commit()
                return make_response(jsonify({'message':'comment created'}),201)  
            else:
                # we are liking a post
                # Like or unlike the post (toggle only user's own like)
                new_like_status = not recent_interaction.liked if recent_interaction.liked else True
                print(new_like_status)
                new_interaction = UserPost(
                    user_id = user_id,
                    post_id = id,
                    comment_id=None,
                    liked=new_like_status
                )
                db.session.add(new_interaction)
                db.session.commit()
                return make_response(jsonify({'message':'post liked'}),201)  
        return make_response({'error': 'Post not found'}, 404)

    def put(self, id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        post = Post.query.get(id)
        if post:
            data = request.get_json()

            post.caption = data['caption']
            post.media_url = data['media_url']
            post.location_tag = data['location_tag']
            post.price = data['price']
            post.type_food = data['type_food']
            post.category = data['category']

            db.session.commit()
            return make_response({'message': 'Post updated successfully'}, 200)
        return make_response({'error': 'Post not found'}, 404)

    def patch(self, id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        post = Post.query.get(id)
        if post:
            data = request.get_json()
            for field in ['caption', 'media_url', 'location_tag', 'price', 'type_food','category']:
                if field in data:
                    setattr(post, field, data[field])

            db.session.commit()
            return make_response({'message': 'Post updated'}, 200)
        return make_response({'error': 'Post not found'}, 404)

    def delete(self, id):
        if id is None:
            return make_response(jsonify({'message':'missing id parameter'}),400)
        
        post = Post.query.get(id)
        if post:
            db.session.delete(post)
            db.session.commit()
            return make_response({'message': 'Post deleted successfully'}, 200)
        return make_response({'error': 'Post not found'}, 404)

class LogoutUser(Resource):
    def post(self):
        response = make_response({"message": "Logged out successfully"}, 200)
        response.set_cookie(
            'token',
            '',  # clear cookie value
            expires=0,  # expire immediately
            httponly=True,
            samesite='Lax',
            secure=False
        )
        return response

class LogoutRestaurant(Resource):
    def post(self):
        response = make_response({"message": "Restaurant logged out successfully"}, 200)
        response.set_cookie(
            'token',
            '', 
            expires=0,  
            httponly=True,
            samesite='Lax',
            secure=False
        )
        return response

# Main route
@app.route('/')
def index():
    return make_response('Oh yes, It is our social app',200)

# Register the API routes
# Users endpoints
api.add_resource(RegisterUser,'/api/users/register')
api.add_resource(RegisterRestaurant,'/api/restaurants/register')
api.add_resource(LoginUser,'/api/users/login')
api.add_resource(LoginRestaurant,'/api/restaurants/login')

# Users
api.add_resource(users,'/users')
api.add_resource(User_by_id,'/users/<int:id>')
api.add_resource(restaurants,'/restaurants')
api.add_resource(Restaurant_by_id,'/restaurants/<int:id>')

# Posts
api.add_resource(Posts,'/api/posts')
api.add_resource(PostById,'/api/posts/<int:id>')

# Logout endpoints
api.add_resource(LogoutUser, '/api/users/logout')
api.add_resource(LogoutRestaurant, '/api/restaurants/logout')

# No need for end point for the following resources as they are already displayed in the PostById resource
# # Comments
# api.add_resource(Comments,'/api/posts/<int:id>/comments')
# api.add_resource(CommentById,'/api/posts/<int:id>/comments/<int:id>')

# # Interactions
# api.add_resource(Interactions,'/api/posts/<int:id>/interactions')
# api.add_resource(InteractionById,'/api/posts/<int:id>/interactions/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)