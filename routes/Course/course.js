const router = require("express").Router();
const express = require("express");
const mongoose = require("mongoose");
const Course = require("../../models/Course");


//CREATE
//http://localhost:5000/api/course/
router.post("/", async (req, res) => {
    const newCourse = new Course(req.body);

    try {
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
//http://localhost:5000/api/course/:id
router.put("/:id", async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
//http://localhost:5000/api/course/:id
router.delete("/:id", async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
//http://localhost:5000/api/course/find/:id
router.get("/find/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
//http://localhost:5000/api/course/
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let courses;

        if (qNew) {
            courses = await Course.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            courses = await Course.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            courses = await Course.find();
        }

        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
