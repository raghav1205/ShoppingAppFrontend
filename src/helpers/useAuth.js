import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(() => {
   return true
  });

  return {
    authed,
    login2() {
        console.log('called')
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout2() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  console.log(auth)
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}