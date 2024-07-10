import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  AppLayout,
  Contents,
  CreateContent,
  UpdateContent,
  Users,
} from "./components";
import {
  Dashboard,
  Details,
  Genre,
  Home,
  Login,
  Movies,
  Profile,
  Register,
  Search,
  Series,
  Settings,
} from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="series" element={<Series />} />
            <Route path="movies" element={<Movies />} />
            <Route path="genres/:genre" element={<Genre />} />
            <Route path="search/:title" element={<Search />} />
            <Route path="watch/:id" element={<Details />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Navigate replace to={"contents"} />} />
            <Route path="contents" element={<Contents />} />
            <Route path="create-content" element={<CreateContent />} />
            <Route path="update-content" element={<UpdateContent />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "14px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#333",
            color: "white",
          },
        }}
      />
    </>
  );
}

export default App;
