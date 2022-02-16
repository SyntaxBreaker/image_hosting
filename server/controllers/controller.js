const Image = require('./../models/image');

const uploadImage = (req, res) => {
    const data = new Image({
        image: req.file.filename,
        title: req.body.title,
        description: req.body.description
    })

    data.save().then(result => {
        res.send(result);
    });

    console.log('File successfully uploaded!');
}

const getImage = (req, res) => {
    const id = req.params.id;
    res.sendFile(`uploads/${id}`, {root: './'});
}

const getImageInfo = (req, res) => {
    const id = req.params.id;
    Image.find({image: id}).then(doc => {
        res.json(doc);
    });
}

const getImages = (req, res) => {
    Image.find().then(docs => {
        const response = {
            data: docs.map(doc => ({
                image: doc.image,
                title: doc.title,
                description: doc.description
            }))
        }

        res.json(response.data);
    })
}

module.exports = {
    uploadImage,
    getImage,
    getImageInfo,
    getImages,
}