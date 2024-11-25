import { UserRoleConstants } from "../../data/constants/auth";

export default function Authorize(...allowedRoles: string[]) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;

            descriptor.value = function (req: any, res: any, next: Function) {
            const userRoles = req.headers['roles']?.split(',') || []; // Parse roles from headers

            // Check if the user has at least one required role
            const hasRole = allowedRoles.some(role => userRoles.includes(role));

            if (!hasRole) {
                return res.status(403).json({ message: 'Access denied: insufficient roles' });
            }

            if (userRoles.includes(UserRoleConstants.SUPER_ADMIN))
                return originalMethod.apply(this, [req, res, next]);

            // If roles are valid, call the original method
            return originalMethod.apply(this, [req, res, next]);
        };

        return descriptor;
    };
};