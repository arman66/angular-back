const mongoose= require('mongoose');


const Schema = mongoose.Schema;


const UserModel= require('./user-model.js');




const taskSchema= new Schema(
  {
    name:
    {
      type: String,
      required:[true,'tell us your task']
    },

    owner:
    {
        type: Schema.Types.ObjectId,
        required: [true, 'tasks need an owner']

    },

    frequency:
      {
        type: String,

      },

    isGood:{
      type: Boolean,
    },

    completions:[

      {
        type: Date
      }
    ]


  },
  {
    timestamps: true,
  }
);


const TaskModel= mongoose.model('Task', taskSchema);

module.exports= TaskModel;
