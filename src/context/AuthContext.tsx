import React from "react";
import firebase from "firebase/compat/app";
// import * as firebase from 'firebase/compat/auth';

export const AuthContext = React.createContext<firebase.User | null>(null);