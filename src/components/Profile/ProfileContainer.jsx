import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfileThunk } from "../../redux/profile-reducer";
import { withRouter } from "react-router";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    //match.params. - значения из консоли, связанные с ф-цией withRouter - вытаскивает данные из url
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2; //если не выбран профиль - аватарка 2-го пользователя
    }
    this.props.getUserProfileThunk(userId);
  }
  render() {
    //прокинем в компоненту props, раскукожим их (...) и прокинем дальше
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

export default compose(
  connect(mapStateToProps, { getUserProfileThunk }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
