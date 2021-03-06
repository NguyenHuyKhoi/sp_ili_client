import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/auth/context";
import AdminCollectionManagePage from './page/admin/manage/collection';
import AdminGameManagePage from './page/admin/manage/game';
import AdminQuestionManagePage from './page/admin/manage/question';
import AdminUserManagePage from './page/admin/manage/user';
import ForgotPasswordPage from "./page/auth/forgot_password";
// Auth
import LoginPage from "./page/auth/login";
import ResetPasswordPage from "./page/auth/reset_password";
import SignupPage from "./page/auth/signup";
import CollectionDetailPage from "./page/collection/detail";
// Collection
import CollectionCreatorPage from "./page/collection/creator";
import CollectionLibraryPage from "./page/collection/library";
// Game
import GameCreatorPage from "./page/game/creator";
import GameDetailPage from "./page/game/detail";
import GameLibraryPage from "./page/game/library";
// Discover
import SearchPage from "./page/game/search";
// Group
import GroupListPage from "./page/group/list";
import HomePage from "./page/home/auth";
// Home
import HomeGuestPage from "./page/home/guest";
import MatchDetailPage from './page/match/detail';
import MatchHostHallPage from './page/match/host/hall';
import MatchHostLobbyPage from './page/match/host/lobby';
import MatchHostSettingPage from './page/match/host/setting';
import MatchHostStadiumPage from './page/match/host/stadium';
import MatchLibraryPage from './page/match/library';
import MatchLivestreamPage from './page/match/livestream';
import MatchPlayerEntrancePage from './page/match/player/entrance';
import MatchPlayerHallPage from './page/match/player/hall';
import MatchPlayerLobbyPage from './page/match/player/lobby';
import MatchPlayerStadiumPage from './page/match/player/stadium';
import QuestionCreatorPage from './page/question/creator';
// Report
// User
import ProfilePage from "./page/user/profile";
import SettingPage from "./page/user/setting";
import { theme } from "./theme";

const App = () => {
  const {user} = useContext(AuthContext)

  return (
    <ThemeProvider theme={theme}>
       <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={user == null  ? <HomeGuestPage/> : user.isAdmin ?<Navigate to = '/admin/manage/user'/>:<HomePage/>}/>
          <Route exact path="/admin/manage/user" element={user == null  ? <HomeGuestPage/> : user.isAdmin ? <AdminUserManagePage/>:<HomePage/>}/>
          <Route exact path="/admin/manage/game" element={user == null  ? <HomeGuestPage/> : user.isAdmin ? <AdminGameManagePage/>:<HomePage/>}/>
          <Route exact path="/admin/manage/collection" element={user == null  ? <HomeGuestPage/> : user.isAdmin ? <AdminCollectionManagePage/>:<HomePage/>}/>
          <Route exact path="/admin/manage/question" element={user == null  ? <HomeGuestPage/> : user.isAdmin ? <AdminQuestionManagePage/>:<HomePage/>}/>
          <Route exact path="/admin/question/creator" element={user == null  ? <HomeGuestPage/> : user.isAdmin ? <QuestionCreatorPage/>:<HomePage/>}/>
          
          <Route exact path = '/login' element = {!user ? <LoginPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/signup' element = {!user ? <SignupPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/forgot-password' element = {!user ? <ForgotPasswordPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/reset-password' element = {!user ? <ResetPasswordPage/> : <Navigate to = '/'/>}/>

          <Route exact path = '/collection/library' element = {user ? <CollectionLibraryPage/> : <Navigate to = '/login'/>}/>
          <Route exact path = '/collection/creator' element = {user ? <CollectionCreatorPage/> : <Navigate to = '/login'/>}/>
          <Route exact path = '/collection/detail/:id' element = {<CollectionDetailPage/> }/>
        
          <Route exact path = '/game/search' element = {<SearchPage/>}/>
          
          <Route exact path = '/game/creator' element = {user ? <GameCreatorPage/> : <Navigate to = '/login'/>}/>
          <Route exact path = '/game/detail/:id' element = {<GameDetailPage/>}/>
          <Route exact path = '/game/library' element = {user ? <GameLibraryPage/> : <Navigate to = '/login'/>}/>
     
          
          <Route exact path = '/match/player/entrance' element = {<MatchPlayerEntrancePage/>}/>
          <Route exact path = '/match/player/lobby' element = {<MatchPlayerLobbyPage/>}/>
          <Route exact path = '/match/player/stadium' element = {<MatchPlayerStadiumPage/>}/>
          <Route exact path = '/match/player/hall' element = {<MatchPlayerHallPage/>}/>
          <Route exact path = '/match/host/setting' element = {user ? <MatchHostSettingPage/> : <Navigate to = '/login'/>}/>
          <Route exact path = '/match/host/lobby' element = { user ? <MatchHostLobbyPage/> : <Navigate to = '/login'/>}/>
          <Route exact path = '/match/host/stadium' element = {user ? <MatchHostStadiumPage/> : <Navigate to = '/login'/>}/>
          <Route exact path = '/match/host/hall' element = {user ? <MatchHostHallPage/> : <Navigate to = '/login'/>}/>
          <Route exact path = '/match/livestream' element = {user ? <MatchLivestreamPage/> : <Navigate to = '/login'/>}/>

          <Route exact path = '/match/detail/:id' element = {user ? <MatchDetailPage/> : <Navigate to = '/login'/>}/>

          <Route exact path = '/group/list' element = {user ? <GroupListPage/> : <Navigate to = '/login'/>}/>

          <Route exact path = '/match/library' element = {user ? <MatchLibraryPage/> : <Navigate to = '/login'/>}/>

          <Route exact path = '/profiles/:id' element = {<ProfilePage/>}/>
          <Route exact path = '/user/setting' element = {user ? <SettingPage/> : <Navigate to = '/login'/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
