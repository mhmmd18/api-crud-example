import Joi from 'joi';
import { StudentType } from '#types/student.type';

export const createStudentValidation = (payload: StudentType) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        nama: Joi.string().required(),
        tanggalLahir: Joi.string().required(),
        jenisKelamin: Joi.string().required(),
        alamat: Joi.string().allow('', null),
        kelas: Joi.string().required(),
        jurusan: Joi.string().required()
    });

    return schema.validate(payload);
};

export const updateStudentValidation = (payload: StudentType) => {
    const schema = Joi.object({
        nama: Joi.string().allow('', null),
        tanggalLahir: Joi.string().allow('', null),
        jenisKelamin: Joi.string().allow('', null),
        alamat: Joi.string().allow('', null),
        kelas: Joi.string().allow('', null),
        jurusan: Joi.string().allow('', null)
    });

    return schema.validate(payload);
};
