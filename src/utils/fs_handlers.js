import multer from 'multer';
import path from 'path';
import {promises as fs} from 'fs';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const staticDir = path.join(__dirname, '..', '..', 'static');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            const userDir = path.join(staticDir, req.auth.id.toString());
            await fs.mkdir(userDir, { recursive: true });
            cb(null, userDir);
        } catch (err) {
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage });