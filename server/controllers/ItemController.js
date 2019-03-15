const Item = require("../models/Item");
module.exports = {
    index(req, res) {
        Item.find({})
            .sort({ date: -1 })
            .then(items => res.json(items));
    },

    store(req, res) {
        const newItem = new Item({
            name: req.body.name
        });
        newItem.save().then(item => res.json(item));
    },
    destroy(req, res) {
        Item.findById(req.params.id)
            .then(item => item.remove().then(() => res.json({ success: true })))
            .catch(err => res.status(404).json({ success: false }));
    }
};
