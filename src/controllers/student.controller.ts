import { Request, Response } from 'express';
import { logger } from '#utils/logger';
import { createStudentValidation, updateStudentValidation } from '#validations/student.validation';
import {
    getStudentFromDB,
    getStudentById,
    addStudentToDB,
    updateStudentById,
    deleteStudentById,
    deleteStudentByIds
} from '#services/student.service';
import { StudentQueryParams } from '#types/student.type';
import { v4 as uuidv4 } from 'uuid';

export const createStudent = async (req: Request, res: Response) => {
    req.body._id = uuidv4();
    const { error, value } = createStudentValidation(req.body);
    if (error) {
        logger.error('ER: student-create = ', error.details[0].message);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
            data: {}
        });
    }

    try {
        await addStudentToDB(value);
        logger.info('Success post student');
        return res.status(201).send({
            status: true,
            statusCode: 201,
            message: 'Add student success'
        });
    } catch (error: any) {
        logger.error('ER: student - create = ', error);
        return res.status(409).send({
            status: false,
            statusCode: 409,
            message: error.message
        });
    }
};

export const getStudent = async (req: Request, res: Response) => {
    const {
        params: { id },
        query
    } = req;

    const filter: StudentQueryParams = {};
    console.log(query);

    if (id) {
        const student = await getStudentById(id);
        if (student) {
            logger.info('Success get student');
            return res.status(200).send({
                status: true,
                statusCode: 200,
                data: student
            });
        } else {
            return res.status(404).send({
                status: false,
                statusCode: 404,
                message: 'Student Not Found',
                data: {}
            });
        }
    } else {
        if (query._id && typeof query._id === 'string') {
            filter._id = query._id;
        }
        if (query.nama && typeof query.nama === 'string') {
            filter.nama = query.nama;
        }
        if (query.tanggalLahir && typeof query.tanggalLahir === 'string') {
            filter.tanggalLahir = query.tanggalLahir;
        }
        if (query.jenisKelamin && typeof query.jenisKelamin === 'string') {
            filter.jenisKelamin = query.jenisKelamin;
        }
        if (query.alamat && typeof query.alamat === 'string') {
            filter.alamat = query.alamat;
        }
        if (query.kelas && typeof query.kelas === 'string') {
            filter.kelas = query.kelas;
        }
        if (query.jurusan && typeof query.jurusan === 'string') {
            filter.jurusan = query.jurusan;
        }

        const students: any = await getStudentFromDB(filter); // Kirim objek filter sebagai parameter
        const { _id, nama, tanggalLahir, jenisKelamin, alamat, kelas, jurusan } = query;

        if (students && students.length > 0) {
            logger.info('Success get student');
            return res.status(200).send({
                status: true,
                statusCode: 200,
                data: students
            });
        }

        if (Object.keys(filter).length === 0) {
            logger.info('Success get student');
            return res.status(200).send({
                status: true,
                statusCode: 200,
                data: []
            });
        } else {
            logger.info(`${_id || nama || tanggalLahir || jenisKelamin || alamat || kelas || jurusan} not found`);
            return res.status(404).send({
                status: false,
                statusCode: 404,
                message: `${_id || nama || tanggalLahir || jenisKelamin || alamat || kelas || jurusan} not found`,
                data: {}
            });
        }
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req;

    const { error, value } = updateStudentValidation(req.body);
    if (error) {
        logger.error('ER: student - create = ', error.details[0].message);
        res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message,
            data: {}
        });
    }

    try {
        const result = await updateStudentById(id, value);
        if (result) {
            logger.info('Success update student');
            return res.status(200).send({
                status: true,
                statusCode: 200,
                message: 'Update student success'
            });
        } else {
            logger.info('Student not found');
            return res.status(404).send({
                status: true,
                statusCode: 404,
                message: 'Student not found'
            });
        }
    } catch (error: any) {
        logger.error('ER: student - update = ', error);
        return res.status(409).send({
            status: false,
            statusCode: 409,
            message: error.message
        });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req;

    try {
        const result = await deleteStudentById(id);
        if (result) {
            logger.info('Success delete student');
            return res.status(200).send({
                status: true,
                statusCode: 200,
                message: 'Delete student success'
            });
        } else {
            logger.info('Data not found');
            return res.status(404).send({
                status: true,
                statusCode: 404,
                message: 'Data not found'
            });
        }
    } catch (error) {
        logger.error('ER: student - delete = ', error);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error
        });
    }
};

export const deleteStudents = async (req: Request, res: Response) => {
    const { Ids } = req.body;

    try {
        const result = await deleteStudentByIds(Ids);
        if (result.deletedCount > 0) {
            logger.info('Success delete students');
            return res.status(200).send({
                status: true,
                statusCode: 200,
                message: 'Delete students success'
            });
        } else {
            logger.info('No matching data found');
            return res.status(404).send({
                status: true,
                statusCode: 404,
                message: 'No matching data found'
            });
        }
    } catch (error) {
        logger.error('ER: students - delete = ', error);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error
        });
    }
};
