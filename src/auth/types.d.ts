namespace Auth {
    enum RoleIndex {
        ADMIN = "ADMIN",
        EMPLOYEE = "EMPLOYEE",
        UNKNOWN = "UNKNOWN"
    }
    interface LoginData {
        loginData: {
            success: boolean;
            userId: string;
            role?: RoleIndex;
            name: string;
            email?: string;
            phoneNumber?: string;
        }
    }
}