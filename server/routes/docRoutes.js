const express = require('express')
const Document = require('../model/docBase')
const router = express.Router()
const authMiddleware = require('../middleware/auth')

router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body
        const userID = req.user._id
        const newDoc = new Document({ title, content, user: userID })
        await newDoc.save();
        res.status(201).json(newDoc)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
})

router.get("/mydocs", authMiddleware, async (req, res) => {
    try {
        const userID = req.user._id
        const documents = await Document.find({ user: userID }).sort({ createdAt: -1 })
        res.json(documents)
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})

router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id)
        if (!doc) return res.status(404).json({ error: "Document not found" });
        res.json(doc)
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title } = req.body;
        const existDoc = await Document.findById(req.params.id);
        if (!existDoc) {
            console.error("Document not found:", req.params.id);
            return res.status(404).json({ error: "Document not found" });
        }
        if (title !== undefined) existDoc.title = title;
        await existDoc.save();
        res.json({ message: "Title updated" });
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/delete", authMiddleware, async (req, res) => {
    try {
        const { id } = req.body
        await Document.findByIdAndDelete(id);
        res.json({ message: "Document Deleted" })
    }
    catch (error) {
        console.error("Error Deleting document:", error);
        res.status(500).json({ error: error.message });
    }
})

module.exports = router