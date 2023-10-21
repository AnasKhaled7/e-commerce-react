import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
