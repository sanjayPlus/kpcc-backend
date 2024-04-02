const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Bearers = require('../models/Bearers');
const Blog = require('../models/Blog');
const Organization = require('../models/Organization');
const jwtSecret = process.env.JWT_SECRET;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).send('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }
        const token = jwt.sign({ _id: admin._id }, jwtSecret);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const Protected = async (req, res) => {
    try {
        res.status(200).json({ msg: "Protected route" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const addBearers = async(req, res) => {
    try {
            const { name, category, postion, phone, instagram, facebook, youtube, email, address, description, link, indexNo } = req.body;
            const imObj = req.file;
            const bearers = new Bearers({
                name,
                category,
                postion,
                phone,
                instagram,
                facebook,
                youtube,
                email,
                address,
                description,
                link,
                indexNo,
                image: `${process.env.DOMAIN}/bearersImage/${imObj.filename}`
            })
            await bearers.save();
            res.status(200).json({ bearers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}
const getBearers = async(req, res) => {
    try {
        const {category} =  req.query;
        let query = {};
        if(category) query = {category: category};
        const bearers = await Bearers.find(query).sort({ _id: -1 });
        res.status(200).json({ bearers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBearers = async(req, res) => {
    try {
        const { id } = req.params;
        const bearers = await Bearers.findById(id);
        if(!bearers) {
            return res.status(404).send('Bearers not found');
        }
        await Bearers.deleteOne({ _id: id });
        res.status(200).json({ "message": "Bearers deleted successfully", bearers  });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addBlogs = async(req, res) => {
    try {
        const { title, description,  author, category, link, date, slug } = req.body;
        const imObj = req.file;
        const blog = new Blog({
            title,
            description,
            image: `${process.env.DOMAIN}/blogImage/${imObj.filename}`,
            author,
            category,
            link,
            date,
            slug
        })
        await blog.save();
        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
}

const getBlogs = async(req, res) => {
    try {
        const {category} =  req.query;
        let query = {};
        if(category) query = {category: category};
        const blogs = await Blog.find(query).sort({ _id: -1 });
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBlogs = async(req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addOrganizations = async(req, res) => {
    try {
        const { name, category, postion, phone, instagram, facebook, youtube, email, address, description, link, indexNo } = req.body;
        const imObj = req.file;
        const organizations = new Organization({
            name,
            category,
            postion,
            phone,
            instagram,
            facebook,
            youtube,
            email,
            address,
            description,
            link,
            indexNo,
            image: `${process.env.DOMAIN}/organizationsImage/${imObj.filename}`
        })
        await organizations.save();
        res.status(200).json({ organizations });
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const getOrganizations = async(req, res) => {
    try {
        const {category} =  req.query;
        let query = {};
        if(category) query = {category: category};
        const organizations = await Organization.find(query).sort({ _id: -1 });
        res.status(200).json({ organizations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteOrganizations = async(req, res) => {
    try {
        const { id } = req.params;
        const organizations = await Organization.findByIdAndDelete(id);
        res.status(200).json({ organizations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    login,
    Protected,
    addBearers,
    getBearers,
    deleteBearers,
    addBlogs,
    getBlogs,
    deleteBlogs,
    addOrganizations,
    getOrganizations,
    deleteOrganizations
}