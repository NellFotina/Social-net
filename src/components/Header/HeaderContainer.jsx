import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getAuthMeThunk, LogoutThunk } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthMeThunk();
  }
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { getAuthMeThunk, LogoutThunk })(
  HeaderContainer
);
