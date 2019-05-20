import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';
import _isEmpty from 'lodash/isEmpty';

const API_KEY = "e5c0bc76385dc1abd114b12f834bdba1";

class App extends Component {
  state = {
    recipes:[]
  }

  handleFormSubmit = e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();

    this.getRecipe(recipeName);
  };

  getRecipe = async recipeName => {
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=12`);
    const data = await api_call.json();

    this.setState({ recipes: data.recipes });
  }

  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    const { recipes: recipesFromState } = this.state;

    this.setState({ recipes });
    if (_isEmpty(recipesFromState)) {
      this.getRecipe('');
    }
  }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }

  render() {
    const { recipes } = this.state;
    console.log(this.state.recipes);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.handleFormSubmit} />
        {recipes && <Recipes recipes={recipes} />}
      </div>
    );
  }
}

export default App;
