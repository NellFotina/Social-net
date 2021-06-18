import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activatedEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });

    this.props.updateStatus(this.state.status);
  };

  handleFocus = (event) => {
    event.target.select();
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };
  //prevProps - предыдущий пропс, prevState - предыдущий state (подсказки Реакта)
  componentDidUpdate(prevProps, prevState) {
    //внутри componentDidUpdate все setState должны быть
    //ТОЛЬКО внутри какого-то условия, чтобы не было зацикливания
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activatedEditMode}>
              {this.props.status || "Without status"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            {/* 1.глобальный state из BLL мы отобразили как статус в span  и записали в локальный state
            2. Дальше мы его копию из локального state отображаем в input 
            3.Меняем что-то в input (меняем эту копию, соответственно и локальный state - глобальный state не меняется)
            4. Когда мы убираем фокус из инпута, мы шлем диспач в глобальный state
            у нас опять отображается span (старое значение)
            5.Глобальный state обновится после того, как сервер подтвердит
            6.Круговоротом опять придут новые props, и значение в статусе поменяется и в span*/}
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onFocus={this.handleFocus} //автовыделение содержимого инпута
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
