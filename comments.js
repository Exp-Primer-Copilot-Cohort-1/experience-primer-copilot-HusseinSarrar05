// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');

// Create new comment
router.post('/:id', [
    check('comment').not().isEmpty().trim().escape()
], (req, res) => {
    // Check if user is logged in
    if (req.session.userId) {
        // Validate form
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Render post page with errors
            res.render('post', {
                title: 'Post',
                loggedIn: true,
                errors: errors.array(),
                comment: req.body.comment
            });
        } else {
            // Create new comment
            Comment.create({