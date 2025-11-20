export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {


        if(req.doctor && !allowedRoles.includes(req.doctor.role)) {
            throw new ApiError(403, "You do not have permission");
        }
        if(req.patient && !allowedRoles.includes(req.patient.role)) {
            throw new ApiError(403, "You do not have permission");
        }
        next();
    };
}