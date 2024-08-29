// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  complete_card: boolean;
  image_url: string;
  signup_time: string;
};

export type UserCheck = {
  username: string;
  email: string;
};

export type UserIdGrab = {
  username: string;
  id: string;
};

export type SafeUser = {
  name: string;
  username: string;
  email: string;
  complete_card: boolean;
  image_url: string;
  id: string;
};
export type ConvoData = {
  id: string;
  user1_id: string;
  user1_username: string;
  user1_image_url: string;
  user2_id: string;
  user2_username: string;
  user2_image_url: string;
  last_message_time: string;
};
export type AllUsersWithId = {
  names: string[];
  ids: string[];
};
export type MessageData = {
  message_id: string;
  conversation_id: string;
  user_id: string;
  text: string;
  send_time: string;
};

export type DisplayCard = {
  [key: string]: string | number | boolean;
  username: string;
  image_url: string;
  about_player: string;
  self_level: string;
  years_xp: number;
  singles_play: boolean;
  doubles_play: boolean;
  open_play: boolean;
  light_hitting: boolean;
  training_drills: boolean;
  tourn_level: number;
  home_court: 'poplar' | 'fdr' | 'fairmount';
  will_travel: boolean;
  weather_cold: boolean;
  weather_windy: boolean;
  weekday_early_am: boolean;
  weekday_late_am: boolean;
  weekday_early_pm: boolean;
  weekday_late_pm: boolean;
  weekday_evening: boolean;
  weekend_early_am: boolean;
  weekend_late_am: boolean;
  weekend_early_pm: boolean;
  weekend_late_pm: boolean;
  weekend_evening: boolean;
};

export type NotificationSettings = {
  [key: string]: boolean;
  inbox: boolean;
  marketing: boolean;
  court_updates: boolean;
};
