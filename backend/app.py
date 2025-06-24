from flask import Flask,request,jsonify,make_response
from flask_cors import CORS
from flask_restful import Resource,Api
from flask_migrate import Migrate
from models import db, User,Post,Comment,Like,Favourite,Follow,Food


app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///savory-safari.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact=False

CORS(app)
api=Api(app)
migrate=Migrate(app,db)
db.init_app(app)


class User_list(Resource):
    def get(self):
        users=[user.to_dict()  for user in User.query.all()]
        response=make_response(
            jsonify(users),
            200        
        )
        return response
    

    def post(self):
        data=request.get_json()
        new_user=User(
            username=data.get('username'),
            email=data.get('email'),
            mobile=data.get('mobile'),
            user_bio=data.get('user_bio'),
            photo_url=data.get('photo_url')
        )
        db.session.add(new_user)
        db.session.commit()
        response_body=new_user.to_dict()
        response=make_response(
            jsonify(response_body),
            201
        )
        return response
    
api.add_resource(User_list,'/users')
    
class User_by_id(Resource):
    def get(self,id):
        user_by_id=User.query.get(id)
        if user_by_id:
            response=make_response{
                jsonify(user_by_id):
                200,
            }
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
    
api.add_resource(User_by_id,'/users/<int:id>')







    
