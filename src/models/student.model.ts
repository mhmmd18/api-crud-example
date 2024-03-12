import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        nama: {
            type: String,
            required: true
        },
        tanggalLahir: {
            type: String,
            required: true
        },
        jenisKelamin: {
            type: String,
            required: true
        },
        alamat: {
            type: String
        },
        kelas: {
            type: String,
            required: true
        },
        jurusan: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const studentModel = mongoose.model('student', studentSchema);

export default studentModel;
