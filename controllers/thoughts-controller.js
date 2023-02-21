const {Thoughts, Users} = require('../models');

const thoughtsController = {
    
    createThought({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        }
    )
        .then(dbThoughtsdata => {
            if (!dbThoughtsdata) {
                res.status(404).json({message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbThoughtsdata);
            return;
        })
    },
    
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsdata => res.json(dbThoughtsdata))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
            return;
            
    }); 
},

    getThoughtById({params}, res) {
        Thoughts.findOne({_id: params.thoughtId})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsdata => {
            if (!dbThoughtsdata) {
                res.status(404).json({message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbThoughtsdata);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
            return;
        });
    },

    updateThought({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsdata => {
            if (!dbThoughtsdata) {
                res.status(404).json({message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbThoughtsdata);
        return;
        })
    },

    deleteThought({params}, res) {
        Thoughts.findOneAndDelete({_id: params.thoughtId})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsdata => {
            if (!dbThoughtsdata) {
                res.status(404).json({message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbThoughtsdata);
            return;
        })
    },

    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsdata => {
            if (!dbThoughtsdata) {
                res.status(404).json({message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbThoughtsdata);
            return;
        })
    },

    removeReaction({params}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtsdata => {
            if (!dbThoughtsdata) {
                res.status(404).json({message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbThoughtsdata);
            return;
        })
    }
};

module.exports = thoughtsController;