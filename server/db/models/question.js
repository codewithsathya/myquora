const mongoose = require("mongoose");
const connection = require("../../db/mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
        author: { 
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
        },
        content: {  
                type: String,
                required: true 
        },
        tags: { 
                type: [String] 
        },
        views: { 
                type: Number, 
                default: 0 
        },
        isAnswered: {
                type: Boolean,
                default: false
        },
        bloomIndexSum: {
                type: Number,
                default: 0
        },
        bloomIndex: {
                type: Number,
                default: 0
        },
        creationTime: {
                type: Number,
                default: 0
        }
},{
        timestamps: true
});

QuestionSchema.virtual('answers', {
        ref: 'Answer',
        localField: '_id',
        foreignField: 'question'
})

QuestionSchema.pre('save', async function(next){
        if(this.isNew)
                this.creationTime = this.createdAt.getTime()
        next()
})

const Question = connection.model("Question", QuestionSchema);

module.exports = Question;
