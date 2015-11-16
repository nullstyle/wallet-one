import React from 'react';
import {
	List, ListItem
} from "material-ui";

import SuccessIcon from "material-ui/lib/svg-icons/action/done";
import FailureIcon from "material-ui/lib/svg-icons/content/clear";
import RunningIcon from "material-ui/lib/svg-icons/action/cached";
import colors from 'material-ui/lib/styles/colors';

import {reduce, any, map} from 'lodash';


const SpecMenu = (props) => {
  let {cases, onTouchTap} = props;
	console.log(cases);
  let categories = buildCategories(cases);
  let icon = statusIcon(cases);
  let color = statusColor(cases);
  let nested = map(categories, (cases, name) => {
    return <SpecCategory
      name={name}
      cases={cases}
      onTouchTap={() => onTouchTap(name)} />
  });

  return <ListItem
	    primaryText="Run All Specs"
	    leftIcon={icon}
	    initiallyOpen={false}
	    nestedItems={nested}
      onTouchTap={() => onTouchTap()}
      style={{color: color}}
	  />;
}

const SpecCategory = (props) => {
  let {name, cases, onTouchTap} = props;
  let icon = statusIcon(cases);
  let color = statusColor(cases);
  return  <ListItem
    primaryText={name + "s Only"}
    leftIcon={icon}
    onTouchTap={onTouchTap}
    style={{color: color}}
    />;
}

function statusIcon(cases) {
  let color = statusColor(cases);
  if (any(cases, {status:'running'})) {
    return <RunningIcon color={color}/>;
  }

  if (any(cases, {status:'failed'})) {
    return  <FailureIcon color={color}/>;
  }

  if (any(cases, {status:'success'})) {
    return  <SuccessIcon color={color}/>;
  }

  return <div />;
}

function statusColor(cases) {
  if (any(cases, {status:'failed'})) {
    return  colors.redA200;
  }
  if (any(cases, {status:'pending'})) {
    return  colors.yellow600;
  }
  if (any(cases, {status:'success'})) {
    return  colors.green400;
  }
  return "inherit";
}

function buildCategories(cases) {
  return reduce(cases, (acc, c) => {
    let cases = acc[c.category] || [];
    cases.push(c);
    acc[c.category] = cases;
    return acc;
  }, {});
}

export {SpecMenu};
