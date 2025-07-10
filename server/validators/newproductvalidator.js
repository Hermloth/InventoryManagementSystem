import { body, validationResult } from "express-validator";


export const validateProduct = [
    body("producttitle")
        .trim()
        .notEmpty()
        .withMessage("Product title is required")
        .isLength({ max: 100 })
        .withMessage("Product title must be less than 100 characters"),

    body("productdescription")
        .trim()
        .optional({ checkFalsy: true })
        .isLength({ max: 500 })
        .withMessage("Description must be less than 500 characters"),

    body("productcategory")
        .trim()
        .optional({ checkFalsy: true }),

    body("productprice")
        .notEmpty().withMessage("Price is required")
        .toFloat()
        .isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),

    body("productcolor")
        .notEmpty()
        .withMessage("Color is required")
        .isIn(["White", "Off-White", "Ivory"])
        .withMessage("Invalid color selection"),

    body("productlength")
        .optional({ checkFalsy: true })
        .trim(),

    body("productstyle")
        .optional({ checkFalsy: true })
        .trim(),

    body("productreorderlevel")
        .optional({ checkFalsy: true })
        .toInt()
        .isInt({ min: 0 }).withMessage("Reorder level must be a non-negative integer"),

    body("productreorderlink")
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("Reorder link must be a valid URL"),
];
