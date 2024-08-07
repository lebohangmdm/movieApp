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
  Liked,
  MyList,
  UpdateContent,
  Users,
} from "./components";
import {
  Dashboard,
  Details,
  Error,
  Genre,
  Home,
  List,
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
            <Route path="list" element={<List />}>
              <Route index element={<Navigate replace to="my-list" />} />
              <Route path="my-list" element={<MyList />} />
              <Route path="favourites" element={<Liked />} />
            </Route>
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Navigate replace to={"contents"} />} />
            <Route path="contents" element={<Contents />} />
            <Route path="create-content" element={<CreateContent />} />
            <Route path="update-content/:id" element={<UpdateContent />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="*" element={<Error />} />
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
