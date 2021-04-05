const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../mongoose");

const answerSchema = new Schema({
        author: { 
                type: Schema.Types.ObjectId, 
                required: true,
                ref: 'User' 
        },
        question: {
                type: Schema.Types.ObjectId, 
                required: true,
                ref: 'Question' 
        },
        content: { 
                type: String, 
                required: true 
        },
        views: { 
                type: Number, 
                default: 0 
        },
        upvotes: { 
                type: [Schema.Types.ObjectId], 
                default: [] 
        },
        downvotes: { 
                type: [Schema.Types.ObjectId], 
                default: [] 
        }
        //Comments field to be added if necessary
},{
        timestamps: true
});

answerSchema.pre('save', async function(next){
        this.wasNew = this.isNew
        if(this.isModified('upvotes') || this.isModified('downvotes'))
        {
                //Assuming user cannot both upvote and downvote
                await this.populate('question').execPopulate()
                // console.log(this.question)
                ++this.question.bloomIndexSum
                const daysSinceCreation = Math.floor(((new Date()).getTime() - this.question.createdAt.getTime())/(24*60*60*1000))
                this.question.bloomIndex = this.question.bloomIndexSum/(daysSinceCreation + 1)
                await this.question.save()
        }
        next()
})

answerSchema.post('save', async function(){
        if(this.wasNew)
        {
                await this.populate('question').execPopulate()
                if(this.question.isAnswered === false)
                {
                        this.question.isAnswered = true
                        await this.question.save()
                }
        }
})

const Answer = connection.model("Answer", answerSchema);

module.exports = Answer;
