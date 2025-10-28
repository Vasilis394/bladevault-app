const express = require('express');
const router = express.Router();

const User = require('../models/user.js')

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const category = req.query.category; // Get category from query string
        const search = req.query.search;
        
        let knivesToShow = currentUser.blade;
        
        // Filter by category 
        if (category && category !== 'all') {
            knivesToShow = currentUser.blade.filter(knife => knife.category === category);
        }

        // Filter by search term if provided
        if (search && search.trim() !== '') {
            const searchTerm = search.toLowerCase().trim();
            knivesToShow = knivesToShow.filter(knife => 
                knife.name.toLowerCase().includes(searchTerm)
            );
        }
        
        res.render("knives/index.ejs", {
            knife: knivesToShow,
            selectedCategory: category || 'all',
            searchTerm: search || '', // Pass search term back to template
            user: currentUser // Pass the user to the template

        });
    } catch (error){
        console.log(error)
        res.redirect("/")
    }
});

  

  router.get('/new', async (req, res) => {
    try {
        res.render('knives/new.ejs')
    } catch (error){
        console.log(error);
    }
  })

  router.post('/', async(req, res) => {
    const currestUser = await User.findById(req.session.user._id);

    currestUser.blade.push(req.body);

    await currestUser.save();

    res.redirect(`/users/${currestUser._id}/knives`);
  })

  

router.get('/:knifeId', async (req, res) => {
    try{
const currentUser = await User.findById(req.session.user._id);
const knife = currentUser.blade.id(req.params.knifeId);
res.render('knives/show.ejs', {knife: knife})
    } catch(error){
        console.log('show page error', error);
    }
})

router.delete('/:knifeId', async (req, res) => {
    try{
const currentUser = await User.findById(req.session.user._id);
currentUser.blade.id(req.params.knifeId).deleteOne();

await currentUser.save();
res.redirect(`/users/${currentUser._id}/knives`);

 } catch(error){
        console.log(error);
    }
})

router.get('/:knifeId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const knife = currentUser.blade.id(req.params.knifeId);
        res.render('knives/edit.ejs', {knife: knife})

    } catch(error){
        console.log(error);
    }
})

router.put('/:knifeId/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const knife = currentUser.blade.id(req.params.knifeId);
        knife.set(req.body);

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/knives/${req.params.knifeId}`);

    } catch(error){
        console.log(error);
    }
})

  module.exports = router;
