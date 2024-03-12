import studentModel from '#models/student.model';
import { logger } from '#utils/logger';
import { StudentType } from '#types/student.type';

export const getStudentFromDB = async (query: any) => {
    return await studentModel
        .find(query) // Menggunakan query params
        .then((data) => {
            return data;
        })
        .catch((error) => {
            logger.info('Cannot get data from DB');
            logger.error(error);
        });
};

export const getStudentById = async (id: String) => {
    return await studentModel.findOne({ _id: id });
};

export const addStudentToDB = async (payload: StudentType) => {
    try {
        return await studentModel.create(payload);
    } catch (error: any) {
        if (error.code === 11000) {
            logger.error('ER: country - create = Duplicate data');
            throw new Error(`Duplikasi data: ${error.keyValue.countryCode || error.keyValue.description} sudah ada!`);
        }
        logger.error('ER: country - create = ', error);
        throw error;
    }
};

export const updateStudentById = async (id: String, payload: StudentType) => {
    try {
        const result = await studentModel.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: payload
            }
        );
        return result;
    } catch (error: any) {
        if (error.code === 11000) {
            logger.error('ER: country - update = Duplicate data');
            throw new Error(`Duplikasi data: ${error.keyValue.countryCode || error.keyValue.description} sudah ada!`);
        }
        logger.error('ER: country - update = ', error);
        throw error;
    }
};

export const deleteStudentById = async (id: String) => {
    const result = await studentModel.findOneAndDelete({ _id: id });
    return result;
};

export const deleteStudentByIds = async (ids: string[]) => {
    const result = await studentModel.deleteMany({ _id: { $in: ids } });
    return result;
};
