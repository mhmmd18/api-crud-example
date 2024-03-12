export interface StudentType {
    _id: String;
    nama: String;
    tanggalLahir: Date;
    jenisKelamin: String;
    alamat: String;
    kelas: String;
    jurusan: String;
}

export interface StudentQueryParams {
    _id?: String;
    nama?: String;
    tanggalLahir?: String;
    jenisKelamin?: String;
    alamat?: String;
    kelas?: String;
    jurusan?: String;
}
