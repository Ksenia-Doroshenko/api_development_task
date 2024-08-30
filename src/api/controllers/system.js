export async function confirmationRegistration(req, res) {
    try {
        const {
            name,
            timezone,
            hashlink,
            pass
        } = req.body;

        const user = await queries.users.getByHashlink({hash_link: hashlink});

        if (!user) {
            return methods.sendError(res,
                'Некорректный ключ активации! Попробуйте пройти процедуру восстановления пароля заново');
        }

        const passHash = await bcrypt.hash(pass, 10);

        await queries.users.registration({
            id_user: user.id,
            pass: passHash,
            name,
            timezone
        });

        return res.json({
            message: 'Регистрация прошла успешно'
        });
    } catch (e) {
        METHODS.sendError(res, e.message, {error: e});
    }
}