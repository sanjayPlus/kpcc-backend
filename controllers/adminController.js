const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Bearers = require('../models/Bearers');
const Blog = require('../models/Blog');
const Organization = require('../models/Organization');
const { appLinks } = require('../contants/appLinks');
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
const getBearersById = async (req, res) => {
    try {
        const bearers = await Bearers.findById(req.params.id);
        res.status(200).json(bearers);
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

const updateBearers = async (req, res) => {
    try {
        const bearers = await Bearers.findById(req.params.id);
        const{ name,  postion, phone, instagram, facebook, youtube, email, address, description, link, indexNo} = req.body
        const imObj = req.file;
        if (name) {
            bearers.name = name
        }
        
        if (postion) {
            bearers.postion = postion
        }
        if (phone) {
            bearers.phone = phone
        }
        if (instagram) {
            bearers.instagram = instagram
        }
        if (facebook) {
            bearers.facebook = facebook
        }
        if (youtube) {
            bearers.youtube = youtube
        }
        if (email) {
            bearers.email = email
        }
        if (imObj) {
            bearers.image = `${process.env.DOMAIN}/bearersImage/${imObj.filename}`
        }
        if(address) {
            bearers.address = address
        }
        if(description) {
            bearers.description = description
        }
        if(link) {
            bearers.link = link
        }
        if(indexNo) {
            bearers.indexNo = indexNo
        }

        await bearers.save();
        res.status(200).json({ bearers });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateBlogs = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        const{ title,author, date, slug,  description, link} = req.body
        const imObj = req.file;
        if (title) {
            blog.title = title
        }
        
        if (date) {
            blog.date = date
        }
        if (slug) {
            blog.slug = slug
        }
        if (description) {
            blog.description = description
        }
        if (link) {
            blog.link = link
        }
        if (imObj) {
            blog.image = `${process.env.DOMAIN}/blogImage/${imObj.filename}`
        }
        if(author) {
            blog.author = author
        }

        await blog.save();
        res.status(200).json({ blog });
    }
    catch (error) {
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
        const {category,slug} =  req.query;
        let query = {};
        if(category){
            query["category"] = category
        }
        if(slug){
            query["slug"] = slug
        }
        const blogs = await Blog.find(query).sort({ _id: -1 });
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getBlogsById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
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

const updateOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.findById(req.params.id);
        const{ name, category, postion, phone, instagram, facebook, youtube, email, address, description, link, indexNo} = req.body
        const imObj = req.file;
        if (name) {
            organizations.name = name
        }
        if (category) {
            organizations.category = category
        }
        if (postion) {
            organizations.postion = postion
        }
        if (phone) {
            organizations.phone = phone
        }
        if (instagram) {
            organizations.instagram = instagram
        }
        if (facebook) {
            organizations.facebook = facebook
        }
        if (youtube) {
            organizations.youtube = youtube
        }
        if (email) {
            organizations.email = email
        }
        if (imObj) {
            organizations.image = `${process.env.DOMAIN}/organizationsImage/${imObj.filename}`
        }
        if(address) {
            organizations.address = address
        }
        if(description) {
            organizations.description = description
        }
        if(link) {
            organizations.link = link
        }
        if(indexNo) {
            organizations.indexNo = indexNo
        }

        await organizations.save();
        res.status(200).json({ organizations });
    }
    catch (error) {
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

const getOrganizationsById = async (req, res) => {
    try {
        const organizations = await Organization.findById(req.params.id);
        res.status(200).json(organizations);
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

const getAppLinks = async(req, res) => {
    try {
            res.status(200).json(appLinks);
    } catch (error) {
        res.status(500).json({ error: error});
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
    deleteOrganizations,
    updateBearers,
    updateOrganizations,
    updateBlogs,
    getBearersById,
    getBlogsById,
    getOrganizationsById,
    getAppLinks
}