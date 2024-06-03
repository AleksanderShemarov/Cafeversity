import bcrypt from 'bcryptjs';


const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salt);
}

const comparePasswords = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}

export default comparePasswords;
export { hashPassword };
