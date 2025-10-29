const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const User = require('../models/user.js')

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const category = req.query.category;
        const search = req.query.search;
        
        let knivesToShow = currentUser.blade;
        
        if (category && category !== 'all') {
            knivesToShow = currentUser.blade.filter(knife => knife.category === category);
        }

        if (search && search.trim() !== '') {
            const searchTerm = search.toLowerCase().trim();
            knivesToShow = knivesToShow.filter(knife => 
                knife.name.toLowerCase().includes(searchTerm)
            );
        }
        
        res.render("knives/index.ejs", {
            knife: knivesToShow,
            selectedCategory: category || 'all',
            searchTerm: search || '',
            user: currentUser
        });
    } catch (error){
        console.log(error)
        res.redirect("/")
    }
});

router.get('/new', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('knives/new.ejs', {
            user: currentUser
        });
    } catch (error){
        console.log(error);
    }
});

router.post('/', upload.single('image'), async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        
        const knifeData = {
            ...req.body,
            image: req.file ? req.file.path : null,
            imagePublicId: req.file ? req.file.filename : null
        };

        currentUser.blade.push(knifeData);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/knives`);
    } catch (error) {
        console.log(error);
        const currentUser = await User.findById(req.session.user._id);
        res.redirect(`/users/${currentUser._id}/knives/new`);
    }
});

router.get('/:knifeId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const knife = currentUser.blade.id(req.params.knifeId);
        
        // Check if knife exists
        if (!knife) {
            return res.redirect(`/users/${currentUser._id}/knives`);
        }
        
        res.render('knives/show.ejs', {
            knife: knife,
            user: currentUser
        });
    } catch(error) {
        console.log('show page error', error);
        const currentUser = await User.findById(req.session.user._id);
        res.redirect(`/users/${currentUser._id}/knives`);
    }
});

router.delete('/:knifeId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const knife = currentUser.blade.id(req.params.knifeId);
        
        if (knife && knife.imagePublicId) {
            const { cloudinary } = require('../config/cloudinary');
            await cloudinary.uploader.destroy(knife.imagePublicId);
        }
        
        if (knife) {
            knife.deleteOne();
        }
        
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/knives`);
    } catch(error) {
        console.log(error);
        const currentUser = await User.findById(req.session.user._id);
        res.redirect(`/users/${currentUser._id}/knives`);
    }
});

router.get('/:knifeId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const knife = currentUser.blade.id(req.params.knifeId);
        
        if (!knife) {
            return res.redirect(`/users/${currentUser._id}/knives`);
        }
        
        res.render('knives/edit.ejs', {
            knife: knife,
            user: currentUser
        });
    } catch(error) {
        console.log(error);
        const currentUser = await User.findById(req.session.user._id);
        res.redirect(`/users/${currentUser._id}/knives`);
    }
});

router.put('/:knifeId/', upload.single('image'), async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const knife = currentUser.blade.id(req.params.knifeId);
        
        if (!knife) {
            return res.redirect(`/users/${currentUser._id}/knives`);
        }
        
        const updateData = { ...req.body };
        
        if (req.file) {
            //delete old image from cloudinary if exists
            if (knife.imagePublicId) {
                const { cloudinary } = require('../config/cloudinary');
                await cloudinary.uploader.destroy(knife.imagePublicId);
            }
            
            updateData.image = req.file.path;
            updateData.imagePublicId = req.file.filename;
        }
        
        knife.set(updateData);
        await currentUser.save();
        
        res.redirect(`/users/${currentUser._id}/knives/${req.params.knifeId}`);
    } catch(error) {
        console.log(error);
        const currentUser = await User.findById(req.session.user._id);
        res.redirect(`/users/${currentUser._id}/knives/${req.params.knifeId}/edit`);
    }
});

module.exports = router;