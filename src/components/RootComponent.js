import React, { Component } from 'react';
import { NavigationActions } from '../NavigationActions'

export default function RootComponent(WrappedComponent) {
  class RootComponent extends Component {
    constructor(props) {
      super(props);
      NavigationActions.setNavigator(props.navigator);

    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}