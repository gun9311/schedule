import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {AuthProvider} from "../packages/auth/AuthProvider";
import {BrowserRouter as Router} from "react-router-dom";

import AppRouter from "./AppRouter";


// const App = () => {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// };

// const AppContent = () => {
//   const { isLoggedIn } = useContext(authContext);

//   return (
//     <Router>
//       {isLoggedIn && <Notification />}
//       <AppRouter />
//     </Router>
//   );
// };

// export default App;
const App = () => {
 


  return (
    <AuthProvider>
      <Router>
        <AppRouter/>
      </Router>
    </AuthProvider>
  );
};

export default App;