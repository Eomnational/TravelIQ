import "./styles.css";
import './App.css';
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from './routes/Home';
import User from './routes/User';
import Comment from './routes/Comment'; // Keep this if it's a different comment section
import Statistics from './routes/Statistics';
import Recommend from './routes/Recommend';
import Cloud from './routes/Cloud';
import Register from "./routes/Register";
import Login from "./Components/Login"; 
import ProtectedRoute from './Components/ProtectedRoute';
import AddCommentForm from './Components/AddCommentForm'; // Import your comment form component

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* 公共页面 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 受保护的页面 */}
          <Route path="/user" element={<ProtectedRoute element={<User />} />} />
          <Route path="/comment" element={<ProtectedRoute element={<Comment />} />} />
          <Route path="/statistics" element={<ProtectedRoute element={<Statistics />} />} />
          <Route path="/recommend" element={<ProtectedRoute element={<Recommend />} />} />
          <Route path="/cloud" element={<ProtectedRoute element={<Cloud />} />} />

          {/* 评论页面 */}
          <Route path="/add-comment/:id" element={<ProtectedRoute element={<AddCommentForm />} />} />

          {/* 其他页面 */}
          {/* <Route path="/user/changeSelfInfo" element={<ProtectedRoute element={<ChangeSelfInfo />} />} />
          <Route path="/user/changePassword" element={<ProtectedRoute element={<ChangePassword />} />} /> */}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;


