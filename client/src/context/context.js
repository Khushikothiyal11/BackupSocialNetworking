import React from "react";
 const LoginContext = React.createContext({
    luser: null,
    updateUser: (newUser) => {}
});
export default LoginContext;