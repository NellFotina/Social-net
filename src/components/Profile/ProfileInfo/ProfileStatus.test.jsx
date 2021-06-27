import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

//проверяем, что статус из пропсов попадает в стейт
describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="Nellllll" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Nellllll");
  });
  //проверим, что со старта в статусе у нас отображается span, а не input
  test("after creation <span> should be displayed", () => {
    const component = create(<ProfileStatus status="Nellllll" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("after creation <span> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="Nellllll" />);
    const root = component.root;

    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });
  test("after creation <span> should be contains correct status", () => {
    const component = create(<ProfileStatus status="Nellllll" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("Nellllll");
  });
  test("input should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="Nellllll" />);
    const root = component.root;
    let span = root.findByType("span"); //находим span
    span.props.onDoubleClick(); //кликаем по нему
    let input = root.findByType("input"); //находим input вместо span
    expect(input.props.value).toBe("Nellllll");
  });
  test("callback should be called", () => {
    const mockCallback = jest.fn(); //функция, кот. умеет читать, сколько раз ее вызывали
    const component = create(
      <ProfileStatus status="Nellllll" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1); //1 раз вызов этой функции должен быть
  });
});
