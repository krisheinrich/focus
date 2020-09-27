import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import MainLayout from '../MainLayout';

const Focus = () => (
  <MainLayout>
    <h1>Welcome to the Focus page!</h1>
    <FocusList />
  </MainLayout>
);

class _FocusList extends React.Component {
  state = {
    actions: [],
    loading: true
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      this.props.firebase
        .actions()
        .get()
        .then(snapshot => {
          const actions = [];
          snapshot.forEach(doc => {
            actions.push({ id: doc.id, ...doc.data() });
          });

          this.setState({
            actions,
            loading: false
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false });
        });
    });
  }

  render() {
    const { loading, actions } = this.state;
    return loading
      ? <p>Loading...</p>
      : <ul>
          { actions.map(a => <li key={a.id}>{ a.name }</li>) }
        </ul>;
  }
}

const FocusList = withFirebase(_FocusList);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Focus);
