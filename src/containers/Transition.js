import React from "react";
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

export default (props) => { // basic Transition wrapper component
  const {
    timeout = 500,
    keyProp,
    type = "crossFade",
    enteringProps = {},
    exitingProps = {},
    globalStyle = {},
  } = props;
  const getTransitionStyles = {
    entering: {
      opacity: 1,
      transition: `opacity ${timeout}ms ease-in-out`,
      ...enteringProps,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      transition: `opacity ${timeout}ms ease-in-out`,
      opacity: 0,
      ...exitingProps,
    },
  };

  if (type === "fadeFully") {
    getTransitionStyles.entering = { opacity: 0, position: "absolute" };
    getTransitionStyles.entered = {
      transition: `opacity ${timeout}ms ease-in-out`,
      opacity: 1,
    };
  }

  return (
    <TransitionGroup component={null}>
      <ReactTransition
        key={keyProp}
        timeout={{
          enter: timeout,
          exit: timeout,
        }}
      >
        {(status) => (
          <div style={{ ...globalStyle, ...getTransitionStyles[status] }}>
            {props.children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};
