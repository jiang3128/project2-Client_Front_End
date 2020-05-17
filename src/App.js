// useEffect show the output once the user enters the website
import React, {useEffect} from 'react';
import './App.css';
import {Memory} from './Memory';
// Hook
import {useSelector, useDispatch} from 'react-redux';
import {loadDay, startAddingOrder} from './action';

//getting data from the system
const date = new Date(); //js build in class
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();



function App() {
  // get data(list of memoris) from store
  const memories = useSelector(state => state.memories);
  const isWaiting = useSelector(state => state.isWaiting);
  const dispatch = useDispatch();

 useEffect(()=>{
    dispatch(loadDay(month,day));
},[dispatch]);

  const onAdd = () =>{
    dispatch(startAddingOrder(year,month,day));
  }

  const APP = () => <Title />;

  const Title= () => {
   return <TitleContent />;
  };

  const TitleContent = () => {
    return <div className = "title">
        <h1>Quarantine Food Ordering</h1>
      </div>
  };

  const TDescription = () => <Intro />;

  const Intro= () => {
   return <TopDescription />;
  };

  const TopDescription = () => {
    return <div className = "page-start">
        <div>The Food Ordering application allows the user to enter the desire food ordering date and the item names.
          Mouse moved to the Menu button, will occur a list of items.
        </div>
      </div>
  };

  const BDescription = () => <Copyright />;

  const Copyright= () => {
   return <BottomDescription />;
  };

  const BottomDescription = () => {
    return <div className = "page-end">
      <img src = {require("./prof_Jay.jpg")} alt = "Jay Professional"/>

      <img src = {require("./food.jpg")} alt = "Jay Professional"/>
        <div>Copyright &copy;2020 Jay and Zhichao's WebWork
       Send an email to zhuj3128.uwec.edu for questions</div>
      </div>
  };
//dispatch dependency, only run once
  return (
    <div className = "memories-root">
      {isWaiting && <div className = "spinner"/>}
      {/* map function - Array of memories into array components */}
      <APP></APP>
      <TDescription></TDescription>
      <div className = "menu">
        Menu
          <ul className = "dropdown">
            <li>Spicy Fried Rice </li>
            <li>Non - Spicy Fried Rice</li>
            <li>Mac and Cheese</li>
            <li>Ramen Bonjour</li>
            <li>Fish and Chips</li>
          </ul>
      </div>
      <button onClick = {onAdd} className ="button">Order a Meal</button>
      {memories.map(memory => <Memory key = {memory.id} memory={memory}/>)}
      <BDescription></BDescription>
    </div>
  );
}

export default App;
