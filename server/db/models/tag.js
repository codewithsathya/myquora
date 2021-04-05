const mongoose = require('mongoose')
const connection = require("../../db/mongoose")
const Schema = mongoose.Schema

const tagSchema = new Schema({
        _id: {
                type: String,
                required: true,
                validate(value){
                        if(value === '')
                                throw new Error('Tag cant be empty')
                }
        }
},{
        timestamps: true
})

tagSchema.pre('save', async function(next){
        var tag = this._id
        const tagWords = tag.split(' ')
        tag = ''
        tagWords.forEach((word, index) => {
                tag += word[0].toUpperCase() + word.slice(1)
                if(index !== tagWords.length - 1)
                        tag += ' '
        })
        this._id = tag
        next()
})

const Tag = connection.model('Tag', tagSchema)

module.exports = Tag