const express = require("express");
const School = require("../models/School");
const auth = require("../middleware/auth");  
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: School management
 */

/**
 * @swagger
 * /api/schools:
 *   post:
 *     tags: [Schools]
 *     summary: Create a new school
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fa_name:
 *                 type: string
 *               en_name:
 *                 type: string
 *               domain:
 *                 type: string
 *               STORAGE_BUCKET:
 *                 type: string
 *               MARIADB_DB_NAME:
 *                 type: string
 *               MARIADB_USERNAME:
 *                 type: string
 *               MARIADB_PASSWORD:
 *                 type: string
 *     responses:
 *       201:
 *         description: School created successfully
 *       500:
 *         description: Error creating school
 */

/**
 * @swagger
 * /api/schools:
 *   get:
 *     tags: [Schools]
 *     summary: Retrieve all schools
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: A list of schools
 *       500:
 *         description: Error fetching schools
 */

/**
 * @swagger
 * /api/schools/{id}:
 *   get:
 *     tags: [Schools]
 *     summary: Retrieve a school by ID
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the school
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: School found
 *       404:
 *         description: School not found
 *       500:
 *         description: Error fetching school
 */

/**
 * @swagger
 * /api/schools/{id}:
 *   put:
 *     tags: [Schools]
 *     summary: Update a school by ID
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the school
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fa_name:
 *                 type: string
 *               en_name:
 *                 type: string
 *               domain:
 *                 type: string
 *               STORAGE_BUCKET:
 *                 type: string
 *               MARIADB_DB_NAME:
 *                 type: string
 *               MARIADB_USERNAME:
 *                 type: string
 *               MARIADB_PASSWORD:
 *                 type: string
 *     responses:
 *       200:
 *         description: School updated successfully
 *       404:
 *         description: School not found
 *       500:
 *         description: Error updating school
 */

/**
 * @swagger
 * /api/schools/{id}:
 *   delete:
 *     tags: [Schools]
 *     summary: Delete a school by ID
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the school
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: School deleted successfully
 *       404:
 *         description: School not found
 *       500:
 *         description: Error deleting school
 */


router.post("/", auth, async (req, res) => {
    try {
        const school = new School(req.body);
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating school" });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const schools = await School.find();
        res.json(schools);
    } catch (error) {
        res.status(500).json({ error: "Error fetching schools" });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) return res.status(404).json({ msg: "School not found" });
        res.json(school);
    } catch (error) {
        res.status(500).json({ error: "Error fetching school" });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const school = await School.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!school) return res.status(404).json({ msg: "School not found" });
        res.json(school);
    } catch (error) {
        res.status(500).json({ error: "Error updating school" });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const school = await School.findByIdAndDelete(req.params.id);
        if (!school) return res.status(404).json({ msg: "School not found" });
        res.json({ msg: "School deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting school" });
    }
});

module.exports = router;