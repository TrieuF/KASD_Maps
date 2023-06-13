import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
    })
    .label("UserCredentials");

export const UserSpec = UserCredentialsSpec
    .keys({
        firstName: Joi.string().example("Homer").required(),
        lastName: Joi.string().example("Simpson").required(),
        isAdmin: Joi.boolean().required().example("true"),
    }).label("UserDetails");

export const UserSpecPlus = UserSpec
    .keys({
        _id: IdSpec,
        __v: Joi.number(),
    }).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Great Wall of China"),
        description: Joi.string().required().allow("").example("a really long wall"),
        lat: Joi.number().min(-90).max(90).example(40.44170),
        lng: Joi.number().min(-180).max(180).example(116.56647),
        category: Joi.string().required().example("Wonder-of-the-World"),
        createdBy: IdSpec.optional(),
        img: Joi.string().optional(),
    })
    .label("PlacemarkPayload")

export const PlacemarkSpecReal = Joi.object()
    .keys({
        name: Joi.string().required().example("Great Wall of China"),
        description: Joi.string().required().example("a really long wall"),
        location: {
            lat: Joi.number().min(-90).max(90).example(40.44170),
            lng: Joi.number().min(-180).max(180).example(116.56647),
        },
        category: Joi.string().required().example("Wonder-of-the-World"),
        createdBy: IdSpec.optional(),
        img: Joi.string().allow("").optional().example(""),
    })
    .label("PlacemarkReal")

export const PlacemarkSpecPlus = PlacemarkSpecReal.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const JwtAuth = Joi.object() //needed later for jwt
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    })
    .label("JwtAuth");
