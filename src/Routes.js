import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthMain from './Components/Authentication/AuthMain'
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';

import AppDisplay from './Components/AppDisplay';

import ExercisesScreen from './Components/Fitness/Exercise/ExercisesScreen';
import VegetablesScreen from './Components/Fitness/Vegetables/VegetablesScreen';
import FruitScreen from './Components/Fitness/Fruits/FruitScreen';

import WorkoutPlayer from './Components/Fitness/Workout/WorkoutPlay'
import WorkoutPlanScreenL2 from './Components/Fitness/Workout/WorkoutPlanScreenL2'
import WorkoutPlanScreen from './Components/Fitness/Workout/WorkoutPlanScreen';

import NcdScreen from "./Components/online_Diagnosis/NcdScreen";
import EarlyDetectionScreen from "./Components/online_Diagnosis/EarlyDetectionScreen";
import TestMain from "./Components/online_Diagnosis/TestMain";

import FooterTabTwo from './Components/FooterTab2/FooterTabTwo';





const authStack = createStackNavigator({ authMain: AuthMain, login: Login, signUp: SignUp }, { headerMode: 'none' });
const mainAppStack = createStackNavigator({ appDisplay: AppDisplay }, { headerMode: 'none' })


const exerciseStack = createStackNavigator({ appDisplay: AppDisplay, exercises: ExercisesScreen }, { headerMode: 'none' });
const vegetablesStack = createStackNavigator({ appDisplay: AppDisplay, vegetables: VegetablesScreen }, { headerMode: 'none' });
const fruitStack = createStackNavigator({ appDisplay: AppDisplay, fruit: FruitScreen }, { headerMode: 'none' });

const WorkoutPlayerStack = createStackNavigator({ workoutBase: AppDisplay, workout: WorkoutPlanScreen, planScreen: WorkoutPlanScreenL2, workoutPlayer: WorkoutPlayer }, { headerMode: 'none' });
const WorkoutPlanStack = createStackNavigator({ workoutBase: AppDisplay, workout: WorkoutPlanScreen, planScreen: WorkoutPlanScreenL2 }, { headerMode: 'none' });
const workoutStack = createStackNavigator({ appDisplay: AppDisplay, workout: WorkoutPlanScreen }, { headerMode: 'none' });

const ncdStack = createStackNavigator({ appDisplay: AppDisplay, ncdScreen: NcdScreen }, { headerMode: 'none' });
const earlyDetectionStack = createStackNavigator({ appDisplay: AppDisplay, earlyDetectionScreen: EarlyDetectionScreen }, { headerMode: 'none' });
const testMainStack = createStackNavigator({ appDisplay: AppDisplay, testMain: TestMain }, { headerMode: 'none' });


const footerTab2Stack = createStackNavigator({ tab2: FooterTabTwo });


export default createAppContainer(
  createSwitchNavigator(
    {
      auth: authStack,
      mainApp: mainAppStack,


      exerciseStack: exerciseStack,
      vegetablesStack: vegetablesStack,
      fruitStack: fruitStack,

      WorkoutPlayer: WorkoutPlayerStack,
      workoutPlan: WorkoutPlanStack,
      workoutStack: workoutStack,


      ncdStack: ncdStack,
      testMainStack: testMainStack,
      earlyDetectionStack: earlyDetectionStack,
      footerTab2Stack: footerTab2Stack
    },
    {
      initialRouteName: 'auth',
    }
  )
);