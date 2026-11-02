const mongoose = require('mongoose');
const Student = require('../models/studentModel');

/**
 * @desc    Create a new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res) => {
  try {
    const { name, email, rollNumber, course, yearOfStudy } = req.body;

    // Check for required fields
    if (!name || !email || !rollNumber || !course || !yearOfStudy) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, rollNumber, course, yearOfStudy',
      });
    }

    // Check if student with same email or rollNumber already exists
    const existingStudent = await Student.findOne({
      $or: [{ email: email.toLowerCase() }, { rollNumber }],
    });

    if (existingStudent) {
      const duplicateField = existingStudent.email === email.toLowerCase() ? 'Email' : 'Roll number';
      return res.status(400).json({
        success: false,
        message: `${duplicateField} already exists in the system`,
      });
    }

    // Create student
    const student = await Student.create({
      name,
      email,
      rollNumber,
      course,
      yearOfStudy,
    });

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating student',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all students
 * @route   GET /api/students
 * @access  Public
 */
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching students',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Student ID format',
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching student',
      error: error.message,
    });
  }
};

/**
 * @desc    Update student details
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Student ID format',
      });
    }

    // Check if student exists
    let student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`,
      });
    }

    // Check if new email or rollNumber conflicts with another student
    if (req.body.email || req.body.rollNumber) {
      const conflictQuery = {
        _id: { $ne: id },
        $or: [],
      };
      if (req.body.email) conflictQuery.$or.push({ email: req.body.email.toLowerCase() });
      if (req.body.rollNumber) conflictQuery.$or.push({ rollNumber: req.body.rollNumber });

      if (conflictQuery.$or.length > 0) {
        const conflict = await Student.findOne(conflictQuery);
        if (conflict) {
          return res.status(400).json({
            success: false,
            message: 'Email or Roll number is already in use by another student',
          });
        }
      }
    }

    // Update with validators enabled
    student = await Student.findByIdAndUpdate(id, req.body, {
      new: true, // returns updated doc
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating student',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a student
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Student ID format',
      });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting student',
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
