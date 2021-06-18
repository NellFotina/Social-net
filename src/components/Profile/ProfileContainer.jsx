import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfileThunk,
  getStatusThunk,
  updateStatusThunk,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    //match.params. - значения из консоли, связанные с ф-цией withRouter - вытаскивает данные из url
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2; //если не выбран профиль - аватарка 2-го пользователя
    }
    this.props.getUserProfileThunk(userId);
    this.props.getStatusThunk(userId);
  }
  render() {
    //прокинем в компоненту props, раскукожим их (...) и прокинем дальше
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatusThunk}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  //к нам в пропсах придут пропсы, который мы здесь сейчас попросим
  profile: state.profilePage.profile,
  status: state.profilePage.status,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfileThunk,
    getStatusThunk,
    updateStatusThunk,
  }),
  withRouter
)(ProfileContainer);
