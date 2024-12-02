const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

// Middleware to parse the request body
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Home Page
// Home Page
router.get('/', async (req, res) => {
  try {
      // Fetch a limited number of resources for the homepage
      const resources = await Resource.find().lean(); // Adjust the limit as needed

      res.render('pages/home', { 
          title: 'Home', 
          resources, // Pass the resources to the homepage
          user: req.session.user // Optional: Pass the user session
      });
  } catch (err) {
      console.error('Error loading homepage resources:', err.message);
      res.status(500).send(`Error loading homepage resources: ${err.message}`);
  }
});

// About Page
router.get('/about', (req, res) => {
  res.render('pages/about', { 
      title: 'About', 
      user: req.session.user // Pass the user session
  });
});

// Resources Page (Available to authenticated users)
router.get('/resources', ensureAuthenticated, async (req, res) => {
  console.log(req.session.user); // Debugging the user session
  try {
      const resources = await Resource.find().lean();
      res.render('pages/resources', {
          title: 'Resources',
          resources,
          user: req.session.user // Pass the user session to the view
      });
  } catch (err) {
      console.error('Error loading resources:', err.message);
      res.status(500).send(`Error loading resources: ${err.message}`);
  }
});
// Add Resource Page (Admin Only)
router.get('/add-resource', ensureAdmin, (req, res) => {
    res.render('pages/add-resource', { title: 'Add Resource' });
});

// Add Resource (POST) (Admin Only)
router.post('/add-resource', ensureAdmin, async (req, res) => {
    const { name, description, link, category } = req.body;
    console.log('Request Body:', req.body); // Debugging
    try {
        if (!name || !description || !link || !category) {
            return res.status(400).send('All fields are required.');
        }

        // Create a new resource in the database
        await Resource.create({ name, description, link, category });
        console.log('Resource added successfully');
        res.redirect('/resources');
    } catch (err) {
        console.error('Error adding resource:', err.message);
        res.status(500).send(`Error adding resource: ${err.message}`);
    }
});

// Edit Resource Page (Admin Only)
router.get('/edit-resource/:id', ensureAdmin, async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id).lean();
        if (!resource) {
            return res.status(404).send('Resource not found');
        }
        res.render('pages/edit-resource', { title: 'Edit Resource', resource });
    } catch (err) {
        console.error('Error loading resource for editing:', err.message);
        res.status(500).send(`Error loading resource for editing: ${err.message}`);
    }
});

// Edit Resource (POST) (Admin Only)
router.post('/edit-resource/:id', ensureAdmin, async (req, res) => {
    const { name, description, link, category } = req.body;
    try {
        if (!name || !description || !link || !category) {
            return res.status(400).send('All fields are required.');
        }

        const updatedResource = await Resource.findByIdAndUpdate(
            req.params.id,
            { name, description, link, category },
            { new: true, runValidators: true }
        );
        if (!updatedResource) {
            return res.status(404).send('Resource not found');
        }

        console.log('Resource updated successfully');
        res.redirect('/resources');
    } catch (err) {
        console.error('Error updating resource:', err.message);
        res.status(500).send(`Error updating resource: ${err.message}`);
    }
});

// Delete Resource (Admin Only)
router.post('/resources/delete/:id', ensureAdmin, async (req, res) => {
    const resourceId = req.params.id;

    try {
        const resource = await Resource.findByIdAndDelete(resourceId);

        if (!resource) {
            return res.status(404).send('Resource not found');
        }

        res.redirect('/resources');
    } catch (err) {
        console.error('Error deleting resource:', err.message);
        res.status(500).send(`Error deleting resource: ${err.message}`);
    }
});

// Resources by Category Page
router.get('/resources/:category', ensureAuthenticated, async (req, res) => {
  const { category } = req.params;

  try {
      // Validate the category
      const validCategories = ['Icons', 'Illustrations', 'Libraries', 'Frameworks', 'APIs', 'Other'];
      if (!validCategories.includes(category)) {
          return res.status(404).send('Category not found');
      }

      // Fetch resources based on the category
      const resources = await Resource.find({ category }).lean();

      res.render('pages/resources-by-category', {
          title: `${category} Resources`,
          resources,
          category, // Pass the current category for context
          user: req.session.user, // Pass user data if needed
      });
  } catch (err) {
      console.error(`Error loading resources for category ${category}:`, err.message);
      res.status(500).send(`Error loading resources: ${err.message}`);
  }
});

module.exports = router;
