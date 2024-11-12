import { getAuth, signOut } from "firebase/auth";

function handleLogout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("ok");
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

export default handleLogout;