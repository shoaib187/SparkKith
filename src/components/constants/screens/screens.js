import CommunityHomePage from "../../../screens/community/communityHomePage/communityHomePage";
import AddTask from "../../../screens/home/addTask/addTask";
import DailyStreak from "../../../screens/home/dailyStreak/dailyStreak";
import Home from "../../../screens/home/homepage/home";
import ReflectMood from "../../../screens/home/reflectMood/reflectMood";
import TaskCompleted from "../../../screens/home/taskCompleted/taskCompleted";
import History from "../../../screens/insights/insightsHomePage/history/history";
import InsightsHomePage from "../../../screens/insights/insightsHomePage/insightsHomePage";
import EditProfile from "../../../screens/profile/editProfile/editProfile";
import Notifications from "../../../screens/profile/notifications/notifications";
import ProfileHomePage from "../../../screens/profile/profileHomePage/profileHomePage";
import Settings from "../../../screens/profile/settings/settings";

export const screens = {
  // home
  Home,
  DailyStreak,
  TaskCompleted,
  ReflectMood,
  AddTask,

  // communities
  CommunityHomePage,

  // Insights
  InsightsHomePage,
  History,

  // Profile
  ProfileHomePage,
  Settings,
  EditProfile,
  Notifications
}
