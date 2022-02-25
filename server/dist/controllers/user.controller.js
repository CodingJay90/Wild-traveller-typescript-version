"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_validator_1 = require("express-validator");
var user_model_1 = __importDefault(require("../models/user.model"));
var location_model_1 = __importDefault(require("../models/location.model"));
var comment_model_1 = __importDefault(require("../models/comment.model"));
var signToken_1 = require("../utils/signToken");
var imagesArray = [
    "https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png",
    "https://media.istockphoto.com/vectors/anonymous-gender-neutral-face-avatar-incognito-head-silhouette-vector-id1334533935?b=1&k=20&m=1334533935&s=170667a&w=0&h=dzIHGt2seqmK-AgONwY52LkjHiv651roemNHDgoBaHI=",
    "https://e7.pngegg.com/pngimages/529/6/png-clipart-computer-icons-airplane-smiley-person-icon-yellow.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBgkmyXnekpz06gd_1dgDuB_fXCwntWbsUzWWpk7rQd_1wcqFdZyVgv6p-c2_NQtIxPM&usqp=CAU",
    "https://pngimage.net/wp-content/uploads/2019/05/human-avatar-png-4.png",
];
function createErrorResponse() {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    return msg;
}
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, avatar, password, bio, title, salt, hashedPassword, errors, err_1, newUser, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, avatar = _a.avatar, password = _a.password, bio = _a.bio, title = _a.title;
                if (!avatar)
                    avatar = imagesArray[Math.floor(Math.random() * imagesArray.length)];
                return [4 /*yield*/, bcrypt_1.default.genSalt()];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt).catch(function (err) {
                        throw err;
                    })];
            case 2:
                hashedPassword = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    err_1 = [];
                    errors.array().map(function (i) { return err_1.push(i.msg); });
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            errorMessages: err_1,
                        })];
                }
                return [4 /*yield*/, user_model_1.default.create({
                        email: email,
                        avatar: avatar,
                        username: username,
                        bio: bio,
                        title: title,
                        password: hashedPassword,
                    })];
            case 4:
                newUser = _b.sent();
                token = (0, signToken_1.generateToken)(newUser);
                res.header("Authorization", token);
                res.status(200).json({ success: true, user: newUser, token: token });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        error: error_1,
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
function aaa() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
}
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundUser, validatePassword, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_model_1.default.findOne({ email: req.body.email })];
            case 1:
                foundUser = _a.sent();
                if (req.body.email === "")
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            errorMessages: createErrorResponse("Email field cannot be empty"),
                        })];
                if (!foundUser) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            errorMessages: createErrorResponse("A user with the given email does not exist"),
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, foundUser.password)];
            case 2:
                validatePassword = _a.sent();
                if (!validatePassword) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            errorMessages: createErrorResponse("Invalid Credentials. Password does not match"),
                        })];
                }
                token = (0, signToken_1.generateToken)(foundUser);
                res.status(200).json({ success: true, token: token, user: foundUser });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).json({ success: false, message: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var accessUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)
            .then(function (user) { return res.json(user); })
            .catch(function (err) {
            throw err;
        });
        return [2 /*return*/];
    });
}); };
var getSpecificUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, locations, comments, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findById(req.params.id)];
            case 1:
                user = _c.sent();
                return [4 /*yield*/, location_model_1.default.find((_a = {}, _a["author.id"] = req.params.id, _a))];
            case 2:
                locations = _c.sent();
                return [4 /*yield*/, comment_model_1.default.find((_b = {}, _b["author.id"] = req.params.id, _b))];
            case 3:
                comments = _c.sent();
                res.status(200).json({
                    success: true,
                    user: user,
                    comments: comments.length,
                    locations: locations.length,
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _c.sent();
                res.status(400).json(error_3.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedUser, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.findByIdAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, req.body, { new: true, useFindAndModify: false })];
            case 1:
                updatedUser = (_b.sent());
                (0, signToken_1.generateToken)(updatedUser);
                res.status(200).json({ success: true, updatedUser: updatedUser });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                res.status(400).json({ success: false, message: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        try {
            user_model_1.default.findByIdAndDelete({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id })
                .then(function () { return res.status(200).json({ success: true }); })
                .catch(function (err) {
                return res.status(400).json({ success: false, message: err.message });
            });
        }
        catch (error) {
            res.json({ success: false, message: error.message });
        }
        return [2 /*return*/];
    });
}); };
exports.default = {
    createUser: createUser,
    loginUser: loginUser,
    accessUser: accessUser,
    getSpecificUser: getSpecificUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
};
