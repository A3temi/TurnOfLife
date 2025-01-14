const express = require('express');
const router = express.Router();
const supabase = require('../db'); // Import the Supabase client
const jwt = require('jsonwebtoken');

// Registration
router.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;

    try {
        // Sign up the user using Supabase auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) throw authError;

        // Create a profile in the profiles table (you'll need to create this table in Supabase)
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert([
                {
                    user_id: authData.user.id,
                    username,
                    email
                }
            ]);

        if (profileError) throw profileError;

        res.status(201).json({
            message: 'Registration successful',
            user: authData.user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Get user profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (profileError) throw profileError;

        // Create a JWT token if you want to use your own token system
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            user: profile,
            token,
            supabaseToken: session.access_token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get user profile
router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('No token provided');

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user profile from Supabase
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', decoded.userId)
            .single();

        if (error) throw error;

        res.json(profile);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
