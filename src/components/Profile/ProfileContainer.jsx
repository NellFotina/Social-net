import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { userProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router";

class ProfileContainer extends React.Component {
  componentDidMount() {
    //match.params. - значения из консоли, связанные с ф-цией withRouter - вытаскивает данные из url
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2; //если не выбран профиль - аватарка 2-го пользователя
    }
    this.props.userProfile(userId);
  }
  render() {
    //прокинем в компоненту props, раскукожим их (...) и прокинем дальше
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

//обернем нашу контейнерную компоненту, перед тем, как отдать в connect другой компоненте,
//withrouter возвращает новую компоненту, которая отрисует ProfileContainer,
//но закинет в нее данные из store (из url)
//если ввести в консоль this.props, то увидим, что появились новые значения
//в консоли: match, location, history
//match - совпадение нашего url с какими-то роутерами

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

//наша ProfileContainer вместо mapDispatchToProps создает объект,
//в который кладет AC, далее connect сам этот АС вызовет, задиспатчит,
//в него передаст profile и т.д.
export default connect(mapStateToProps, { userProfile })(
  WithUrlDataContainerComponent
);
